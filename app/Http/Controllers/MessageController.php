<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Notifications\NewMessageNotification;
class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        $authId = Auth::id();


        $conversations = User::query()
            ->where('id', '!=', $authId)
            ->whereHas('sentMessages', fn($q) => $q->where('receiver_id', $authId))
            ->orWhereHas('receivedMessages', fn($q) => $q->where('sender_id', $authId))
            ->where('id', '!=', $authId)
            ->with([
                'captainProfile:user_id,full_name,photo_path',
                'deckhandProfile:user_id,full_name,photo_path',
                'chartererProfile:user_id,full_name,photo_path',
                'ownerProfile:user_id,full_name,photo_path',
            ])
            ->get()
            ->map(function (User $user) use ($authId) {

                $latest = Message::query()
                    ->where(fn($q) => $q->where('sender_id', $authId)->where('receiver_id', $user->id))
                    ->orWhere(fn($q) => $q->where('sender_id', $user->id)->where('receiver_id', $authId))
                    ->latest()
                    ->first();


                $unread = Message::query()
                    ->where('sender_id', $user->id)
                    ->where('receiver_id', $authId)
                    ->whereNull('read_at')
                    ->count();

                $role = $this->resolveRole($user);
                $name = $this->resolveName($user);

                return [
                    'id'      => $user->id,
                    'name'    => $name,
                    'role'    => $role,
                    'preview' => $latest?->body ?? '',
                    'time'    => $latest ? $latest->created_at->diffForHumans(short: true) : '',
                    'unread'  => $unread,
                    'online'  => false, 
                    'photo' => $this->resolvePhoto($user),
                ];
            })
            ->sortByDesc('time')
            ->values();


        $selectedUserId = $request->query('with');
        $chatMessages = collect();
        $selectedUser = null;

        if ($selectedUserId) {
            $selectedUser = User::query()
                ->with([
                    'captainProfile:user_id,full_name,photo_path',
                    'deckhandProfile:user_id,full_name,photo_path',
                    'chartererProfile:user_id,full_name,photo_path',
                    'ownerProfile:user_id,full_name,photo_path',
                ])
                ->findOrFail($selectedUserId);


            Message::query()
                ->where('sender_id', $selectedUserId)
                ->where('receiver_id', $authId)
                ->whereNull('read_at')
                ->update(['read_at' => now()]);

            $chatMessages = Message::query()
                ->where(fn($q) => $q->where('sender_id', $authId)->where('receiver_id', $selectedUserId))
                ->orWhere(fn($q) => $q->where('sender_id', $selectedUserId)->where('receiver_id', $authId))
                ->oldest()
                ->get()
                ->map(fn(Message $m) => [
                    'id'     => $m->id,
                    'fromMe' => $m->sender_id === $authId,
                    'body'   => $m->body,
                    'time'   => $m->created_at->format('h:i A'),
                ]);
        }

        return Inertia::render('messages', [
            'conversations'  => $conversations,
            'chatMessages'   => $chatMessages,
            'selectedUserId' => $selectedUserId,
            'selectedUser'   => $selectedUser ? [
                'id'     => $selectedUser->id,
                'name'   => $this->resolveName($selectedUser),
                'role'   => $this->resolveRole($selectedUser),
                'online' => false,
                'photo' => $this->resolvePhoto($selectedUser),
            ] : null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'receiver_id' => ['required', 'uuid', 'exists:users,id'],
            'body'        => ['required', 'string', 'max:5000'],
        ]);

        $message = Message::create([
            'sender_id'   => Auth::id(),
            'receiver_id' => $validated['receiver_id'],
            'body'        => $validated['body'],
        ]);
        $receiver = User::find($validated['receiver_id']);
        $receiver->notify(new NewMessageNotification($message, Auth::user()));
        broadcast(new MessageSent($message));
        return back()->with('success', 'Message sent');
    }

    private function resolvePhoto(User $user): ?string
    {
        $profile = $user->captainProfile
            ?? $user->deckhandProfile
            ?? $user->chartererProfile
            ?? $user->ownerProfile;

        return $profile?->photo_path
            ? \Illuminate\Support\Facades\Storage::url($profile->photo_path)
            : null;
    }

    private function resolveName(User $user): string
    {
        $profile = $user->captainProfile
            ?? $user->deckhandProfile
            ?? $user->chartererProfile
            ?? $user->ownerProfile;

        if ($profile && !empty($profile->full_name)) {
            return trim($profile->full_name);
        }

       
        return ucwords(str_replace(['.', '_', '-'], ' ', explode('@', $user->email)[0]));
    }
    private function resolveRole(User $user): string
    {
        return ucfirst($user->roles->first()?->name ?? 'User');
    }
}

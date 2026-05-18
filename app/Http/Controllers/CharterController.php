<?php

namespace App\Http\Controllers;

use App\Models\CharterEvent;
use App\Models\OwnerProfile;
use App\Models\Vessel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CharterController extends Controller
{
    public function index(): Response
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->first();

        if (! $owner) {
            return Inertia::render('charterers', [
                'vessels'  => [],
                'drafts'   => [],
                'bookings' => [],
            ]);
        }

        $vessels = Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn(Vessel $v) => [
                'value' => $v->id,
                'label' => $v->name,
            ]);

        $vesselIds = Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->pluck('id');


        $drafts = CharterEvent::whereIn('vessel_id', $vesselIds)
            ->whereNull('deleted_at')
            ->where('status', 'draft')
            ->with('vessel.photos')
            ->latest('charter_date')
            ->get()
            ->map(fn(CharterEvent $event) => [
                'id'            => $event->id,
                'yachtName'     => $event->vessel->name,
                'yachtType'     => ucfirst($event->vessel->vessel_type ?? ''),
                'yachtLength'   => $event->vessel->length_ft ? $event->vessel->length_ft . ' ft' : '—',
                'date'          => $event->charter_date?->format('M d, Y') ?? '—',
                'startTime'     => $event->start_time ?? '—',
                'duration'      => $event->duration_minutes ? round($event->duration_minutes / 60, 1) . ' hrs' : '—',
                'yachtImage'    => $event->vessel->photos->first()
                    ? Storage::url($event->vessel->photos->first()->image_path)
                    : null,
                'inviteLink'    => $event->invite_token
                    ? url('/charterer/join/' . $event->invite_token)
                    : null,
                'inviteExpires' => $event->invite_token_expires_at?->format('M d, Y') ?? null,
                'specialNotes'  => $event->special_notes,
            ]);


        $bookings = CharterEvent::whereIn('vessel_id', $vesselIds)
            ->whereNull('deleted_at')
            ->whereIn('status', ['confirmed', 'booked', 'pending'])
            ->with(['vessel.photos', 'charterer.user'])
            ->latest('charter_date')
            ->get()
            ->map(fn(CharterEvent $event) => [
                'id'              => $event->id,
                'yachtName'       => $event->vessel->name,
                'yachtType'       => ucfirst($event->vessel->vessel_type ?? ''),
                'yachtLength'     => $event->vessel->length_ft ? $event->vessel->length_ft . ' ft' : '—',
                'date'            => $event->charter_date?->format('M d, Y') ?? '—',
                'yachtImage'      => $event->vessel->photos->first()
                    ? Storage::url($event->vessel->photos->first()->image_path)
                    : null,
                'chartererName'   => $event->charterer?->user?->name ?? 'Pending',
                'chartererAvatar' => null,
                'status'          => ucfirst($event->status ?? 'Booked'),
            ]);

        return Inertia::render('charterers', [
            'vessels'  => $vessels,
            'drafts'   => $drafts,
            'bookings' => $bookings,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();

        $validated = $request->validate([
            'vessel_id'      => ['required', 'uuid', 'exists:vessels,id'],
            'charter_date'   => ['required', 'date', 'after_or_equal:today'],
            'start_time'     => ['required', 'string'],
            'duration_hours' => ['required', 'integer', 'min:1'],
            'special_notes'  => ['nullable', 'string', 'max:2000'],
        ]);

        $vessel = Vessel::where('id', $validated['vessel_id'])
            ->where('owner_id', $owner->id)
            ->firstOrFail();

        CharterEvent::create([
            'vessel_id'               => $vessel->id,
            'charter_date'            => $validated['charter_date'],
            'start_time'              => $validated['start_time'],
            'duration_minutes'        => (int) $validated['duration_hours'] * 60,
            'special_notes'           => $validated['special_notes'] ?? null,
            'status'                  => 'draft',
            'invite_token'            => Str::random(32),
            'invite_token_expires_at' => now()->addDays(7),
        ]);

        return redirect()
            ->route('charterers')
            ->with('success', 'Charter created successfully.');
    }

    public function join(string $token): Response|RedirectResponse
    {
        $event = CharterEvent::where('invite_token', $token)
            ->whereNull('deleted_at')
            ->where('invite_token_expires_at', '>', now())
            ->firstOrFail();

        return Inertia::render('charterer/request', [
            'charterEvent' => [
                'id'        => $event->id,
                'token'     => $token,
                'yachtName' => $event->vessel->name ?? '—',
                'date'      => $event->charter_date?->format('M d, Y'),
                'startTime' => $event->start_time,
                'duration'  => $event->duration_minutes
                    ? round($event->duration_minutes / 60, 1) . ' hrs'
                    : '—',
            ],
        ]);
    }
}

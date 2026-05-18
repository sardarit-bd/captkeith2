<?php

namespace App\Http\Controllers;

use App\Models\CharterEvent;
use App\Models\ChartererProfile;
use App\Models\OwnerProfile;
use App\Models\OwnerCaptainInvitation;
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

    public function join(string $token): RedirectResponse
    {
        $event = CharterEvent::where('invite_token', $token)
            ->whereNull('deleted_at')
            ->where('invite_token_expires_at', '>', now())
            ->firstOrFail();

        $charterer = ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        if (is_null($event->charterer_id)) {
            $event->update(['charterer_id' => $charterer->id]);
        } elseif ($event->charterer_id !== $charterer->id) {
            return redirect()->route('dashboard')
                ->with('error', 'This invite link has already been used.');
        }

        return redirect()->route('charterer.request');
    }

    public function request(): Response|RedirectResponse
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->with(['vessel.photos'])
            ->latest('created_at')
            ->first();

        if (! $event) {
            return redirect()->route('dashboard')
                ->with('error', 'No active charter booking found. Please use your invite link.');
        }

        $vessel = $event->vessel;
        $photo  = $vessel->photos->first();
        $marina = implode(', ', array_filter([
            $vessel->marina_name,
            $vessel->marina_city,
            $vessel->marina_state,
        ]));

        return Inertia::render('charterer/request', [
            'charterEvent' => [
                'id'    => $event->id,
                'yacht' => [
                    'name'               => $vessel->name,
                    'registrationNumber' => $vessel->official_number,
                    'type'               => ucfirst($vessel->vessel_type ?? ''),
                    'length'             => $vessel->length_ft ? $vessel->length_ft . ' ft' : '—',
                    'marina'             => $marina ?: '—',
                    'operatingArea'      => $vessel->operating_area ?? '—',
                    'image'              => $photo ? Storage::url($photo->image_path) : null,
                ],
                'date'                  => $event->charter_date?->format('M d, Y') ?? '—',
                'time'                  => $event->start_time ?? '—',
                'duration'              => $event->duration_minutes
                    ? round($event->duration_minutes / 60, 1) . ' hrs'
                    : '—',
                'specialNotes'          => $event->special_notes ?? '',
                'availableCaptainCount' => OwnerCaptainInvitation::where('vessel_id', $vessel->id)
                    ->where('status', 'accepted')
                    ->count(),
            ],
        ]);
    }

    public function captainSelect(): Response|RedirectResponse
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->with(['vessel'])
            ->latest('created_at')
            ->first();

        if (! $event) {
            return redirect()->route('dashboard')
                ->with('error', 'No active charter booking found. Please use your invite link.');
        }

        // Load accepted captains from owner_captain_invitations for this vessel
        $invitations = OwnerCaptainInvitation::where('vessel_id', $event->vessel_id)
            ->where('status', 'accepted')
            ->with(['captain.user'])
            ->get();

        $captains = $invitations->map(function (OwnerCaptainInvitation $invitation) {
            $profile = $invitation->captain;
            $user    = $profile?->user;

            $licenseLabel = match ($profile?->license_type) {
                'oupv'    => 'OUPV (Six-Pack)',
                'masters' => 'Master License',
                default   => $profile?->license_type ?? '—',
            };

            $location = implode(', ', array_filter([
                $profile?->city,
                $profile?->state,
            ]));

            $endorsements = is_array($profile?->endorsement)
                ? $profile->endorsement
                : (json_decode($profile?->endorsement ?? '[]', true) ?? []);

            return [
                'id'           => $profile?->id ?? $invitation->id,
                'name'         => $user?->name ?? '—',
                'photo'        => $user?->profile_photo_path
                    ? Storage::url($user->profile_photo_path)
                    : null,
                'location'     => $location ?: '—',
                'license'      => $licenseLabel,
                'experience'   => $profile?->years_experience
                    ? $profile->years_experience . ' years experience'
                    : '—',
                'rate'         => $profile?->hourly_rate
                    ? '$' . number_format($profile->hourly_rate, 0) . '/hr'
                    : '—',
                'bio'          => $profile?->bio ?? '',
                'endorsements' => $endorsements,
                'isVerified'   => (bool) ($profile?->is_verified ?? false),
            ];
        })->values();

        return Inertia::render('charterer/captain-select', [
            'captains' => $captains,
        ]);
    }


    public function destroy(CharterEvent $charterEvent): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();


        $vessel = Vessel::where('id', $charterEvent->vessel_id)
            ->where('owner_id', $owner->id)
            ->firstOrFail();


        abort_if($charterEvent->status !== 'draft', 403, 'Only draft charters can be deleted.');

        $charterEvent->delete();

        return redirect()
            ->route('charterers')
            ->with('success', 'Draft charter deleted.');
    }
}

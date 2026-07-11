<?php

namespace App\Http\Controllers;

use App\Models\CharterEvent;
use App\Models\ChartererProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MyBookingController extends Controller
{
    public function index(Request $request): Response
    {
        $profile = ChartererProfile::where('user_id', $request->user()->id)->first();

        if (!$profile) {
            return Inertia::render('my-booking', [
                'bookings' => [],
                'filters' => $this->buildFilters([]),
            ]);
        }

        $events = CharterEvent::where('charterer_id', $profile->id)
            ->whereNull('deleted_at')
            ->with([
                'vessel.photos' => fn($q) => $q->orderBy('display_order'),
                'selectedCaptain',
                'selectedDeckhand',
                'hireAgreements.captainProfile',
                'hireAgreements.deckhandProfile',
                'hireAgreements.ownerProfile',
                'payments',
            ])
            ->latest('charter_date')
            ->get();

        $bookings = $events->map(function (CharterEvent $event) {
            $vessel = $event->vessel;
            $photo = $vessel?->photos->first();

            $totalPaid = $event->payments
                ->where('status', 'paid')
                ->sum('amount');

            $confirmationCode = 'CM-' . strtoupper(substr($event->id, 0, 8));

            $status = match ($event->status) {
                'completed' => 'completed',
                'confirmed' => 'confirmed',
                'cancelled' => 'cancelled',
                'agreements_signed', 'awaiting_responses', 'draft' => 'pending',
                default => 'pending',
            };

            $statusLabel = match ($event->status) {
                'completed' => 'Completed',
                'confirmed' => 'Confirmed',
                'cancelled' => 'Cancelled',
                'agreements_signed' => 'Agreements Signed',
                'awaiting_responses' => 'Awaiting Crew Responses',
                'draft' => 'Draft',
                default => ucfirst($event->status),
            };

            $durationHours = $event->duration_minutes
                ? round($event->duration_minutes / 60, 1)
                : 0;

            $timeLabel = $event->start_time && $durationHours
                ? $event->start_time . ' · ' . $durationHours . ' hrs'
                : ($event->start_time ?? '—');

            // Build captains array from selectedCaptain + any additional captains from agreements
            $captains = collect();

            // Primary selected captain
            if ($event->selectedCaptain) {
                $captains->push([
                    'id' => $event->selectedCaptain->id,
                    'name' => $event->selectedCaptain->full_name ?? 'Pending',
                    'photo' => $event->selectedCaptain->photo_path ? Storage::url($event->selectedCaptain->photo_path) : null,
                    'role' => 'Captain',
                    'licenseType' => $event->selectedCaptain->license_type,
                    'yearsExperience' => $event->selectedCaptain->years_experience,
                ]);
            }

            // Secondary captains from hire agreements (for 2-captain charters)
            $agreementCaptains = $event->hireAgreements
                ->where('crew_role', 'captain')
                ->whereNotNull('captain_profile_id')
                ->where('captain_profile_id', '!=', $event->selected_captain_id)
                ->map(fn($a) => [
                    'id' => $a->captainProfile?->id,
                    'name' => $a->captainProfile?->full_name ?? 'Pending',
                    'photo' => $a->captainProfile?->photo_path ? Storage::url($a->captainProfile->photo_path) : null,
                    'role' => 'Captain',
                    'licenseType' => $a->captainProfile?->license_type,
                    'yearsExperience' => $a->captainProfile?->years_experience,
                ])
                ->filter(fn($c) => $c['id'] !== null)
                ->values();

            foreach ($agreementCaptains as $captain) {
                if ($captains->count() < 2) {
                    $captains->push($captain);
                }
            }

            // Selected deckhand
            $deckhand = null;
            if ($event->selectedDeckhand) {
                $deckhand = [
                    'id' => $event->selectedDeckhand->id,
                    'name' => $event->selectedDeckhand->full_name ?? 'Pending',
                    'photo' => $event->selectedDeckhand->photo_path ? Storage::url($event->selectedDeckhand->photo_path) : null,
                    'role' => 'Deckhand',
                    'yearsExperience' => $event->selectedDeckhand->years_experience,
                ];
            }

            // Get all signed agreements with download URLs
            $agreements = $event->hireAgreements
                ->filter(fn($a) => !is_null($a->pdf_path) && !is_null($a->charterer_signed_at))
                ->map(fn($a) => [
                    'id' => $a->id,
                    'name' => match ($a->crew_role) {
                        'owner' => 'Owner Charter Agreement — ' . ($a->ownerProfile?->full_name ?? 'Owner'),
                        'captain' => 'Captain Hire Agreement — ' . ($a->captainProfile?->full_name ?? 'Captain'),
                        'deckhand' => 'Deckhand Hire Agreement — ' . ($a->deckhandProfile?->full_name ?? 'Deckhand'),
                        default => 'Agreement'
                    },
                    'role' => $a->crew_role,
                    'downloadUrl' => url("/charterer/agreement/{$a->id}/download"),
                    'signedAt' => $a->charterer_signed_at?->toIso8601String(),
                    'fullySignedAt' => $a->fully_signed_at?->toIso8601String(),
                ])->values();

            // Determine available actions
            $canCancel = in_array($event->status, ['draft', 'awaiting_responses', 'confirmed']);
            $canComplete = $event->status === 'confirmed' && !is_null($event->completion_requested_at) && is_null($event->completed_at);
            $completionRequestedAt = $event->completion_requested_at?->toIso8601String();

            return [
                'id' => $event->id,
                'yachtName' => $vessel?->name ?? '—',
                'vesselType' => ucfirst($vessel?->vessel_type ?? '—'),
                'vesselLength' => $vessel?->length_ft ? $vessel->length_ft . ' ft' : '—',
                'confirmationCode' => $confirmationCode,
                'status' => $status,
                'statusLabel' => $statusLabel,
                'image' => $photo?->image_path ? Storage::url($photo->image_path) : null,
                'captains' => $captains->values()->toArray(),
                'deckhand' => $deckhand,
                'location' => $vessel ? trim(collect([$vessel->marina_name, $vessel->marina_city, $vessel->marina_state])->filter()->implode(', ')) : '—',
                'passengers' => $event->passengers ?? '—',
                'yachtCapacity' => $vessel?->passenger_capacity ?? '—',
                'date' => $event->charter_date?->format('F j, Y') ?? '—',
                'startTime' => $event->start_time ?? '—',
                'duration' => $durationHours,
                'completionRequestedAt' => $completionRequestedAt,
                'completedAt' => $event->completed_at?->toIso8601String(),
                'time' => $timeLabel,
                'totalPaid' => $totalPaid > 0 ? '$' . number_format($totalPaid, 0) : '—',
                'rating' => null,
                'agreements' => $agreements,
                'canCancel' => $canCancel,
                'canComplete' => $canComplete,
                'checkCharterUrl' => route('charterer.check-charter', $event),
            ];
        })->values()->toArray();

        return Inertia::render('my-booking', [
            'bookings' => $bookings,
            'filters' => $this->buildFilters($bookings),
        ]);
    }

    public function show(CharterEvent $charterEvent): Response
    {
        return Inertia::render('my-booking/show', [
            'booking' => [
                'id' => $charterEvent->id,
                'yachtName' => $charterEvent->vessel?->name ?? '—',
                'status' => $charterEvent->status,
                'passengerCapacity' => $charterEvent->vessel?->passenger_capacity ?? '—',
                'charterPeople' => $charterEvent->passengers ?? '—',
            ],
        ]);
    }

    public function checkCharter(CharterEvent $charterEvent): Response
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        // Verify this charter belongs to the authenticated charterer
        if ($charterEvent->charterer_id !== $charterer->id) {
            abort(403, 'Unauthorized.');
        }

        $charterEvent->load([
            'vessel.photos',
            'selectedCaptain',
            'selectedDeckhand',
            'hireAgreements.captainProfile',
            'hireAgreements.deckhandProfile',
            'hireAgreements.ownerProfile',
        ]);

        $vessel = $charterEvent->vessel;
        $photo = $vessel?->photos->first();

        // Build captains array (up to 2)
        $captains = collect();

        if ($charterEvent->selectedCaptain) {
            $captains->push([
                'id' => $charterEvent->selectedCaptain->id,
                'name' => $charterEvent->selectedCaptain->full_name ?? 'Pending',
                'photo' => $charterEvent->selectedCaptain->photo_path ? Storage::url($charterEvent->selectedCaptain->photo_path) : null,
                'role' => 'Captain',
                'licenseType' => $charterEvent->selectedCaptain->license_type,
                'yearsExperience' => $charterEvent->selectedCaptain->years_experience,
                'hourlyRate' => $charterEvent->selectedCaptain->hourly_rate,
            ]);
        }

        $agreementCaptains = $charterEvent->hireAgreements
            ->where('crew_role', 'captain')
            ->whereNotNull('captain_profile_id')
            ->where('captain_profile_id', '!=', $charterEvent->selected_captain_id)
            ->map(fn($a) => [
                'id' => $a->captainProfile?->id,
                'name' => $a->captainProfile?->full_name ?? 'Pending',
                'photo' => $a->captainProfile?->photo_path ? Storage::url($a->captainProfile->photo_path) : null,
                'role' => 'Captain',
                'licenseType' => $a->captainProfile?->license_type,
                'yearsExperience' => $a->captainProfile?->years_experience,
                'hourlyRate' => $a->captainProfile?->hourly_rate,
            ])
            ->filter(fn($c) => $c['id'] !== null)
            ->values();

        foreach ($agreementCaptains as $captain) {
            if ($captains->count() < 2) {
                $captains->push($captain);
            }
        }

        // Deckhand
        $deckhand = null;
        if ($charterEvent->selectedDeckhand) {
            $deckhand = [
                'id' => $charterEvent->selectedDeckhand->id,
                'name' => $charterEvent->selectedDeckhand->full_name ?? 'Pending',
                'photo' => $charterEvent->selectedDeckhand->photo_path ? Storage::url($charterEvent->selectedDeckhand->photo_path) : null,
                'role' => 'Deckhand',
                'yearsExperience' => $charterEvent->selectedDeckhand->years_experience,
                'hourlyRate' => $charterEvent->selectedDeckhand->hourly_rate,
            ];
        }

        // Agreements
        $agreements = $charterEvent->hireAgreements
            ->filter(fn($a) => !is_null($a->pdf_path))
            ->map(fn($a) => [
                'id' => $a->id,
                'name' => match ($a->crew_role) {
                    'owner' => 'Owner Charter Agreement — ' . ($a->ownerProfile?->full_name ?? 'Owner'),
                    'captain' => 'Captain Hire Agreement — ' . ($a->captainProfile?->full_name ?? 'Captain'),
                    'deckhand' => 'Deckhand Hire Agreement — ' . ($a->deckhandProfile?->full_name ?? 'Deckhand'),
                    default => 'Agreement'
                },
                'role' => $a->crew_role,
                'downloadUrl' => url("/charterer/agreement/{$a->id}/download"),
                'signedAt' => $a->charterer_signed_at?->toIso8601String(),
                'fullySignedAt' => $a->fully_signed_at?->toIso8601String(),
                'signStatus' => $a->sign_status,
            ])->values();

        $canCancel = in_array($charterEvent->status, ['draft', 'awaiting_responses', 'confirmed']);
        $canComplete = $charterEvent->status === 'confirmed' && !is_null($charterEvent->completion_requested_at) && is_null($charterEvent->completed_at);
        // dd($charterEvent);
        return Inertia::render('charterer/check-charter', [
            'charter' => [
                'id' => $charterEvent->id,
                'yachtName' => $vessel?->name ?? '—',
                'vesselType' => ucfirst($vessel?->vessel_type ?? '—'),
                'vesselLength' => $vessel?->length_ft ? $vessel->length_ft . ' ft' : '—',
                'image' => $photo?->image_path ? Storage::url($photo->image_path) : null,
                'status' => $charterEvent->status,
                'statusLabel' => match ($charterEvent->status) {
                    'completed' => 'Completed',
                    'confirmed' => 'Confirmed',
                    'cancelled' => 'Cancelled',
                    'agreements_signed' => 'Agreements Signed',
                    'awaiting_responses' => 'Awaiting Crew Responses',
                    'draft' => 'Draft',
                    default => ucfirst($charterEvent->status),
                },
                'date' => $charterEvent->charter_date?->format('F j, Y') ?? '—',
                'startTime' => $charterEvent->start_time ?? '—',
                'duration' => $charterEvent->duration_minutes ? round($charterEvent->duration_minutes / 60, 1) : 0,
                'location' => $vessel ? trim(collect([$vessel->marina_name, $vessel->marina_city, $vessel->marina_state])->filter()->implode(', ')) : '—',
                'passengers' => $charterEvent->passengers ?? '—',
                'specialNotes' => $charterEvent->special_notes,
                'captains' => $captains->values()->toArray(),
                'deckhand' => $deckhand,
                'agreements' => $agreements,
                'canCancel' => $canCancel,
                'canComplete' => $canComplete,
                'completionRequestedAt' => $charterEvent->completion_requested_at?->toIso8601String(),
                'completedAt' => $charterEvent->completed_at?->toIso8601String(),
            ],
        ]);
    }

    private function buildFilters(array $bookings): array
    {
        $total = count($bookings);
        $upcoming = count(array_filter($bookings, fn($b) => in_array($b['status'], ['pending', 'confirmed'])));
        $completed = count(array_filter($bookings, fn($b) => $b['status'] === 'completed'));
        return [
            ['id' => 'all', 'label' => 'All Bookings', 'count' => $total, 'active' => true],
            ['id' => 'upcoming', 'label' => 'Upcoming', 'count' => $upcoming, 'active' => false],
            ['id' => 'completed', 'label' => 'Completed', 'count' => $completed, 'active' => false],
        ];
    }

    public function confirmCompletion(string $id): RedirectResponse
    {
        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->firstOrFail();
        $event = \App\Models\CharterEvent::where('id', $id)
            ->where('charterer_id', $charterer->id)
            ->where('status', 'confirmed')
            ->whereNotNull('completion_requested_at')
            ->firstOrFail();

        $event->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        $notification = new \App\Notifications\CharterCompletedNotification($event);

        if ($event->vessel && $event->vessel->owner && $event->vessel->owner->user) {
            $event->vessel->owner->user->notify($notification);
        }

        foreach ($event->crewResponses->where('crew_role', 'captain')->where('response', 'available') as $response) {
            if ($response->captainProfile && $response->captainProfile->user) {
                $response->captainProfile->user->notify($notification);
            }
        }

        $deckhand = $event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first();
        if ($deckhand && $deckhand->deckhandProfile && $deckhand->deckhandProfile->user) {
            $deckhand->deckhandProfile->user->notify($notification);
        }

        return back()->with('success', 'Charter marked as completed. Earnings released.');
    }

    public function declineCompletion(string $id): RedirectResponse
    {
        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->firstOrFail();
        $event = \App\Models\CharterEvent::where('id', $id)
            ->where('charterer_id', $charterer->id)
            ->whereNotNull('completion_requested_at')
            ->firstOrFail();

        $event->update(['completion_requested_at' => null]);

        if ($event->vessel && $event->vessel->owner && $event->vessel->owner->user) {
            $event->vessel->owner->user->notify(new \App\Notifications\CharterCompletionDeclinedNotification($event));
        }

        return back()->with('success', 'Completion request declined.');
    }

    public function cancel(string $id): RedirectResponse
    {
        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->firstOrFail();
        $event = \App\Models\CharterEvent::where('id', $id)
            ->where('charterer_id', $charterer->id)
            ->whereIn('status', ['draft', 'awaiting_responses', 'confirmed'])
            ->firstOrFail();

        $event->update(['status' => 'cancelled']);

        return back()->with('success', 'Charter cancelled successfully.');
    }
}

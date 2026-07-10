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
                'payments',
                'hireAgreements', 
            ])
            ->latest('charter_date')
            ->get();

        $bookings = $events->map(function (CharterEvent $event) {
            $vessel = $event->vessel;
            $photo = $vessel?->photos->first();
            $captain = $event->selectedCaptain;

            $totalPaid = $event->payments
                ->where('status', 'succeeded')
                ->sum('amount');

            $confirmationCode = 'CM-' . strtoupper(substr($event->id, 0, 8));

            $status = match ($event->status) {
                'completed' => 'completed',
                'confirmed' => 'confirmed',
                'pendingPayment' => 'pendingPayment',
                default => 'awaitingCaptainResponse',
            };

            $statusLabel = match ($event->status) {
                'completed' => 'Completed',
                'confirmed' => 'Confirmed',
                'pendingPayment' => 'Pending Payment',
                default => 'Awaiting Captain Response',
            };

            $durationHours = $event->duration_minutes
                ? round($event->duration_minutes / 60, 1)
                : 0;

            $timeLabel = $event->start_time && $durationHours
                ? $event->start_time . ' · ' . $durationHours . ' hrs'
                : ($event->start_time ?? '—');

            return [
                'id' => $event->id,
                'yachtName' => $vessel?->name ?? '—',
                'confirmationCode' => $confirmationCode,
                'status' => $status,
                'statusLabel' => $statusLabel,
                'image' => $photo?->image_path ? Storage::url($photo->image_path) : null,
                'captainName' => $captain?->full_name ?? 'Pending Assignment',
                'captainAvatar' => $captain?->photo_path ? Storage::url($captain->photo_path) : null,
                'location' => $vessel ? trim(collect([$vessel->marina_name, $vessel->marina_city, $vessel->marina_state])->filter()->implode(', ')) : '—',
                'passengers' => $event->passengers ?? '—',
                'yachtCapacity' => $vessel?->passenger_capacity ?? '—',
                'date' => $event->charter_date?->format('F j, Y') ?? '—',
                'completionRequestedAt' => $event->completion_requested_at?->toIso8601String(),
                'completedAt' => $event->completed_at?->toIso8601String(),
                'time' => $timeLabel,
                'totalPaid' => $totalPaid > 0 ? '$' . number_format($totalPaid, 0) : '—',
                'rating' => null,
                'agreements' => $event->hireAgreements
                    ->filter(fn($a) => !is_null($a->pdf_path) && !is_null($a->charterer_signed_at))
                    ->map(fn($a) => [
                        'id' => $a->id,
                        'name' => match($a->agreement_type) {
                            'bareboat' => 'Owner Charter Agreement',
                            'captain_hire' => 'Captain Hire Agreement',
                            default => 'Agreement'
                        },
                        'downloadUrl' => url("/charterer/agreement/{$a->id}/download"),
                    ])->values()
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

    private function buildFilters(array $bookings): array
    {
        $total = count($bookings);
        $upcoming = count(array_filter($bookings, fn($b) => in_array($b['status'], ['awaitingCaptainResponse', 'pendingPayment', 'confirmed'])));
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
}
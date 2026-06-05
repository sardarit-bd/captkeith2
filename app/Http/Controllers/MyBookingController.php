<?php

namespace App\Http\Controllers;

use App\Models\CharterEvent;
use App\Models\ChartererProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MyBookingController extends Controller
{
    public function index(Request $request): Response
    {
        // Fixed: 'userId' -> 'user_id'
        $profile = ChartererProfile::where('user_id', $request->user()->id)->first();

        if (!$profile) {
            return Inertia::render('my-booking', [
                'bookings' => [],
                'filters' => $this->buildFilters([]),
            ]);
        }

        // Fixed: 'chartererId' -> 'charterer_id', 'deletedAt' -> 'deleted_at', 
        // 'displayOrder' -> 'display_order', 'charterDate' -> 'charter_date'
        $events = CharterEvent::where('charterer_id', $profile->id)
            ->whereNull('deleted_at')
            ->with([
                'vessel.photos' => fn($q) => $q->orderBy('display_order'),
                'selectedCaptain',
                'payments',
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

            // Fixed: 'durationMinutes' -> 'duration_minutes', 'startTime' -> 'start_time'
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
                // Fixed: 'imagePath' -> 'image_path'
                'image' => $photo?->image_path ? Storage::url($photo->image_path) : null,
                // Fixed: 'fullName' -> 'full_name', 'photoPath' -> 'photo_path'
                'captainName' => $captain?->full_name ?? 'Pending Assignment',
                'captainAvatar' => $captain?->photo_path ? Storage::url($captain->photo_path) : null,
                // Fixed: 'marinaName' -> 'marina_name', etc.
                'location' => $vessel ? trim(collect([$vessel->marina_name, $vessel->marina_city, $vessel->marina_state])->filter()->implode(', ')) : '—',
                'passengers' => $event->passengers ?? '—',
                // Fixed: 'passengerCapacity' -> 'passenger_capacity'
                'yachtCapacity' => $vessel?->passenger_capacity ?? '—',
                // Fixed: 'charterDate' -> 'charter_date'
                'date' => $event->charter_date?->format('F j, Y') ?? '—',
                'time' => $timeLabel,
                'totalPaid' => $totalPaid > 0 ? '$' . number_format($totalPaid, 0) : '—',
                'rating' => null,
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
                // Fixed: 'passengerCapacity' -> 'passenger_capacity'
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
}
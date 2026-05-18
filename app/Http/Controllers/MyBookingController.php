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
        $profile = ChartererProfile::where('user_id', $request->user()->id)->first();

        if (! $profile) {
            return Inertia::render('my-booking', [
                'bookings' => [],
                'filters'  => $this->buildFilters([]),
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
            $vessel  = $event->vessel;
            $photo   = $vessel?->photos->first();
            $captain = $event->selectedCaptain;

            $totalPaid = $event->payments
                ->where('status', 'succeeded')
                ->sum('amount');


            $confirmationCode = 'CM-' . strtoupper(substr($event->id, 0, 8));


            $status = match ($event->status) {
                'completed'           => 'completed',
                'confirmed', 'booked' => 'confirmed',
                default               => 'pending',
            };

            $statusLabel = match ($event->status) {
                'completed' => 'Completed',
                'confirmed' => 'Confirmed',
                'booked'    => 'Booked',
                'pending'   => 'Pending Captain',
                'draft'     => 'Draft',
                default     => ucfirst($event->status),
            };

            $durationHours = $event->duration_minutes
                ? round($event->duration_minutes / 60, 1)
                : 0;

            $timeLabel = $event->start_time && $durationHours
                ? $event->start_time . ' · ' . $durationHours . ' hrs'
                : ($event->start_time ?? '—');


            $actions = match ($event->status) {
                'completed' => [
                    ['id' => 'download-contract', 'label' => 'Download Contract', 'icon' => 'download'],
                    ['id' => 'book-again',         'label' => 'Book Again',        'icon' => 'refresh-cw'],
                ],
                'confirmed', 'booked' => [
                    ['id' => 'download-contract', 'label' => 'Download Contract', 'icon' => 'download'],
                    ['id' => 'view-details',       'label' => 'View Details',      'icon' => 'arrow-right'],
                ],
                default => [
                    ['id' => 'contact-captain', 'label' => 'Contact Captain', 'icon' => 'message-square'],
                    ['id' => 'view-details',     'label' => 'View Details',    'icon' => 'arrow-right'],
                ],
            };

            return [
                'id'               => $event->id,
                'yachtName'        => $vessel?->name ?? '—',
                'confirmationCode' => $confirmationCode,
                'status'           => $status,
                'statusLabel'      => $statusLabel,
                'image'            => $photo?->image_path
                    ? Storage::url($photo->image_path)
                    : null,
                'captainName'      => $captain?->full_name ?? 'Pending Assignment',
                'captainAvatar'    => $captain?->photo_path
                    ? Storage::url($captain->photo_path)
                    : null,
                'location'         => $vessel
                    ? trim(collect([$vessel->marina_name, $vessel->marina_city, $vessel->marina_state])->filter()->implode(', '))
                    : '—',
                'passengers'       => '—',
                'coverage'         => '—',
                'date'             => $event->charter_date?->format('F j, Y') ?? '—',
                'time'             => $timeLabel,
                'totalPaid'        => $totalPaid > 0
                    ? '$' . number_format($totalPaid, 0)
                    : '—',
                'rating'           => null,
                'actions'          => $actions,
            ];
        })->values()->toArray();

        return Inertia::render('my-booking', [
            'bookings' => $bookings,
            'filters'  => $this->buildFilters($bookings),
        ]);
    }

    /**
     * @param array<int, array<string, mixed>> $bookings
     * @return array<int, array<string, mixed>>
     */
    private function buildFilters(array $bookings): array
    {
        $total     = count($bookings);
        $upcoming  = count(array_filter($bookings, fn($b) => in_array($b['status'], ['pending', 'confirmed'])));
        $completed = count(array_filter($bookings, fn($b) => $b['status'] === 'completed'));

        return [
            ['id' => 'all',       'label' => 'All Bookings', 'count' => $total,     'active' => true],
            ['id' => 'upcoming',  'label' => 'Upcoming',     'count' => $upcoming,  'active' => false],
            ['id' => 'completed', 'label' => 'Completed',    'count' => $completed, 'active' => false],
        ];
    }
}

<?php

namespace App\Services\Dashboard\Strategies;

use App\DataTransferObjects\DashboardViewData;
use App\Models\CharterEvent;
use App\Models\ChartererProfile;
use App\Models\User;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\Concerns\AuthorizesDashboardAccess;
use Illuminate\Support\Facades\Storage;

class ChartererDashboardStrategy implements DashboardStrategy
{
    use AuthorizesDashboardAccess;

    public function supports(User $user): bool
    {
        return $user->hasRole('charterer');
    }

    public function resolve(User $user): DashboardViewData
    {
        $this->ensurePermission($user, 'dashboard.charterer.view');

        $profile = ChartererProfile::where('user_id', $user->id)->first();

        if (! $profile) {
            return new DashboardViewData('dashboard', [
                'dashboard' => [
                    'role'            => 'charterer',
                    'stats'           => $this->emptyStats(),
                    'upcomingBooking' => null,
                    'recentActivity'  => [],
                    'completedCharters' => [],
                ],
            ]);
        }

        $allEvents = CharterEvent::where('charterer_id', $profile->id)
            ->whereNull('deleted_at')
            ->with(['vessel.photos', 'selectedCaptain'])
            ->latest('charter_date')
            ->get();

        $upcoming = $allEvents
            ->whereIn('status', ['confirmed', 'booked', 'pending'])
            ->where('charter_date', '>=', now()->startOfDay())
            ->sortBy('charter_date')
            ->first();

        $completed = $allEvents
            ->where('status', 'completed')
            ->take(4);

        $totalBooked    = $allEvents->whereIn('status', ['confirmed', 'booked'])->count();
        $totalCompleted = $allEvents->where('status', 'completed')->count();
        $totalPending   = $allEvents->where('status', 'pending')->count();
        $totalSpent     = 0; // extend when payments are tracked

        $upcomingBooking = null;
        if ($upcoming) {
            $vessel = $upcoming->vessel;
            $photo  = $vessel?->photos->first();

            $upcomingBooking = [
                'id'            => $upcoming->id,
                'yachtName'     => $vessel?->name ?? '—',
                'yachtImage'    => $photo?->image_path ? Storage::url($photo->image_path) : null,
                'status'        => $upcoming->status,
                'date'          => $upcoming->charter_date?->format('M d, Y') ?? '—',
                'startTime'     => $upcoming->start_time ?? '—',
                'duration'      => $upcoming->duration_minutes
                    ? round($upcoming->duration_minutes / 60, 1) . ' hrs'
                    : '—',
                'marina'        => $vessel
                    ? trim(collect([$vessel->marina_name, $vessel->marina_city, $vessel->marina_state])->filter()->implode(', '))
                    : '—',
                'captainName'   => $upcoming->selectedCaptain?->full_name ?? null,
            ];
        }

        $completedCharters = $completed->map(function (CharterEvent $event) {
            return [
                'id'         => $event->id,
                'yachtName'  => $event->vessel?->name ?? '—',
                'captain'    => $event->selectedCaptain?->full_name ?? 'No captain assigned',
                'date'       => $event->charter_date?->format('M d, Y') ?? '—',
                'rating'     => 5, // extend when ratings are tracked
            ];
        })->values()->toArray();

        // Recent activity — last 5 events ordered by updated_at
        $recentActivity = $allEvents
            ->sortByDesc('updated_at')
            ->take(5)
            ->map(function (CharterEvent $event) {
                $statusLabels = [
                    'draft'     => 'Charter created',
                    'pending'   => 'Awaiting confirmation',
                    'confirmed' => 'Charter confirmed',
                    'booked'    => 'Charter booked',
                    'completed' => 'Charter completed',
                    'cancelled' => 'Charter cancelled',
                ];

                return [
                    'id'          => $event->id,
                    'title'       => $event->vessel?->name ?? '—',
                    'description' => $statusLabels[$event->status] ?? ucfirst($event->status),
                    'timestamp'   => $event->updated_at?->diffForHumans() ?? '—',
                    'status'      => $event->status,
                ];
            })->values()->toArray();

        return new DashboardViewData('dashboard', [
            'dashboard' => [
                'role' => 'charterer',
                'stats' => [
                    'totalBooked'    => $totalBooked,
                    'totalCompleted' => $totalCompleted,
                    'totalPending'   => $totalPending,
                    'totalSpent'     => $totalSpent,
                ],
                'upcomingBooking'    => $upcomingBooking,
                'recentActivity'     => $recentActivity,
                'completedCharters'  => $completedCharters,
            ],
        ]);
    }

    /**
     * @return array<string, int>
     */
    private function emptyStats(): array
    {
        return [
            'totalBooked'    => 0,
            'totalCompleted' => 0,
            'totalPending'   => 0,
            'totalSpent'     => 0,
        ];
    }
}

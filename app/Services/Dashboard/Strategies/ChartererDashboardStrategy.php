<?php

namespace App\Services\Dashboard\Strategies;

use App\DataTransferObjects\DashboardViewData;
use App\Models\CharterEvent;
use App\Models\ChartererProfile;
use App\Models\User;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\Concerns\AuthorizesDashboardAccess;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ChartererDashboardStrategy implements DashboardStrategy
{
    use AuthorizesDashboardAccess;


    private const ACTIVE_STATUSES = [
        'awaiting_responses',
        'ready_for_charterer',
        'captain_selected',
        'agreements_pending',
        'agreements_signed',
        'insurance_pending',
        'insurance_complete',
    ];

 
    private const PENDING_STATUSES = [
        'ready_for_charterer',
        'agreements_pending',
        'insurance_pending',
    ];


    private const UPCOMING_STATUSES = [
        'awaiting_responses',
        'ready_for_charterer',
        'captain_selected',
        'agreements_pending',
        'agreements_signed',
        'insurance_pending',
        'insurance_complete',
    ];

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
                    'role'               => 'charterer',
                    'stats'              => $this->emptyStats(),
                    'upcomingBooking'    => null,
                    'recentActivity'     => [],
                    'completedCharters'  => [],
                ],
            ]);
        }

        $allEvents = CharterEvent::where('charterer_id', $profile->id)
            ->whereNull('deleted_at')
            ->with(['vessel.photos', 'selectedCaptain', 'selectedDeckhand'])
            ->latest('updated_at')
            ->get();

  
        $upcoming = $allEvents
            ->whereIn('status', self::UPCOMING_STATUSES)
            ->filter(fn(CharterEvent $e) => $e->charter_date?->gte(now()->startOfDay()))
            ->sortBy('charter_date')
            ->first();

        $completed = $allEvents
            ->where('status', 'completed')
            ->take(4);

        $totalBooked    = $allEvents->whereIn('status', self::ACTIVE_STATUSES)->count();
        $totalCompleted = $allEvents->where('status', 'completed')->count();
        $totalPending   = $allEvents->whereIn('status', self::PENDING_STATUSES)->count();
        $totalSpent     = 0; 

        $upcomingBooking = null;
        if ($upcoming) {
            $vessel = $upcoming->vessel;
            $photo  = $vessel?->photos->first();

            $deckhandInfo = null;
            
       
            if ($upcoming->selected_deckhand_id && $upcoming->selectedDeckhand) {
                $dProfile = $upcoming->selectedDeckhand;
                
         
                $deckhandResponse = \App\Models\CharterCrewResponse::where('charter_event_id', $upcoming->id)
                    ->where('profile_id', $dProfile->id)
                    ->where('crew_role', 'deckhand')
                    ->with(['selectingCaptain'])
                    ->first();
                
                $deckhandInfo = [
                    'name'       => $dProfile->full_name ?? '—',
                    'experience' => $dProfile->years_experience ? $dProfile->years_experience . ' years experience' : '—',
                    'rate'       => $dProfile->hourly_rate ? '$' . number_format($dProfile->hourly_rate, 0) . '/hr' : '—',
                    'selectedBy' => $deckhandResponse?->selectingCaptain?->full_name ?? 'Unknown Captain',
                ];
            } else {
            
                $deckhandResponse = \App\Models\CharterCrewResponse::where('charter_event_id', $upcoming->id)
                    ->where('crew_role', 'deckhand')
                    ->with(['deckhandProfile', 'selectingCaptain'])
                    ->first();

                if ($deckhandResponse && $deckhandResponse->deckhandProfile) {
                    $dProfile = $deckhandResponse->deckhandProfile;
                    $deckhandInfo = [
                        'name'       => $dProfile->full_name ?? '—',
                        'experience' => $dProfile->years_experience ? $dProfile->years_experience . ' years experience' : '—',
                        'rate'       => $dProfile->hourly_rate ? '$' . number_format($dProfile->hourly_rate, 0) . '/hr' : '—',
                        'selectedBy' => $deckhandResponse->selectingCaptain?->full_name ?? 'Unknown Captain',
                    ];
                }
            }

            $upcomingBooking = [
                'id'          => $upcoming->id,
                'yachtName'   => $vessel?->name ?? '—',
                'yachtImage'  => $photo?->image_path ? Storage::url($photo->image_path) : null,
                'status'      => $upcoming->status,
                'statusLabel' => $this->statusLabel($upcoming->status),
                'date'        => $upcoming->charter_date?->format('M d, Y') ?? '—',
                'startTime'   => $upcoming->start_time ? Carbon::parse($upcoming->start_time)->format('g:i A') : '—',
                'duration'    => $upcoming->duration_minutes ? round($upcoming->duration_minutes / 60, 1) . ' hrs' : '—',
                'marina'      => $vessel
                    ? trim(
                        collect([
                            $vessel->marina_name,
                            $vessel->marina_city,
                            $vessel->marina_state,
                        ])->filter()->implode(', ')
                    )
                    : '—',
                'captainName' => $upcoming->selectedCaptain?->full_name ?? null,
                'deckhand'    => $deckhandInfo, 
            ];
        }

        $completedCharters = $completed->map(function (CharterEvent $event) {
            return [
                'id'        => $event->id,
                'yachtName' => $event->vessel?->name ?? '—',
                'captain'   => $event->selectedCaptain?->full_name ?? 'No captain assigned',
                'date'      => $event->charter_date?->format('M d, Y') ?? '—',
                'rating'    => 5, 
            ];
        })->values()->toArray();

        $recentActivity = $allEvents
            ->sortByDesc('updated_at')
            ->take(5)
            ->map(function (CharterEvent $event) {
                return [
                    'id'          => $event->id,
                    'title'       => $event->vessel?->name ?? '—',
                    'description' => $this->statusLabel($event->status),
                    'timestamp'   => $event->updated_at?->diffForHumans() ?? '—',
                    'status'      => $event->status,
                ];
            })->values()->toArray();

        return new DashboardViewData('dashboard', [
            'dashboard' => [
                'role'               => 'charterer',
                'stats'              => [
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

    private function statusLabel(string $status): string
    {
        return match ($status) {
            'draft'               => 'Charter created',
            'awaiting_responses'  => 'Awaiting crew responses',
            'ready_for_charterer' => 'Ready — select your captain',
            'captain_selected'    => 'Captain selected',
            'agreements_pending'  => 'Agreements pending signature',
            'agreements_signed'   => 'Agreements signed',
            'insurance_pending'   => 'Insurance verification pending',
            'insurance_complete'  => 'Insurance verified',
            'completed'           => 'Charter completed',
            'cancelled'           => 'Charter cancelled',
            default               => ucfirst(str_replace('_', ' ', $status)),
        };
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

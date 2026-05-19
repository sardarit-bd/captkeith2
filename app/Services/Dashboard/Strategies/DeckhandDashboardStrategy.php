<?php

namespace App\Services\Dashboard\Strategies;

use App\DataTransferObjects\DashboardViewData;
use App\Models\CharterCrewResponse;
use App\Models\CharterEvent;
use App\Models\DeckhandProfile;
use App\Models\Message;
use App\Models\User;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\Concerns\AuthorizesDashboardAccess;
use Carbon\Carbon;

class DeckhandDashboardStrategy implements DashboardStrategy
{
    use AuthorizesDashboardAccess;


    private const CONFIRMED_STATUSES = [
        'agreements_signed',
        'insurance_pending',
        'insurance_complete',
    ];

    public function supports(User $user): bool
    {
        return $user->hasRole('deckhand');
    }

    public function resolve(User $user): DashboardViewData
    {
        $this->ensurePermission($user, 'dashboard.deckhand.view');

        $profile = DeckhandProfile::where('user_id', $user->id)->first();

        if (! $profile) {
            return new DashboardViewData('dashboard', [
                'dashboard' => [
                    'role'               => 'deckhand',
                    'stats'              => $this->emptyStats(),
                    'pendingRequests'    => [],
                    'confirmedCharters'  => [],
                    'recentMessages'     => [],
                ],
            ]);
        }


        $pendingResponses = CharterCrewResponse::where('profile_id', $profile->id)
            ->where('crew_role', 'deckhand')
            ->where('response', 'pending')
            ->with([
                'charterEvent.vessel.photos',
                'charterEvent.selectedCaptain',
            ])
            ->latest()
            ->get();

        $pendingRequests = $pendingResponses
            ->map(function (CharterCrewResponse $crewResponse) use ($profile) {
                $event  = $crewResponse->charterEvent;
                $vessel = $event?->vessel;

                $skills = [];
                if ($profile->has_server_experience) {
                    $skills[] = 'Server Experience';
                }
                if ($profile->has_bartending_experience) {
                    $skills[] = 'Bartending Experience';
                }
                if ($profile->years_experience >= 3) {
                    $skills[] = $profile->years_experience . '+ Years Experience';
                }

                $requestedBy   = $event?->selectedCaptain;
                $requesterName = $requestedBy?->full_name ?? $vessel?->owner?->full_name ?? '—';
                $requesterRole = $requestedBy ? 'Captain' : 'Owner';

                return [
                    'id'            => $crewResponse->id,
                    'yachtName'     => $vessel?->name ?? '—',
                    'requestedBy'   => $requesterName,
                    'requesterRole' => $requesterRole,
                    'yachtType'     => $vessel?->vessel_type ?? '—',
                    'yachtLength'   => $vessel?->length_ft ? (int) $vessel->length_ft . 'ft' : null,
                    'duration'      => $event?->duration_minutes
                        ? round($event->duration_minutes / 60, 1) . ' hrs'
                        : '—',
                    'skills'        => $skills,
                    'date'          => $event?->charter_date?->format('M d, Y') ?? '—',
                    'startTime'     => $event?->start_time
                        ? Carbon::parse($event->start_time)->format('g:i A')
                        : '—',
                    'rate'          => $profile->hourly_rate
                        ? '$' . number_format((float) $profile->hourly_rate, 0) . '/hour'
                        : '—',
                ];
            })
            ->values()
            ->toArray();


        $confirmedEvents = CharterEvent::where('selected_deckhand_id', $profile->id)
            ->whereIn('status', self::CONFIRMED_STATUSES)
            ->where('charter_date', '>=', now()->startOfDay())
            ->with(['vessel.photos', 'selectedCaptain'])
            ->orderBy('charter_date')
            ->get();

        $confirmedCharters = $confirmedEvents
            ->map(function (CharterEvent $event) use ($profile) {
                $vessel  = $event->vessel;
                $captain = $event->selectedCaptain;

                $marina = $vessel
                    ? trim(
                        collect([
                            $vessel->marina_name,
                            $vessel->marina_city,
                            $vessel->marina_state,
                        ])->filter()->implode(', ')
                    )
                    : '—';

                return [
                    'id'           => $event->id,
                    'yachtName'    => $vessel?->name ?? '—',
                    'captainName'  => $captain?->full_name ?? null,
                    'yachtType'    => $vessel?->vessel_type ?? '—',
                    'yachtLength'  => $vessel?->length_ft ? (int) $vessel->length_ft . 'ft' : null,
                    'marina'       => $marina,
                    'date'         => $event->charter_date?->format('M d, Y') ?? '—',
                    'startTime'    => $event->start_time
                        ? Carbon::parse($event->start_time)->format('g:i A')
                        : '—',
                    'duration'     => $event->duration_minutes
                        ? round($event->duration_minutes / 60, 1) . ' hrs'
                        : '—',
                    'rate'         => $profile->hourly_rate
                        ? '$' . number_format((float) $profile->hourly_rate, 0) . '/hour'
                        : '—',
                ];
            })
            ->values()
            ->toArray();


        $messages = Message::where('receiver_id', $user->id)
            ->whereNull('deleted_at')
            ->with('sender')
            ->latest()
            ->take(5)
            ->get();

        $recentMessages = $messages
            ->map(function (Message $message) {
                $sender     = $message->sender;
                $senderRole = $sender?->getRoleNames()->first() ?? 'user';


                $roleLabel = match ($senderRole) {
                    'owner'     => 'Owner',
                    'captain'   => 'Captain',
                    'deckhand'  => 'Deckhand',
                    'charterer' => 'Charterer',
                    default     => ucfirst($senderRole),
                };

                return [
                    'id'       => $message->id,
                    'sender'   => $sender?->name ?? '—',
                    'role'     => $roleLabel,
                    'body'     => $message->body,
                    'time'     => $message->created_at?->diffForHumans() ?? '—',
                    'unread'   => ! $message->isRead(),
                ];
            })
            ->values()
            ->toArray();


        $unreadCount = Message::where('receiver_id', $user->id)
            ->whereNull('read_at')
            ->whereNull('deleted_at')
            ->count();

        $stats = [
            'pendingRequests'   => count($pendingRequests),
            'confirmedCharters' => count($confirmedCharters),
            'unreadMessages'    => $unreadCount,
            'profileActive'     => true,
        ];

        return new DashboardViewData('dashboard', [
            'dashboard' => [
                'role'              => 'deckhand',
                'stats'             => $stats,
                'pendingRequests'   => $pendingRequests,
                'confirmedCharters' => $confirmedCharters,
                'recentMessages'    => $recentMessages,
            ],
        ]);
    }

    /**
     * @return array<string, int|bool>
     */
    private function emptyStats(): array
    {
        return [
            'pendingRequests'   => 0,
            'confirmedCharters' => 0,
            'unreadMessages'    => 0,
            'profileActive'     => true,
        ];
    }
}

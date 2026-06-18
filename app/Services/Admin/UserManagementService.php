<?php

namespace App\Services\Admin;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class UserManagementService
{
    public function getUsers(array $filters = []): array
    {
        $query = User::with(['ownerProfile', 'captainProfile', 'deckhandProfile', 'chartererProfile'])
            ->when($filters['search'] ?? null, function (Builder $q, string $search) {
                $q->where(function (Builder $sub) use ($search) {
                    $sub->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($filters['role'] ?? null, function (Builder $q, string $role) {
                if ($role !== 'all') {
                    // Assuming you have a 'role' column or use Spatie permissions
                    // Adjust based on your actual role implementation
                    $q->whereHas('roles', fn(Builder $r) => $r->where('name', $role));
                }
            })
            ->when($filters['status'] ?? null, function (Builder $q, string $status) {
                if ($status !== 'all') {
                    $q->where('status', $status);
                }
            });

        $total = $query->count();
        
        $users = $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 10)
            ->through(fn(User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->profile_photo_url ?? null,
                'initials' => strtoupper(substr($user->name, 0, 2)),
                'role' => $this->getPrimaryRole($user),
                'status' => $user->status ?? 'active',
                'key_details' => $this->getKeyDetails($user),
                'joined' => $user->created_at->format('M d, Y'),
            ]);

        return [
            'users' => $users,
            'total' => $total,
            'filters' => [
                'roles' => ['Captain', 'Owner', 'Deckhand', 'Charterer'],
                'statuses' => ['Active', 'Verified', 'Pending Review', 'Suspended'],
            ],
        ];
    }

    private function getPrimaryRole(User $user): string
    {
        // Logic to determine primary role based on profiles or roles table
        if ($user->captainProfile) return 'Captain';
        if ($user->ownerProfile) return 'Owner';
        if ($user->deckhandProfile) return 'Deckhand';
        if ($user->chartererProfile) return 'Charterer';
        return 'User';
    }

    private function getKeyDetails(User $user): array
    {
        $details = [];
        
        if ($user->captainProfile) {
            $details[] = $user->captainProfile->license_type ?? 'License Pending';
            if ($user->captainProfile->endorsement) {
                $details[] = $user->captainProfile->endorsement;
            }
        } elseif ($user->ownerProfile) {
            $vesselCount = $user->ownerProfile->vessels()->count();
            $details[] = "{$vesselCount} Vessel" . ($vesselCount !== 1 ? 's' : '') . " Listed";
            if ($user->ownerProfile->marina_city) {
                $details[] = "{$user->ownerProfile->marina_city}, {$user->ownerProfile->marina_state}";
            }
        } elseif ($user->deckhandProfile) {
            if ($user->deckhandProfile->resume_path) {
                $details[] = 'Resume Uploaded';
                $details[] = 'Needs manual verification';
            }
        } elseif ($user->chartererProfile) {
            $pastCharters = $user->chartererProfile->charters()->where('end_date', '<', now())->count();
            $details[] = "{$pastCharters} Past Charter" . ($pastCharters !== 1 ? 's' : '');
        }

        return $details;
    }
}
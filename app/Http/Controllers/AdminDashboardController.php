<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use App\Models\DeckhandProfile;
use App\Models\Vessel;
use App\Models\User;
use App\Services\Dashboard\AdminDashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __construct(
        private AdminDashboardService $dashboardService
    ) {}

    public function __invoke(Request $request)
    {
        $data = $this->dashboardService->getDashboardData($request->user());

        // Load pending verifications with user relationships
        $pendingCaptains = CaptainProfile::where('is_verified', 'pending')
            ->with('user')
            ->get()
            ->map(function ($captain) {
                return [
                    'id' => $captain->id,
                    'user_id' => $captain->user_id,
                    'type' => 'captain',
                    'full_name' => $captain->full_name,
                    'email' => $captain->user?->email ?? 'No email provided',
                    'license_type' => $captain->license_type ?? 'N/A',
                    'is_verified' => $captain->is_verified ?? 'pending',
                    'submitted_at' => $captain->created_at,
                    'user' => $captain->user ? [
                        'name' => $captain->user->name,
                        'email' => $captain->user->email,
                    ] : null,
                ];
            });

        $pendingDeckhands = DeckhandProfile::where('is_verified', 'pending')
            ->with('user')
            ->get()
            ->map(function ($deckhand) {
                return [
                    'id' => $deckhand->id,
                    'user_id' => $deckhand->user_id,
                    'type' => 'deckhand',
                    'full_name' => $deckhand->full_name,
                    'email' => $deckhand->user?->email ?? 'No email provided',
                    'license_type' => 'N/A',
                    'is_verified' => $deckhand->is_verified ?? 'pending',
                    'submitted_at' => $deckhand->created_at,
                    'user' => $deckhand->user ? [
                        'name' => $deckhand->user->name,
                        'email' => $deckhand->user->email,
                    ] : null,
                ];
            });

        $pendingVerifications = $pendingCaptains->concat($pendingDeckhands);

        // Load pending vessels with owner relationships
        $pendingVessels = Vessel::where('status', 'pending')
            ->with(['ownerProfile.user'])
            ->get()
            ->map(function ($vessel) {
                return [
                    'id' => $vessel->id,
                    'name' => $vessel->name,
                    'vessel_type' => $vessel->vessel_type,
                    'status' => $vessel->status ?? 'pending',
                    'owner' => $vessel->ownerProfile ? [
                        'name' => $vessel->ownerProfile->user?->name ?? 'Unknown',
                        'email' => $vessel->ownerProfile->user?->email ?? 'No email',
                    ] : null,
                    'submitted_at' => $vessel->created_at,
                ];
            });
            // dd($pendingCaptains);
        return Inertia::render('admin/dashboard', [
            ...$data,
            'pendingVerifications' => $pendingVerifications,
            'pendingVessels' => $pendingVessels,
        ]);
    }

    public function verifications(Request $request)
    {
        // Load pending verifications with user relationships
        $pendingCaptains = CaptainProfile::where('is_verified', 'pending')
            ->with('user')
            ->get()
            ->map(function ($captain) {
                return [
                    'id' => $captain->id,
                    'user_id' => $captain->user_id,
                    'type' => 'captain',
                    'full_name' => $captain->full_name,
                    'email' => $captain->user?->email ?? 'No email provided',
                    'license_type' => $captain->license_type ?? 'N/A',
                    'status' => $captain->status ?? 'pending',
                    'submitted_at' => $captain->created_at,
                    'user' => $captain->user ? [
                        'name' => $captain->user->name,
                        'email' => $captain->user->email,
                    ] : null,
                ];
            });

        $pendingDeckhands = DeckhandProfile::where('is_verified', 'pending')
            ->with('user')
            ->get()
            ->map(function ($deckhand) {
                return [
                    'id' => $deckhand->id,
                    'user_id' => $deckhand->user_id,
                    'type' => 'deckhand',
                    'full_name' => $deckhand->full_name,
                    'email' => $deckhand->user?->email ?? 'No email provided',
                    'license_type' => 'N/A',
                    'status' => $deckhand->status ?? 'pending',
                    'submitted_at' => $deckhand->created_at,
                    'user' => $deckhand->user ? [
                        'name' => $deckhand->user->name,
                        'email' => $deckhand->user->email,
                    ] : null,
                ];
            });

        $pendingVerifications = $pendingCaptains->concat($pendingDeckhands)->values();

        return Inertia::render('admin/verifications', [
            'pendingVerifications' => $pendingVerifications,
            'dashboardData' => [
                'stats' => [
                    'pendingVerificationsCount' => User::whereHas('captainProfile', function($query) {
                        $query->where('is_verified', 'pending');
                    })->orWhereHas('deckhandProfile', function($query) {
                        $query->where('is_verified', 'pending');
                    })->count(),
                    'vesselApprovalsCount' => Vessel::where('status', 'pending')->count(),
                    'totalUsersCount' => User::count(),
                ]
            ]
        ]);
    }

    public function index()
    {
        $pendingVerifications = User::whereHas('captainProfile', function($query) {
            $query->where('is_verified', 'pending');
        })->orWhereHas('deckhandProfile', function($query) {
            $query->where('is_verified', 'pending');
        })->latest()->take(5)->get();
        
        $pendingVesselListings = Vessel::where('is_verified', 'pending')
            ->with(['ownerProfile', 'vesselPhotos'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'pendingVerifications' => $pendingVerifications,
            'pendingVesselListings' => $pendingVesselListings,
            'dashboardData' => [
                'stats' => [
                    'pendingVerificationsCount' => User::whereHas('captainProfile', function($query) {
                        $query->where('is_verified', 'pending');
                    })->orWhereHas('deckhandProfile', function($query) {
                        $query->where('is_verified', 'pending');
                    })->count(),
                    'vesselApprovalsCount' => Vessel::where('is_verified', 'pending')->count(),
                    'totalUsersCount' => User::count(),
                ]
            ]
        ]);
    }

    public function approveVessel($vesselId)
    {
        $vessel = Vessel::findOrFail($vesselId);
        $vessel->update([
            'status' => 'approved', 
            'is_verified' => true,
        ]);
        
        // Notify the owner about the approval
        $vessel->load('ownerProfile.user');
        if ($vessel->ownerProfile && $vessel->ownerProfile->user) {
            $vessel->ownerProfile->user->notify(new \App\Notifications\VesselStatusUpdatedNotification($vessel, 'approved'));
        }
        
        return redirect()->back()->with('success', 'Vessel has been approved successfully.');
    }

    public function rejectVessel($vesselId)
    {
        $vessel = Vessel::findOrFail($vesselId);
        $vessel->update([
            'status' => 'rejected',
            'is_verified' => false,
        ]);
        
        // Notify the owner about the rejection
        $vessel->load('ownerProfile.user');
        if ($vessel->ownerProfile && $vessel->ownerProfile->user) {
            $vessel->ownerProfile->user->notify(new \App\Notifications\VesselStatusUpdatedNotification($vessel, 'rejected'));
        }
        
        return redirect()->back()->with('success', 'Vessel has been rejected.');
    }

    public function approveCaptain($captainId)
    {
        $captain = CaptainProfile::findOrFail($captainId);
        $captain->update([
            'status' => 'approved',
            'is_verified' => true,
        ]);

        // Notify the captain about the approval
        if ($captain->user) {
            $captain->user->notify(new \App\Notifications\ProfileApprovedNotification('captain'));
        }
        
        return redirect()->back()->with('success', 'Captain has been approved successfully.');
    }

    public function rejectCaptain($captainId)
    {
        $captain = CaptainProfile::findOrFail($captainId);
        $captain->update([
            'status' => 'rejected',
            'is_verified' => false,
        ]);
        
        // Note: Consider creating a ProfileRejectedNotification class if you want specific rejection messaging
        if ($captain->user) {
            $captain->user->notify(new \App\Notifications\ProfileApprovedNotification('captain')); 
        }
        
        return redirect()->back()->with('success', 'Captain has been rejected.');
    }

    public function approveDeckhand($deckhandId)
    {
        $deckhand = DeckhandProfile::findOrFail($deckhandId);
        $deckhand->update([
            'status' => 'approved',
            'is_verified' => true,
        ]);
        
        // Notify the deckhand about the approval
        if ($deckhand->user) {
            $deckhand->user->notify(new \App\Notifications\ProfileApprovedNotification('deckhand'));
        }
        
        return redirect()->back()->with('success', 'Deckhand has been approved successfully.');
    }

    public function rejectDeckhand($deckhandId)
    {
        $deckhand = DeckhandProfile::findOrFail($deckhandId);
        $deckhand->update([
            'status' => 'rejected',
            'is_verified' => false,
        ]);
        
        // Note: Consider creating a ProfileRejectedNotification class if you want specific rejection messaging
        if ($deckhand->user) {
            $deckhand->user->notify(new \App\Notifications\ProfileApprovedNotification('deckhand'));
        }
        
        return redirect()->back()->with('success', 'Deckhand has been rejected.');
    }
}
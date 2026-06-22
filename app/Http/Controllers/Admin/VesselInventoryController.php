<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vessel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VesselInventoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Vessel::with(['ownerProfile.user']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('official_number', 'like', "%{$search}%");
            });
        }


        if ($request->filled('type') && $request->input('type') !== 'all') {
            $query->where('vessel_type', strtolower($request->input('type')));
        }

  
        if ($request->filled('status') && $request->input('status') !== 'all') {
            if ($request->input('status') === 'active') {
                $query->where('is_active', true);
            } else {                                
                $query->where('is_active', false);
            }
        }

        $vessels = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('vessel-inventory', [
            'vessels' => $vessels, 
            'filters' => $request->only(['search', 'type', 'status']),

            "dashboardData"=>[
            'stats' => [
            'pendingVerificationsCount' => User::whereHas('captainProfile', function($query) {
                $query->where('status', 'pending');
            })->orWhereHas('deckhandProfile', function($query) {
                $query->where('status', 'pending');
            })->count(),
            'vesselApprovalsCount' => Vessel::where('status', 'pending')->count(),
            'totalUsersCount' => User::count(),
        ]
            ]
        ]);
    }
        public function show(Vessel $vessel)
    {
        $vessel->load(['ownerProfile.user', 'photos']);
        
        return Inertia::render('admin/vessels/show', [
            'vessel' => $vessel,
        ]);
    }

    public function approve(Vessel $vessel)
    {
        $vessel->update(['status' => 'approved']);
        
        return back()->with('success', 'Vessel approved successfully');
    }

    public function reject(Vessel $vessel)
    {
        $vessel->update(['status' => 'rejected']);
        
        return back()->with('success', 'Vessel rejected');
    }
}
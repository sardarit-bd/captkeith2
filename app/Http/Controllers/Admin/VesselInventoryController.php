<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vessel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VesselInventoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Vessel::with(['ownerProfile.user']);

        // Search filter - matches migration columns
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('official_number', 'like', "%{$search}%");
            });
        }

        // Type filter - migration uses 'vessel_type' not 'type'
        if ($request->filled('type') && $request->input('type') !== 'all') {
            $query->where('vessel_type', strtolower($request->input('type')));
        }

        // Status filter - migration has no 'status' column, using 'is_active' instead
        if ($request->filled('status') && $request->input('status') !== 'all') {
            if ($request->input('status') === 'active') {
                $query->where('is_active', true);
            } else {
                $query->where('is_active', false);
            }
        }

        $vessels = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('vessel-inventory', [
            'vessels' => $vessels, // This MUST be a LengthAwarePaginator instance
            'filters' => $request->only(['search', 'type', 'status']),
        ]);
    }
}
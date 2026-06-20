<?php

// app/Http/Controllers/Admin/VesselController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vessel;
use App\Models\ComplianceCheck;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VesselController extends Controller
{
    public function approve(Vessel $vessel)
    {
        $vessel->update(['status' => 'active']);
        
        ComplianceCheck::create([
            'user_id' => auth()->id(),
            'vessel_id' => $vessel->id,
            'action' => 'vessel_approved',
            'details' => "Vessel '{$vessel->name}' approved by admin",
            'status' => 'passed'
        ]);

        return back()->with('success', 'Vessel approved successfully');
    }

    public function reject(Vessel $vessel, Request $request)
    {
        $vessel->update(['status' => 'rejected']);
        
        ComplianceCheck::create([
            'user_id' => auth()->id(),
            'vessel_id' => $vessel->id,
            'action' => 'vessel_rejected',
            'details' => "Vessel '{$vessel->name}' rejected: " . $request->rejection_reason,
            'status' => 'failed'
        ]);

        return back()->with('success', 'Vessel rejected');
    }
}



















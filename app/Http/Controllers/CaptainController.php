<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CaptainController extends Controller
{
    public function index(Request $request): Response
    {
        $query = CaptainProfile::query()
            ->whereNull('deleted_at')
            ->with('user');

        if ($request->filled('license_type')) {
            $query->where('license_type', $request->input('license_type'));
        }

        if ($request->filled('min_experience')) {
            $query->where('years_experience', '>=', (int) $request->input('min_experience'));
        }

        $captains = $query
            ->latest()
            ->get()
            ->map(fn(CaptainProfile $captain) => [
                'id'           => $captain->id,
                'name'         => $captain->full_name,
                'location'     => trim(collect([$captain->city, $captain->state])->filter()->implode(', ')),
                'license'      => $captain->license_type ?? '—',
                'experience'   => $captain->years_experience ? $captain->years_experience . ' years experience' : '—',
                'endorsement'  => $captain->endorsement ? [$captain->endorsement] : [],
                'bio'          => $captain->geographic_area ?? '',
                'rate'         => $captain->hourly_rate ? '$' . number_format($captain->hourly_rate, 0) . '/hr' : '—',
                'availability' => 'Available',
                'photo'        => $captain->photo_path ? Storage::url($captain->photo_path) : null,
                'is_verified'  => $captain->is_verified,
            ]);

        return Inertia::render('captains', [
            'captains' => $captains,
            'filters'  => $request->only(['license_type', 'min_experience']),
        ]);
    }
}

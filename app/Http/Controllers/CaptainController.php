<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use App\Models\OwnerCaptainInvitation;
use App\Models\OwnerProfile;
use App\Models\Vessel;
use App\Models\VesselMatch;
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

        $captains = $query->latest()->get()
            ->map(fn(CaptainProfile $captain) => [
                'id'           => $captain->id,
                'user_id'      => $captain->user_id,
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

        $owner = OwnerProfile::where('user_id', $request->user()->id)->first();

        $vesselIds = $owner
            ? Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->pluck('id')
            : collect();

       

            $invitations = $owner
                ? OwnerCaptainInvitation::where('owner_id', $owner->id)
                ->get()
                ->groupBy('captain_id')
                ->map(fn($group) => $group->mapWithKeys(fn($invitation) => [
                    $invitation->vessel_id => [
                        'status' => $invitation->status,
                        'initiated_by' => $invitation->initiated_by,
                    ]
                ])->toArray())
                ->toArray()
                : [];
      
        $acceptedCaptainIds = $owner
            ? OwnerCaptainInvitation::where('owner_id', $owner->id)
            ->where('status', 'accepted')
            ->get()
            ->groupBy('captain_id')
            ->map(fn($group) => $group->pluck('vessel_id')->unique()->values()->toArray())
            ->toArray()
            : [];

    
        $interestedCaptainIds = $owner
            ? OwnerCaptainInvitation::whereIn('vessel_id', $vesselIds)
            ->whereIn('status', ['pending', 'accepted'])
            ->pluck('captain_id')
            ->unique()
            ->values()
            ->toArray()
            : [];

        return Inertia::render('captains', [
            'captains'               => $captains,
            'filters'                => $request->only(['license_type', 'min_experience']),
            'vessels'                => $owner
                ? Vessel::where('owner_id', $owner->id)
                ->whereNull('deleted_at')
                ->where('is_active', true)
                ->orderBy('name')
                ->get()
                ->map(fn($v) => ['value' => $v->id, 'label' => $v->name])
                : [],
            'invitations'            => $invitations,
            'acceptedCaptainIds'     => $acceptedCaptainIds,
            'acceptedViaInterestIds' => [], // deprecated — kept for frontend compatibility
            'interestedCaptainIds'   => $interestedCaptainIds,
        ]);
    }

    public function show(Request $request, CaptainProfile $captain): Response
    {
        $owner = OwnerProfile::where('user_id', $request->user()->id)->first();

        $vessels = $owner
            ? Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn($v) => ['value' => $v->id, 'label' => $v->name])
            : [];

        $invitations = $owner
            ? OwnerCaptainInvitation::where('owner_id', $owner->id)
            ->where('captain_id', $captain->id)
            ->get()
            ->pluck('status', 'vessel_id')
            : collect();

        $isAccepted = $owner
            ? OwnerCaptainInvitation::whereIn(
                'vessel_id',
                Vessel::where('owner_id', $owner->id)->whereNull('deleted_at')->pluck('id')
            )
            ->where('captain_id', $captain->id)
            ->where('status', 'accepted')
            ->exists()
            : false;

        $hasInterest = $owner
            ? OwnerCaptainInvitation::whereIn(
                'vessel_id',
                Vessel::where('owner_id', $owner->id)->whereNull('deleted_at')->pluck('id')
            )
            ->where('captain_id', $captain->id)
            ->whereIn('status', ['pending', 'accepted'])
            ->exists()
            : false;

        $licenseLabels = [
            'oupv'    => 'OUPV (Six-Pack)',
            'masters' => 'Master License',
        ];

        $endorsementLabels = [
            'inland'       => 'Inland Waters',
            'near_coastal' => 'Near Coastal',
            'unlimited'    => 'Unlimited',
        ];

        $matchedVessels = Vessel::query()
            ->with(['photos' => fn($q) => $q->orderBy('display_order'), 'owner'])
            ->where('is_active', true)
            ->whereNull('deleted_at')
            ->whereHas(
                'matches',
                fn($q) => $q
                    ->where('profile_id', $captain->id)
                    ->where('profile_type', 'captain')
            )
            ->get()
            ->map(function (Vessel $vessel) use ($licenseLabels, $endorsementLabels) {
                $photo          = $vessel->photos->first();
                $qualifications = [];

                if ($vessel->required_license_type) {
                    $qualifications[] = $licenseLabels[$vessel->required_license_type] ?? $vessel->required_license_type;
                }
                if ($vessel->required_endorsement) {
                    $qualifications[] = $endorsementLabels[$vessel->required_endorsement] ?? $vessel->required_endorsement;
                }
                if ($vessel->required_tonnage_rating) {
                    $qualifications[] = $vessel->required_tonnage_rating . ' Ton Rating';
                }
                if ($vessel->required_years_experience) {
                    $qualifications[] = $vessel->required_years_experience . '+ Years Experience';
                }

                return [
                    'id'             => $vessel->id,
                    'name'           => $vessel->name,
                    'registrationNo' => $vessel->official_number,
                    'type'           => ucfirst($vessel->vessel_type ?? ''),
                    'length'         => $vessel->length_ft ? $vessel->length_ft . ' ft' : null,
                    'marina'         => $vessel->marina_name,
                    'city'           => $vessel->marina_city,
                    'state'          => $vessel->marina_state,
                    'operatingArea'  => $vessel->operating_area,
                    'qualifications' => $qualifications,
                    'image'          => $photo?->image_path ? Storage::url($photo->image_path) : null,
                    'ownerUserId'    => $vessel->owner?->user_id,
                    'interestStatus' => null,
                ];
            })
            ->values();

        return Inertia::render('captains/show', [
            'captain' => [
                'id'                   => $captain->id,
                'user_id'              => $captain->user_id,
                'name'                 => $captain->full_name,
                'photo'                => $captain->photo_path ? Storage::url($captain->photo_path) : null,
                'location'             => trim(collect([$captain->city, $captain->state])->filter()->implode(', ')),
                'phone'                => $captain->phone,
                'license'              => isset($captain->license_type) ? ($licenseLabels[$captain->license_type] ?? $captain->license_type) : '—',
                'endorsement'          => isset($captain->endorsement) ? ($endorsementLabels[$captain->endorsement] ?? $captain->endorsement) : '—',
                'tonnage_rating'       => $captain->tonnage_rating ? $captain->tonnage_rating . ' Ton' : '—',
                'years_experience'     => $captain->years_experience ? $captain->years_experience . ' years' : '—',
                'boats_worked_on'      => $captain->boats_worked_on ?? '—',
                'bodies_of_water'      => $captain->bodies_of_water ?? '—',
                'geographic_area'      => $captain->geographic_area ?? '—',
                'hourly_rate'          => $captain->hourly_rate ? '$' . number_format($captain->hourly_rate, 0) . '/hr' : '—',
                'can_provide_deckhand' => $captain->can_provide_deckhand,
                'deckhand_hourly_rate' => $captain->deckhand_hourly_rate ? '$' . number_format($captain->deckhand_hourly_rate, 0) . '/hr' : null,
                'is_verified'          => $captain->is_verified,
                'travel_radius_miles'  => $captain->travel_radius_miles,
                'resume_url'           => $captain->resume_path ? Storage::url($captain->resume_path) : null,
                'license_doc_url'      => $captain->license_doc_path ? Storage::url($captain->license_doc_path) : null,
            ],
            'vessels'        => $vessels,
            'invitations'    => $invitations,
            'isAccepted'     => $isAccepted,
            'hasInterest'    => $hasInterest,
            'matchedVessels' => $matchedVessels,
        ]);
    }

    public function acceptRequest(Request $request, CaptainProfile $captain)
{
    $owner = OwnerProfile::where('user_id', $request->user()->id)->first();
    
    if (!$owner) {
        return back()->with('error', 'Owner profile not found.');
    }


    $invitations = OwnerCaptainInvitation::where('owner_id', $owner->id)
        ->where('captain_id', $captain->id)
        ->where('status', 'pending')
        ->where('initiated_by', 'captain')
        ->get();

  
    foreach ($invitations as $invitation) {
        $invitation->update(['status' => 'accepted']);
    }

    return back()->with('success', 'Captain request accepted successfully.');
}
}

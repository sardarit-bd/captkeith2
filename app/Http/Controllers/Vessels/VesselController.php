<?php

namespace App\Http\Controllers\Vessels;

use App\Http\Controllers\Controller;
use App\Http\Requests\Vessels\StoreVesselRequest;
use App\Models\OwnerProfile;
use App\Models\Vessel;
use App\Models\VesselPhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\VesselMatchingService;
// use App\Notifications\YachtListedNotification;
use App\Notifications\YachtListedRequestNotification;
class VesselController extends Controller
{
    public function store(StoreVesselRequest $request): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();

        $vessel = null;
        DB::transaction(function () use ($request, $owner, &$vessel) {
            $vessel = Vessel::create([
                'owner_id' => $owner->id,
                'name' => $request->input('name'),
                'official_number' => $request->input('official_number'),
                'make' => $request->input('make'),
                'model' => $request->input('model'),
                'vessel_type' => $request->input('vessel_type'),
                'length_ft' => $request->input('length_ft'),
                'beam_ft' => $request->input('beam_ft'),
                'draft_ft' => $request->input('draft_ft'),
                'marina_name' => $request->input('marina_name'),
                'marina_address' => $request->input('marina_address'),
                'marina_city' => $request->input('marina_city'),
                'marina_state' => $request->input('marina_state'),
                'marina_zip' => $request->input('marina_zip'),
                'operating_area' => $request->input('operating_area'),
                'passenger_capacity' => $request->input('passenger_capacity'),
                'required_license_type' => $request->input('required_license_type'),
                'required_endorsement' => $request->input('required_endorsement'),
                'required_tonnage_rating' => $request->input('required_tonnage_rating'),
                'required_years_experience' => $request->input('required_years_experience'),
                'requires_deckhand' => $request->boolean('requires_deckhand'),
                'is_active' => true,
                'status'    => 'pending',
            ]);

            foreach ($request->file('photos', []) as $order => $photo) {
                $path = $photo->store("vessels/{$vessel->id}/photos", 'public');

                VesselPhoto::create([
                    'vessel_id'     => $vessel->id,
                    'image_path'    => $path,
                    'display_order' => $order,
                ]);
            }

            foreach ($request->file('documents', []) as $document) {
                $document->store("vessels/{$vessel->id}/documents", 'local');
            }
        });

        if ($vessel) {
            // Notify the owner that their vessel has been submitted and is awaiting admin approval.
            // Vessel matching runs only after admin approves the vessel.
            $owner->user->notify(new YachtListedRequestNotification($vessel));
                        // Notify all admins about the new pending vessel
            $admins = \App\Models\User::role('admin')->get();
            \Illuminate\Support\Facades\Notification::send($admins, new \App\Notifications\NewPendingVesselNotification($vessel));
        }
        return redirect()
            ->route('my-yachts')
            ->with('success', 'Vessel added successfully.');
    }

public function index(): Response
{
    $owner = OwnerProfile::where('user_id', auth()->id())->first();

   
    $vessels = Vessel::where('owner_id', $owner->id)
        ->whereNull('deleted_at')
        ->with(['photos', 'charterEvents.hireAgreements'])
        ->get()
        ->map(function (Vessel $v) {
            $agreements = $v->charterEvents->flatMap(function($event) {
                return $event->hireAgreements->map(function($agreement) {
                    return [
                        'id'             => $agreement->id,
                        'type'           => ucfirst(str_replace('_', ' ', $agreement->agreement_type ?? 'agreement')),
                        'agreement_type' => $agreement->agreement_type, 
                        'signedAt'       => $agreement->fully_signed_at?->format('M d, Y') ?? 'Pending',
                        'status'         => $agreement->status
                    ];
                });
            })->values();
            return [
                'id'   => $v->id,
                'name' => $v->name,
                'registrationNo' => $v->official_number ?? '',
                'image' => $v->photos->first() ? Storage::url($v->photos->first()->image_path) : null,
                'defaultTab' => 'details',
                'specs' => [
                    'type' => ucfirst($v->vessel_type ?? ''),
                    'length' => $v->length_ft ? $v->length_ft . ' ft' : '—',
                    'draft' => $v->draft_ft ? $v->draft_ft . ' ft' : '—',
                    'mooringLocation' => trim(collect([
                        $v->marina_name,
                        $v->marina_city,
                        $v->marina_state,
                    ])->filter()->implode(', ')) ?: '—',
                    'operatingArea' => $v->operating_area ?? '—',
                    'deckhandRequired' => $v->requires_deckhand ? 'Yes' : 'No',
                    'status' => $v->status,
                ],
                'captainRequirementsRaw' => [
                    'license_type'      => $v->required_license_type,
                    'endorsement'       => $v->required_endorsement,
                    'min_experience'    => $v->required_years_experience,
                ],
                'captainRequirements' => [
                    'licenseTypes' => $v->required_license_type ? (is_array($v->required_license_type) ? $v->required_license_type : [$v->required_license_type]) : [],
                    'rating' => $v->required_tonnage_rating ?? '—',
                    'endorsements' => $v->required_endorsement ? (is_array($v->required_endorsement) ? $v->required_endorsement : [$v->required_endorsement]) : [],
                    'minimumExperience' => $v->required_years_experience ? $v->required_years_experience . ' years' : '—',
                ],
                'charters' => [
                    'hasScheduledCharters' => $v->charterEvents->isNotEmpty(),
                ],
                'agreements' => $agreements, 
            ];
        });

    return Inertia::render('my-yachts', [
        'vessels' => $vessels,
    ]);
}

    public function show(Vessel $vessel): Response
    {
        $vessel->load(['photos' => fn($q) => $q->orderBy('display_order')]);

        return Inertia::render('yacht/details', [
            'vessel' => [
                'id'               => $vessel->id,
                'name'             => $vessel->name,
                'registrationNo'   => $vessel->official_number,
                'image'            => $vessel->photos->first()
                    ? Storage::url($vessel->photos->first()->image_path)
                    : null,
                'allImages'        => $vessel->photos->map(fn($p) => Storage::url($p->image_path))->values(),
                'type'             => ucfirst($vessel->vessel_type ?? ''),
                'lengthFt'         => $vessel->length_ft ? $vessel->length_ft . ' ft' : '—',
                'beamFt'           => $vessel->beam_ft ? $vessel->beam_ft . ' ft' : '—',
                'draftFt'          => $vessel->draft_ft ? $vessel->draft_ft . ' ft' : '—',
                'year'             => $vessel->year ?? '—',
                'make'             => $vessel->make ?? '—',
                'model'            => $vessel->model ?? '—',
                'capacity'         => $vessel->passenger_capacity ? $vessel->passenger_capacity . ' people' : '—',
                'mooringLocation'  => trim(collect([
                    $vessel->marina_name,
                    $vessel->marina_city,
                    $vessel->marina_state,
                ])->filter()->implode(', ')) ?: '—',
                'operatingArea'    => $vessel->operating_area ?? '—',
                'deckhandRequired' => $vessel->requires_deckhand ? 'Yes' : 'No',
                'requiredLicense'  => $vessel->required_license_type ?? '—',
                'requiredEndorsement' => $vessel->required_endorsement ?? '—',
                'requiredTonnage'  => $vessel->required_tonnage_rating ?? '—',
                'requiredExperience' => $vessel->required_years_experience
                    ? $vessel->required_years_experience . ' years'
                    : '—',
            ],
        ]);
    }

    public function edit(Vessel $vessel): Response
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();
        abort_if($vessel->owner_id !== $owner->id, 403);

        $vessel->load(['photos' => fn($q) => $q->orderBy('display_order')]);

        return Inertia::render('my-yachts/create', [
            'vessel' => [
                'id'                        => $vessel->id,
                'name'                      => $vessel->name,
                'official_number' => $vessel->official_number,
                'make' => $vessel->make,
                'model' => $vessel->model,
                'vessel_type' => $vessel->vessel_type,
                'length_ft' => (string) $vessel->length_ft,
                'beam_ft' => (string) $vessel->beam_ft,
                'draft_ft' => (string) $vessel->draft_ft,
                'marina_name' => $vessel->marina_name,
                'marina_address' => $vessel->marina_address,
                'marina_city' => $vessel->marina_city,
                'marina_state' => $vessel->marina_state,
                'marina_zip' => $vessel->marina_zip,
                'operating_area' => $vessel->operating_area,
                'passenger_capacity' => (string) $vessel->passenger_capacity,
                'required_license_type' => $vessel->required_license_type,
                'required_endorsement' => $vessel->required_endorsement,
                'required_tonnage_rating' => (string) $vessel->required_tonnage_rating,
                'required_years_experience' => (string) $vessel->required_years_experience,
                'requires_deckhand' => (bool) $vessel->requires_deckhand,

                'existing_photos'           => $vessel->photos->map(fn($p) => [
                    'id'  => $p->id,
                    'url' => Storage::url($p->image_path),
                ]),
            ],
        ]);
    }

    public function update(Request $request, Vessel $vessel): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();
        abort_if($vessel->owner_id !== $owner->id, 403);

        DB::transaction(function () use ($request, $vessel) {
            $vessel->update([
                'name' => $request->input('name'),
                'official_number' => $request->input('official_number'),
                'make' => $request->input('make'),
                'model' => $request->input('model'),
                'vessel_type' => $request->input('vessel_type'),
                'length_ft' => $request->input('length_ft'),
                'beam_ft' => $request->input('beam_ft'),
                'draft_ft' => $request->input('draft_ft'),
                'marina_name' => $request->input('marina_name'),
                'marina_address' => $request->input('marina_address'),
                'marina_city' => $request->input('marina_city'),
                'marina_state' => $request->input('marina_state'),
                'marina_zip' => $request->input('marina_zip'),
                'operating_area' => $request->input('operating_area'),
                'passenger_capacity' => $request->input('passenger_capacity'),
                'required_license_type' => $request->input('required_license_type'),
                'required_endorsement' => $request->input('required_endorsement'),
                'required_tonnage_rating' => $request->input('required_tonnage_rating'),
                'required_years_experience' => $request->input('required_years_experience'),
                'requires_deckhand' => $request->boolean('requires_deckhand'),
            ]);

            foreach ($request->file('photos', []) as $order => $photo) {
                $path = $photo->store("vessels/{$vessel->id}/photos", 'public');
                VesselPhoto::create([
                    'vessel_id'     => $vessel->id,
                    'image_path'    => $path,
                    'display_order' => $vessel->photos()->max('display_order') + $order + 1,
                ]);
            }

            foreach ($request->file('documents', []) as $document) {
                $document->store("vessels/{$vessel->id}/documents", 'local');
            }
        });
        
        (new VesselMatchingService())->matchForVessel($vessel->fresh());
        
        return redirect()->route('my-yachts')->with('success', 'Vessel updated successfully.');
    }

    public function destroy(Vessel $vessel): RedirectResponse
    {
        Vessel::destroy($vessel->id);

        return redirect()->route('my-yachts')->with('success', 'Vessel deleted successfully.');
    }



    public function requestForApproval(Vessel $vessel){
        $vessel->update(['status' => 'pending']);

        return back()->with('success', 'Approval request sent.');
    }


    
}
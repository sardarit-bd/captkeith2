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

class VesselController extends Controller
{
    public function store(StoreVesselRequest $request): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();


        DB::transaction(function () use ($request, $owner) {
            /** @var Vessel $vessel */

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
                'required_license_type' => $request->input('required_license_type'),
                'required_endorsement' => $request->input('required_endorsement'),

                'required_tonnage_rating' => $request->input('required_tonnage_rating'),
                'required_years_experience' => $request->input('required_years_experience'),

                'requires_deckhand' => $request->boolean('requires_deckhand'),
                'is_active' => true,
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

        return redirect()
            ->route('my-yachts')
            ->with('success', 'Vessel added successfully.');
    }

    public function index(): Response
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();

        $vessels = Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->with(['photos' => fn($q) => $q->orderBy('display_order')])
            ->latest()
            ->get()
            ->map(function (Vessel $vessel) {
                return [
                    'id'                        => $vessel->id,
                    'name'                      => $vessel->name,
                    'registrationNo'            => $vessel->official_number,
                    'image'                     => $vessel->photos->first()
                        ? Storage::url($vessel->photos->first()->image_path)
                        : null,
                    'defaultTab'                => 'details',
                    'specs' => [
                        'type'             => ucfirst($vessel->vessel_type ?? ''),
                        'length'           => $vessel->length_ft ? $vessel->length_ft . ' ft' : '—',
                        'draft'            => $vessel->draft_ft ? $vessel->draft_ft . ' ft' : '—',
                        'mooringLocation'  => trim(collect([
                            $vessel->marina_name,
                            $vessel->marina_city,
                            $vessel->marina_state,
                        ])->filter()->implode(', ')),
                        'operatingArea'    => $vessel->operating_area ?? '—',
                        'deckhandRequired' => $vessel->requires_deckhand ? 'Yes' : 'No',
                    ],
                    'captainRequirements' => [
                        'licenseTypes'      => array_filter([$vessel->required_license_type]),
                        'rating'            => $vessel->required_license_type ?? '—',
                        'endorsements'      => array_filter([$vessel->required_endorsement]),
                        'minimumExperience' => $vessel->required_years_experience
                            ? $vessel->required_years_experience . ' years'
                            : '—',
                    ],
                    'charters' => [
                        'hasScheduledCharters' => false,
                    ],
                ];
            });

        return Inertia::render('my-yachts', [
            'vessels' => $vessels,
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
                'official_number'           => $vessel->official_number,
                'make'                      => $vessel->make,
                'model'                     => $vessel->model,
                'vessel_type'               => $vessel->vessel_type,
                'length_ft'                 => (string) $vessel->length_ft,
                'beam_ft'                   => (string) $vessel->beam_ft,
                'draft_ft'                  => (string) $vessel->draft_ft,
                'marina_name'               => $vessel->marina_name,
                'marina_address'            => $vessel->marina_address,
                'marina_city'               => $vessel->marina_city,
                'marina_state'              => $vessel->marina_state,
                'marina_zip'                => $vessel->marina_zip,
                'operating_area'            => $vessel->operating_area,
                'required_license_type'     => $vessel->required_license_type,
                'required_endorsement'      => $vessel->required_endorsement,
                'required_tonnage_rating'   => (string) $vessel->required_tonnage_rating,
                'required_years_experience' => (string) $vessel->required_years_experience,
                'requires_deckhand'         => (bool) $vessel->requires_deckhand,
                'existing_photos'           => $vessel->photos->map(fn($p) => [
                    'id'  => $p->id,
                    'url' => Storage::url($p->image_path),
                ]),
            ],
        ]);
    }

    public function destroy(Vessel $vessel): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();
        abort_if($vessel->owner_id !== $owner->id, 403);

        DB::transaction(function () use ($vessel) {
            foreach ($vessel->photos as $photo) {
                Storage::disk('public')->delete($photo->image_path);
            }
            $vessel->photos()->delete();
            $vessel->delete();
        });

        return redirect()->route('my-yachts')->with('success', 'Vessel deleted successfully.');
    }
}

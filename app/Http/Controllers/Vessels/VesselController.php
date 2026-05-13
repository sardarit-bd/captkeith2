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

class VesselController extends Controller
{
    public function store(StoreVesselRequest $request): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();
        // dd($request->all(), $request);

        DB::transaction(function () use ($request, $owner) {
            /** @var Vessel $vessel */
            // $vessel = Vessel::create([
            //     'owner_id'                  => $owner->id,
            //     'name'                      => $request->string('name'),
            //     'official_number'           => $request->string('official_number'),
            //     'make'                      => $request->string('make'),
            //     'model'                     => $request->string('model'),
            //     'vessel_type'               => $request->string('vessel_type'),
            //     'length_ft'                 => $request->float('length_ft'),
            //     'beam_ft'                   => $request->float('beam_ft'),
            //     'draft_ft'                  => $request->float('draft_ft'),
            //     'marina_name'               => $request->string('marina_name'),
            //     'marina_address'            => $request->string('marina_address'),
            //     'marina_city'               => $request->string('marina_city'),
            //     'marina_state'              => $request->string('marina_state'),
            //     'marina_zip'                => $request->string('marina_zip'),
            //     'operating_area'            => $request->string('operating_area'),
            //     'required_license_type'     => $request->string('required_license_type'),
            //     'required_endorsement'      => $request->string('required_endorsement'),
            //     'required_tonnage_rating'   => $request->integer('required_tonnage_rating'),
            //     'required_years_experience' => $request->integer('required_years_experience'),
            //     'requires_deckhand'         => $request->boolean('requires_deckhand'),
            //     'is_active'                 => true,
            // ]);
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
}

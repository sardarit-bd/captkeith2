<?php

namespace App\Http\Requests\Vessels;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVesselRequest extends FormRequest
{

    public function authorize(): bool
    {
        return $this->user()->hasRole('owner');
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'name'                      => ['required', 'string', 'max:100'],
            'official_number'           => ['required', 'string', 'max:50', 'unique:vessels,official_number'],
            'make'                      => ['required', 'string', 'max:100'],
            'model'                     => ['required', 'string', 'max:100'],
            'vessel_type'               => ['required', 'string', 'in:power,sailing'],
            'length_ft'                 => ['required', 'numeric', 'min:1', 'max:9999'],
            'beam_ft'                   => ['required', 'numeric', 'min:1', 'max:9999'],
            'draft_ft'                  => ['required', 'numeric', 'min:0.1', 'max:999'],


            'marina_name'               => ['required', 'string', 'max:150'],
            'marina_address'            => ['required', 'string', 'max:255'],
            'marina_city'               => ['required', 'string', 'max:100'],
            'marina_state'              => ['required', 'string', 'max:50'],
            'marina_zip'                => ['required', 'string', 'max:10'],
            'operating_area'            => ['required', 'string', 'max:1000'],


            'required_license_type'     => ['required', 'string', 'in:oupv,masters'],
            'required_endorsement'      => ['required', 'string', 'in:inland,near_coastal,unlimited'],
            'required_tonnage_rating'   => ['required', 'integer', 'min:0', 'max:65535'],
            'required_years_experience' => ['required', 'integer', 'min:0', 'max:65535'],
            'requires_deckhand'         => ['boolean'],


            'photos'                    => ['required', 'array', 'min:6'],
            'photos.*'                  => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],


            'documents'                 => ['nullable', 'array'],
            'documents.*'               => ['file', 'mimes:pdf,doc,docx', 'max:20480'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'photos.required'       => 'You must upload at least 6 photos.',
            'photos.min'            => 'You must upload at least 6 photos.',
            'photos.*.image'        => 'Each photo must be a valid image file.',
            'photos.*.mimes'        => 'Photos must be JPG, JPEG, PNG, or WEBP.',
            'photos.*.max'          => 'Each photo must be under 10 MB.',
            'documents.*.mimes'     => 'Documents must be PDF, DOC, or DOCX.',
            'documents.*.max'       => 'Each document must be under 20 MB.',
            'official_number.unique' => 'This official number is already registered.',
            'vessel_type.in'        => 'Vessel type must be power or sailing.',
            'required_license_type.in'  => 'Invalid license type selected.',
            'required_endorsement.in'   => 'Invalid endorsement selected.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name'                      => 'vessel name',
            'official_number'           => 'official number',
            'make'                      => 'make',
            'model'                     => 'model',
            'vessel_type'               => 'vessel type',
            'length_ft'                 => 'length',
            'beam_ft'                   => 'beam',
            'draft_ft'                  => 'draft',
            'marina_name'               => 'marina name',
            'marina_address'            => 'marina address',
            'marina_city'               => 'marina city',
            'marina_state'              => 'marina state',
            'marina_zip'                => 'marina zip code',
            'operating_area'            => 'operating area',
            'required_license_type'     => 'required license type',
            'required_endorsement'      => 'required endorsement',
            'required_tonnage_rating'   => 'required tonnage rating',
            'required_years_experience' => 'required years of experience',
            'photos.*'                  => 'photo',
            'documents.*'               => 'document',
        ];
    }
}

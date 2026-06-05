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
        'name' => ['required', 'string', 'max:100'],
        'officialNumber' => ['required', 'string', 'max:50', 'unique:vessels,officialNumber'],
        'make' => ['required', 'string', 'max:100'],
        'model' => ['required', 'string', 'max:100'],
        'vesselType' => ['required', 'string', 'in:power,sailing'],
        'lengthFt' => ['required', 'numeric', 'min:1', 'max:9999'],
        'beamFt' => ['required', 'numeric', 'min:1', 'max:9999'],
        'draftFt' => ['required', 'numeric', 'min:0.1', 'max:999'],
        'marinaName' => ['required', 'string', 'max:150'],
        'marinaAddress' => ['required', 'string', 'max:255'],
        'marinaCity' => ['required', 'string', 'max:100'],
        'marinaState' => ['required', 'string', 'max:50'],
        'marinaZip' => ['required', 'string', 'max:10'],
        'operatingArea' => ['required', 'string', 'max:1000'],
        'passengerCapacity'         => ['required', 'integer', 'min:1', 'max:1000'],
        'requiredLicenseType' => ['required', 'string', 'in:oupv,masters'],
        'requiredEndorsement' => ['required', 'string', 'in:inland,nearCoastal,unlimited'],
        'requiredTonnageRating' => ['required', 'integer', 'min:0', 'max:65535'],
        'requiredYearsExperience' => ['required', 'integer', 'min:0', 'max:65535'],
        'requiresDeckhand' => ['boolean'],
        'photos' => ['required', 'array', 'min:6'],
        'photos.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
        'documents' => ['nullable', 'array'],
        'documents.*' => ['file', 'mimes:pdf,doc,docx', 'max:20480'],
    ];
    }
    /**
     * @return array<string, string>
     */
public function messages(): array
{
    return [
        'passengerCapacity.required' => 'Please specify the passenger capacity.',
        'passengerCapacity.integer' => 'Passenger capacity must be a number.',
        'passengerCapacity.min' => 'Passenger capacity must be at least 1.',
    ];
}

    /**
     * @return array<string, string>
     */
public function attributes(): array
{
    return [
        'passengerCapacity' => 'passenger capacity',
        'officialNumber' => 'official number',
        'vesselType' => 'vessel type',
        'lengthFt' => 'length',
        'beamFt' => 'beam',
        'draftFt' => 'draft',
        'marinaName' => 'marina name',
        'marinaAddress' => 'marina address',
        'marinaCity' => 'marina city',
        'marinaState' => 'marina state',
        'marinaZip' => 'marina zip code',
        'operatingArea' => 'operating area',
        'requiredLicenseType' => 'required license type',
        'requiredEndorsement' => 'required endorsement',
        'requiredTonnageRating' => 'required tonnage rating',
        'requiredYearsExperience' => 'required years of experience',
    ];
}
}

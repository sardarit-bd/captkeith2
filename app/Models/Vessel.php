<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'owner_id',
    'name',
    'official_number',
    'make',
    'model',
    'length_ft',
    'beam_ft',
    'draft_ft',
    'vessel_type',
    'marina_name',
    'marina_address',
    'marina_city',
    'marina_state',
    'marina_zip',
    'latitude',
    'longitude',
    'operating_area',
    'passenger_capacity', 
    'requires_deckhand',
    'required_license_type',
    'required_endorsement',
    'required_tonnage_rating',
    'required_years_experience',
    'is_active',
])]
class Vessel extends Model
{
    use HasUuids, SoftDeletes;

    public function owner(): BelongsTo
    {
        return $this->belongsTo(OwnerProfile::class, 'owner_id');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(VesselPhoto::class)->orderBy('display_order');
    }

    public function qualifiedCaptains(): HasMany
    {
        return $this->hasMany(VesselQualifiedCaptain::class);
    }

    public function qualifiedDeckhands(): HasMany
    {
        return $this->hasMany(VesselQualifiedDeckhand::class);
    }

    public function matches(): HasMany
    {
        return $this->hasMany(VesselMatch::class, 'vessel_id');
    }

    public function captainInvitations(): HasMany
    {
        return $this->hasMany(OwnerCaptainInvitation::class);
    }

    public function deckhandInterests(): HasMany
    {
        return $this->hasMany(DeckhandVesselInterest::class);
    }

public function charterEvents()
{
    return $this->hasMany(CharterEvent::class);
}

    protected function casts(): array
    {
        return [
            'length_ft' => 'decimal:2',
            'beam_ft' => 'decimal:2',
            'draft_ft' => 'decimal:2',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'requires_deckhand' => 'boolean',
            'required_tonnage_rating' => 'integer',
            'required_years_experience' => 'integer',
            'is_active' => 'boolean',
            'deleted_at' => 'datetime',
        ];
    }
}
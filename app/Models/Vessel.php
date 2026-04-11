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

    /**
     * Get the owner profile that owns the vessel.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(OwnerProfile::class, 'owner_id');
    }

    /**
     * Get the photos associated with the vessel.
     */
    public function photos(): HasMany
    {
        return $this->hasMany(VesselPhoto::class)->orderBy('display_order');
    }

    /**
     * Get captain qualification records for this vessel.
     */
    public function qualifiedCaptains(): HasMany
    {
        return $this->hasMany(VesselQualifiedCaptain::class);
    }

    /**
     * Get deckhand qualification records for this vessel.
     */
    public function qualifiedDeckhands(): HasMany
    {
        return $this->hasMany(VesselQualifiedDeckhand::class);
    }

    /**
     * Get all cached matches for this vessel.
     */
    public function matches(): HasMany
    {
        return $this->hasMany(VesselMatch::class, 'vessel_id');
    }

    /**
     * Get captain interest records for this vessel.
     */
    public function captainInterests(): HasMany
    {
        return $this->hasMany(CaptainVesselInterest::class);
    }

    /**
     * Get deckhand interest records for this vessel.
     */
    public function deckhandInterests(): HasMany
    {
        return $this->hasMany(DeckhandVesselInterest::class);
    }

    /**
     * Get charter events scheduled for this vessel.
     */
    public function charterEvents(): HasMany
    {
        return $this->hasMany(CharterEvent::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
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

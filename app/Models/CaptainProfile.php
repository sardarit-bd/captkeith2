<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'full_name',
    'phone',
    'address',
    'city',
    'state',
    'zip_code',
    'latitude',
    'longitude',
    'travel_radius_miles',
    'license_type',
    'endorsement',
    'tonnage_rating',
    'years_experience',
    'boats_worked_on',
    'bodies_of_water',
    'geographic_area',
    'resume_path',
    'license_doc_path',
    'hourly_rate',
    'can_provide_deckhand',
    'deckhand_hourly_rate',
    'photo_path',
    'is_verified',
])]
class CaptainProfile extends Model
{
    use HasUuids, SoftDeletes;

    /**
     * Get the user that owns this captain profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get vessel qualification rows for this captain.
     */
    public function vesselQualifications(): HasMany
    {
        return $this->hasMany(VesselQualifiedCaptain::class, 'captain_id');
    }

    /**
     * Get cached match rows for this captain profile.
     */
    public function matches(): HasMany
    {
        return $this->hasMany(VesselMatch::class, 'profile_id')
            ->where('profile_type', 'captain');
    }

    /**
     * Get vessel interest rows for this captain.
     */
    public function vesselInterests(): HasMany
    {
        return $this->hasMany(CaptainVesselInterest::class, 'captain_id');
    }

    /**
     * Get charter events where this captain was selected.
     */
    public function selectedCharterEvents(): HasMany
    {
        return $this->hasMany(CharterEvent::class, 'selected_captain_id');
    }

    /**
     * Get captain hire agreements linked to this captain.
     */
    public function hireAgreements(): HasMany
    {
        return $this->hasMany(CharterHireAgreement::class, 'captain_profile_id');
    }

    /**
     * Get payments made to this captain.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(CharterPayment::class, 'captain_profile_id');
    }

    /**
     * Get crew response rows for this captain profile.
     */
    public function crewResponses(): HasMany
    {
        return $this->hasMany(CharterCrewResponse::class, 'profile_id')
            ->where('crew_role', 'captain');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'travel_radius_miles' => 'integer',
            'tonnage_rating' => 'integer',
            'years_experience' => 'integer',
            'hourly_rate' => 'decimal:2',
            'can_provide_deckhand' => 'boolean',
            'deckhand_hourly_rate' => 'decimal:2',
            'is_verified' => 'boolean',
            'deleted_at' => 'datetime',
        ];
    }
}

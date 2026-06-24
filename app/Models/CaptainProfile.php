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
    'status',
    'preferences',
])]
class CaptainProfile extends Model
{
    use HasUuids, SoftDeletes;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vesselQualifications(): HasMany
    {
        return $this->hasMany(VesselQualifiedCaptain::class, 'captain_id');
    }

    public function matches(): HasMany
    {
        return $this->hasMany(VesselMatch::class, 'profile_id')
            ->where('profile_type', 'captain');
    }

    public function vesselInterests(): HasMany
    {
        return $this->hasMany(CaptainVesselInterest::class, 'captain_id');
    }

    public function selectedCharterEvents(): HasMany
    {
        return $this->hasMany(CharterEvent::class, 'selected_captain_id');
    }

    public function hireAgreements(): HasMany
    {
        return $this->hasMany(CharterHireAgreement::class, 'captain_profile_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(CharterPayment::class, 'captain_profile_id');
    }

    public function crewResponses(): HasMany
    {
        return $this->hasMany(CharterCrewResponse::class, 'profile_id')
            ->where('crew_role', 'captain');
    }

    /**
     * Default preference values — used when no preferences have been saved yet.
     *
     * @return array<string, mixed>
     */
    public static function defaultPreferences(): array
    {
        return [
            'is_available'          => true,
            'weekday_availability'  => true,
            'weekend_availability'  => true,
            'last_minute_charters'  => false,
            'multi_day_charters'    => true,
            'charter_notifications' => true,
            'owner_notification'    => true,
            'email_notifications'   => true,
            'sms_notifications'     => false,
            'profile_visibility'    => true,
            'show_rating'           => true,
            'unavailable_dates'     => [],
        ];
    }

    /**
     * Return preferences merged with defaults so missing keys are always present.
     *
     * @return array<string, mixed>
     */
    public function resolvedPreferences(): array
    {
        return array_merge(self::defaultPreferences(), $this->preferences ?? []);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'latitude'             => 'decimal:7',
            'longitude'            => 'decimal:7',
            'travel_radius_miles'  => 'integer',
            'tonnage_rating'       => 'integer',
            'years_experience'     => 'integer',
            'hourly_rate'          => 'decimal:2',
            'can_provide_deckhand' => 'boolean',
            'deckhand_hourly_rate' => 'decimal:2',
            // 'is_verified'          => 'boolean',
            'preferences'          => 'array',
            'deleted_at'           => 'datetime',
        ];
    }
}

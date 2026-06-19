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
    'years_experience',
    'has_server_experience',
    'has_bartending_experience',
    'resume_path',
    'photo_path',
    'hourly_rate',
    'status',
    'preferences',
])]
class DeckhandProfile extends Model
{
    use HasUuids, SoftDeletes;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vesselQualifications(): HasMany
    {
        return $this->hasMany(VesselQualifiedDeckhand::class, 'deckhand_id');
    }

    public function matches(): HasMany
    {
        return $this->hasMany(VesselMatch::class, 'profile_id')
            ->where('profile_type', 'deckhand');
    }

    public function vesselInterests(): HasMany
    {
        return $this->hasMany(DeckhandVesselInterest::class, 'deckhand_id');
    }

    public function selectedCharterEvents(): HasMany
    {
        return $this->hasMany(CharterEvent::class, 'selected_deckhand_id');
    }

    public function hireAgreements(): HasMany
    {
        return $this->hasMany(CharterHireAgreement::class, 'deckhand_profile_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(CharterPayment::class, 'deckhand_profile_id');
    }

    public function crewResponses(): HasMany
    {
        return $this->hasMany(CharterCrewResponse::class, 'profile_id')
            ->where('crew_role', 'deckhand');
    }

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

    public function resolvedPreferences(): array
    {
        return array_merge(self::defaultPreferences(), $this->preferences ?? []);
    }

    protected function casts(): array
    {
        return [
            'latitude'                  => 'decimal:7',
            'longitude'                 => 'decimal:7',
            'travel_radius_miles'       => 'integer',
            'years_experience'          => 'integer',
            'has_server_experience'     => 'boolean',
            'has_bartending_experience' => 'boolean',
            'hourly_rate'               => 'decimal:2',
            'preferences'               => 'array',
            'deleted_at'                => 'datetime',
        ];
    }
}

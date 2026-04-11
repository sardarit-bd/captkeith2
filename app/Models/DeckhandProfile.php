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
])]
class DeckhandProfile extends Model
{
    use HasUuids, SoftDeletes;

    /**
     * Get the user that owns this deckhand profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get vessel qualification rows for this deckhand.
     */
    public function vesselQualifications(): HasMany
    {
        return $this->hasMany(VesselQualifiedDeckhand::class, 'deckhand_id');
    }

    /**
     * Get cached match rows for this deckhand profile.
     */
    public function matches(): HasMany
    {
        return $this->hasMany(VesselMatch::class, 'profile_id')
            ->where('profile_type', 'deckhand');
    }

    /**
     * Get vessel interest rows for this deckhand.
     */
    public function vesselInterests(): HasMany
    {
        return $this->hasMany(DeckhandVesselInterest::class, 'deckhand_id');
    }

    /**
     * Get charter events where this deckhand was selected.
     */
    public function selectedCharterEvents(): HasMany
    {
        return $this->hasMany(CharterEvent::class, 'selected_deckhand_id');
    }

    /**
     * Get crew response rows for this deckhand profile.
     */
    public function crewResponses(): HasMany
    {
        return $this->hasMany(CharterCrewResponse::class, 'profile_id')
            ->where('crew_role', 'deckhand');
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
            'years_experience' => 'integer',
            'has_server_experience' => 'boolean',
            'has_bartending_experience' => 'boolean',
            'hourly_rate' => 'decimal:2',
            'deleted_at' => 'datetime',
        ];
    }
}

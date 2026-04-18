<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

#[Fillable(['email', 'password', 'is_active'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, HasUuids, Notifiable, SoftDeletes, TwoFactorAuthenticatable;

    /**
     * Get the owner profile associated with the user.
     */
    public function ownerProfile(): HasOne
    {
        return $this->hasOne(OwnerProfile::class);
    }

    /**
     * Get the captain profile associated with the user.
     */
    public function captainProfile(): HasOne
    {
        return $this->hasOne(CaptainProfile::class);
    }

    /**
     * Get the deckhand profile associated with the user.
     */
    public function deckhandProfile(): HasOne
    {
        return $this->hasOne(DeckhandProfile::class);
    }

    /**
     * Get the charterer profile associated with the user.
     */
    public function chartererProfile(): HasOne
    {
        return $this->hasOne(ChartererProfile::class);
    }

    /**
     * Get all vessels owned by the user through their owner profile.
     */
    public function vessels(): HasManyThrough
    {
        return $this->hasManyThrough(
            Vessel::class,
            OwnerProfile::class,
            'user_id',
            'owner_id',
            'id',
            'id',
        );
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_active' => 'boolean',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}

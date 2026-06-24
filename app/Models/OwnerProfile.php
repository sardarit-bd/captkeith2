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
    'company_name',
    'bio',
    'avatar_path',
    'payment_account_id',
    'preferences',
    // Added missing fields for mass assignment
    'address',
    'city',
    'state',
    'zip',
    'country',
    'date_of_birth',
    'marina_name',
    'marina_city',
    'marina_state',
])]
class OwnerProfile extends Model
{
    use HasUuids, SoftDeletes;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vessels(): HasMany
    {
        return $this->hasMany(Vessel::class, 'owner_id');
    }

    public static function defaultPreferences(): array
    {
        return [
            'email_notifications' => true,
            'sms_notifications'   => false,
            'booking_reminders'   => true,
            'marketing_emails'    => false,
        ];
    }

    public function resolvedPreferences(): array
    {
        return array_merge(self::defaultPreferences(), $this->preferences ?? []);
    }

    protected function casts(): array
    {
        return [
            'deleted_at'  => 'datetime',
            'preferences' => 'array',
        ];
    }
}
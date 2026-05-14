<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'user_id',
    'full_name',
    'address',
    'city',
    'state',
    'zip_code',
    'phone',
    'photo_path',
])]
class ChartererProfile extends Model
{
    use HasUuids;


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function charterEvents(): HasMany
    {
        return $this->hasMany(CharterEvent::class, 'charterer_id');
    }

    public function hireAgreements(): HasMany
    {
        return $this->hasMany(CharterHireAgreement::class, 'charterer_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(CharterPayment::class, 'charterer_id');
    }
}

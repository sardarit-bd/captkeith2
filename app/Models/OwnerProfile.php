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

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'deleted_at' => 'datetime',
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WithdrawalRequest extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'profile_type',
        'profile_id',
        'amount',
        'fee',
        'status',
        'bank_name',
        'bank_account_holder_name',
        'bank_account_number',
        'bank_routing_number',
        'requested_at',
        'completed_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'fee' => 'decimal:2',
        'requested_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

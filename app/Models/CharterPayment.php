<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'charter_event_id',
    'charterer_id',
    'hire_agreement_id',
    'payment_type',
    'payee_role',
    'captain_profile_id',
    'deckhand_profile_id',
    'amount',
    'currency',
    'status',
    'provider',
    'provider_payment_id',
    'provider_transfer_id',
    'metadata',
    'paid_at',
    'failed_at',
    'refunded_at',
])]
class CharterPayment extends Model
{
    use HasUuids;

    public function charterEvent(): BelongsTo
    {
        return $this->belongsTo(CharterEvent::class);
    }

    public function charterer(): BelongsTo
    {
        return $this->belongsTo(ChartererProfile::class, 'charterer_id');
    }

    public function hireAgreement(): BelongsTo
    {
        return $this->belongsTo(CharterHireAgreement::class, 'hire_agreement_id');
    }

    public function captainProfile(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'captain_profile_id');
    }

    public function deckhandProfile(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'deckhand_profile_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'metadata' => 'array',
            'paid_at' => 'datetime',
            'failed_at' => 'datetime',
            'refunded_at' => 'datetime',
        ];
    }
}

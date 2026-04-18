<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'charter_event_id',
    'charterer_id',
    'crew_role',
    'captain_profile_id',
    'deckhand_profile_id',
    'initiated_by',
    'payor',
    's3_key',
    'esign_envelope_id',
    'sign_status',
    'charterer_sign_url',
    'crew_sign_url',
    'charterer_signed_at',
    'crew_signed_at',
    'fully_signed_at',
])]
class CharterHireAgreement extends Model
{
    use HasUuids, SoftDeletes;

    public function charterEvent(): BelongsTo
    {
        return $this->belongsTo(CharterEvent::class);
    }

    public function charterer(): BelongsTo
    {
        return $this->belongsTo(ChartererProfile::class, 'charterer_id');
    }

    public function captainProfile(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'captain_profile_id');
    }

    public function deckhandProfile(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'deckhand_profile_id');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(CharterPayment::class, 'hire_agreement_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'charterer_signed_at' => 'datetime',
            'crew_signed_at' => 'datetime',
            'fully_signed_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}

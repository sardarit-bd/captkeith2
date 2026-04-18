<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'vessel_id',
    'charterer_id',
    'selected_captain_id',
    'selected_deckhand_id',
    'charter_date',
    'start_time',
    'duration_minutes',
    'special_notes',
    'status',
    'invite_token',
    'invite_token_expires_at',
])]
class CharterEvent extends Model
{
    use HasUuids, SoftDeletes;

    public function vessel(): BelongsTo
    {
        return $this->belongsTo(Vessel::class);
    }

    public function charterer(): BelongsTo
    {
        return $this->belongsTo(ChartererProfile::class, 'charterer_id');
    }

    public function selectedCaptain(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'selected_captain_id');
    }

    public function selectedDeckhand(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'selected_deckhand_id');
    }

    public function crewResponses(): HasMany
    {
        return $this->hasMany(CharterCrewResponse::class);
    }

    public function complianceChecks(): HasMany
    {
        return $this->hasMany(ComplianceCheck::class);
    }

    public function legalDocuments(): HasMany
    {
        return $this->hasMany(LegalDocument::class);
    }

    public function hireAgreements(): HasMany
    {
        return $this->hasMany(CharterHireAgreement::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(CharterPayment::class);
    }

    public function insurancePolicy(): HasOne
    {
        return $this->hasOne(InsurancePolicy::class, 'charter_event_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'charter_date' => 'date',
            'start_time' => 'string',
            'duration_minutes' => 'integer',
            'invite_token_expires_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}

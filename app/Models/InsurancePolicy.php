<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'charter_event_id',
    'vquip_policy_id',
    'policy_s3_key',
    'status',
    'premium_amount',
    'coverage_start',
    'coverage_end',
    'issued_at',
])]
class InsurancePolicy extends Model
{
    use HasUuids;

    public function charterEvent(): BelongsTo
    {
        return $this->belongsTo(CharterEvent::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'premium_amount' => 'decimal:2',
            'coverage_start' => 'date',
            'coverage_end' => 'date',
            'issued_at' => 'datetime',
        ];
    }
}

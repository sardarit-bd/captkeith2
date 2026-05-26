<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'vessel_id',
    'profile_id',
    'profile_type',
    'match_score',
    'match_reasons',
    'owner_notified',
    'profile_notified',
])]
class VesselMatch extends Model
{
    use HasUuids;

    protected $table = 'matches';

    public function vessel(): BelongsTo
    {
        return $this->belongsTo(Vessel::class);
    }

    public function captainProfile(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'profile_id');
    }

    public function deckhandProfile(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'profile_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'match_score' => 'integer',
            'match_reasons' => 'array',
            'owner_notified' => 'boolean',
            'profile_notified' => 'boolean',
        ];
    }
}

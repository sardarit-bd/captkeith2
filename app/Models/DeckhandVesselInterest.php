<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'deckhand_id',
    'vessel_id',
])]
class DeckhandVesselInterest extends Model
{
    use HasUuids;

    public const UPDATED_AT = null;

    public function deckhand(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'deckhand_id');
    }

    public function vessel(): BelongsTo
    {
        return $this->belongsTo(Vessel::class);
    }
}

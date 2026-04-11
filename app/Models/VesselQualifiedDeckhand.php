<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'vessel_id',
    'deckhand_id',
    'status',
    'qualified_at',
    'notes',
])]
class VesselQualifiedDeckhand extends Model
{
    use HasUuids, SoftDeletes;

    public function vessel(): BelongsTo
    {
        return $this->belongsTo(Vessel::class);
    }

    public function deckhand(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'deckhand_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'qualified_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}

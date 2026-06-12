<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['owner_id', 'deckhand_id', 'vessel_id', 'status', 'initiated_by'])]
class OwnerDeckhandInvitation extends Model
{
    use HasUuids;

    protected $table = 'owner_deckhand_invitations';

    public function owner(): BelongsTo
    {
        return $this->belongsTo(OwnerProfile::class, 'owner_id');
    }

    public function deckhand(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'deckhand_id');
    }

    public function vessel(): BelongsTo
    {
        return $this->belongsTo(Vessel::class);
    }
}
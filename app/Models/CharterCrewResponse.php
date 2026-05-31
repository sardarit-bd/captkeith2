<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'charter_event_id',
    'profile_id',
    'crew_role',
    'response',
    'responded_at',
    'expires_at',
    'selected_by_captain_id',
])]
class CharterCrewResponse extends Model
{
    use HasUuids;

    public function charterEvent(): BelongsTo
    {
        return $this->belongsTo(CharterEvent::class);
    }

    public function captainProfile(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'profile_id');
    }

    public function deckhandProfile(): BelongsTo
    {
        return $this->belongsTo(DeckhandProfile::class, 'profile_id');
    }


    public function selectingCaptain(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'selected_by_captain_id');
    }

    protected function casts(): array
    {
        return [
            'responded_at' => 'datetime',
            'expires_at'   => 'datetime',
        ];
    }
}

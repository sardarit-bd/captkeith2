<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'charter_event_id',
    'doc_type',
    's3_key',
    'esign_envelope_id',
    'sign_status',
    'charterer_sign_url',
    'captain_sign_url',
    'signed_at',
])]
class LegalDocument extends Model
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
            'signed_at' => 'datetime',
        ];
    }
}

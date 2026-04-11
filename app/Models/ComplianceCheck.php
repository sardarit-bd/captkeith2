<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'charter_event_id',
    'check_type',
    'passed',
    'metadata',
    'checked_at',
])]
class ComplianceCheck extends Model
{
    use HasUuids;

    public $timestamps = false;

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
            'passed' => 'boolean',
            'metadata' => 'array',
            'checked_at' => 'datetime',
        ];
    }
}

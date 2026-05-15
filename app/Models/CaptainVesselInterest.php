<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'captain_id',
    'vessel_id',
])]
class CaptainVesselInterest extends Model
{
    use HasUuids;

    protected $table = 'captain_vessel_interest';

    public const UPDATED_AT = null;

    public function captain(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'captain_id');
    }

    public function vessel(): BelongsTo
    {
        return $this->belongsTo(Vessel::class);
    }
}

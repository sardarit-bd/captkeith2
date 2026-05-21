<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['owner_id', 'captain_id', 'vessel_id', 'status'])]
class OwnerCaptainInvitation extends Model
{
    use HasUuids;

    protected $table = 'owner_captain_invitations';

    public function owner(): BelongsTo
    {
        return $this->belongsTo(OwnerProfile::class, 'owner_id');
    }

    public function captain(): BelongsTo
    {
        return $this->belongsTo(CaptainProfile::class, 'captain_id');
    }

    public function vessel(): BelongsTo
    {
        return $this->belongsTo(Vessel::class);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\OwnerCaptainInvitation;
use App\Models\OwnerDeckhandInvitation; 
use App\Models\User;
use App\Models\Vessel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class YachtsMatchController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user       = $request->user();
        $isCaptain  = $user->hasRole('captain');
        $isDeckhand = $user->hasRole('deckhand');
        $profile    = $isCaptain ? $user->captainProfile : $user->deckhandProfile;

        if (! $profile) {
            return Inertia::render('yachts-match', [
                'vessels'                 => [],
                'profileMissing'          => true,
                'interestStatuses'        => [],
                'ownerInvitationStatuses' => [],
            ]);
        }


       $isProfileRestricted = ($profile->status === 'pending') || empty($profile->is_active);

        if (($isCaptain || $isDeckhand) && $isProfileRestricted) {
            return Inertia::render('yachts-match', [
                'vessels'                 => [],
                'profileMissing'          => true, 
                'interestStatuses'        => [],
                'ownerInvitationStatuses' => [],
            ]);
        }
 
        $query = Vessel::query()
                ->with([
                    'photos' => fn($q) => $q->orderBy('display_order'),
                    'ownerProfile',
                ])

            ->where('is_active', true)
            ->where('status', 'approved')
            ->whereNull('deleted_at');

        if ($isCaptain) {
            // License Type Matching
            if ($profile->license_type !== null) {
                $qualifyingLicenses = match ($profile->license_type) {
                    'masters' => ['masters', 'oupv'],
                    'oupv'    => ['oupv'],
                    default   => [$profile->license_type],
                };
                $query->where(function ($q) use ($qualifyingLicenses) {
                    $q->whereIn('required_license_type', $qualifyingLicenses)
                      ->orWhereNull('required_license_type'); // Include yachts with no license requirement
                });
            } else {
                // If captain has no license, only show yachts that don't require one
                $query->whereNull('required_license_type');
            }

            // Years of Experience (YOE) Matching
            if ($profile->years_experience !== null) {
                $query->where(function ($q) use ($profile) {
                    $q->where('required_years_experience', '<=', $profile->years_experience)
                      ->orWhereNull('required_years_experience'); // Include yachts with no YOE requirement
                });
            } else {
                $query->whereNull('required_years_experience');
            }
            
            // Skipping endorsement and tonnage checks as requested
        }

        $interestStatuses        = [];
        $ownerInvitationStatuses = [];

        if ($isCaptain && $user->captainProfile) {
            $invitations = OwnerCaptainInvitation::where('captain_id', $user->captainProfile->id)->get();
            foreach ($invitations as $inv) {
                if ($inv->initiated_by === 'captain') {
                    $interestStatuses[$inv->vessel_id] = $inv->status;
                } else {
                    $ownerInvitationStatuses[$inv->vessel_id] = $inv->status;
                }
            }
        } elseif ($isDeckhand && $user->deckhandProfile) {
                        $invitations = OwnerDeckhandInvitation::where('deckhand_id', $user->deckhandProfile->id)->get();
                        foreach ($invitations as $inv) {
                            if ($inv->initiated_by === 'deckhand') {
                                $interestStatuses[$inv->vessel_id] = $inv->status;
                            } else {
                                $ownerInvitationStatuses[$inv->vessel_id] = $inv->status;
                            }
                        }
                    }

 
        $vessels = $query
            ->latest()
            ->get()
            ->map(function (Vessel $vessel) use ($interestStatuses, $ownerInvitationStatuses) {
                $photo          = $vessel->photos->first();
                $qualifications = [];

                $licenseLabels = [
                    'oupv'    => 'OUPV (Six-Pack)',
                    'masters' => 'Master License',
                ];
                if ($vessel->required_license_type) {
                    $qualifications[] = $licenseLabels[$vessel->required_license_type]
                        ?? $vessel->required_license_type;
                }

                $endorsementLabels = [
                    'inland'       => 'Inland Waters',
                    'near_coastal' => 'Near Coastal',
                    'unlimited'    => 'Unlimited',
                ];
                if ($vessel->required_endorsement) {
                    $qualifications[] = $endorsementLabels[$vessel->required_endorsement]
                        ?? $vessel->required_endorsement;
                }

                if ($vessel->required_tonnage_rating) {
                    $qualifications[] = $vessel->required_tonnage_rating . ' Ton Rating';
                }

                if ($vessel->required_years_experience) {
                    $qualifications[] = $vessel->required_years_experience . '+ Years Experience';
                }

                return [
                    'id'                    => $vessel->id,
                    'name'                  => $vessel->name,
                    'registrationNo'        => $vessel->official_number,
                    'type'                  => ucfirst($vessel->vessel_type ?? ''),
                    'length'                => $vessel->length_ft ? $vessel->length_ft . ' ft' : null,
                    'marina'                => $vessel->marina_name,
                    'city'                  => $vessel->marina_city,
                    'state'                 => $vessel->marina_state,
                    'operatingArea'         => $vessel->operating_area,
                    'qualifications'        => $qualifications,
                    'image'                 => $photo?->image_path
                        ? Storage::url($photo->image_path)
                        : null,
                    'ownerUserId' => $vessel->ownerProfile?->user_id,
                    'interestStatus'        => $interestStatuses[$vessel->id] ?? null, 
                    'ownerInvitationStatus' => $ownerInvitationStatuses[$vessel->id] ?? null,
                ];
            });

        return Inertia::render('yachts-match', [
            'vessels'                 => $vessels,
            'profileMissing'          => false,
            'interestStatuses'        => $interestStatuses,
            'ownerInvitationStatuses' => $ownerInvitationStatuses,
        ]);
    }
}
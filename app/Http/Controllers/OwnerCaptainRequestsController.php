<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use App\Models\OwnerCaptainInvitation;
use App\Models\OwnerProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class OwnerCaptainRequestsController extends Controller
{
    public function index(Request $request): Response
    {
        $ownerProfile = OwnerProfile::where('user_id', $request->user()->id)->first();

        if (! $ownerProfile) {
            return Inertia::render('captain-requests', ['interests' => []]);
        }

        $vesselIds = $ownerProfile->vessels()->pluck('id');

        $interests = OwnerCaptainInvitation::whereIn('vessel_id', $vesselIds)
            ->with([
                'captain.user',
                'vessel.photos' => fn($q) => $q->orderBy('display_order'),
            ])
            ->latest()
            ->get()
            ->map(function (OwnerCaptainInvitation $interest) {
                $captain = $interest->captain;
                $vessel  = $interest->vessel;
                $photo   = $vessel?->photos->first();

                $licenseLabels = [
                    'oupv'    => 'OUPV (Six-Pack)',
                    'masters' => 'Master License',
                ];

                $endorsementLabels = [
                    'inland'       => 'Inland Waters',
                    'near_coastal' => 'Near Coastal',
                    'unlimited'    => 'Unlimited',
                ];

                return [
                    'id'              => $interest->id,
                    'captainId'       => $captain?->id,
                    'captainUserId'   => $captain?->user_id,
                    'captainName'     => $captain?->full_name ?? '—',
                    'captainPhoto'    => $captain?->photo_path
                        ? Storage::url($captain->photo_path)
                        : null,
                    'licenseType'     => isset($captain?->license_type)
                        ? ($licenseLabels[$captain->license_type] ?? $captain->license_type)
                        : '—',
                    'endorsement'     => isset($captain?->endorsement)
                        ? ($endorsementLabels[$captain->endorsement] ?? $captain->endorsement)
                        : '—',
                    'yearsExperience' => $captain?->years_experience
                        ? $captain->years_experience . ' yrs exp'
                        : '—',
                    'hourlyRate'      => $captain?->hourly_rate
                        ? '$' . number_format($captain->hourly_rate, 0) . '/hr'
                        : '—',
                    'location'        => trim(
                        collect([$captain?->city, $captain?->state])
                            ->filter()
                            ->implode(', ')
                    ) ?: '—',
                    'vesselId'        => $vessel?->id,
                    'vesselName'      => $vessel?->name ?? '—',
                    'vesselSpec'      => $vessel
                        ? ucfirst($vessel->vessel_type) . ' • ' . $vessel->length_ft . 'ft'
                        : '—',
                    'vesselImage'     => $photo?->image_path
                        ? Storage::url($photo->image_path)
                        : null,
                    'marina'          => $vessel
                        ? trim(collect([$vessel->marina_name, $vessel->marina_city])->filter()->implode(', '))
                        : '—',
                    'requestedAt'     => $interest->created_at->format('M j, Y'),
                    'status'          => $interest->status ?? 'pending',
                    'initiatedBy'     => $interest->initiated_by ?? 'owner',
                ];
            });

        return Inertia::render('captain-requests', [
            'interests' => $interests,
        ]);
    }

    public function respond(Request $request, OwnerCaptainInvitation $interest): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:accepted,declined'],
        ]);

        $ownerProfile = OwnerProfile::where('user_id', $request->user()->id)
            ->firstOrFail();

        $ownsVessel = $ownerProfile->vessels()
            ->where('id', $interest->vessel_id)
            ->exists();

        abort_if(! $ownsVessel, 403, 'You do not own this vessel.');

        $interest->update(['status' => $validated['status']]);

        $message = $validated['status'] === 'accepted'
            ? 'Captain request accepted.'
            : 'Captain request declined.';

        return back()->with('success', $message);
    }

    public function revokeAcceptance(Request $request, CaptainProfile $captain): RedirectResponse
    {
        $ownerProfile = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();

        OwnerCaptainInvitation::whereIn(
            'vessel_id',
            $ownerProfile->vessels()->pluck('id')
        )
            ->where('captain_id', $captain->id)
            ->where('status', 'accepted')
            ->delete();

        return back()->with('success', 'Acceptance revoked.');
    }
}

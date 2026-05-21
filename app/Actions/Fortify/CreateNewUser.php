<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Enums\RegistrableRole;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $input['role'] = strtolower(trim((string) ($input['role'] ?? '')));
        $registrableRoles = RegistrableRole::values();

        Validator::make($input, [
            ...$this->profileRules(),
            'role' => [
                'required',
                'string',
                Rule::in($registrableRoles),
                Rule::notIn(['admin']),
            ],
            'password' => $this->passwordRules(),
        ], [
            'role.required' => 'Please select the account type you want to register as.',
            'role.in' => 'Selected role is not allowed for self-registration.',
            'role.not_in' => 'Admin accounts cannot be self-registered.',
            'password.min' => 'Password must be at least 12 characters.',
            'password.mixed' => 'Password must include both uppercase and lowercase letters.',
            'password.letters' => 'Password must include at least one letter.',
            'password.numbers' => 'Password must include at least one number.',
            'password.symbols' => 'Password must include at least one special character.',
            'password.uncompromised' => 'Please choose a less common password for security.',
        ])->validate();

        return DB::transaction(function () use ($input, $registrableRoles): User {
            $selectedRole = $input['role'];
            $authGuard = (string) config('fortify.guard', 'web');

            $role = Role::query()
                ->where('guard_name', $authGuard)
                ->whereRaw('LOWER(name) = ?', [$selectedRole])
                ->first();

            if ($role === null || $role->name === 'admin') {
                Log::error('Registration blocked because no registrable role could be resolved.', [
                    'submitted_role' => $selectedRole,
                    'guard' => $authGuard,
                    'registrable_roles' => $registrableRoles,
                    'available_roles_for_guard' => Role::query()
                        ->where('guard_name', $authGuard)
                        ->pluck('name')
                        ->all(),
                ]);

                throw ValidationException::withMessages([
                    'role' => 'Selected role is currently unavailable. Please contact support.',
                ]);
            }

            $user = User::create([
                'email' => $input['email'],
                'password' => $input['password'],
            ]);

            $user->syncRoles([$role->name]);

            if ($user->hasRole('admin')) {
                throw ValidationException::withMessages([
                    'role' => 'Admin accounts cannot be self-registered.',
                ]);
            }

            $fullName = trim(($input['first_name'] ?? '') . ' ' . ($input['last_name'] ?? ''));

            match ($selectedRole) {
                'charterer' => \App\Models\ChartererProfile::create([
                    'user_id'   => $user->id,
                    'full_name' => $fullName,
                ]),
                'captain' => \App\Models\CaptainProfile::create([
                    'user_id'             => $user->id,
                    'full_name'           => $fullName,
                    'phone'               => '',
                    'address'             => '',
                    'city'                => '',
                    'state'               => '',
                    'zip_code'            => '',
                    'travel_radius_miles' => 0,
                    'license_type'        => 'oupv',
                    'endorsement'         => 'inland',
                    'tonnage_rating'      => 0,
                    'years_experience'    => 0,
                    'hourly_rate'         => 0,
                ]),
                'deckhand' => \App\Models\DeckhandProfile::create([
                    'user_id'             => $user->id,
                    'full_name'           => $fullName,
                    'phone'               => '',
                    'address'             => '',
                    'city'                => '',
                    'state'               => '',
                    'zip_code'            => '',
                    'travel_radius_miles' => 0,
                    'years_experience'    => 0,
                    'hourly_rate'         => 0,
                ]),
                'owner' => \App\Models\OwnerProfile::create([
                    'user_id'   => $user->id,
                    'full_name' => $fullName,
                    'phone'     => '',
                ]),
                default => null,
            };


            return $user;
        });
    }
}

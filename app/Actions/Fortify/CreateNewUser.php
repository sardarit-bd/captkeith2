<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Enums\RegistrableRole;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
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
                Rule::exists(Role::class, 'name')->where('guard_name', 'web'),
            ],
            'password' => $this->passwordRules(),
        ], [
            'role.required' => 'Please select the account type you want to register as.',
            'role.in' => 'Selected role is not allowed for self-registration.',
            'role.not_in' => 'Admin accounts cannot be self-registered.',
            'role.exists' => 'Selected role is currently unavailable. Please contact support.',
            'password.min' => 'Password must be at least 12 characters.',
            'password.mixed' => 'Password must include both uppercase and lowercase letters.',
            'password.letters' => 'Password must include at least one letter.',
            'password.numbers' => 'Password must include at least one number.',
            'password.symbols' => 'Password must include at least one special character.',
            'password.uncompromised' => 'Please choose a less common password for security.',
        ])->validate();

        return DB::transaction(function () use ($input, $registrableRoles): User {
            $selectedRole = $input['role'];

            // Resolve only from the explicit self-registration allowlist.
            $role = Role::query()
                ->where('guard_name', 'web')
                ->where('name', $selectedRole)
                ->whereIn('name', $registrableRoles)
                ->first();

            if ($role === null || $role->name === 'admin') {
                throw ValidationException::withMessages([
                    'role' => 'Admin accounts cannot be self-registered.',
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

            return $user;
        });
    }
}

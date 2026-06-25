<?php

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * Admin users are redirected to the admin dashboard.
     * All other roles keep the default Fortify "home" redirect.
     */
    public function toResponse($request): RedirectResponse
    {
        $user = $request->user();

        if ($user && $user->hasRole('admin')) {
            return redirect()->intended(route('dashboard'));
        }

        return redirect()->intended(config('fortify.home'));
    }
}
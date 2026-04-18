<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\Dashboard\DashboardResolver;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request, DashboardResolver $dashboardResolver): Response
    {
        /** @var User $user */
        $user = $request->user();
        $dashboard = $dashboardResolver->resolve($user);

        return Inertia::render($dashboard->component, $dashboard->props);
    }
}


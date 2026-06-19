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

        // 👇 PASTE IT RIGHT HERE 👇
        // dd([
        //     'component' => $dashboard->component,
        //     'props_keys' => array_keys($dashboard->props),
        //     'props' => $dashboard->props,
        // ]);
        // 👆 PASTE IT RIGHT HERE 👆

        return Inertia::render($dashboard->component, $dashboard->props);
    }
}
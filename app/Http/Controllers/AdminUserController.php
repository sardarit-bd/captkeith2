<?php

namespace App\Http\Controllers;

use App\Services\Admin\UserManagementService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request, UserManagementService $service): Response
    {
        return Inertia::render('admin/users', [
            'userData' => $service->getUsers($request->only(['search', 'role', 'status', 'per_page', 'page'])),
            'filters' => $request->only(['search', 'role', 'status']),
        ]);
    }
}
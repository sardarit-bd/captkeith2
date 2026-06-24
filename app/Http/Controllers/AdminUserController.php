<?php

namespace App\Http\Controllers;

use App\Services\Admin\UserManagementService;
use App\Models\Vessel;
use App\Models\User;
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
            "dashboardData"=>[
            'stats' => [
            'pendingVerificationsCount' => User::whereHas('captainProfile', function($query) {
                $query->where('is_verified', 'pending');
            })->orWhereHas('deckhandProfile', function($query) {
                $query->where('is_verified', 'pending');
            })->count(),
            'vesselApprovalsCount' => Vessel::where('status', 'pending')->count(),
            'totalUsersCount' => User::count(),
        ]
            ]
        ]);
    }



        public function destroy(User $user)
    {
  
        $user->delete();

        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }
}
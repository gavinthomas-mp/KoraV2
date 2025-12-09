<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('deleted', 0);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }
        return Inertia::render('Users/Index', [
            'users' => $query->paginate(10)->withQueryString()->through(function ($user) {
                $user->roleName = $user->userRole ? $user->userRole->role : 'N/A';
                return $user;
            }),
            'filters' => $request->only(['search']),
        ]);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Edit', [
            'user' => $user->load('userSetting'),
            'roles' => Role::all(),
            'currentTab' => 'profile'
        ]);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validated();

        // $user->update($validated['user']);

        $user->userSetting->update($validated['user_setting']);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        User::create($validated);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function queueAssignments($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Tabs/QueueAssignments', [
            'user' => $user,
            'currentTab' => 'queue-assignments'
        ]);
    }

    public function phrases($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Tabs/Phrases', [
            'user' => $user,
            'currentTab' => 'phrases',
            'phrases' => $user->userPhrases()->notDeleted()->get(),
        ]);
    }

    public function bio($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Tabs/Bio', [
            'user' => $user,
            'currentTab' => 'bio',
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('search', '');

        $results = User::where('name', 'like', '%' . $query . '%')
            ->orWhere('email', 'like', '%' . $query . '%')
            ->where('deleted', 0)
            ->get();

        return response()->json($results);
    }
}
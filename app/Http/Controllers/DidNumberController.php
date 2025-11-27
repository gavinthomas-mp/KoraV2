<?php

namespace App\Http\Controllers;

use App\Models\DidNumber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DidNumberController extends Controller
{
    public function index()
    {
        return Inertia::render('DidNumbers/Index', [
            'accounts' => DidNumber::where('deleted', 0)->paginate(10)
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('DidNumbers/Edit', [
            'account' => DidNumber::findOrFail($id),
        ]);
    }

    public function create(Request $request)
    {
        $accountId = $request->query('account_id');

        return Inertia::render('DidNumbers/Create', [
            'accountId' => $accountId,
        ]);
    }
}

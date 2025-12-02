<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDidNumberRequest;
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
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Edit', [
            'account' => $didNumber,
            'groupAccount' => $didNumber->account,
            'accountSource' => $didNumber->fields->where('name', 'account_source')->first()->value ?? '',
            'didNumbers' => $didNumber->didNumbers,
            'callTypes' => $didNumber->callTypes,
            'contacts' => $didNumber->contacts,
            'onCallSchedules' => $didNumber->onCallSchedules,
            'calls' => $didNumber->calls()->orderBy('start_time', 'desc')->paginate(10),
            'messages' => $didNumber->messages()->orderBy('created', 'desc')->paginate(10),
            'currentTab' => 'basic-info'
        ]);
    }

    public function create(Request $request)
    {
        $accountId = $request->query('account_id');

        return Inertia::render('DidNumbers/Create', [
            'accountId' => $accountId,
        ]);
    }

    public function store(StoreDidNumberRequest $request)
    {
        $data = $request->validate([
            'number' => 'required|string|unique:did_numbers,number',
            'account_id' => 'required|integer|exists:accounts,id',
            'active' => 'sometimes|boolean',
        ]);

        DidNumber::create($data);

        return redirect()->route('did-numbers.index')->with('success', 'DID Number created successfully.');
    }

    public function storeDidNumber(Request $request, $id)
    {
        $didNumber = DidNumber::findOrFail($id);

        $data = $request->validated();

        $didNumber->didNumbers()->create($data);

        return redirect()->route('didnumbers.did-numbers', ['id' => $id])->with('success', 'DID Number added successfully.');
    }

    public function update(StoreDidNumberRequest $request, $id)
    {
        $didNumber = DidNumber::findOrFail($id);

        $data = $request->validated();

        $didNumber->update($data);

        return redirect()->route('did-numbers.index')->with('success', 'DID Number updated successfully.');
    }

    public function didNumbers($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/DidNumbers', [
            'didNumbers' => $didNumber->didNumbers,
            'account' => $didNumber,
            'currentTab' => 'did-numbers',
            'id' => $id
        ]);
    }

    public function callTypes($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/CallTypes', [
            'callTypes' => $didNumber->callTypes()->paginate(10),
            'account' => $didNumber,
            'currentTab' => 'call-types',
            'id' => $id
        ]);
    }

    public function contacts($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/Contacts', [
            'contacts' => $didNumber->employees()->orderBy('sort', 'asc')->paginate(10),
            'account' => $didNumber,
            'currentTab' => 'contacts',
            'id' => $id
        ]);
    }

    public function onCallSchedules($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/OnCall', [
            'onCallSchedules' => $didNumber->onCallSchedules,
            'account' => $didNumber,
            'currentTab' => 'on-call',
            'id' => $id
        ]);
    }

    public function calls($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/Calls', [
            'calls' => $didNumber->calls()->orderBy('start_time', 'desc')->paginate(10)->through(function ($call) {
                $call->name = ($call->user->firstname ?? '') . ' ' . ($call->user->lastname ?? 'Unknown');
                return $call;
            }),
            'currentTab' => 'calls',
            'id' => $id
        ]);
    }

    public function messages($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/Messages', [
            'messages' => $didNumber->messages()->orderBy('created', 'desc')->paginate(10),
            'account' => $didNumber,
            'currentTab' => 'messages',
            'id' => $id
        ]);
    }

    public function advisements($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/Advisements', [
            'advisements' => $didNumber->advisements,
            'account' => $didNumber,
            'currentTab' => 'advisements',
            'id' => $id
        ]);
    }

    public function editHistory($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/EditHistory', [
            'editHistory' => $didNumber->editHistory,
            'account' => $didNumber,
            'currentTab' => 'edit-history',
            'id' => $id
        ]);
    }

    public function skills($id)
    {
        $didNumber = DidNumber::findOrFail($id);
        return Inertia::render('DidNumbers/Tabs/Skills', [
            'skills' => $didNumber->skills,
            'account' => $didNumber,
            'currentTab' => 'skills',
            'id' => $id
        ]);
    }
}

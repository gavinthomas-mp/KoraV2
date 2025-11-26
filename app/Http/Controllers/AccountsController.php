<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Account;

class AccountsController extends Controller
{
    public function index()
    {
        return Inertia::render('Accounts/Index', [
            'accounts' => Account::paginate(10)->through(function ($account) {
                return [
                    'id' => $account->id,
                    'account_name' => $account->account_name,
                    'account_num' => $account->account_num,
                    'created' => $account->created,
                ];
            }),
        ]);
    }

    public function show(Account $account)
    {
        return Inertia::render('Accounts/Edit', [
            'account' => [
                'id' => $account->id,
                'account_name' => $account->account_name,
                'account_num' => $account->account_num,
                'created' => $account->created,
                'subAccounts' => $account->subaccounts()->get()
            ],
        ]);
    }

    public function destroy(Account $account)
    {
        $account->delete();

        return redirect()->route('accounts.index')->with('success', 'Account deleted successfully.');
    }
}

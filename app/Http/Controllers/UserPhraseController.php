<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserPhrase;

class UserPhraseController extends Controller
{
    public function delete(Request $request, $id)
    {
        $phrase = UserPhrase::findOrFail($id);
        $phrase->update(['deleted' => 1]);
        $phrase->save();

        return redirect()->back()->with('success', 'Phrase deleted successfully.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:ccact_users,id',
            'title' => 'required|string|max:255',
            'phrase' => 'required|string|max:255',
        ]);

        $phrase = UserPhrase::create($validated);

        return redirect()->back()->with('success', 'Phrase added successfully.')->with('new_phrase', $phrase);
    }

    public function update(Request $request, $id)
    {
        $phrase = UserPhrase::findOrFail($id);

        $validated = $request->validate([
            'phrase' => 'required|string|max:255',
            'title' => 'required|string|max:255',
        ]);

        $phrase->update($validated);

        return redirect()->back()->with('success', 'Phrase updated successfully.');
    }
}

<?php
// app/Http/Controllers/OperatorController.php
namespace App\Http\Controllers;

use App\Models\Operator;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperatorController extends Controller
{
    public function index()
    {
        $operators = Operator::with(['skills', 'activeCalls'])
            ->withCount('activeCalls')
            ->get();

        return Inertia::render('Operators/Index', [
            'operators' => $operators,
        ]);
    }

    public function create()
    {
        $skills = Skill::all();
        
        return Inertia::render('Operators/Create', [
            'skills' => $skills,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:operators',
            'phone' => 'required|string',
            'max_concurrent_calls' => 'required|integer|min:1',
            'skills' => 'array',
            'skills.*.id' => 'exists:skills,id',
            'skills.*.proficiency' => 'integer|min:1|max:5',
        ]);

        $operator = Operator::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'max_concurrent_calls' => $validated['max_concurrent_calls'],
        ]);

        // Attach skills
        if (!empty($validated['skills'])) {
            foreach ($validated['skills'] as $skill) {
                $operator->skills()->attach($skill['id'], [
                    'proficiency' => $skill['proficiency'] ?? 3,
                ]);
            }
        }

        return redirect()->route('operators.index');
    }

    public function edit(Operator $operator)
    {
        $skills = Skill::all();
        $operator->load('skills');

        return Inertia::render('Operators/Edit', [
            'operator' => $operator,
            'skills' => $skills,
        ]);
    }

    public function update(Request $request, Operator $operator)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:operators,email,' . $operator->id,
            'phone' => 'required|string',
            'status' => 'required|in:available,on_call,break,offline',
            'max_concurrent_calls' => 'required|integer|min:1',
            'skills' => 'array',
            'skills.*.id' => 'exists:skills,id',
            'skills.*.proficiency' => 'integer|min:1|max:5',
        ]);

        $operator->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'status' => $validated['status'],
            'max_concurrent_calls' => $validated['max_concurrent_calls'],
        ]);

        // Sync skills
        if (isset($validated['skills'])) {
            $skillsData = [];
            foreach ($validated['skills'] as $skill) {
                $skillsData[$skill['id']] = ['proficiency' => $skill['proficiency'] ?? 3];
            }
            $operator->skills()->sync($skillsData);
        }

        return redirect()->route('operators.index');
    }

    public function destroy(Operator $operator)
    {
        $operator->delete();
        return redirect()->route('operators.index');
    }

    public function updateStatus(Request $request, Operator $operator)
    {
        $validated = $request->validate([
            'status' => 'required|in:available,on_call,break,offline',
        ]);

        $operator->update(['status' => $validated['status']]);

        return back();
    }
}
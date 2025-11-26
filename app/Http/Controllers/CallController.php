<?php
// app/Http/Controllers/CallController.php
namespace App\Http\Controllers;

use App\Models\Call;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CallController extends Controller
{
    public function index(Request $request)
    {
        $query = Call::with(['operator', 'skill'])
            ->orderBy('created', 'desc');

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by operator if provided
        if ($request->has('operator_id')) {
            $query->where('operator_id', $request->operator_id);
        }

        $calls = $query->paginate(50);

        return Inertia::render('Calls/Index', [
            'calls' => $calls,
        ]);
    }

    public function show(Call $call)
    {
        $call->load(['operator', 'skill']);

        return Inertia::render('Calls/Show', [
            'call' => $call,
        ]);
    }
}
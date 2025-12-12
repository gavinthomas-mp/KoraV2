<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CallLog;

class CallLogController extends Controller
{
    public function index(Request $request)
    {
        $callLogs = CallLog::orderBy('id', 'desc')->paginate(10)->through(function ($callLog) {
            $callLog->company = $callLog->didNumber ? $callLog->didNumber->company : 'N/A';
            return $callLog;
        })->withQueryString();
        

        if ($request->has('search')) {
            $callLogs = $this->search($request);
        }
        
        return Inertia::render('CallLogs/Index', [
            'callLogs' => $callLogs,
        ]);
    }

    public function show($id)
    {
        $callLog = CallLog::with('messages')->findOrFail($id);
        return Inertia::render('CallLogs/Show', [
            'callLog' => $callLog,
        ]);
    }

    public function search(Request $request)
    {
        $filters = $request->query('search', []);
        $callLogs = CallLog::when($filters['account_id'] ?? null, function ($query, $accountId) {
                $query->where('did_id', $accountId);
            })
            ->when($filters['operator_id'] ?? null, function ($query, $operatorId) {
                $query->where('user_id', $operatorId);
            })
            ->when($filters['start_time'] ?? null, function ($query, $dateFrom) {
                $query->whereDate('start_time', '>=', $dateFrom);
            })
            ->when($filters['end_time'] ?? null, function ($query, $dateTo) {
                $query->whereDate('end_time', '<=', $dateTo);
            })
            ->when($filters['call_id'] ?? null, function ($query, $callId) {
                $query->where('id', $callId);
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->through(function ($callLog) {
                $callLog->company = $callLog->didNumber ? $callLog->didNumber->company : 'N/A';
                return $callLog;
            })
            ->withQueryString();

        return $callLogs;
    }
}

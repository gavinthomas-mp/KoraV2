<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CallLog;

class CallLogController extends Controller
{
    public function index(Request $request)
    {
        $callLogs = CallLog::paginate(10)->through(function ($callLog) {
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

    public function search(Request $request)
    {
        
        $filters = $request->only(['account_id', 'operator_id', 'date_from', 'date_to', 'callId']);

        $callLogs = CallLog::when($filters['account_id'] ?? null, function ($query, $accountId) {
                $query->where('did_id', $accountId);
            })
            ->when($filters['operator_id'] ?? null, function ($query, $operatorId) {
                $query->where('user_id', $operatorId);
            })
            ->when($filters['date_from'] ?? null, function ($query, $dateFrom) {
                $query->whereDate('created_at', '>=', $dateFrom);
            })
            ->when($filters['date_to'] ?? null, function ($query, $dateTo) {
                $query->whereDate('created_at', '<=', $dateTo);
            })
            ->when($filters['callId'] ?? null, function ($query, $callId) {
                $query->where('id', $callId);
            })
            ->paginate(10)
            ->through(function ($callLog) {
                $callLog->company = $callLog->didNumber ? $callLog->didNumber->company : 'N/A';
                return $callLog;
            })
            ->withQueryString();

        return $callLogs;
    }
}

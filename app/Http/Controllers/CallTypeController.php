<?php

namespace App\Http\Controllers;

use App\Models\CallType;
use App\Models\Employee;
use Illuminate\Http\Request;

class CallTypeController extends Controller
{
    public function index(Request $request, $did_id)
    {
        if (!$did_id) {
            return response()->json(['error' => 'Missing did_id parameter'], 400);
        }

        $callTypes = CallType::where('did_id', $did_id)
            ->where('deleted', 0)
            ->get()
            ->map(function ($callType) {
                if ($callType->schedules()->where('active', 1)->count() == 0) {
                    return null;
                }
                return $callType;
            })
            ->filter()
            ->values();
        return response()->json($callTypes);
    }

    public function employees(Request $request, $did_id)
    {
        if (!$did_id) {
            return response()->json(['error' => 'Missing did_id parameter'], 400);
        }

        $employees = Employee::where('did_id', $did_id)->get();
        return response()->json($employees);
    }

    public function show($did_id, $id)
    {
        $callType = CallType::where('did_id', $did_id)->where('id', $id)->first();
        if (!$callType) {
            return response()->json(['error' => 'CallType not found'], 404);
        }
        return response()->json($callType);
    }

    public function search(Request $request, $did_id)
    {
        $query = $request->query('query', '');

        if (!$did_id) {
            return response()->json(['error' => 'Missing did_id parameter'], 400);
        }

        $calltypes = CallType::where('did_id', $did_id)
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('title', 'LIKE', '%' . $query . '%')
                             ->orWhere('description', 'LIKE', '%' . $query . '%');
            })
            ->get();
        $employees = Employee::where('did_id', $did_id)
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('name', 'LIKE', '%' . $query . '%');
            })
            ->get();

        $results = [
            'calltypes' => $calltypes,
            'employees' => $employees,
        ];

        return response()->json($results);
    }
}

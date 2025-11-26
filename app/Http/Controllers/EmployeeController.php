<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function index(Request $request, $did_id)
    {
        // Validate the did_id parameter
        if (!$did_id) {
            return response()->json(['error' => 'Missing did_id parameter'], 400);
        }

        // Fetch employees associated with the given did_id
        $employees = Employee::where('did_id', $did_id)->get();

        return response()->json($employees);
    }
}

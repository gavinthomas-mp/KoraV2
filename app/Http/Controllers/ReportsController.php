<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function show($id)
    {
        return Inertia::render('Reports/Show', ['reportId' => $id]);
    }

    public function create()
    {
        return Inertia::render('Reports/Create');
    }

    public function generateReport(Request $request)
    {
        $reportData = []; // Placeholder for generated report data

        return Inertia::render('Reports/Show', ['reportData' => $reportData]);
    }
}

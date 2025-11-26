<?php

namespace App\Http\Controllers;

use App\Models\HomeWidget;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'widgets' => HomeWidget::with('image')->get()
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index', [
            'settings' => [
                'appSettings' => AppSetting::all(),
                'miscSettings' => Setting::all()
            ]
        ]);
    }
}

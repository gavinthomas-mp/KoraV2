<?php
// routes/web.php
use Inertia\Inertia;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CallController;
use App\Http\Controllers\CallLogController;
use App\Http\Controllers\CallTypeController;
use App\Http\Controllers\DidNumberController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\TwilioWebhookController;
use App\Http\Controllers\TwilioController;
use App\Http\Controllers\TwilioCallbackController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserPhraseController;

use App\Http\Controllers\ScriptController;
use App\Http\Controllers\SettingsController;
use App\Models\Employee;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

// Dashboard

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('calls', CallController::class)->only(['index', 'show']);

    Route::post('/twilio/incoming', [TwilioWebhookController::class, 'incoming'])
        ->name('twilio.incoming');

    Route::post('/twilio/call/{call}/status', [TwilioWebhookController::class, 'status'])
        ->name('twilio.call.status');

    Route::post('/twilio/call/events', [TwilioWebhookController::class, 'events'])
        ->name('twilio.call.events');

    Route::get('/twilio/token', [TwilioController::class, 'getToken'])
        ->name('twilio.token');

    // // Twilio Callbacks
    Route::post('/twilio/callbacks/agent-dial/{taskSid?}', [TwilioCallbackController::class, 'agent_dial_callback'])
        ->name('twilio.callbacks.agent-dial')
        ->withoutMiddleware([VerifyCsrfToken::class]);

    Route::post('/twilio/callbacks/agent-dial', [TwilioCallbackController::class, 'agent_dial'])
        ->name('twilio.callbacks.agent-dial.initiate')
        ->withoutMiddleware([VerifyCsrfToken::class]);

    Route::group(['prefix' => 'calltypes', 'as' => 'calltypes.'], function () {
        Route::get('/{did_id}', [
            CallTypeController::class, 'index',
        ])->name('index');

        Route::get('/{did_id}/employees', [
            CallTypeController::class, 'employees',
        ])->name('employees');

        Route::get('/{did_id}/search', [
            CallTypeController::class, 'search',
        ])->name('search');

        Route::get('/{did_id}/{id}', [
            CallTypeController::class, 'show',
        ])->name('show');

        Route::get('/{did_id}/employees/{id}', [
            CallTypeController::class, 'employee',
        ])->name('employees.show');

        Route::get('/create', [
            CallTypeController::class, 'create',
        ])->name('create');

        Route::post('/', [
            CallTypeController::class, 'store',
        ])->name('store');

        Route::get('/{calltype}/edit', [
            CallTypeController::class, 'edit',
        ])->name('edit');

        Route::put('/{calltype}', [
            CallTypeController::class, 'update',
        ])->name('update');

        Route::delete('/{calltype}', [
            CallTypeController::class, 'destroy',
        ])->name('destroy');
    });

    Route::group(['prefix' => 'scripts', 'as' => 'scripts.'], function () {
        Route::post('/{did_id}/{calltype_id}/{call_id}', [
            ScriptController::class, 'show',
        ])->name('show')->withoutMiddleware([VerifyCsrfToken::class]);
    });


    Route::group(['prefix' => 'accounts', 'as' => 'accounts.'], function () {
        Route::get('/', [
            AccountsController::class, 'index',
        ])->name('index');

        Route::get('/{account}', [
            AccountsController::class, 'show',
        ])->name('show');

        Route::delete('/{account}', [
            AccountsController::class, 'destroy',
        ])->name('destroy');
    });

    Route::group(['prefix' => 'didnumbers', 'as' => 'didnumbers.'], function () {
        Route::get('/', [DidNumberController::class, 'index'])->name('index');
        Route::get('/create', [DidNumberController::class, 'create'])->name('create');
        Route::get('/search', [DidNumberController::class, 'search'])->name('search');
        Route::get('/{id}', [DidNumberController::class, 'edit'])->name('edit');
        Route::patch('/{id}', [DidNumberController::class, 'update'])->name('update')->withoutMiddleware([VerifyCsrfToken::class]);
        Route::post('/', [DidNumberController::class, 'store'])->name('store');

        Route::get('/{id}/did-numbers', [DidNumberController::class, 'didNumbers'])->name('did-numbers');
        Route::post('/{id}/did-numbers', [DidNumberController::class, 'storeDidNumber'])->name('did-numbers.store');
        Route::get('/{id}/call-types', [DidNumberController::class, 'callTypes'])->name('call-types');
        Route::get('/{id}/contacts', [DidNumberController::class, 'contacts'])->name('contacts');
        Route::get('/{id}/on-call-schedules', [DidNumberController::class, 'onCallSchedules'])->name('on-call-schedules');
        Route::get('/{id}/calls', [DidNumberController::class, 'calls'])->name('calls');
        Route::get('/{id}/messages', [DidNumberController::class, 'messages'])->name('messages');
        Route::get('/{id}/advisements', [DidNumberController::class, 'advisements'])->name('advisements');
        Route::get('/{id}/edit-history', [DidNumberController::class, 'editHistory'])->name('edit-history');
        Route::get('/{id}/skills', [DidNumberController::class, 'skills'])->name('skills');
    });

    Route::group(['prefix' => 'reports', 'as' => 'reports.'], function () {
        Route::get('/', [ReportsController::class, 'index'])->name('index');
    });

    Route::group(['prefix' => 'call_logs', 'as' => 'call_logs.'], function () {
        Route::get('/', [CallLogController::class, 'index'])->name('index');
        Route::get('/{id}', [CallLogController::class, 'show'])->name('show');
    });

    Route::group(['prefix' => 'messages', 'as' => 'messages.'], function () {
        Route::get('/', function () {
            return Inertia::render('Messages/Index');
        })->name('index');
    });

    Route::group(['prefix' => 'complaints', 'as' => 'complaints.'], function () {
        Route::get('/', function () {
            return Inertia::render('Complaints/Index');
        })->name('index');
    });

    Route::group(['prefix' => 'mistakes', 'as' => 'mistakes.'], function () {
        Route::get('/', function () {
            return Inertia::render('Mistakes/Index');
        })->name('index');
    });

    Route::group(['prefix' => 'bulletins', 'as' => 'bulletins.'], function () {
        Route::get('/', function () {
            return Inertia::render('Bulletins/Index');
        })->name('index');
    });

    Route::group(['prefix' => 'inbox', 'as' => 'inbox.'], function () {
        Route::get('/', function () {
            return Inertia::render('Inbox/Index');
        })->name('index');
    });

    Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::get('/edit/{id}', [UsersController::class, 'edit'])->name('edit');
        Route::patch('/edit/{id}', [UsersController::class, 'update'])->name('update');
        Route::get('/create', [UsersController::class, 'create'])->name('create');
        Route::post('/store', [UsersController::class, 'store'])->name('store');
        Route::get('/search', [UsersController::class, 'search'])->name('search');

        Route::get('/{id}/queue_assignments', [UsersController::class, 'queueAssignments'])->name('queue-assignments');
        Route::get('/{id}/phrases', [UsersController::class, 'phrases'])->name('phrases');
        Route::get('/{id}/bio', [UsersController::class, 'bio'])->name('bio');
    });

    Route::group(['prefix' => 'user_phrases', 'as' => 'user_phrases.'], function () {
        Route::delete('/delete/{id}', [UserPhraseController::class, 'delete'])->name('delete');
        Route::put('/store', [UserPhraseController::class, 'store'])->name('store')->withoutMiddleware([VerifyCsrfToken::class]);
        Route::patch('/update/{id}', [UserPhraseController::class, 'update'])->name('update');
    });

    Route::group(['prefix' => 'roles', 'as' => 'roles.'], function () {
        Route::get('/', function () {
            return Inertia::render('Roles/Index');
        })->name('index');
    });

    Route::group(['prefix' => 'settings', 'as' => 'settings.'], function () {
        Route::get('/', [SettingsController::class, 'index'])->name('index');
    });

    Route::group(['prefix' => 'recent_calls', 'as' => 'recent_calls.'], function () {
        Route::get('/', function () {
            return Inertia::render('RecentCalls/Index');
        })->name('index');
    });
});

require __DIR__.'/settings.php';
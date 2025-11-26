<?php

namespace App\Providers;

use App\TaskRouter\WorkspaceFacade;
use Illuminate\Support\ServiceProvider;
use Twilio\Rest\Client;

class TwilioProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(Client::class, function ($app) {
            $config = config('services.twilio');
            
            abort_unless($config['account_sid'] ?? false, 500, 'TWILIO_ACCOUNT_SID is not set');
            abort_unless($config['auth_token'] ?? false, 500, 'TWILIO_AUTH_TOKEN is not set');
            
            return new Client($config['account_sid'], $config['auth_token']);
        });

        $this->app->singleton(WorkspaceFacade::class, function ($app) {
            $workspaceSid = config('services.twilio.workspace_sid');
            
            abort_unless($workspaceSid, 500, 'WORKSPACE_SID is not set');
            
            return WorkspaceFacade::createBySid(
                $app[Client::class]->taskrouter,
                $workspaceSid
            );
        });
    }

    public function provides(): array
    {
        return [Client::class, WorkspaceFacade::class];
    }
}

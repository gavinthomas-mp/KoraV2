<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;
use Twilio\Jwt\Grants\TaskRouterGrant;
use Illuminate\Support\Facades\Cache;

class TwilioController extends Controller
{
    public function getToken(Request $request)
    {
        $workspaceSid = config('services.twilio.workspace_sid');
        $workerSid = 'WK96a45ffd18a9f1c54ef409b8dd9a013a';
        $accountSid = config('services.twilio.account_sid');
        $apiKey = config('services.twilio.api_key');
        $apiSecret = config('services.twilio.api_secret');
        
        // Cache key unique to this user/worker
        $cacheKey = 'twilio_token_' . $workerSid;
        
        // Try to get token from cache, or generate new one
        $tokenData = Cache::remember($cacheKey, now()->addMinutes(50), function () use (
            $accountSid, 
            $apiKey, 
            $apiSecret, 
            $workspaceSid, 
            $workerSid
        ) {
            $accessToken = new AccessToken(
                $accountSid,
                $apiKey,
                $apiSecret,
                3600, // Token expires in 1 hour
                'gthomas'
            );

            $voiceGrant = new VoiceGrant();
            $voiceGrant->setOutgoingApplicationSid(config('services.twilio.voice_application_sid'));
            $voiceGrant->setIncomingAllow(true);
            $accessToken->addGrant($voiceGrant);

            $taskRouterGrant = new TaskRouterGrant();
            $taskRouterGrant->setWorkerSid($workerSid);
            $taskRouterGrant->setWorkspaceSid($workspaceSid);
            $taskRouterGrant->setRole('worker');
            $accessToken->addGrant($taskRouterGrant);

            return [
                'token' => $accessToken->toJWT(),
                'identity' => 'gthomas',
                'worker_sid' => $workerSid,
            ];
        });

        return response()->json($tokenData);
    }
}
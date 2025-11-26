<?php

namespace App\Http\Controllers;

use App\Exceptions\TaskRouterException;
use App\Models\MissedCall;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

/**
 * Class TwilioCallbackController Handles callbacks
 *
 * @package App\Http\Controllers
 */
class TwilioCallbackController extends Controller
{
    protected Client $twilioClient;

    protected string $agentDialCallbackUrl;
    
    protected string $voiceApiUrl;
}
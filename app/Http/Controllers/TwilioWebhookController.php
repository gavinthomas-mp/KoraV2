<?php
// app/Http/Controllers/TwilioWebhookController.php
namespace App\Http\Controllers;

use App\Models\Call;
use App\Services\CallRouterService;
use Illuminate\Http\Request;
use Twilio\TwiML\VoiceResponse;

class TwilioWebhookController extends Controller
{
    public function __construct(
        private CallRouterService $callRouter
    ) {}

    /**
     * Handle incoming call webhook
     */
    public function incoming(Request $request)
    {
        $response = new VoiceResponse();
        
        // Get skill ID from query parameter if provided
        $skillId = $request->query('skill_id');

        // Create call record
        $call = Call::create([
            'twilio_call_sid' => $request->input('CallSid'),
            'from_number' => $request->input('From'),
            'to_number' => $request->input('To'),
            'skill_id' => $skillId,
            'status' => 'queued',
        ]);

        // Find available operator
        $operator = $this->callRouter->findAvailableOperator($skillId);

        if ($operator) {
            // Assign call to operator
            $call->update([
                'operator_id' => $operator->id,
                'status' => 'ringing',
            ]);

            $this->callRouter->assignCall($operator);

            // Dial the operator
            $dial = $response->dial('', [
                'action' => route('twilio.call.status', $call->id),
                'method' => 'POST',
            ]);
            $dial->number($operator->phone, [
                'statusCallback' => route('twilio.call.events'),
                'statusCallbackEvent' => 'initiated ringing answered completed',
            ]);
        } else {
            // No operators available
            $response->say('We are sorry, all operators are currently busy. Please try again later.');
            $call->update(['status' => 'no_answer']);
        }

        return response($response, 200)->header('Content-Type', 'text/xml');
    }

    /**
     * Handle call status updates
     */
    public function status(Request $request, Call $call)
    {
        $dialCallStatus = $request->input('DialCallStatus');

        switch ($dialCallStatus) {
            case 'completed':
                $call->update([
                    'status' => 'completed',
                    'ended_at' => now(),
                    'duration' => $request->input('DialCallDuration'),
                ]);
                break;
            case 'busy':
            case 'no-answer':
            case 'failed':
                $call->update(['status' => 'no_answer']);
                break;
        }

        // Release operator
        if ($call->operator) {
            $this->callRouter->releaseOperator($call->operator);
        }

        return response('', 200);
    }

    /**
     * Handle call events (for real-time updates)
     */
    public function events(Request $request)
    {
        $callSid = $request->input('CallSid');
        $callStatus = $request->input('CallStatus');

        $call = Call::where('twilio_call_sid', $callSid)->first();

        if ($call) {
            switch ($callStatus) {
                case 'in-progress':
                    $call->update([
                        'status' => 'in_progress',
                        'started_at' => now(),
                    ]);
                    break;
                case 'completed':
                    $call->update([
                        'status' => 'completed',
                        'ended_at' => now(),
                        'duration' => $request->input('CallDuration'),
                    ]);
                    break;
            }

            // Broadcast event for real-time UI updates
            broadcast(new \App\Events\CallStatusUpdated($call));
        }

        return response('', 200);
    }
}
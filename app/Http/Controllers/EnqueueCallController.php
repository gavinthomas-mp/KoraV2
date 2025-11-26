<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\TwiML\VoiceResponse;

/**
 * Class EnqueueCallController
 *
 * @package App\Http\Controllers
 */
class EnqueueCallController extends Controller
{
    public function enqueueCall(Request $request)
    {
        $workflowSid = config('services.twilio.workflow_sid');
        
        if (!$workflowSid) {
            abort(500, 'WORKFLOW_SID is not configured');
        }

        $task = [
            'selected_product' => $this->getSelectedProduct($request)
        ];

        $response = new VoiceResponse();
        $enqueue = $response->enqueue('', ['workflowSid' => $workflowSid]);
        $enqueue->task(json_encode($task));

        return response($response, 200, ['Content-Type' => 'text/xml']);
    }

    /**
     * Gets the selected product based on user input
     *
     * @param Request $request
     * @return string
     */
    private function getSelectedProduct(Request $request): string
    {
        return $request->input('Digits') === '1'
            ? 'ProgrammableSMS'
            : 'ProgrammableVoice';
    }
}
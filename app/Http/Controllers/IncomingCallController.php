<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\TwiML\TwiML;

class IncomingCallController extends Controller
{
    public function handle(Request $request)
    {
        $twiml = new TwiML(
            '<?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Say voice="alice">Thank you for calling. Please wait while we connect you to an operator.</Say>
                <Dial>
                    <Queue>Support</Queue>
                </Dial>
            </Response>'
        );

        // Here you would add logic to enqueue the call or connect to an available operator

        return response($twiml)->header('Content-Type', 'application/xml');
    }
}

<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'twilio' => [
        'account_sid' => env('TWILIO_ACCOUNT_SID'),
        'auth_token' => env('TWILIO_AUTH_TOKEN'),
        'api_key' => env('TWILIO_API_KEY'),
        'api_secret' => env('TWILIO_API_SECRET'),
        'voice_application_sid' => env('TWILIO_VOICE_APPLICATION_SID'),
        'workflow_sid' => env('TWILIO_WORKFLOW_SID'),
        'workspace_sid' => env('TWILIO_WORKSPACE_SID'),
        'callbacks' => [
            'agent-dial' => env('TWILIO_CALLBACK_AGENT_DIAL_URL'),
            'call-status' => env('TWILIO_CALLBACK_CALL_STATUS_URL'),
        ],
        'api' => [
            'voice' => env('TWILIO_VOICE_API_URL', 'https://api.twilio.com/2010-04-01'),
        ]
    ],
];

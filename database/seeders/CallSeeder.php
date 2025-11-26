<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Call;

class CallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Call::create([
            'twilio_call_sid' => 'CA1234567890abcdef1234567890abcdef',
            'from_number' => '+1234567890',
            'to_number' => '+0987654321',
            'operator_id' => 1,
            'status' => 'completed',
            'duration' => 300,
            'started_at' => now()->subMinutes(10),
            'ended_at' => now()->subMinutes(5),
            'recording_url' => 'https://api.twilio.com/2010-04-01/Accounts/AC1234567890abcdef1234567890abcdef/Recordings/RE1234567890abcdef1234567890abcdef',
        ]);
        Call::create([
            'twilio_call_sid' => 'CAabcdef1234567890abcdef1234567890',
            'from_number' => '+1987654321',
            'to_number' => '+1234509876',
            'operator_id' => 2,
            'status' => 'in_progress',
            'duration' => null,
            'started_at' => now()->subMinutes(2),
            'ended_at' => null,
            'recording_url' => null,
        ]);
    }
}

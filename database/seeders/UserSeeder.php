<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'phone_number' => '+11234567890',
            'status' => 'available',
            'max_concurrent_calls' => 2,
            'twilio_worker_sid' => 'WK1234567890abcdef1234567890abcdef',
            'password' => bcrypt('password123'),
        ]);
        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane.smith@example.com',
            'phone_number' => '+10987654321',
            'status' => 'available',
            'max_concurrent_calls' => 1,
            'twilio_worker_sid' => 'WKabcdef1234567890abcdef1234567890',
            'password' => bcrypt('password123'),
        ]);
    }
}

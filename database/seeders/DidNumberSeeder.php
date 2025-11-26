<?php

namespace Database\Seeders;

use App\Models\DidNumber;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DidNumberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DidNumber::create([
            'number' => '+443304701704',
            'provider' => 'Twilio',
            'is_active' => true,
            'client_id' => 1,
        ]);
    }
}

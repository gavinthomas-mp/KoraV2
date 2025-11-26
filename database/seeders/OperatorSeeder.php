<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Operator;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Operator::create([
            'name' => 'Alice Johnson',
            'email' => 'alice.johnson@example.com',
            'phone_number' => '+1234567890'
        ]);
        Operator::create([
            'name' => 'Bob Smith',
            'email' => 'bob.smith@example.com',
            'phone_number' => '+0987654321'
        ]);
    }
}

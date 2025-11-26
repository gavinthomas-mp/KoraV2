<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Skill::create(['name' => 'Technical Support', 'description' => 'Technical issues']);
        Skill::create(['name' => 'Sales', 'description' => 'Sales inquiries']);
        Skill::create(['name' => 'Billing', 'description' => 'Billing questions']);
        Skill::create(['name' => 'General', 'description' => 'General inquiries']);
    }
}

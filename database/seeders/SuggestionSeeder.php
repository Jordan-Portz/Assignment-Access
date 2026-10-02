<?php

namespace Database\Seeders;

use App\Models\Suggestion;
use Illuminate\Database\Seeder;

class SuggestionSeeder extends Seeder
{
    public function run(): void
    {
        Suggestion::factory()->createMany([
            ['title' => 'Improve New Employee Onboarding', 'status' => 'under_review', 'category' => 'process', 'description' => 'Create a centralized onboarding checklist and resource hub for new employees to make the onboarding process more consistent.'],
            ['title' => 'Branch Accessibility Review', 'status' => 'implemented', 'category' => 'member_experience', 'description' => 'Conduct accessibility reviews of branches and identify improvements for members with mobility, hearing, or visual accessibility needs.'],
        ]);
    }
}

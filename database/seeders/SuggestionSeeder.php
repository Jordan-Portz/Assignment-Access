<?php

namespace Database\Seeders;

use App\Models\Suggestion;
use Illuminate\Database\Seeder;

class SuggestionSeeder extends Seeder
{
    public function run(): void
    {
        Suggestion::factory()->createMany([
            ['title' => 'Improve New Employee Onboarding', 'status' => 'under_review', 'category' => 'process', 'description' => 'Create a more structured onboarding process for new employees that provides them with a centralized checklist of everything they need during their first few weeks. This could include account setup, required training, introductions to key team members, access to internal systems, and an overview of important policies and procedures. A standardized onboarding process would help ensure that new employees receive the same information regardless of which department they join, while also reducing the amount of time existing employees spend manually coordinating onboarding tasks.'],
            ['title' => 'Branch Accessibility Review', 'status' => 'implemented', 'category' => 'member_experience', 'description' => 'Conduct accessibility reviews of branches and identify improvements for members with mobility, hearing, or visual accessibility needs.'],
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        Comment::factory()->createMany([
            ['suggestion_id' => 1, 'message' => 'A standardized checklist would make it much easier to ensure that new employees do not miss any important setup steps during their first few weeks.'],
            ['suggestion_id' => 1, 'message' => 'It would be helpful to include a section for department-specific training while keeping the core onboarding requirements consistent across the organization.'],
            ['suggestion_id' => 1, 'message' => 'I think this could save managers and existing team members a lot of time by reducing the amount of manual coordination required whenever someone new joins the team.'],
            ['suggestion_id' => 2, 'message' => 'This would be a great opportunity to identify smaller accessibility issues that may not be obvious to employees who use the branch every day.'],
            ['suggestion_id' => 2, 'message' => 'I would recommend getting feedback directly from members with different accessibility needs rather than relying only on an internal review.'],
            ['suggestion_id' => 2, 'message' => 'It would be useful to review entrances, teller counters, washrooms, signage, and waiting areas as part of the assessment.'],
            ['suggestion_id' => 2, 'message' => 'Improving accessibility could make the branch experience better for a much wider range of members, including seniors and members with temporary mobility limitations.'],
            ['suggestion_id' => 3, 'message' => 'This would make the application process much more convenient for members who are unable to visit a branch during business hours.'],
            ['suggestion_id' => 3, 'message' => 'A secure upload option would also make it easier for employees to keep documents associated with the correct application or member request.'],
            ['suggestion_id' => 3, 'message' => 'It would be important to clearly communicate which file types and maximum file sizes are supported so members know what they can upload.'],
            ['suggestion_id' => 3, 'message' => 'I think this could significantly reduce the number of documents being sent through email and make the process more secure at the same time.'],
            ['suggestion_id' => 3, 'message' => 'It would be useful if members could see the status of their uploaded documents so they know whether the files were successfully received and reviewed.'],
            ['suggestion_id' => 4, 'message' => 'The additional steps may be inconvenient, but they help protect member accounts. I would not recommend making the recovery process easier at the expense of security.'],
        ]);
    }
}

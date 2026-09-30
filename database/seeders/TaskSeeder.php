<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::factory()->createMany([
            ['title' => 'Set up project repository', 'status' => 'done', 'description' => 'Initialize the repo, add a README, and push the initial commit.'],
            ['title' => 'Design database schema', 'status' => 'done', 'description' => 'Define the tables and relationships needed for the application.'],
            ['title' => 'Build API endpoints', 'status' => 'in_progress', 'description' => 'Implement the REST API routes for the core features.'],
            ['title' => 'Implement frontend UI', 'status' => 'in_progress', 'description' => 'Build the React components and wire them up to the API.'],
            ['title' => 'Write unit tests', 'status' => 'todo', 'description' => 'Cover key business logic with unit and feature tests.'],
            ['title' => 'Add input validation', 'status' => 'todo', 'description' => null],
            ['title' => 'Deploy to staging', 'status' => 'todo', 'description' => 'Configure the Docker environment and deploy for review.'],
        ]);
    }
}

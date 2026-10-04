<?php

namespace Database\Seeders;

use App\Models\Vote;
use Illuminate\Database\Seeder;

class VoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vote::factory()->createMany([
            ['suggestion_id' => 1, 'user_id' => 1, 'vote' => -1],
            ['suggestion_id' => 2, 'user_id' => 1, 'vote' => 1],
        ]);
        
    }
}

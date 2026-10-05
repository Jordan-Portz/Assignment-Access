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
        Vote::factory()->count(50)->make()
            ->unique(fn (Vote $vote) => "{$vote->suggestion_id}:{$vote->user_id}")
            ->each(fn (Vote $vote) => $vote->save());
    }
}

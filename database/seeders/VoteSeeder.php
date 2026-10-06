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
            ->unique(function (Vote $vote) {
                return "{$vote->suggestion_id}:{$vote->user_id}";
            })
            ->each(function (Vote $vote) {
                $vote->save();
            });
    }
}

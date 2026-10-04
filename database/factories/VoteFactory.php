<?php

namespace Database\Factories;

use App\Models\Vote;
use App\Models\Suggestion;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'suggestion_id' => Suggestion::factory(),
            'user_id' => User::factory(),
            'vote' => $this->faker->randomElement([-1, 1]),
        ];
    }
}


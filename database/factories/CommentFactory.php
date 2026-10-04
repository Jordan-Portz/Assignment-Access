<?php

namespace Database\Factories;

use App\Models\Suggestion;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'suggestion_id' => Suggestion::query()->inRandomOrder()->firstOrFail()->id,
            'user_id' => User::query()->inRandomOrder()->value('id') ?? User::factory(),
            'message' => $this->faker->paragraph(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Suggestion;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'suggestion_id' => Suggestion::factory(),
            'message' => $this->faker->paragraph(),
        ];
    }
}

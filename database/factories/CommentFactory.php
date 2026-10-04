<?php

namespace Database\Factories;

use App\Models\Suggestion;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'suggestion_id' => Suggestion::query()->inRandomOrder()->firstOrFail()->id,
            'message' => $this->faker->paragraph(),
        ];
    }
}

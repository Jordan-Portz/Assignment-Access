<?php

namespace Database\Factories;

use App\Enums\SuggestionStatus;
use App\Enums\SuggestionCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class SuggestionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4, false),
            'description' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(SuggestionStatus::cases()),
            'category' => $this->faker->randomElement(SuggestionCategory::cases()),
        ];
    }
}

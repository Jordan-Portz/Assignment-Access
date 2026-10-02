<?php

namespace Database\Seeders;

use App\Models\Suggestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SuggestionSeeder::class,
            CommentSeeder::class,
        ]);
    }
}

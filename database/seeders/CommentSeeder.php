<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        Comment::factory()->createMany([
            ['suggestion_id' => 1, 'message' => 'Wow this is such a good idea!'],
        ]);
        Comment::factory()->count(20)->create(); 
    }
}

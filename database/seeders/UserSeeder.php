<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->createMany([
            ['email' => 'test@example.com', 'name' => 'Test User', 'password' => 'test', 'is_supervisor' => true],
        ]);
        User::factory()->count(20)->create();
    }
}

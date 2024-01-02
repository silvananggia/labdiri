<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $this->call([
            RolesSeeder::class,
            UsersSeeder::class,
            PagesTableSeeder::class,
            SlidersTableSeeder::class,
            // Add other seeders here if needed
        ]);

    }
}

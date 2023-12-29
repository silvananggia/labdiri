<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Roles;

class RolesSeeder extends Seeder
{
    public function run()
    {
        // Add the roles
        $roles = ['admin', 'manajer', 'koordinator', 'manajer_alat', 'public'];

        foreach ($roles as $roleName) {
            // Check if the role already exists
            $existingRole = Roles::where('name', $roleName)->first();

            if (!$existingRole) {
                Roles::create(['name' => $roleName]);
                $this->command->info("Role '{$roleName}' created.");
            } else {
                $this->command->info("Role '{$roleName}' already exists. Skipping.");
            }
        }
    }
}

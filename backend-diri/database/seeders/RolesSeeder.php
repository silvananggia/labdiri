<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Roles;

class RolesSeeder extends Seeder
{
    public function run()
    {
        // Add the roles
        $roles = ['administrator', 'manajer', 'koordinator', 'manajer_alat', 'public'];

        foreach ($roles as $roleName) {
            Roles::create(['name' => $roleName]);
            $this->command->info("Role '{$roleName}' created.");
        }
    }
}

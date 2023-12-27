<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Roles;

class UsersSeeder extends Seeder
{
    public function run()
    {
        // Create a user with the username 'silv007'
        $userSilv007 = User::create([
            'userintra' => 'silv007',
            // Add other user fields as needed
        ]);

        $this->command->info("User 'silv007' created.");

        // Attach the 'administrator' role to the user 'silv007'
        $adminRole = Roles::where('name', 'administrator')->first();

        if ($adminRole) {
            $userSilv007->update(['role_id' => $adminRole->id]);
            $this->command->info("User 'silv007' assigned to the 'administrator' role.");
        } else {
            $this->command->error("Role 'administrator' not found. Make sure to run the RolesSeeder first.");
        }

        // Create another user with the username 'gela001'
        $userGela001 = User::create([
            'userintra' => 'gela001',
            // Add other user fields as needed
        ]);

        $this->command->info("User 'gela001' created.");

        // Attach the 'administrator' role to the user 'gela001'
        if ($adminRole) {
            $userGela001->update(['role_id' => $adminRole->id]);
            $this->command->info("User 'gela001' assigned to the 'administrator' role.");
        } else {
            $this->command->error("Role 'administrator' not found. Make sure to run the RolesSeeder first.");
        }
    }
}

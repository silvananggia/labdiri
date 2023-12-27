<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Lab;
use App\Models\User;
use App\Models\Roles;

class FetchLaboratoriumData extends Command
{
    protected $signature = 'fetch:laboratorium-data';
    protected $description = 'Fetch laboratorium data from API and save/update in the database';

    public function handle()
    {
        $url = 'https://testapi.brin.go.id/elsa/laboratorium/all';
        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json()['data'];

            foreach ($data as $item) {
                // Map the API field name to the local field name
                $item['idlabelsa'] = $item['id'];

                // Unset the original API field name to avoid duplicate data
                unset($item['id']);

                // Check if the record already exists in the database based on the 'idlabelsa' field
                $existingRecord = Lab::where('idlabelsa', $item['idlabelsa'])->first();

                if ($existingRecord) {
                    // Check if data has changed by comparing a checksum
                    $newChecksum = md5(serialize($item));
                    $oldChecksum = $existingRecord->checksum;

                    if ($newChecksum !== $oldChecksum) {
                        // Data has changed, update the record
                        $existingRecord->fill($item);
                        $existingRecord->checksum = $newChecksum; // Update the checksum
                        $existingRecord->save();
                        $this->info("Record with ID {$item['idlabelsa']} updated.");
                    } else {
                        $this->info("Record with ID {$item['idlabelsa']} has not changed.");
                    }
                } else {
                    // If the record does not exist, insert it
                    $createdRecord = Lab::create($item);
                    $this->info("Record with ID {$item['idlabelsa']} added.");

                    // Associate roles with users based on the provided usernames
                    $this->associateRoles($createdRecord, $item);
                }
            }

            // Check and update roles if necessary
            $this->checkAndUpdateRoles();

            $this->info('Data fetched and saved/updated successfully.');
        } else {
            $this->error('Failed to fetch data from the API.');
        }
    }
    protected function associateRoles($record, $item)
    {
        $usernames = [
            'manajer' => $item['usernameintra_manajer'],
            'koordinator' => $item['usernameintra_koordinator'],
            'manajer_alat' => $item['usernameintra_manajer_alat'],
        ];

        foreach ($usernames as $roleName => $username) {
            if ($username) {
                $user = User::where('userintra', $username)->first();

                if (!$user) {
                    // If the user does not exist, create a new user
                    $user = User::create([
                        'userintra' => $username,
                        // Add other user fields as needed
                    ]);

                    $this->info("User with username {$username} created.");
                }

                // Find or create the role
                $role = Roles::firstOrCreate(['name' => $roleName]);

                // Check if the user's current role is different from the one we want to associate
                if ($user->role_id != $role->id) {
                    // Update the user's role only if it has changed
                    $user->update(['role_id' => $role->id]);
                    $this->info("User with username {$username} role updated to '{$roleName}'.");
                } else {
                    $this->info("User with username {$username} already assigned to role '{$roleName}'.");
                }
            }
        }
    }

    protected function checkAndUpdateRoles()
    {
        $rolesFromAPI = ['manajer', 'koordinator', 'manajer_alat'];

        foreach ($rolesFromAPI as $roleName) {
            // Check if the role exists in the database
            $role = Roles::where('name', $roleName)->first();

            if (!$role) {
                // If the role does not exist, create it
                Roles::create(['name' => $roleName]);
                $this->info("Role '{$roleName}' created.");
            }
        }
    }
}

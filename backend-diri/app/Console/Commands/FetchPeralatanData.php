<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Peralatan;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class FetchPeralatanData extends Command
{
    protected $signature = 'fetch:peralatan';
    protected $description = 'Fetch peralatan data from the API';

    public function handle()
    {

        $url = 'https://testapi.brin.go.id/elsa/peralatan/all';
        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json()['data'];

            foreach ($data as $item) {
             // Map the API field name to the local field name
             $item['idalatelsa'] = $item['id'];

             // Unset the original API field name to avoid duplicate data
             unset($item['id']);

             // Generate a UUID for the "id" column
             $item['id'] = Str::uuid();

             // Check if the record already exists in the database based on the 'idalatelsa' field
             $existingRecord = Peralatan::where('idalatelsa', $item['idalatelsa'])->first();

                if ($existingRecord) {
                    // Check if data has changed by comparing a checksum
                    $newChecksum = md5(serialize($item));
                    $oldChecksum = $existingRecord->checksum;

                    if ($newChecksum !== $oldChecksum) {
                        // Data has changed, update the record
                        $existingRecord->fill($item);
                        $existingRecord->checksum = $newChecksum; // Update the checksum
                        $existingRecord->save();
                        $this->info("Record with ID {$item['idalatelsa']} updated.");
                    } else {
                        $this->info("Record with ID {$item['idalatelsa']} has not changed.");
                    }
                } else {
                    // If the record does not exist, insert it
                    $createdRecord = Peralatan::create($item);
                    $this->info("Record with ID {$item['idalatelsa']} added.");


                }
            }


            $this->info('Data fetched and saved/updated successfully.');
        } else {
            $this->error('Failed to fetch data from the API.');
        }
    }

}

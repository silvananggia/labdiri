<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class EquipmentController extends Controller
{
    public function getAllEquipment()
    {
        try {
            // Make a GET request to the API endpoint for equipment
            $response = Http::get(env('API_AUTH') . '/elsa/peralatan/all');

            // Check if the request was successful (status code 2xx)
            if ($response->successful()) {
                // Decode the JSON response
                $apiResponse = $response->json();

                // Access the 'data' key from the response
                $equipment = $apiResponse['data'];

                return response()->json(['success' => true, 'data' => $equipment]);
            } else {
                // Handle the case where the request was not successful
                return response()->json(['success' => false, 'message' => 'Failed to fetch data from the API'], $response->status());
            }
        } catch (\Exception $e) {
            // Handle exceptions if any occur during the request
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function getEquipmentById($id)
    {
        try {
            // Make a GET request to the API endpoint for equipment
            $response = Http::get(env('API_AUTH') .'/elsa/peralatan/all');

            // Check if the request was successful (status code 2xx)
            if ($response->successful()) {
                // Decode the JSON response
                $apiResponse = $response->json();

                // Find the equipment with the specified ID
                $equipment = collect($apiResponse['data'])->firstWhere('id', $id);

                if ($equipment) {
                    return response()->json(['success' => true, 'data' => $equipment]);
                } else {
                    return response()->json(['success' => false, 'message' => 'Equipment not found.'], 404);
                }
            } else {
                // Handle the case where the request was not successful
                return response()->json(['success' => false, 'message' => 'Failed to fetch data from the API'], $response->status());
            }
        } catch (\Exception $e) {
            // Handle exceptions if any occur during the request
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function getEquipmentBySatuanKerjaId($id)
    {
        try {
            // Make a GET request to the API endpoint for equipment
            $response = Http::get(env('API_AUTH') . '/elsa/peralatan/all');

            // Check if the request was successful (status code 2xx)
            if ($response->successful()) {
                // Decode the JSON response
                $apiResponse = $response->json();

                // Find all equipment with the specified satuan_kerja_id
                $equipment = collect($apiResponse['data'])
                    ->where('satuan_kerja_id', $id)
                    ->values();

                if ($equipment->isNotEmpty()) {
                    return response()->json(['success' => true, 'data' => $equipment]);
                } else {
                    return response()->json(['success' => false, 'message' => 'No equipment found for the specified satuan_kerja_id.'], 404);
                }
            } else {
                // Handle the case where the request was not successful
                return response()->json(['success' => false, 'message' => 'Failed to fetch data from the API'], $response->status());
            }
        } catch (\Exception $e) {
            // Handle exceptions if any occur during the request
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}

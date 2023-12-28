<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Str;
use App\Models\User;
use App\Models\Lab;
use App\Models\LabDetail;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\LaboratoriumResource;


class LabController extends BaseController
{
    public function getAllLab()
    {
        try {

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $labs = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab.deskripsi', 'lab_detail.status')
                ->get();

            // Loop through the labs and add data to lab_detail if it doesn't exist
            foreach ($labs as $lab) {
                if ($lab->status === null) {
                    // If lab_detail doesn't exist, add data to lab_detail
                    $newLabDetail = new LabDetail([

                        'idlab' => $lab->lab_id, // Assuming 'idlab' is the foreign key in lab_detail
                        'status' => 'non-aktif',
                    ]);

                    $newLabDetail->save();
                }
            }

            return $this->sendResponse(LaboratoriumResource::collection($labs), 'Data retrieved successfully.');


        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function getLabById($id)
    {
        try {
            // Make a GET request to the API endpoint

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $labs = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab.deskripsi', 'lab_detail.status')
                ->firstWhere('lab.idlabelsa', $id);

            // Loop through the labs and add data to lab_detail if it does

            return response()->json(['success' => true, 'data' => $labs]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function showbykategori($id): JsonResponse
    {

        if ($id === "all") {
            $laboratorium = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
            ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab.deskripsi', 'lab_detail.status')
            ->get();
        } else {
            $laboratorium = Lab::with(['kategorilab', 'lokasi', 'alat'])->where('idkategori', $id)->get();

        }



        if ($laboratorium->isEmpty()) {
            return $this->sendError('Data not found.', 404); // Return a 404 Not Found status code.
        }

        $transformedData = $laboratorium->map(function ($lab) {
            return new LaboratoriumResource($lab);
        });

        return $this->sendResponse($transformedData, 'Data retrieved successfully.');
    }
}

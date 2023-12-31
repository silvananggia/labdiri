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
use App\Http\Resources\LabListResource;
use App\Http\Resources\LokasiListResource;


class LabController extends BaseController
{
    public function listLab()
    {
        try {

            $labs = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab_detail.status')
                ->get();



            return $this->sendResponse(LabListResource::collection($labs), 'Data retrieved successfully.');


        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function listLokasi()
    {
        try {

            $labs = Lab::distinct('lokasi_kawasan')->get();



            return $this->sendResponse(LokasiListResource::collection($labs), 'Data retrieved successfully.');


        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
    public function getAllLab()
    {
        try {
            $perPage = request('limit', 10); // Get the requested limit from the request, default to 10 if not provided
            $page = request('page', 1); // Get the requested page from the request

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $labs = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab.deskripsi', 'lab_detail.status')
                ->paginate($perPage, ['*'], 'page', $page);

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

            // return $this->sendResponse(LaboratoriumResource::collection($labs), 'Data retrieved successfully.');
            return $this->sendResponse([
                'data' => LaboratoriumResource::collection($labs),
                'pagination' => [
                    'total' => $labs->total(),
                    'per_page' => $labs->perPage(),
                    'current_page' => $labs->currentPage(),
                    'last_page' => $labs->lastPage(),
                    'from' => $labs->firstItem(),
                    'to' => $labs->lastItem(),
                ],
            ], 'Data retrieved successfully.');

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function getLabById($id): JsonResponse
    {
        try {
            // Make a GET request to the API endpoint

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $labs = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab.deskripsi', 'lab_detail.status')
                ->where('lab.idlabelsa', $id)
                ->get();

            // Loop through the labs and add data to lab_detail if it does

            return $this->sendResponse(LaboratoriumResource::collection($labs), 'Data retrieved successfully.');

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function showbykategori($id): JsonResponse
    {
        $perPage = request('limit', 10); // Get the requested limit from the request, default to 10 if not provided
        $page = request('page', 1); // Get the requested page from the request


        if ($id === "all") {
            $labs = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab.deskripsi', 'lab_detail.status')
                ->paginate($perPage, ['*'], 'page', $page);
        } else {
            $labs = Lab::with(['kategorilab', 'lokasi', 'alat'])->where('idkategori', $id)->get();

        }



        return $this->sendResponse([
            'data' => LaboratoriumResource::collection($labs),
            'pagination' => [
                'total' => $labs->total(),
                'per_page' => $labs->perPage(),
                'current_page' => $labs->currentPage(),
                'last_page' => $labs->lastPage(),
                'from' => $labs->firstItem(),
                'to' => $labs->lastItem(),
            ],
        ], 'Data retrieved successfully.');

    }

    public function searchLab()
    {
        try {
            $perPage = request('limit', 10); // Get the requested limit from the request, default to 10 if not provided
            $page = request('page', 1);  // Get the requested limit from the request, default to 10 if not provided
            $nama = request('nama', null);
            $lokasi = request('lokasi', null);

            $labQuery = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa AS lab_id', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab.deskripsi', 'lab_detail.status');

            if ($nama) {
                $labQuery->whereRaw('LOWER(lab.nama) like ?', ["%" . strtolower($nama) . "%"]);
            }

            if ($lokasi) {
                $labQuery->whereRaw('LOWER(lab.lokasi_kawasan) = ?', [strtolower($lokasi)]);
            }

            $labs = $labQuery->paginate($perPage, ['*'], 'page', $page);

            // Loop through the labs and add data to lab_detail if it does

            return $this->sendResponse([
                'data' => LaboratoriumResource::collection($labs),
                'pagination' => [
                    'total' => $labs->total(),
                    'per_page' => $labs->perPage(),
                    'current_page' => $labs->currentPage(),
                    'last_page' => $labs->lastPage(),
                    'from' => $labs->firstItem(),
                    'to' => $labs->lastItem(),
                ],
            ], 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}

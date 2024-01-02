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
use App\Http\Resources\LaboratoriumDetailResource;
use App\Http\Resources\LabListResource;
use App\Http\Resources\LokasiListResource;


class LabController extends BaseController
{
    public function listLab()
    {
        try {

            $labs = Lab::leftJoin('lab_detail', 'lab.idlabelsa', '=', 'lab_detail.idlab')
                ->select('lab.idlabelsa', 'lab.satuan_kerja_id', 'lab.lokasi_kawasan', 'lab.nama', 'lab_detail.status')
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
            $labs = Lab::with('labdetail')
            ->paginate($perPage, ['*'], 'page', $page);
            // Loop through the labs and add data to lab_detail if it doesn't exist


            // return $this->sendResponse(LaboratoriumResource::collection($labs), 'Data retrieved successfully.');
            return $this->sendResponse([
                'data' => LaboratoriumResource::collection($labs),
                'metadata' => [
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

            $lab = Lab::where('lab.idlabelsa', $id)->first();

            if (!$lab) {
                return response()->json(['success' => false, 'message' => 'Lab not found.'], 404);
            }

            $labDetail = $lab->labDetail;
            if (!$labDetail) {
                $labDetail = $lab->labDetail()->create([
                    'idlab' => $lab->lab_id, // Assuming 'idlab' is the foreign key in lab_detail
                    'status' => 'non-aktif',
                ]);
            }

            $labData = new LaboratoriumDetailResource($lab);

            return $this->sendResponse($labData, 'Data retrieved successfully.');


        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function showbykategori($id): JsonResponse
    {
        $perPage = request('limit', 10); // Get the requested limit from the request, default to 10 if not provided
        $page = request('page', 1); // Get the requested page from the request


        if ($id === "all") {
            $labs = Lab::with('labdetail')
                ->paginate($perPage, ['*'], 'page', $page);
        } else {
            $labs = Lab::with(['kategorilab', 'labdetail', 'alat'])->where('idkategori', $id)->get();

        }



        return $this->sendResponse([
            'data' => LaboratoriumResource::collection($labs),
            'metadata' => [
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

            $labQuery = Lab::with('labdetail');
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
                'metadata' => [
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

    public function update(Request $request, $id)
    {


        $laboratorium = LabDetail::where('idlab', $id)->first();

        if (!$laboratorium) {
            return $this->sendError('LabDetail not found.', 404);
        }

        $laboratorium->idkategori = $request->idkategori;
        $laboratorium->tusi = $request->tusi;
        $laboratorium->posisi_strategis = $request->posisi_strategis;
        $laboratorium->sdm = $request->sdm;
        $laboratorium->status = $request->status;
        $laboratorium->save();

        if ($images = $request->images) {
            $laboratorium->clearMediaCollection('laboratorium');
            foreach ($images as $image) {
                $laboratorium->addMedia($image)->toMediaCollection('laboratorium');
            }
        }


        return $this->sendResponse(new LaboratoriumResource($laboratorium), 'Data updated successfully.');
    }

}

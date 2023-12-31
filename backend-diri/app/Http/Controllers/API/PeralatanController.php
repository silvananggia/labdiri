<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Str;
use App\Models\User;
use App\Models\Peralatan;
use App\Models\PeralatanDetail;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\AlatResource;
use App\Http\Resources\AlatDetailResource;

class PeralatanController extends BaseController
{
    public function getAllPeralatan(): JsonResponse
    {
        try {

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $peralatans = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select('peralatan.idalatelsa AS alat_id', 'peralatan.satuan_kerja_id', 'peralatan.kode_barang', 'peralatan.nama_barang', 'peralatan.merk', 'peralatan.kondisi', 'peralatan_detail.status_ketersediaan', 'lab.nama AS nama_lab', 'lab.lokasi_kawasan')
                ->limit(10)
                ->get();
            /*
                        // Loop through the labs and add data to lab_detail if it doesn't exist
                        foreach ($peralatans as $peralatan) {
                            // Check if lab_detail doesn't exist for the current equipment
                            if ($peralatan->status_ketersediaan === null) {
                                // If lab_detail doesn't exist, add data to lab_detail
                                $newLabDetail = new PeralatanDetail([
                                    'idalat' => $peralatan->alat_id, // Assuming 'idalat' is the foreign key in peralatan_detail
                                    'status_ketersediaan' => 'non-aktif', // Adjusted field name based on the select statement
                                    // Add other fields if needed
                                ]);

                                // Check if the checksum exists before saving
                                $existingChecksum = PeralatanDetail::where('idalat', $peralatan->alat_id)->pluck('checksum')->first();

                                if (!$existingChecksum) {
                                    // If checksum doesn't exist, generate and add it
                                    $newLabDetail->checksum = md5(serialize($newLabDetail->toArray())); // Example checksum calculation, adjust based on your needs
                                    $newLabDetail->save();
                                }
                            }
                        } */
            return $this->sendResponse(AlatResource::collection($peralatans), 'Data retrieved successfully.');

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function getPeralatanById($id)
    {
        try {
            // Make a GET request to the API endpoint

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $peralatans = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select(
                    'peralatan.idalatelsa AS alat_id',
                    'peralatan.satuan_kerja_id',
                    'peralatan.kode_barang',
                    'peralatan.nup',
                    'peralatan.nama_barang',
                    'peralatan.merk',
                    'peralatan.tahun_perolehan',
                    'peralatan.kondisi',
                    'peralatan_detail.spesifikasi',
                    'peralatan_detail.fungsi',
                    'peralatan_detail.deskripsi',
                    'peralatan_detail.fungsi',
                    'peralatan_detail.deskripsi',
                    'peralatan_detail.dimensi',
                    'peralatan_detail.harga_perolehan',
                    'peralatan_detail.keterangan',
                    'lab.nama AS nama_lab',
                    'lab.lokasi_kawasan')
                ->where('peralatan.idalatelsa', $id)

                ->get();

            // Loop through the labs and add data to lab_detail if it does

            return $this->sendResponse(AlatDetailResource::collection($peralatans), 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function showbylab($idlab): JsonResponse
    {
        $perPage = request('limit', 10); // Get the requested limit from the request, default to 10 if not provided
        $page = request('page', 1); // Get the requested page from the request
        $random = request()->has('rand') && filter_var(request('rand'), FILTER_VALIDATE_BOOLEAN);




        if ($idlab === "all") {
            $query = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
            ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
            ->select('peralatan.idalatelsa AS alat_id', 'peralatan.satuan_kerja_id', 'peralatan.kode_barang', 'peralatan.nama_barang', 'peralatan.merk', 'peralatan.kondisi', 'peralatan_detail.status_ketersediaan', 'lab.nama AS nama_lab', 'lab.lokasi_kawasan');
            if ($random) {
                $query->inRandomOrder();
            }

            $alat = $query->paginate($perPage, ['*'], 'page', $page);

        } else {
            $alat = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select(
                    'peralatan.idalatelsa AS alat_id',
                    'peralatan.satuan_kerja_id',
                    'peralatan.kode_barang',
                    'peralatan.nama_barang',
                    'peralatan.merk',
                    'peralatan.kondisi',
                    'peralatan_detail.status_ketersediaan',
                    'lab.idlabelsa',
                    'lab.nama AS nama_lab',
                    'lab.lokasi_kawasan'
                )
                ->where('lab.idlabelsa', $idlab)
                ->paginate($perPage, ['*'], 'page', $page);
        }

        // return response()->json(['success' => true, 'data' => $alat]);
        return $this->sendResponse([
            'data' => AlatResource::collection($alat),
            'pagination' => [
                'total' => $alat->total(),
                'per_page' => $alat->perPage(),
                'current_page' => $alat->currentPage(),
                'last_page' => $alat->lastPage(),
                'from' => $alat->firstItem(),
                'to' => $alat->lastItem(),
            ],
        ], 'Data retrieved successfully.');
    }

    public function searchPeralatan()
    {
        try {
            $perPage = request('limit', 10); // Get the requested limit from the request, default to 10 if not provided
            $page = request('page', 1); // Get the requested page from the request
            $idlab = request('idlab', null); // Get the requested limit from the request, default to 10 if not provided
            $nama = request('nama', null);
            $lokasi = request('lokasi', null);

            $alatQuery = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select(
                'peralatan.idalatelsa AS alat_id',
                'peralatan.satuan_kerja_id',
                'peralatan.kode_barang',
                'peralatan.nup',
                'peralatan.nama_barang',
                'peralatan.merk',
                'peralatan.tahun_perolehan',
                'peralatan.kondisi',
                'peralatan_detail.spesifikasi',
                'peralatan_detail.fungsi',
                'peralatan_detail.deskripsi',
                'peralatan_detail.fungsi',
                'peralatan_detail.deskripsi',
                'peralatan_detail.dimensi',
                'peralatan_detail.harga_perolehan',
                'peralatan_detail.keterangan',
                'lab.idlabelsa',
                'lab.nama AS nama_lab',
                'lab.lokasi_kawasan'
            );

            if ($nama) {
                $alatQuery->whereRaw('LOWER(peralatan.nama_barang) like ?', ["%" . strtolower($nama) . "%"]);
            }

            if ($idlab) {
                $alatQuery->where('lab.idlabelsa', $idlab);
            }

            if ($lokasi) {
                $alatQuery->whereRaw('LOWER(lab.lokasi_kawasan) = ?', [strtolower($lokasi)]);
            }

            $alat = $alatQuery->paginate($perPage, ['*'], 'page', $page);

            // Loop through the labs and add data to lab_detail if it does

            return $this->sendResponse([
                'data' => AlatResource::collection($alat),
                'pagination' => [
                    'total' => $alat->total(),
                    'per_page' => $alat->perPage(),
                    'current_page' => $alat->currentPage(),
                    'last_page' => $alat->lastPage(),
                    'from' => $alat->firstItem(),
                    'to' => $alat->lastItem(),
                ],
            ], 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}

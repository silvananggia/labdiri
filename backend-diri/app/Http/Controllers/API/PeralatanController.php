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
    public function getAllPeralatan()
    {
        try {

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $peralatans = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select('peralatan.idalatelsa AS alat_id', 'peralatan.satuan_kerja_id', 'peralatan.kode_barang', 'peralatan.nama_barang', 'peralatan.merk', 'peralatan.kondisi', 'peralatan_detail.status_ketersediaan', 'lab.nama AS nama_lab', 'lab.lokasi_kawasan')
                ->get();

            // Loop through the labs and add data to lab_detail if it doesn't exist
            foreach ($peralatans as $peralatan) {
                if ($peralatan->status === null) {
                    // If lab_detail doesn't exist, add data to lab_detail
                    $newLabDetail = new PeralatanDetail([

                        'idalat' => $peralatan->alat_id, // Assuming 'idlab' is the foreign key in lab_detail
                        'status' => 'non-aktif',
                    ]);

                    $newLabDetail->save();
                }
            }

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
        if ($idlab === "all") {
            $alat = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select('peralatan.idalatelsa AS alat_id', 'peralatan.satuan_kerja_id', 'peralatan.kode_barang', 'peralatan.nama_barang', 'peralatan.merk', 'peralatan.kondisi', 'peralatan_detail.status_ketersediaan', 'lab.nama AS nama_lab', 'lab.lokasi_kawasan')

                ->get();
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

                ->get();
        }

        // return response()->json(['success' => true, 'data' => $alat]);
        return $this->sendResponse(AlatResource::collection($alat), 'Data retrieved successfully.');
    }
}

<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Str;
use App\Models\User;
use App\Models\Peralatan;
use App\Models\PeralatanDetail;
use App\Models\Lab;

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
            $perPage = request('limit', 10); // Get the requested limit from the request, default to 10 if not provided
            $page = request('page', 1); // Get the requested page from the request
            $search = request('search', null);

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $alatQuery = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select('peralatan.idalatelsa', 'peralatan.satuan_kerja_id', 'peralatan.kode_barang', 'peralatan.nama_barang', 'peralatan.merk', 'peralatan.kondisi', 'peralatan_detail.status', 'lab.nama AS nama_lab', 'lab.lokasi_kawasan')
                ;

            if ($search) {
                    $alatQuery->whereRaw('LOWER(peralatan.nama_barang) like ?', ["%" . strtolower($search) . "%"]);
                }

                $alat = $alatQuery->paginate($perPage, ['*'], 'page', $page);

            return $this->sendResponse([
                'data' => AlatResource::collection($alat),
                'metadata' => [
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

    public function getPeralatanById($id): JsonResponse
    {
        try {
            // Make a GET request to the API endpoint

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $peralatan = Peralatan::where('peralatan.idalatelsa', $id)
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->first(['peralatan.*', 'lab.nama AS nama_lab',
                    'lab.lokasi_kawasan']);

            if (!$peralatan) {
                return response()->json(['success' => false, 'message' => 'Alat not found.'], 404);
            }

            $peralatanDetail = $peralatan->peralatanDetail;

            if (!$peralatanDetail) {
                // Assuming 'idlab' is the foreign key in peralatandetail
                $peralatanDetail = $peralatan->peralatanDetail()->create([
                    'idalat' => $peralatan->idalatelsa,
                    'status' => "non-aktif",

                    // Add other fields as needed
                ]);
            }

            $peralatanData = new AlatDetailResource($peralatan);
            return $this->sendResponse($peralatanData, 'Data retrieved successfully.');

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
            $query = Peralatan::with('peralatandetail')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select('peralatan.*', 'lab.nama AS nama_lab', 'lab.lokasi_kawasan');
            if ($random) {
                $query->inRandomOrder();
            }

            $alat = $query->paginate($perPage, ['*'], 'page', $page);

        } else {
            $alat = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
                ->select(
                    'peralatan.idalatelsa',
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
            'metadata' => [
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
                'metadata' => [
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

    public function update(Request $request, $id)
    {
        try {
            $alat = PeralatanDetail::where('idalat', $id)->first();

            if (!$alat) {
                return $this->sendError('LabDetail not found.', 404);
            }

            $alat->spesifikasi = $request->spesifikasi;
            $alat->fungsi = $request->fungsi;
            $alat->deskripsi = $request->deskripsi;
            $alat->keterangan = $request->keterangan;
            $alat->dimensi = $request->dimensi;
            $alat->kondisi = $request->kondisi;
            $alat->noseri = $request->noseri;
            $alat->sumber_tenaga = $request->sumber_tenaga;
            $alat->status_kalibrasi = $request->status_kalibrasi;
            $alat->tahun_kalibrasi = $request->tahun_kalibrasi;
            $alat->harga_perolehan = $request->harga_perolehan;
            $alat->link_elsa = $request->link_elsa;
            $alat->lokasi_penyimpanan = $request->lokasi_penyimpanan;
            $alat->status = $request->status;

            $alat->save();


            if ($images = $request->images) {
                $alat->clearMediaCollection('alat');
                foreach ($images as $image) {
                    $alat->addMedia($image)->toMediaCollection('alat');
                }
            }

            //dd($alat);
            return $this->sendResponse(new AlatResource($alat), 'Data updated successfully.');
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }


    }
}

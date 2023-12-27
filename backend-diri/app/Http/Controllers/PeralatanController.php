<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\Str;
use App\Models\User;
use App\Models\Peralatan;
use App\Models\PeralatanDetail;
use Illuminate\Support\Facades\Auth;


class PeralatanController extends Controller
{
    public function getAllPeralatan()
    {
        try {

            // Retrieve all labs with their associated lab details (and create lab detail if not exist)
            $peralatans = Peralatan::leftJoin('peralatan_detail', 'peralatan.idalatelsa', '=', 'peralatan_detail.idalat')
                ->select('peralatan.idalatelsa AS alat_id', 'peralatan.kode_barang', 'peralatan.nama_barang', 'peralatan.merk', 'peralatan.kondisi', 'peralatan_detail.status_ketersediaan')
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

            return response()->json(['success' => true, 'data' => $peralatans]);
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
                ->select('peralatan.idalatelsa AS alat_id', 'peralatan.kode_barang', 'peralatan.nama_barang', 'peralatan.merk', 'peralatan.kondisi', 'peralatan_detail.status_ketersediaan')
                ->firstWhere('peralatan.idalatelsa', $id);

            // Loop through the labs and add data to lab_detail if it does

            return response()->json(['success' => true, 'data' => $peralatans]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}

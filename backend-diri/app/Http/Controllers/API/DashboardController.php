<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\DashboardResource;
use App\Models\Lab;
use App\Models\Peralatan;
use Illuminate\Support\Facades\DB;

class DashboardController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $totalLabs = Lab::count();
        $totalPeralatan = Peralatan::count();
        $totalLokasi = Lab::distinct('lokasi_kawasan')->count();


        $data = [
            'total_labs' => $totalLabs,
            'total_peralatan' => $totalPeralatan,
            'total_lokasi' => $totalLokasi,
        ];

        return $this->sendResponse($data, 'Data retrieved successfully.');
    }

    public function getStatAlat(): JsonResponse
    {
        $query = Peralatan::leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
        ->selectRaw('lab.nama AS lab_name, COUNT(peralatan.id) AS total_peralatan')
            ->groupBy('lab.nama');

        $statistics = $query->get();

        // Transform the statistics as needed
        $data = $statistics->map(function ($statistic) {
            return [
                'lab_name' => $statistic->lab_name,
                'total_peralatan' => $statistic->total_peralatan,
            ];
        });

        return $this->sendResponse($data, 'Data retrieved successfully.');
    }

    public function getStatLabLokasi(): JsonResponse
    {
        $query = Lab::groupBy('lokasi_kawasan')
        ->selectRaw('lokasi_kawasan, count(*) as total');


        $statistics = $query->get();

        // Transform the statistics as needed
        $data = $statistics->map(function ($statistic) {
            return [
                'lokasi_kawasan' => $statistic->lokasi_kawasan,
                'total' => $statistic->total,
            ];
        });

        return $this->sendResponse($data, 'Data retrieved successfully.');
    }

    public function getStatAlatLokasi(): JsonResponse
    {
        $query = Peralatan::leftJoin('lab', 'lab.satuan_kerja_id', '=', 'peralatan.satuan_kerja_id')
        ->selectRaw('lab.lokasi_kawasan, COUNT(peralatan.id) AS total_peralatan')
            ->groupBy('lab.lokasi_kawasan');

        $statistics = $query->get();

        // Transform the statistics as needed
        $data = $statistics->map(function ($statistic) {
            return [
                'lokasi_kawasan' => $statistic->lokasi_kawasan,
                'total' => $statistic->total_peralatan,
            ];
        });

        return $this->sendResponse($data, 'Data retrieved successfully.');
    }
}

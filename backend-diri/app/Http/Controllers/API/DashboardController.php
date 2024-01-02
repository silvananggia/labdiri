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

}

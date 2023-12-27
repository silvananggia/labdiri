<?php

namespace App\Http\Controllers;

use App\Console\Commands\FetchLaboratoriumData;
use App\Console\Commands\FetchPeralatanData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ApiController extends Controller
{
    public function FetchLaboratoriumData(Request $request)
    {
        \Artisan::call('fetch:laboratorium-data');

        return response()->json(['message' => 'Data fetched and saved successfully.']);
    }

    public function fetchPeralatanData()
    {
        Artisan::call('fetch:peralatan');

        return response()->json(['message' => 'Peralatan data fetch command executed.']);
    }
}

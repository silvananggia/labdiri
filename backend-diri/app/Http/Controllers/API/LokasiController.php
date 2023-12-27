<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lokasi;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\LokasiResource;

class LokasiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $lokasi = Lokasi::all()->sortBy('created_at');;

        return $this->sendResponse(LokasiResource::collection($lokasi), 'Data retrieved successfully.');


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nama' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $lokasi = Lokasi::create($input);

        return $this->sendResponse(new LokasiResource($lokasi), 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $lokasi = Lokasi::find($id);

        if (is_null($lokasi)) {
            return $this->sendError('Data not found.');
        }

        return $this->sendResponse(new LokasiResource($lokasi), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, lokasi $lokasi)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nama' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $lokasi->nama = $input['nama'];
        $lokasi->keterangan = $input['keterangan'];
        $lokasi->latitude = $input['latitude'];
        $lokasi->longitude = $input['longitude'];
        $lokasi->status = $input['status'];
        $lokasi->save();

        return $this->sendResponse(new LokasiResource($lokasi), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $lokasi = Lokasi::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

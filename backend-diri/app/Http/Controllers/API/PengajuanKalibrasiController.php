<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PengajuanKalibrasi;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\PengajuanKalibrasiResource;

class PengajuanKalibrasiController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $PengajuanKalibrasi = PengajuanKalibrasi::all();
        
        return $this->sendResponse(PengajuanKalibrasiResource::collection($PengajuanKalibrasi), 'Data retrieved successfully.');

    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu' => 'required'
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $PengajuanKalibrasi = PengajuanKalibrasi::create($input);
       
        return $this->sendResponse(new PengajuanKalibrasiResource($PengajuanKalibrasi), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $PengajuanKalibrasi = PengajuanKalibrasi::find($id);
      
        if (is_null($PengajuanKalibrasi)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new PengajuanKalibrasiResource($PengajuanKalibrasi), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PengajuanKalibrasi $PengajuanKalibrasi)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $PengajuanKalibrasi->idalat = $input['idalat'];
        $PengajuanKalibrasi->iduser = $input['iduser'];
        $PengajuanKalibrasi->waktu = $input['waktu'];
        $PengajuanKalibrasi->keterangan = $input['keterangan'];
        $PengajuanKalibrasi->status = $input['status'];
        $PengajuanKalibrasi->save();
       
        return $this->sendResponse(new PengajuanKalibrasiResource($PengajuanKalibrasi), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $PengajuanKalibrasi = PengajuanKalibrasi::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

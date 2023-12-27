<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PengajuanMaintenance;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\PengajuanMaintenanceResource;

class PengajuanMaintenanceController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $PengajuanMaintenance = PengajuanMaintenance::all();
        
        return $this->sendResponse(PengajuanMaintenanceResource::collection($PengajuanMaintenance), 'Data retrieved successfully.');

    
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
       
        $PengajuanMaintenance = PengajuanMaintenance::create($input);
       
        return $this->sendResponse(new PengajuanMaintenanceResource($PengajuanMaintenance), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $PengajuanMaintenance = PengajuanMaintenance::find($id);
      
        if (is_null($PengajuanMaintenance)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new PengajuanMaintenanceResource($PengajuanMaintenance), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PengajuanMaintenance $PengajuanMaintenance)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $PengajuanMaintenance->idalat = $input['idalat'];
        $PengajuanMaintenance->iduser = $input['iduser'];
        $PengajuanMaintenance->waktu = $input['waktu'];
        $PengajuanMaintenance->keterangan = $input['keterangan'];
        $PengajuanMaintenance->status = $input['status'];
        $PengajuanMaintenance->save();
       
        return $this->sendResponse(new PengajuanMaintenanceResource($PengajuanMaintenance), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $PengajuanMaintenance = PengajuanMaintenance::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}
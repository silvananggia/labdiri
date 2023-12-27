<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\LogbookMaintenance;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\LogbookMaintenanceResource;

class LogbookMaintenanceController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $LogbookMaintenance = LogbookMaintenance::all();
        
        return $this->sendResponse(LogbookMaintenanceResource::collection($LogbookMaintenance), 'Data retrieved successfully.');

    
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
       
        $LogbookMaintenance = LogbookMaintenance::create($input);
       
        return $this->sendResponse(new LogbookMaintenanceResource($LogbookMaintenance), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $LogbookMaintenance = LogbookMaintenance::find($id);
      
        if (is_null($LogbookMaintenance)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new LogbookMaintenanceResource($LogbookMaintenance), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LogbookMaintenance $LogbookMaintenance)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $LogbookMaintenance->idalat = $input['idalat'];
        $LogbookMaintenance->waktu = $input['waktu'];
        $LogbookMaintenance->petugas = $input['petugas'];
        $LogbookMaintenance->keterangan = $input['keterangan'];
        $LogbookMaintenance->foto = $input['foto'];
        $LogbookMaintenance->save();
       
        return $this->sendResponse(new LogbookMaintenanceResource($LogbookMaintenance), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $LogbookMaintenance = LogbookMaintenance::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

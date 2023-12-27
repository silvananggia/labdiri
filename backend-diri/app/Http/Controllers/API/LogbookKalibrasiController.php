<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\LogbookKalibrasi;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\LogbookKalibrasiResource;

class LogbookKalibrasiController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $LogbookKalibrasi = LogbookKalibrasi::all();
        
        return $this->sendResponse(LogbookKalibrasiResource::collection($LogbookKalibrasi), 'Data retrieved successfully.');

    
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
       
        $LogbookKalibrasi = LogbookKalibrasi::create($input);
       
        return $this->sendResponse(new LogbookKalibrasiResource($LogbookKalibrasi), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $LogbookKalibrasi = LogbookKalibrasi::find($id);
      
        if (is_null($LogbookKalibrasi)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new LogbookKalibrasiResource($LogbookKalibrasi), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LogbookKalibrasi $LogbookKalibrasi)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $LogbookKalibrasi->idalat = $input['idalat'];
        $LogbookKalibrasi->waktu = $input['waktu'];
        $LogbookKalibrasi->petugas = $input['petugas'];
        $LogbookKalibrasi->keterangan = $input['keterangan'];
        $LogbookKalibrasi->foto = $input['foto'];
        $LogbookKalibrasi->save();
       
        return $this->sendResponse(new LogbookKalibrasiResource($LogbookKalibrasi), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $LogbookKalibrasi = LogbookKalibrasi::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

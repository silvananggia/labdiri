<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Logbook;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\LogbookResource;

class LogbookController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $Logbook = Logbook::all();
        
        return $this->sendResponse(LogbookResource::collection($Logbook), 'Data retrieved successfully.');

    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu_penggunaan' => 'required'
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $Logbook = Logbook::create($input);
       
        return $this->sendResponse(new LogbookResource($Logbook), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $Logbook = Logbook::find($id);
      
        if (is_null($Logbook)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new LogbookResource($Logbook), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Logbook $Logbook)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu_penggunaann' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $Logbook->iduser = $input['iduser'];
        $Logbook->idalat = $input['idalat'];
        $Logbook->waktu_penggunaan = $input['waktu_penggunaan'];
        $Logbook->nama_kegiatan = $input['nama_kegiatan'];
        $Logbook->kategori_pengguna = $input['kategori_pengguna'];
        $Logbook->nip = $input['nip'];
        $Logbook->lokasi = $input['lokasi'];
        $Logbook->save();
       
        return $this->sendResponse(new LogbookResource($Logbook), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $Logbook = Logbook::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

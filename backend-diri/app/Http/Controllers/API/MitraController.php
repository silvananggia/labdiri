<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\MitraResource;

class MitraController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $mitra = Mitra::all();
        
        return $this->sendResponse(MitraResource::collection($mitra), 'Data retrieved successfully.');

    
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
       
        $mitra = Mitra::create($input);
       
        return $this->sendResponse(new MitraResource($mitra), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $mitra = Mitra::find($id);
      
        if (is_null($mitra)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new MitraResource($mitra), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, mitra $mitra)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'nama' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $mitra->idlab = $input['idlab'];
        $mitra->nama = $input['nama'];
        $mitra->logo = $input['logo'];
        $mitra->save();
       
        return $this->sendResponse(new MitraResource($mitra), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $mitra = mitra::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}
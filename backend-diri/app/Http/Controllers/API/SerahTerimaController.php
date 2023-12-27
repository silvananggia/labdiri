<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SerahTerima;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\SerahTerimaResource;

class SerahTerimaController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $SerahTerima = SerahTerima::all();
        
        return $this->sendResponse(SerahTerimaResource::collection($SerahTerima), 'Data retrieved successfully.');

    
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
       
        $SerahTerima = SerahTerima::create($input);
       
        return $this->sendResponse(new SerahTerimaResource($SerahTerima), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $SerahTerima = SerahTerima::find($id);
      
        if (is_null($SerahTerima)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new SerahTerimaResource($SerahTerima), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SerahTerima $SerahTerima)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'waktu' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $SerahTerima->idalat = $input['idalat'];
        $SerahTerima->waktu = $input['waktu'];
        $SerahTerima->pemberi = $input['pemberi'];
        $SerahTerima->penerima = $input['penerima'];
        $SerahTerima->keterangan = $input['keterangan'];
        $SerahTerima->status = $input['status'];
        $SerahTerima->save();
       
        return $this->sendResponse(new SerahTerimaResource($SerahTerima), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $SerahTerima = SerahTerima::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Roles;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\RolesResource;

class RolesController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $Roles = Roles::all();
        
        return $this->sendResponse(RolesResource::collection($Roles), 'Data retrieved successfully.');

    
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
       
        $Roles = Roles::create($input);
       
        return $this->sendResponse(new RolesResource($Roles), 'Data created successfully.');
    } 

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $Roles = Roles::find($id);
      
        if (is_null($Roles)) {
            return $this->sendError('Data not found.');
        }
       
        return $this->sendResponse(new RolesResource($Roles), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Roles $Roles)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'nama' => 'required',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
       
        $Roles->iduser = $input['iduser'];
        $Roles->nama = $input['nama'];
        $Roles->save();
       
        return $this->sendResponse(new RolesResource($Roles), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $Roles = Roles::find($id)->delete();
       
        return $this->sendResponse([], 'Data deleted successfully.');
    }
}
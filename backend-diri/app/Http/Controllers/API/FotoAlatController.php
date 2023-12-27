<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FotoAlat;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\FotoAlatResource;
use Response;

class FotoAlatController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $FotoAlat = FotoAlat::all();

        return $this->sendResponse(FotoAlatResource::collection($FotoAlat), 'Data retrieved successfully.');


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();



        if(!$request->hasFile('foto')){
            return $this->sendError('upload_file_not_found Error.', 400);
        }

        $allowedfileExtension=['pdf','jpg','png'];
        $files = $request->file('foto');
        $errors = [];

        foreach ($files as $file) {

            $extension = $file->getClientOriginalExtension();

            $check = in_array($extension,$allowedfileExtension);

            if($check) {
                foreach($request->foto as $mediaFiles) {

                    $path = $mediaFiles->store('public/images');
                    $name = $mediaFiles->getClientOriginalName();

                    //store image file into directory and db
                    $save = new Image();
                    $save->title = $name;
                    $save->path = $path;
                    $save->save();
                }
            } else {
                return $this->sendResponse('invalid_file_format', 422);
            }

            return $this->sendResponse('file_uploaded', 200);

        }





    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $FotoAlat = FotoAlat::find($id);

        if (is_null($FotoAlat)) {
            return $this->sendError('Data not found.');
        }

        return $this->sendResponse(new FotoAlatResource($FotoAlat), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FotoAlat $FotoAlat)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'foto' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $FotoAlat->idalat = $input['idalat'];
        $FotoAlat->foto = $input['foto'];
        $FotoAlat->save();

        return $this->sendResponse(new FotoAlatResource($FotoAlat), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $FotoAlat = FotoAlat::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

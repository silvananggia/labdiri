<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\KategoriLab;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\KategoriLabResource;

class KategoriLabController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {

        $kategoriLab = KategoriLab::all();

        return $this->sendResponse(KategoriLabResource::collection($kategoriLab), 'Data retrieved successfully.');


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

        $kategoriLab = KategoriLab::create($input);

        return $this->sendResponse(new KategoriLabResource($kategoriLab), 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $kategoriLab = KategoriLab::find($id);

        if (is_null($kategoriLab)) {
            return $this->sendError('Data not found.');
        }

        return $this->sendResponse(new KategoriLabResource($kategoriLab), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KategoriLab $kategoriLab)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nama' => 'required',
            'keterangan' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $kategoriLab->nama = $input['nama'];
        $kategoriLab->keterangan = $input['keterangan'];
        $kategoriLab->logo = $input['logo'];
        $kategoriLab->save();

        return $this->sendResponse(new KategoriLabResource($kategoriLab), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $KategoriLab = KategoriLab::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

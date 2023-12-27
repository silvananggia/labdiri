<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Laboratorium;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\LaboratoriumResource;

class LaboratoriumController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $laboratorium = Laboratorium::with(['kategorilab','lokasi','alat'])->get();

//dd($laboratorium);
        return $this->sendResponse(LaboratoriumResource::collection($laboratorium), 'Data retrieved successfully.');


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

        $laboratorium = Laboratorium::create($input);
        if ($images = $request->images) {
            foreach ($images as $image) {
                $laboratorium->addMedia($image)->toMediaCollection('laboratorium');
            }
        }

        return $this->sendResponse(new LaboratoriumResource($laboratorium), 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $laboratorium = Laboratorium::find($id);

        if (is_null($laboratorium)) {
            return $this->sendError('Data not found.');
        }

        return $this->sendResponse(new LaboratoriumResource($laboratorium), 'Data retrieved successfully.');
    }

    public function showbykategori($id): JsonResponse
    {

        if ($id === "all") {
            $laboratorium = Laboratorium::with(['kategorilab','lokasi','alat'])->get();
        } else {
            $laboratorium = Laboratorium::with(['kategorilab', 'lokasi', 'alat'])->where('idkategori', $id)->get();

        }



        if ($laboratorium->isEmpty()) {
            return $this->sendError('Data not found.', 404); // Return a 404 Not Found status code.
        }

        $transformedData = $laboratorium->map(function ($lab) {
            return new LaboratoriumResource($lab);
        });

        return $this->sendResponse($transformedData, 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $this->validate($request, [
            'nama' => 'required',
        ]);
        $laboratorium = Laboratorium::find($id);
        $laboratorium->idkategori = $request->idkategori;
        $laboratorium->idlokasi = $request->idlokasi;
        $laboratorium->nama = $request->nama;
        $laboratorium->tusi = $request->tusi;
        $laboratorium->deskripsi = $request->deskripsi;
        $laboratorium->posisi_strategis = $request->posisi_strategis;
        $laboratorium->sdm =$request->sdm;
        $laboratorium->status = $request->status;
        $laboratorium->save();

        if ($images = $request->images) {
            $laboratorium->clearMediaCollection('laboratorium');
            foreach ($images as $image) {
                $laboratorium->addMedia($image)->toMediaCollection('laboratorium');
            }
        }


        return $this->sendResponse(new LaboratoriumResource($laboratorium), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $laboratorium = Laboratorium::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\AlatResource;

class AlatController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $alat = Alat::with('laboratorium')->get();

      return $this->sendResponse(AlatResource::collection($alat), 'Data retrieved successfully.');


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nama' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $alat = $request->all();
        $alat['tahun_perolehan'] = date('Y-m-d H:i:s', strtotime($alat['tahun_perolehan']));
        $alat = Alat::create($input);

        if ($images = $request->images) {
            foreach ($images as $image) {
                $alat->addMedia($image)->toMediaCollection('alat');
            }
        }
        return $this->sendResponse(new AlatResource($alat), 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $alat = Alat::find($id);

        if (is_null($alat)) {
            return $this->sendError('Data not found.');
        }

        return $this->sendResponse(new AlatResource($alat), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, alat $alat)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nama' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $alat->idlab = $input['idlab'];
        $alat->nama = $input['nama'];
        $alat->merk = $input['merk'];
        $alat->spesifikasi = $input['spesifikasi'];
        $alat->fungsi = $input['fungsi'];
        $alat->deskripsi = $input['deskripsi'];
        $alat->jumlah = $input['jumlah'];
        $alat->dimensi = $input['dimensi'];
        $alat->kondisi = $input['kondisi'];
        $alat->kode_bmn = $input['kode_bmn'];
        $alat->tahun_perolehan = $input['tahun_perolehan'];
        $alat->keterangan = $input['keterangan'];
        $alat->link_elsa = $input['link_elsa'];
        $alat->noseri = $input['noseri'];
        $alat->sumber_tenaga = $input['sumber_tenaga'];
        $alat->status_ketersediaan = $input['status_ketersediaan'];
        $alat->lokasi_penyimpanan = $input['lokasi_penyimpanan'];

        $alat->save();


        if ($images = $request->images) {
            $alat->clearMediaCollection('alat');
            foreach ($images as $image) {
                $alat->addMedia($image)->toMediaCollection('alat');
            }
        }

        return $this->sendResponse(new AlatResource($alat), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $alat = Alat::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }

    public function showbylab($idlab): JsonResponse
    {
        if ($idlab === "all") {
            $alat = Alat::with('laboratorium')->get();
        } else {
            $alat = Alat::with('laboratorium')->where('idlab', $idlab)->get();
        }

        return $this->sendResponse(AlatResource::collection($alat), 'Data retrieved successfully.');
    }

    public function alatlab($id): JsonResponse
    {
        $alat = Alat::with('laboratorium')->where('idlab',$id)->get();

      return $this->sendResponse(AlatResource::collection($alat), 'Data retrieved successfully.');


    }
}



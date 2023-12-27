<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\KategoriLabResource as KategoriLabResource;
use App\Http\Resources\LokasiResource as LokasiResource;
use App\Http\Resources\AlatResource as AlatResource;
use App\Http\Resources\MitraResource as MitraResource;

class LaboratoriumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'tusi' => $this->tusi,
            'deskripsi' => $this->deskripsi,
            'posisi_strategis' => $this->posisi_strategis,
            'sdm' => $this->sdm,
            'status' => $this->status,
            'kategori' =>  new KategoriLabResource($this->kategorilab),
            'lokasi' =>  new LokasiResource($this->lokasi),
            'images' => ImagesResource::collection($this->getMedia('laboratorium')),


        ];
    }
}

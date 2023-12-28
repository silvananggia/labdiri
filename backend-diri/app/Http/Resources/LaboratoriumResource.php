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
        $defaultImageUrl = asset('images/default-laboratorium.jpg');
        $media = $this->getMedia('laboratorium');

        return [
            'id' => $this->lab_id,
            'satuan_kerja_id' => $this->satuan_kerja_id,
            'nama' => $this->nama,
            'deskripsi' => $this->deskripsi,
            'lokasi_kawasan' => $this->lokasi_kawasan,
            'status' => $this->status,
            'kategori' =>  new KategoriLabResource($this->kategorilab),
            'images' => $media->isNotEmpty()
                ? ImagesResource::collection($media)
             : [['url' => $defaultImageUrl]]
        ];
    }
}

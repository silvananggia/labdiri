<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\LaboratoriumResource as LaboratoriumResource;
use App\Http\Resources\FotoAlatResource as FotoAlatResource;

class AlatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $defaultImageUrl = asset('images/default-alat.jpg');
        $media = optional($this->peralatandetail)->getMedia('alat') ?? collect([]);


        return [
            'id' => $this->idalatelsa,
            'nama' => $this->nama_barang,
            'merk' => $this->merk,
            'spesifikasi' => $this->spesifikasi,
            'fungsi' => $this->fungsi,
            'deskripsi' => $this->deskripsi,
            'laboratorium' =>  $this->nama_lab,
            'lokasi_kawasan' =>  $this->lokasi_kawasan,
            'images' => $media->isNotEmpty()
                ? ImagesResource::collection($media)
             : [['url' => $defaultImageUrl]]

        ];
    }
}

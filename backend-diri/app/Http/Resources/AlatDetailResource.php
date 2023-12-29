<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlatDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $defaultImageUrl = asset('images/default-alat.jpg');
        $media = $this->getMedia('alat');

        return [
            'id' => $this->alat_id,
            'kode_barang' => $this->kode_barang,
            'nup' => $this->nup,
            'nama' => $this->nama_barang,
            'merk' => $this->merk,
            'tahun_perolehan' => $this->tahun_perolehan,
            'kondisi' => $this->kondisi,
            'spesifikasi' => $this->spesifikasi,
            'fungsi' => $this->fungsi,
            'deskripsi' => $this->deskripsi,
            'dimensi' => $this->dimensi,
            'harga_perolehan' => $this->harga_perolehan,
            'keterangan' => $this->keterangan,
            'laboratorium' =>  $this->nama_lab,
            'lokasi_kawasan' =>  $this->lokasi_kawasan,
            'images' => $media->isNotEmpty()
                ? ImagesResource::collection($media)
             : [['url' => $defaultImageUrl]]

        ];
    }
}

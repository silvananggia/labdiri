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
        $media = optional($this->peralatandetail)->getMedia('alat') ?? collect([]);


        return [
            'id' => $this->idalatelsa,
            'kode_barang' => $this->kode_barang,
            'nup' => $this->nup,
            'nama' => $this->nama_barang,
            'merk' => $this->merk,
            'tahun_perolehan' => $this->tahun_perolehan,
            'kondisi' => $this->kondisi,
            'spesifikasi' => $this->peralatandetail->spesifikasi,
            'fungsi' => $this->peralatandetail->fungsi,
            'deskripsi' => $this->peralatandetail->deskripsi,
            'dimensi' => $this->peralatandetail->dimensi,
            'harga_perolehan' => $this->peralatandetail->harga_perolehan,
            'keterangan' => $this->peralatandetail->keterangan,
            'laboratorium' =>  $this->nama_lab,
            'lokasi_kawasan' =>  $this->lokasi_kawasan,
            'images' => $media->isNotEmpty()
                ? ImagesResource::collection($media)
             : [['url' => $defaultImageUrl]]

        ];
    }
}

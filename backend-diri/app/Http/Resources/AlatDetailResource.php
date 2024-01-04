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
            'keterangan' => $this->peralatandetail->keterangan,
            'dimensi' => $this->peralatandetail->dimensi,
            'kondisi_alat' => $this->peralatandetail->kondisi,
            'noseri' => $this->peralatandetail->noseri,
            'sumber_tenaga' => $this->peralatandetail->sumber_tenaga,
            'status_kalibrasi' => $this->peralatandetail->status_kalibrasi,
            'tahun_kalibrasi' => $this->peralatandetail->tahun_kalibrasi,
            'harga_perolehan' => $this->peralatandetail->harga_perolehan,
            'link_elsa' => $this->peralatandetail->link_elsa,
            'lokasi_penyimpanan' => $this->peralatandetail->lokasi_penyimpanan,
            'status' => $this->peralatandetail->status,
            'laboratorium' =>  $this->nama_lab,
            'lokasi_kawasan' =>  $this->lokasi_kawasan,
            'images' => $media->isNotEmpty()
                ? ImagesResource::collection($media)
             : [['url' => $defaultImageUrl]]

        ];
    }
}

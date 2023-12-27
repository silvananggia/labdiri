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
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'merk' => $this->merk,
            'spesifikasi' => $this->spesifikasi,
            'fungsi' => $this->fungsi,
            'deskripsi' => $this->deskripsi,
            'jumlah' => $this->jumlah,
            'dimensi' => $this->dimensi,
            'kondisi' => $this->kondisi,
            'kode_bmn' => $this->kode_bmn,
            'tahun_perolehan' => $this->tahun_perolehan,
            'harga_perolehan' => $this->harga_perolehan,
            'keterangan' => $this->keterangan,
            'penanggungjawab' => $this->penanggungjawab,
            'status_kalibrasi' => $this->status_kalibrasi,
            'tahun_kalibrasi' => $this->tahun_kalibrasi,
            'link_elsa' => $this->link_elsa,
            'noseri' => $this->noseri,
            'sumber_tenaga' => $this->sumber_tenaga,
            'status_ketersediaan' => $this->status_ketersediaan,
            'lokasi_penyimpanan' => $this->lokasi_penyimpanan,
            'laboratorium' =>  new LaboratoriumResource($this->laboratorium),
            'images' => ImagesResource::collection($this->getMedia('alat')),



        ];
    }
}

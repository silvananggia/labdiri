<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogbookResource extends JsonResource
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
            'iduser' => $this->iduser,
            'idalat' => $this->idalat,
            'waktu_penggunaan' => $this->waktu_penggunaan,
            'nama_kegiatan' => $this->nama_kegiatan,
            'kategori_pengguna' => $this->kategori_pengguna,
            'nip' => $this->nip,
            'lokasi' => $this->lokasi,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogbookMaintenanceResource extends JsonResource
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
            'idalat' => $this->idalat,
            'waktu' => $this->waktu,
            'petugas' => $this->petugas,
            'keterangan' => $this->keterangan,
            'foto' => $this->foto,
        ];
    }
}

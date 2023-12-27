<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SerahTerimaResource extends JsonResource
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
            'pemberi' => $this->pemberi,
            'penerima' => $this->penerima,
            'keterangan' => $this->keterangan,
            'status' => $this->status,
        ];
    }
}

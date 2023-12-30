<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\KategoriLabResource as KategoriLabResource;

class LabListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {


        return [
            'id' => $this->lab_id,
            'satuan_kerja_id' => $this->satuan_kerja_id,
            'nama' => $this->nama,

        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {



        return [
            'total_lab' => $this->resource['total_lab'] ?? null,
            'total_alat' => $this->resource['total_alat'] ?? null,
            'total_lokasi' => $this->resource['total_lokasi'] ?? null,


        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RolesResource extends JsonResource
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
            'role' => $this->role,
            'isVerified' => $this->isVerified,
            'laboratorium' =>  new LaboratoriumResource($this->laboratorium),


        ];
    }

    public function role() {
        return $this->hasOne(Roles::class);
    }
}

<?php

namespace App\Models\Misc\Remarks\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RemarkResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'concern' => $this->concern,
            'recommendation' => $this->recommendation,
            'is_active' => $this->is_active,
        ];
    }
}

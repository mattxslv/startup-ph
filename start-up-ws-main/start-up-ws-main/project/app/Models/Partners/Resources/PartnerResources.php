<?php

namespace App\Models\Partners\Resources;

use App\Models\Partners\ApiTokens\Resources\PartnerApiTokenResources;
use Illuminate\Http\Resources\Json\JsonResource;

class PartnerResources extends JsonResource
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
            'code' => $this->code,
            'name' => $this->name,
            'photo_url' => $this->photo_url,
            'tokens' => PartnerApiTokenResources::collection($this->whenLoaded('tokens')),
        ];
    }
}

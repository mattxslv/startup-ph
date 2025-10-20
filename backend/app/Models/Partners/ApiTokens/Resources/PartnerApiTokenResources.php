<?php

namespace App\Models\Partners\ApiTokens\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PartnerApiTokenResources extends JsonResource
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
            'partner_id' => $this->partner_id,
            'name' => $this->name,
            'secret' => $this->secret,
            'scope' => $this->scope,
            'last_used' => $this->last_used,
        ];
    }
}

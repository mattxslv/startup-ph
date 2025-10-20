<?php

namespace App\Models\Access\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResources extends JsonResource
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
            'name' => $this->name,
            'permissions' => PermissionResources::collection($this->whenLoaded('permissions')),
        ];
    }
}

<?php

namespace App\Models\Access\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResources extends JsonResource
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
            'group_id' => $this->group_id,
            'group_name' => $this->group->name ?? null,
            'name' => $this->name,
            // 'guard_name' => $this->guard_name,
        ];
    }
}

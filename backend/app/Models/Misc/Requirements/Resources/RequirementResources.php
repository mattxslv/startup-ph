<?php

namespace App\Models\Misc\Requirements\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RequirementResources extends JsonResource
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
            'type' => $this->type,
            'meta' => $this->meta,
            'is_required' => $this->whenPivotLoaded('programs_has_requirements', $this->pivot->is_required ?? null),
        ];
    }
}

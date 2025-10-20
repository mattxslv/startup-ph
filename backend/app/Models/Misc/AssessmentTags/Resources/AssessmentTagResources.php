<?php

namespace App\Models\Misc\AssessmentTags\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AssessmentTagResources extends JsonResource
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
            'description' => $this->description,
            'notes' => $this->notes,
            // 'meta' => $this->meta,
            'is_active' => $this->is_active,
        ];
    }
}

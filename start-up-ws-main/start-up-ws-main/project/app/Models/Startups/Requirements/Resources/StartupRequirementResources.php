<?php

namespace App\Models\Startups\Requirements\Resources;

use App\Models\Misc\Requirements\Resources\RequirementResources;
use App\Models\Users\Resources\UserResources;
use Illuminate\Http\Resources\Json\JsonResource;

class StartupRequirementResources extends JsonResource
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
            'requirement_id' => $this->requirement_id,
            'value' => $this->value,
            'parent' => new RequirementResources($this->parent),
        ];
    }
}

<?php

namespace App\Models\Programs\Resources;

use App\Models\Applications\Resources\ApplicationResources;
use App\Models\Misc\Requirements\Resources\RequirementResources;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResources extends JsonResource
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
            'agency' => $this->agency,
            'name' => $this->name,
            'thumbnail_url' => $this->thumbnail_url,
            'banner_url' => $this->banner_url,
            'type' => $this->type,
            'date_start' => $this->date_start,
            'date_end' => $this->date_end,
            'description' => $this->description,
            'content' => $this->content,
            'is_verified_required' => $this->is_verified_required,
            'is_published' => $this->is_published,
            'is_open_for_application' => $this->is_open_for_application,

            'requirements' => RequirementResources::collection($this->whenLoaded('requirements')),
            'applications' => ApplicationResources::collection($this->whenLoaded('applications')),
        ];
    }
}

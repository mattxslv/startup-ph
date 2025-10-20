<?php

namespace App\Models\Applications\Resources;

use App\Models\Programs\Resources\ProgramResources;
use App\Models\Startups\Requirements\Resources\StartupRequirementResources;
use App\Models\Startups\Resources\StartupResources;
use App\Models\Users\Resources\UserResources;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResources extends JsonResource
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
            'startup_id' => $this->startup_id,
            'startup_name' => $this->startup_name,
            'program_id' => $this->program_id,
            'program_name' => $this->program_name,
            'status' => $this->status,
            'remarks' => $this->remarks,
            'submitted_at' => $this->submitted_at,
            'returned_at' => $this->returned_at,
            'approved_at' => $this->approved_at,
            'rejected_at' => $this->rejected_at,

            'user' => new UserResources($this->whenLoaded('user')),
            'startup' => new StartupResources($this->whenLoaded('startup')),
            'program' => new ProgramResources($this->whenLoaded('program')),
            'requirements' => StartupRequirementResources::collection($this->whenLoaded('requirements')),
        ];
    }
}

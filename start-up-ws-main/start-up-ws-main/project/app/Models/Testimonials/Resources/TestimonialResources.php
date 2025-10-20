<?php

namespace App\Models\Testimonials\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResources extends JsonResource
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
            'label' => $this->label,
            'photo_url' => $this->photo_url,
            'body' => $this->body,
            'rep_name' => $this->rep_name,
            'rep_position' => $this->rep_position,
            'is_active' => $this->is_active,
        ];
    }
}

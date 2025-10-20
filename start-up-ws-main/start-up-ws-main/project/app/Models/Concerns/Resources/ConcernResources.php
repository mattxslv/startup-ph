<?php

namespace App\Models\Concerns\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConcernResources extends JsonResource
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
            'id' => $this->when($request->user(), $this->id),
            'email' => $this->email,
            'mobile_no' => $this->mobile_no,
            'name' => $this->name,
            'subject' => $this->subject,
            'body' => $this->body,
            'sent_at' => $this->sent_at,
        ];
    }
}

<?php

namespace App\Models\Audits\Resources;

use App\Models\Audits\Audit;
use Illuminate\Http\Resources\Json\JsonResource;

class AuditResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $audit = new Audit($this->content());

        return [
            'user_type' => $audit->user_type,
            'user_id' => $audit->user_id,
            'user_name' => $audit->user->display_name ?? null,
            'event' => strtoupper($audit->event),
            'auditable_type' => $audit->auditable_type,
            'auditable_id' => $audit->auditable_id,
            'old_values' => json_decode($audit->old_values),
            'new_values' => json_decode($audit->new_values),
            'created_at' => $audit->created_at,
        ];
    }
}

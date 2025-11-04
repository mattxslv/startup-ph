<?php

namespace Dmn\PhAddress\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Municipality extends JsonResource
{
    /**
     * @inheritDoc
     */
    public function toArray($request)
    {
        return [
            'code' => $this->code,
            'region_code' => $this->region_code,
            'province_code' => $this->province_code,
            'name' => $this->name,
            'has_sub' => $this->has_sub,
        ];
    }
}

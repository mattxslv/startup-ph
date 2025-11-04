<?php

namespace Dmn\PhAddress\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Province extends JsonResource
{
    /**
     * @inheritDoc
     */
    public function toArray($request)
    {
        return [
            'code' => $this->code,
            'region_code' => $this->region_code,
            'name' => $this->name,
        ];
    }
}

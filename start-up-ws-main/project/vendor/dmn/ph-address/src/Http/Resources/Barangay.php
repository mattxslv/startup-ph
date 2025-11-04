<?php

namespace Dmn\PhAddress\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Barangay extends JsonResource
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
            'municipality_code' => $this->municipality_code,
            'sub_municipality_code' => $this->sub_municipality_code,
            'name' => $this->name,
        ];
    }
}

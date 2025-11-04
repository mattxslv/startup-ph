<?php

namespace Dmn\PhAddress\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubMunicipality extends JsonResource
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
            'name' => $this->name,
        ];
    }
}

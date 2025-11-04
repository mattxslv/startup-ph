<?php

namespace Dmn\PhAddress\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Country extends JsonResource
{
    /**
     * @inheritDoc
     */
    public function toArray($request)
    {
        return [
            'code' => $this->code,
            'name' => $this->name,
        ];
    }
}

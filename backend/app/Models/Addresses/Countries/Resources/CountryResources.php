<?php

namespace App\Models\Addresses\Countries\Resources;

use App\Models\Addresses\Countries\Country;
use Illuminate\Http\Resources\Json\JsonResource;

class CountryResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->only(Country::FILLABLES);
    }
}

<?php

namespace App\Models\Administrators\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdministratorProfileResources extends JsonResource
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
            'agency' => $this->agency,
            'email' => $this->email,
            'contact_number' => $this->contact_number,
            'photo_url' => $this->photo_url,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'suffix_name' => $this->suffix_name,
            'display_name' => $this->display_name,
            'with_temporary_password' => $this->with_temporary_password,

            'abilities' => $this->currentAccessToken()->abilities,
        ];
    }
}

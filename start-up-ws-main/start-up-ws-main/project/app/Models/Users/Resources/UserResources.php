<?php

namespace App\Models\Users\Resources;

use App\Models\Startups\Resources\StartupResources;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResources extends JsonResource
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
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'mobile_no' => $this->mobile_no,
            'mobile_no_verified_at' => $this->mobile_no_verified_at,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'suffix_name' => $this->suffix_name,
            'display_name' => $this->display_name,
            'birth_date' => $this->birth_date,
            'birth_place' => $this->birth_place,
            'gender' => $this->gender,
            'photo_url' => $this->photo_url,
            'identification_type' => $this->identification_type,
            'identification_no' => $this->identification_no,
            'identification_url' => $this->identification_url,
            // 'profile_type' => $this->profile_type,
            'citizenship' => $this->citizenship,
            'social_classification' => $this->social_classification,
            // 'region_code' => $this->region_code,
            // 'region_name' => $this->region->name ?? null,
            // 'province_code' => $this->province_code,
            // 'province_name' => $this->province->name ?? null,
            // 'municipality_code' => $this->municipality_code,
            // 'municipality_name' => $this->municipality->name ?? null,
            // 'barangay_code' => $this->barangay_code,
            // 'barangay_name' => $this->barangay->name ?? null,
            // 'street' => $this->street,
            // 'display_address' => $this->display_address,
            // 'address_geoloc' => $this->address_geoloc,
            // 'postal_code' => $this->postal_code,
            'interests' => $this->interests,
            'registered_at' => $this->registered_at,
            // 'profile_completed_at' => $this->profile_completed_at,
            'last_login_at' => $this->last_login_at,
            'is_registered_from_sso' => $this->is_registered_from_sso,
            // 'startups' => StartupResources::collection($this->whenLoaded('startups')),
        ];
    }
}

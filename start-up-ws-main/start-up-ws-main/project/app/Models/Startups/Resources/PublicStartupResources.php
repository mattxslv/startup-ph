<?php

namespace App\Models\Startups\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PublicStartupResources extends JsonResource
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
            // 'id' => $this->id,
            'slug' => $this->slug,
            'logo_url' => $this->logo_url,
            'name' => $this->name,
            'sectors' => $this->sectors,
            'display_address' => $this->display_address,

            'description' => $this->description,
            'short_description' => $this->short_description,

            'social_website_url' => $this->social_website_url,
            'social_instagram_url' => $this->social_instagram_url,
            'social_facebook_url' => $this->social_facebook_url,
            'social_linkedin_url' => $this->social_linkedin_url,
            'content' => $this->content,

            'founder_name' => $this->founder_name,
            'founding_year' => $this->founding_year,
            'development_phase' => $this->development_phase,
            'business_classification' => $this->business_classification,
            'business_name' => $this->business_name,
            'business_mobile_no' => $this->business_mobile_no,
            'status' => $this->status,
        ];
    }
}

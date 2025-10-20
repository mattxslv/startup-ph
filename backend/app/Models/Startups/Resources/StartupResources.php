<?php

namespace App\Models\Startups\Resources;

use App\Models\Users\Resources\UserResources;
use Illuminate\Http\Resources\Json\JsonResource;

class StartupResources extends JsonResource
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
            'startup_number' => $this->startup_number,
            'logo_url' => $this->logo_url,
            'name' => $this->name,
            'slug' => $this->slug,
            // 'address_label' => $this->address_label,
            // 'address_geoloc' => $this->address_geoloc,
            'region_code' => $this->region_code,
            'province_code' => $this->province_code,
            'municipality_code' => $this->municipality_code,
            'barangay_code' => $this->barangay_code,
            'street' => $this->street,
            'street_two' => $this->street_two,
            'postal_code' => $this->postal_code,
            'display_address' => $this->display_address,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'social_website_url' => $this->social_website_url,
            'social_instagram_url' => $this->social_instagram_url,
            'social_facebook_url' => $this->social_facebook_url,
            'social_linkedin_url' => $this->social_linkedin_url,
            'content' => $this->content,
            'development_phase' => $this->development_phase,
            'founder_name' => $this->founder_name,
            'founding_year' => $this->founding_year,
            'business_classification' => $this->business_classification,
            'business_name' => $this->business_name,
            'tin' => $this->tin,
            'registration_no' => $this->registration_no,
            'proof_of_registration_url' => $this->proof_of_registration_url,
            'business_mobile_no' => $this->business_mobile_no,
            'business_certificate_expiration_date' => $this->business_certificate_expiration_date,
            'is_business_certificate_expired' => $this->checkIfBusinessCertificateisExpired(),
            'sectors' => $this->sectors,

            'has_funding' => $this->has_funding,
            'fundings' => $this->fundings,

            'status' => $this->status,
            'remarks' => $this->remarks,
            'assessment_tags' => $this->assessment_tags,
            'is_verified' => $this->is_verified,
            'oath_accepted_at' => $this->oath_accepted_at,
            'verified_at' => $this->verified_at,
            'returned_at' => $this->returned_at,
            'rejected_at' => $this->rejected_at,

            // 'application_type' => $this->application_type,
            // 'founder' => $this->founder,
            // 'organization' => $this->organization,
            // 'contact_no' => $this->contact_no,
            // 'photo_url' => $this->photo_url,
            // 'presentation_url' => $this->presentation_url,
            // 'video_url' => $this->video_url,
            // 'postal_code' => $this->postal_code,
            // 'business_name' => $this->business_name,
            // 'business_no' => $this->business_no,
            // 'business_type' => $this->business_type,
            // 'is_application_completed' => $this->is_application_completed,
            // 'is_active' => $this->is_active,
            // 'submitted_at' => $this->submitted_at,
            // 'return_remarks' => $this->return_remarks,
            // 'flagged_at' => $this->flagged_at,
            // 'flag' => $this->flag,
            // 'is_published' => $this->is_published,
            // 'is_featured' => $this->is_featured,
            // 'feature_sequence' => $this->feature_sequence,
            // 'sectors' => $this->sectors()->pluck('name'),
            // 'requirements' => $this->requirements,

            'user' => new UserResources($this->whenLoaded('user')),
        ];
    }
}

<?php

namespace App\Models\News\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NewsResources extends JsonResource
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
            'title' => $this->title,
            'sub_title' => $this->sub_title,
            'publish_date' => $this->publish_date,
            'publish_by' => $this->publish_by,
            'thumbnail_url' => $this->thumbnail_url,
            'body' => $this->body,
            'tags' => $this->tags,
            'is_published' => $this->is_published,
            'published_at' => $this->published_at,
        ];
    }
}

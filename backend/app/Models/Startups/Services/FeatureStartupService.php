<?php

namespace App\Models\Startups\Services;

use App\Models\Startups\Startup;

class FeatureStartupService
{
    /**
     * Feature
     *
     * @param array $startupIds
     * @return $this
     */
    public function feature(array $startupIds)
    {
        $this->resetFeaturedStartups();

        foreach ($startupIds as $key => $value) {
            if ($startup = Startup::find($value)) {
                $startup->feature($key);
            }
        }

        return $this;
    }

    /**
     * Reset featured startups
     *
     * @return $this
     */
    protected function resetFeaturedStartups()
    {
        Startup::where('is_featured', 1)
            ->update([
                'is_featured' => 0,
                'feature_sequence' => null,
            ]);

        return $this;
    }
}

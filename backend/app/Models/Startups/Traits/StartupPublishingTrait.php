<?php

namespace App\Models\Startups\Traits;

use App\Models\Startups\Exceptions\StartupNotApprovedException;

trait StartupPublishingTrait
{
    /**
     * Feature
     *
     * @param integer $sequence
     * @return $this
     * @throws StartupNotApprovedException
     */
    public function feature(int $sequence)
    {
        if (!$this->verified_at) {
            throw new StartupNotApprovedException();
        }

        $this->update([
            'is_featured' => 1,
            'feature_sequence' => $sequence,
        ]);

        return $this;
    }

    /**
     * Publish
     *
     * @return $this
     * @throws StartupNotApprovedException
     */
    public function publish()
    {
        if (!$this->verified_at) {
            throw new StartupNotApprovedException();
        }

        $this->update([
            'is_published' => intval(!$this->is_published),
        ]);

        return $this;
    }
}

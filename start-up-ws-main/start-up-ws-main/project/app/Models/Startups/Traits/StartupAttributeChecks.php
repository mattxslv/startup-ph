<?php

namespace App\Models\Startups\Traits;

use App\Exceptions\InvalidStatusException;
use App\Models\Startups\Startup;

trait StartupAttributeChecks
{
    /**
     * Check status
     *
     * @param array|string $status
     * @return Startup
     * @throws InvalidStatusException
     */
    public function checkStatus($status): Startup
    {
        if (is_array($status)) {
            if (!in_array($this->status, $status)) {
                throw new InvalidStatusException();
            }

            return $this;
        }

        if ($this->status != $status) {
            throw new InvalidStatusException();
        }

        return $this;
    }
}

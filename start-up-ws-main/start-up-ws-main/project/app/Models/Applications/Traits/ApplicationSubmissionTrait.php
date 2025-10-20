<?php

namespace App\Models\Applications\Traits;

use App\Models\Applications\Application;
use App\Models\Applications\Enums\ApplicationEnum;

trait ApplicationSubmissionTrait
{
    use ApplicationHasRequirements;

    /**
     * Resubmit application
     *
     * @return Application
     */
    public function resubmit(): Application
    {
        $this->syncRequirements($this->startup, $this->program)
            ->checkStatus(ApplicationEnum::STATUS['FOR RESUBMISSION'])
            ->update([
                'status' => ApplicationEnum::STATUS['FOR ASSESSMENT'],
                'submitted_at' => date('Y-m-d H:i:s'),
            ]);

        return $this;
    }
}

<?php

namespace App\Models\Startups\Traits;

use App\Mail\StartupSubmittedForVerificationMail;
use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Requests\DraftStartupRequest;
use App\Models\Startups\Startup;
use Illuminate\Support\Facades\Mail;

trait StartupSubmissionTrait
{
    use StartupAttributeChecks;

    /**
     * Submit application
     *
     * @return Startup
     */
    public function submitForVerification(): Startup
    {
        // NOTE: This is to validate if startup have complete details
        request()->merge($this->toArray())->validate((new DraftStartupRequest())->rules());

        // Allow submission from UNVERIFIED or VERIFIED status
        // This allows users to update and resubmit their verification
        $this->checkStatus([
                StartupEnum::STATUS['UNVERIFIED'],
                StartupEnum::STATUS['VERIFIED']
            ])
            ->update([
                'status' => StartupEnum::STATUS['FOR VERIFICATION'],
                'submitted_at' => date('Y-m-d H:i:s'),
                'oath_accepted_at' => date('Y-m-d H:i:s'),
            ]);

        Mail::to($this->user)->queue(new StartupSubmittedForVerificationMail($this));

        return $this;
    }

    /**
     * Resubmit
     *
     * @return Startup
     */
    public function resubmit(): Startup
    {
        request()->merge($this->toArray())->validate((new DraftStartupRequest())->rules());

        $this->checkStatus(StartupEnum::STATUS['FOR RESUBMISSION'])
            ->update([
                'status' => StartupEnum::STATUS['FOR VERIFICATION'],
                'oath_accepted_at' => date('Y-m-d H:i:s'),
            ]);

        return $this;
    }
}

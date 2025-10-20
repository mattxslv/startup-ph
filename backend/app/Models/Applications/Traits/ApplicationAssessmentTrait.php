<?php

namespace App\Models\Applications\Traits;

use App\Exceptions\InvalidStatusException;
use App\Mail\ApplicationApprovedMail;
use App\Mail\ApplicationRejectedMail;
use App\Mail\ApplicationReturnedForResubmissionMail;
use App\Models\Applications\Application;
use App\Models\Applications\Enums\ApplicationEnum;
use App\Models\Startups\Startup;
use Illuminate\Support\Facades\Mail;

trait ApplicationAssessmentTrait
{
    /**
     * Approve application
     *
     * @return Application
     */
    public function approve(): Application
    {
        $this->checkStatus(ApplicationEnum::STATUS['FOR ASSESSMENT'])
            ->update([
                'status' => ApplicationEnum::STATUS['APPROVED'],
                'approved_at' => date('Y-m-d H:i:s'),
            ]);

        Mail::to($this->user)->queue(new ApplicationApprovedMail($this->startup, $this->program));

        return $this;
    }

    /**
     * Reject application
     *
     * @param string $remarks
     * @return Application
     */
    public function reject(string $remarks): Application
    {
        $this->checkStatus(ApplicationEnum::STATUS['FOR ASSESSMENT'])
            ->update([
                'status' => ApplicationEnum::STATUS['REJECTED'],
                'remarks' => $remarks,
                'rejected_at' => date('Y-m-d H:i:s'),
            ]);

        Mail::to($this->user)->queue(new ApplicationRejectedMail($this->startup, $remarks));

        return $this;
    }

    /**
     * Return for resubmission
     *
     * @param string $remarks
     * @return Application
     */
    public function returnForResubmission(string $remarks): Application
    {
        $this->checkStatus(ApplicationEnum::STATUS['FOR ASSESSMENT'])
            ->update([
                'status' => ApplicationEnum::STATUS['FOR RESUBMISSION'],
                'remarks' => $remarks,
                'returned_at' => date('Y-m-d H:i:s'),
            ]);

        Mail::to($this->user)->queue(new ApplicationReturnedForResubmissionMail($this->startup, $remarks));

        return $this;
    }

    /**
     * Check status
     *
     * @param array|string $status
     * @return Startup
     * @throws InvalidStatusException
     */
    public function checkStatus($status): Application
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

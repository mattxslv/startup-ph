<?php

namespace App\Models\Startups\Traits;

use App\Mail\FlagApplicationMail;
use App\Mail\RequestAdditionalRequirementsMail;
use App\Mail\StartupRejectedMail;
use App\Mail\StartupReturnedForResubmissionMail;
use App\Mail\StartupVerifiedMail;
use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Startup;
use Illuminate\Support\Facades\Mail;

trait StartupAssessmentTrait
{
    /**
     * Verify
     *
     * @return Startup
     */
    public function verify(): Startup
    {
        $this->checkStatus(StartupEnum::STATUS['FOR VERIFICATION'])
            ->update([
                'status' => StartupEnum::STATUS['VERIFIED'],
                'is_verified' => 1,
                // 'startup_id' => $this->generateStartupId(),
                'verified_at' => date('Y-m-d H:i:s'),
            ]);

        Mail::to($this->user)->queue(new StartupVerifiedMail($this));

        return $this;
    }

    /**
     * Return for resubmission
     *
     * @param array $data
     * @return Startup
     */
    public function returnForResubmision(array $data): Startup
    {
        $this->checkStatus(StartupEnum::STATUS['FOR VERIFICATION']);

        $this->update([
            'status' => StartupEnum::STATUS['FOR RESUBMISSION'],
            'returned_at' => date('Y-m-d H:i:s'),
            ...$data
        ]);

        Mail::to($this->user)->queue(new StartupReturnedForResubmissionMail(
            startup: $this,
            remarks: $data['remarks'] ?? null,
            assessmentTags: $data['assessment_tags'] ?? []
        ));

        return $this;
    }

    /**
     * Reject startup
     *
     * @param array $data
     * @return Startup
     */
    public function reject(array $data): Startup
    {
        $this->checkStatus(StartupEnum::STATUS['FOR VERIFICATION']);

        $this->update([
            'status' => StartupEnum::STATUS['REJECTED'],
            ...$data
        ]);

        // Re-enabled for testing rejection emails
        Mail::to($this->user)->queue(new StartupRejectedMail(
            startup: $this,
            remarks: $data['remarks'] ?? null,
            assessmentTags: $data['assessment_tags'] ?? []
        ));

        return $this;
    }

    /**
     * Flag
     *
     * @param array $flag
     * @return Startup
     */
    public function flag(array $flag)
    {
        $this->checkStatus(StartupEnum::STATUS['FOR APPROVAL'])
            ->update([
                'status' => StartupEnum::STATUS['FOR RESUBMISSION'],
                'flagged_at' => date('Y-m-d H:i:s'),
                'flag' => $flag,
            ]);

        Mail::to($this->user)
            ->queue(new FlagApplicationMail($this, $this->user, $flag));

        return $this;
    }

    /**
     * Additional requirements
     *
     * @param array $requirements
     * @return Startup
     */
    public function additionalRequirements(array $requirements): Startup
    {
        $this->checkStatus(StartupEnum::STATUS['FOR APPROVAL'])
            ->update([
                'status' => StartupEnum::STATUS['FOR RESUBMISSION'],
                'requirements' => collect(array_merge($this->requirements, $requirements))->unique('id'),
            ]);

        Mail::to($this->user)
            ->queue(new RequestAdditionalRequirementsMail($this));

        return $this;
    }

    /**
     * Generate StartUp ID
     *
     * @return string
     */
    protected function generateStartupId(): string
    {
        $len = 10;
        $hex = md5(time() . uniqid('', true));
        $pack = pack('H*', $hex);
        $tmp = base64_encode($pack);
        $uid = preg_replace('#(*UTF8)[^A-Za-z0-9]#', '', $tmp);
        $len = max(4, min(128, $len));

        while (strlen($uid) < $len) {
            $uid .= self::getNonce(22);
        }

        return strtoupper(date('Y') . substr($uid, 0, $len));
    }
}

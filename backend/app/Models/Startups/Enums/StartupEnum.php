<?php

namespace App\Models\Startups\Enums;

class StartupEnum
{
    public const APPLICATION_TYPES = [
        'ENTHUSIAST' => 'ENTHUSIAST',
        'STARTUP' => 'STARTUP',
    ];

    public const STATUS = [
        'UNVERIFIED' => 'UNVERIFIED',
        'FOR VERIFICATION' => 'FOR VERIFICATION',
        'VERIFIED' => 'VERIFIED',
        'REJECTED' => 'REJECTED',
        'FOR RESUBMISSION' => 'FOR RESUBMISSION',
    ];
}

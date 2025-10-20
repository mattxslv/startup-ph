<?php

namespace App\Models\Users\Traits;

use App\Models\Users\Exceptions\AlreadyVerifiedEmailException;
use App\Models\Users\Exceptions\IncompleteProfileException;
use App\Models\Users\Exceptions\NotVerifiedEmailException;
use App\Models\Users\User;

trait UserAttributeChecks
{
    /**
     * Profile completed
     *
     * @return User
     * @throws IncompleteProfileExceptions
     */
    public function isProfileCompleted(): User
    {
        if (!$this->profile_completed_at) {
            throw new IncompleteProfileException();
        }

        return $this;
    }

    /**
     * Verified Email
     *
     * @return User
     * @throws NotVerifiedEmailException
     * @throws AlreadyVerifiedEmailException
     */
    public function hasVerifiedEmail($status = true): User
    {
        if ($status && !$this->email_verified_at) {
            throw new NotVerifiedEmailException();
        }

        if (!$status && $this->email_verified_at) {
            throw new AlreadyVerifiedEmailException();
        }

        return $this;
    }
}

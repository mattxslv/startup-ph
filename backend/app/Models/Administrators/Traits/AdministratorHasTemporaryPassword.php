<?php

namespace App\Models\Administrators\Traits;

use App\Mail\TemporaryPasswordMail;
use App\Models\Administrators\Administrator;
use Illuminate\Support\Facades\Mail;

trait AdministratorHasTemporaryPassword
{
    /**
     * Generate temporary password
     *
     * @return Administrator
     */
    public function generateTemporaryPassword(): Administrator
    {
        $password = \Str::random(12);

        $this->update([
            'password' => bcrypt($password),
            'with_temporary_password' => 1,
        ]);

        Mail::to($this)->queue(new TemporaryPasswordMail($this, $password));

        return $this;
    }
}

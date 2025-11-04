<?php

namespace App\Mail;

use App\Models\Startups\Startup;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PermitExpiredMail extends Mailable
{
    use Queueable, SerializesModels;

    public $startup;
    public $expiryDate;

    /**
     * Create a new message instance.
     */
    public function __construct(Startup $startup, Carbon $expiryDate)
    {
        $this->startup = $startup;
        $this->expiryDate = $expiryDate;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Action Required: Business Permit Expired - StartUp PH')
            ->view('mail.permit-expired-mail');
    }
}

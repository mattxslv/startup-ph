<?php

namespace App\Mail;

use App\Models\Startups\Startup;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PermitExpiringMail extends Mailable
{
    use Queueable, SerializesModels;

    public $startup;
    public $expiryDate;
    public $daysRemaining;

    /**
     * Create a new message instance.
     */
    public function __construct(Startup $startup, Carbon $expiryDate, int $daysRemaining)
    {
        $this->startup = $startup;
        $this->expiryDate = $expiryDate;
        $this->daysRemaining = $daysRemaining;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Reminder: Business Permit Expiring Soon - StartUp PH')
            ->view('mail.permit-expiring-mail');
    }
}

<?php

namespace App\Services;

use App\Exceptions\GeneralException;
use App\Exceptions\TxtboxServiceException;
use Illuminate\Support\Facades\Http;

class TxtboxService
{
    /**
     * @var array
     */
    protected $headers = [];

    /**
     * @var string
     */
    protected $url;

    /**
     * TxtboxService constructor
     */
    public function __construct()
    {
        $this->url = config('txtbox.txtbox_access_url');

        $this->headers = [
            'X-TXTBOX-Auth' => config('txtbox.txtbox_access_token'),
        ];
    }

    /**
     * Send message
     *
     * @param mixed $number
     * @param mixed $message
     * @return void
     * @throws GeneralException
     */
    public function send($number, $message): void
    {
        try {
            $response = Http::withHeaders($this->headers)
                ->post($this->url . '/messaging/v1/sms/push', [
                    'number' => $number,
                    'message' => $message,
                ]);

            if ($response->failed()) {
                $response->throw();
            }
        } catch (\Throwable $e) {
            throw new GeneralException($e);
        }
    }
}

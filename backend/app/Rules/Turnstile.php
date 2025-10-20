<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Http;

class Turnstile implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @param string $secretKey
     * @return void
     */
    public function __construct(protected string $secretKey)
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!config('settings.with_captcha_validation')) {
            return true;
        }

        $response = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => $this->secretKey,
            'response' => $value
        ]);

        if ($response->successful() && $response->json('success')) {
            return true;
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Failed captcha validation.';
    }
}

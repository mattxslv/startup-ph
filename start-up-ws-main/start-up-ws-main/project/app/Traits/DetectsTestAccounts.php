<?php

namespace App\Traits;

trait DetectsTestAccounts
{
    /**
     * Test account email patterns
     */
    protected static $testEmailPatterns = [
        '/^test[@\+]/i',
        '/^dummy[@\+]/i',
        '/^sample[@\+]/i',
        '/^fake[@\+]/i',
        '/^demo[@\+]/i',
        '/^trial[@\+]/i',
        '/^testing[@\+]/i',
        '/@test\./i',
        '/@dummy\./i',
        '/@sample\./i',
        '/@fake\./i',
        '/@example\./i',
        '/example\.com$/i',
        '/test\.com$/i',
        '/fake\.com$/i',
    ];

    /**
     * Test account name patterns
     */
    protected static $testNamePatterns = [
        '/^test\s/i',
        '/^dummy/i',
        '/^sample/i',
        '/^fake/i',
        '/^demo/i',
        '/test\s*account/i',
        '/test\s*user/i',
    ];

    /**
     * Detect if email matches test account patterns
     *
     * @param string|null $email
     * @return bool
     */
    public static function isTestEmail(?string $email): bool
    {
        if (!$email) {
            return false;
        }

        foreach (static::$testEmailPatterns as $pattern) {
            if (preg_match($pattern, $email)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Detect if name matches test account patterns
     *
     * @param string|null $name
     * @return bool
     */
    public static function isTestName(?string $name): bool
    {
        if (!$name) {
            return false;
        }

        foreach (static::$testNamePatterns as $pattern) {
            if (preg_match($pattern, $name)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Detect if this is a test account based on email and name
     *
     * @param string|null $email
     * @param string|null $name
     * @return bool
     */
    public static function isTestAccount(?string $email = null, ?string $name = null): bool
    {
        return static::isTestEmail($email) || static::isTestName($name);
    }

    /**
     * Auto-flag as test account if patterns match
     *
     * @return void
     */
    public function autoFlagTestAccount(): void
    {
        if (!isset($this->email)) {
            return;
        }

        $email = $this->email;
        $name = $this->name ?? $this->first_name ?? null;

        if (static::isTestAccount($email, $name)) {
            $this->is_test_account = true;
        }
    }
}

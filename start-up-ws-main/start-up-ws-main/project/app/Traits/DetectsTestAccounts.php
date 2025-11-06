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
        '/^temp[@\+]/i',
        '/^example[@\+]/i',
        '/^admin[@\+]/i',
        '/^user[@\+]/i',
        '/@test\./i',
        '/@dummy\./i',
        '/@sample\./i',
        '/@fake\./i',
        '/@example\./i',
        '/@temp\./i',
        '/example\.com$/i',
        '/test\.com$/i',
        '/fake\.com$/i',
        '/dummy\.com$/i',
        '/sample\.com$/i',
        '/temp\.com$/i',
        '/mailinator\./i',
        '/10minutemail\./i',
        '/guerrillamail\./i',
        '/tempmail\./i',
    ];

    /**
     * Test account name patterns - Enhanced with more comprehensive detection
     */
    protected static $testNamePatterns = [
        // Basic test patterns
        '/^test\s/i',
        '/^dummy/i',
        '/^sample/i',
        '/^fake/i',
        '/^demo/i',
        '/^trial/i',
        '/^temp/i',
        '/^example/i',
        
        // Test variations
        '/\btest\b/i',                    // "test" as whole word anywhere
        '/\bdummy\b/i',                   // "dummy" as whole word anywhere
        '/\bsample\b/i',                  // "sample" as whole word anywhere
        '/\bfake\b/i',                    // "fake" as whole word anywhere
        '/\bdemo\b/i',                    // "demo" as whole word anywhere
        '/\btrial\b/i',                   // "trial" as whole word anywhere
        '/\btemp\b/i',                    // "temp" as whole word anywhere
        '/\bexample\b/i',                 // "example" as whole word anywhere
        
        // Common test account phrases
        '/test\s*account/i',
        '/test\s*user/i',
        '/test\s*startup/i',
        '/test\s*company/i',
        '/dummy\s*account/i',
        '/dummy\s*user/i',
        '/dummy\s*startup/i',
        '/dummy\s*company/i',
        '/sample\s*account/i',
        '/sample\s*user/i',
        '/sample\s*startup/i',
        '/sample\s*company/i',
        '/demo\s*account/i',
        '/demo\s*user/i',
        '/demo\s*startup/i',
        '/demo\s*company/i',
        
        // Generic/placeholder names
        '/^user\s*\d*/i',                 // "user", "user1", "user123"
        '/^admin\s*\d*/i',                // "admin", "admin1", "admin123"
        '/^name\s*\d*/i',                 // "name", "name1", "name123"
        '/^company\s*\d*/i',              // "company", "company1", "company123"
        '/^startup\s*\d*/i',              // "startup", "startup1", "startup123"
        '/^business\s*\d*/i',             // "business", "business1", "business123"
        
        // Common placeholder patterns
        '/^john\s*doe/i',
        '/^jane\s*doe/i',
        '/^lorem\s*ipsum/i',
        '/^placeholder/i',
        '/^enter\s*name/i',
        '/^your\s*name/i',
        '/^default/i',
        
        // Sequential patterns (likely test data)
        '/^(test|demo|sample|dummy|fake)\s*\d+/i',  // test1, demo2, sample3, etc.
        '/\b(test|demo|sample|dummy|fake)\s*\d+\b/i', // anywhere in name
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

    /**
     * Enhanced auto-flag for startups that checks multiple fields
     *
     * @return void
     */
    public function autoFlagStartupAsTest(): void
    {
        $email = $this->email ?? ($this->user->email ?? null);
        $userName = $this->user->name ?? $this->user->first_name ?? null;
        $startupName = $this->name ?? null;
        $founderName = $this->founder_name ?? null;
        $organizationName = $this->organization ?? null;

        // Check any of these fields for test patterns
        $fieldsToCheck = [
            $email,
            $userName, 
            $startupName,
            $founderName,
            $organizationName
        ];

        foreach ($fieldsToCheck as $field) {
            if (static::isTestAccount($email, $field)) {
                $this->is_test_account = true;
                return;
            }
        }
    }
}

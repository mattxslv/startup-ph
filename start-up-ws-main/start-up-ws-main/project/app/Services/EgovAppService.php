<?php

namespace App\Services;

use App\Enums\Common;
use App\Exceptions\AuthenticationException;
use App\Models\Users\User;

class EgovAppService extends ConnectionService
{
    /**
     * @var string
     */
    protected $type = 'egovapp';

    /**
     * @var string
     */
    protected $baseUrl;

    /**
     * @var string
     */
    protected $partnerCode;

    /**
     * @var string
     */
    protected $partnerToken;

    /**
     * @var string
     */
    protected $exchangeCode;

    /**
     * Evisa User Details
     *
     * @var array
     */
    protected $egovAppData = [];

    /**
     * EgovAppService constructor
     */
    public function __construct()
    {
        parent::__construct();

        $this->baseUrl = config('connection.egov.access_url');

        $this->partnerCode = config('connection.egov.access_code');

        $this->partnerToken = config('connection.egov.access_token');
    }

    /**
     * SSO authentication
     *
     * @param array $payload
     * @return user
     * @throws AuthenticationException
     */
    public function ssoAuthenticate($exchangeCode)
    {
        $this->exchangeCode = $exchangeCode;

        return $this->getOrCreateUser($this->getEgovAppProfile());
    }

    /**
     * Get egov app profile
     *
     * @return array
     */
    public function getEgovAppProfile(): array
    {
        $this->egovAppData = $this->getEgovAppUser($this->generateAccessToken());

        return $this->formatData();
    }

    /**
     * Generate access token
     *
     * @return string
     * @throws AuthenticationException
     */
    protected function generateAccessToken(): string
    {
        try {
            $this->url = $this->baseUrl . '/api/token';

            $this->payload = [
                'exchange_code' => $this->exchangeCode,
                'partner_code' => $this->partnerCode,
                'partner_secret' => $this->partnerToken,
                'scope' => 'SSO_AUTHENTICATION',
            ];

            $response = $this->post($this->exchangeCode);

            return $response['access_token'];
        } catch (\Throwable $e) {
            throw new AuthenticationException();
        }
    }

    /**
     * Get egov app user
     *
     * @param string $bearerToken
     * @return array
     * @throws AuthenticationException
     */
    protected function getEgovAppUser(string $bearerToken): array
    {
        try {
            $this->url = $this->baseUrl . '/api/partner/sso_authentication';

            $this->headers = [
                'Authorization' => 'Bearer ' . $bearerToken,
            ];

            $response = $this->post($this->exchangeCode);

            return $response['data'];
        } catch (\Throwable $e) {
            throw new AuthenticationException();
        }
    }

    /**
     * Get or create user
     *
     * @param array $egovUser
     * @return User
     */
    protected function getOrCreateUser(array $data)
    {
        if (isset($data['uniqid']) && $data['uniqid']) {
            if ($user = User::where('egovapp_sso_id', $data['egovapp_sso_id'])->first()) {
                // Update user if account is created from sso
                if ($user->is_registered_from_sso) {
                    $user->update($data);
                }

                return $user;
            }
        }

        // NOTE: This is to check if egovapp user has email attribute
        if (!isset($data['email']) || !$data['email']) {
            throw new AuthenticationException();
        }

        if ($user = User::where('email', $data['email'])->first()) {
            $user->update(['egovapp_sso_id' => $data['egovapp_sso_id']]);
        }

        if (!$user) {
            $user = User::create([
                ...$data,
                'mobile_no_verified_at' => $data['mobile_no'] ? now() : null,
                'is_registered_from_sso' => 1,
            ]);
        }

        return $user;
    }

    /**
     * Format data
     *
     * @return array
     */
    protected function formatData(): array
    {
        $formattedData = [
            'email' => $this->getData('email'),
            'mobile_no' => $this->getData('mobile'),
            'photo_url' => $this->getData('photo'),
            'first_name' => $this->getData('first_name'),
            'middle_name' => $this->getData('middle_name'),
            'last_name' => $this->getData('last_name'),
            'suffix_name' => $this->getData('suffix'),
            'birth_date' => $this->getData('birth_date'),
            'gender' => Common::EGOV_GENDERS[$this->getData('gender')] ?? null,

            'egovapp_sso_id' => $this->getData('uniqid'),
        ];

        return $formattedData;
    }

    /**
     * GetData
     *
     * @param string $attr
     * @param mixed $placeHolder
     * @return mixed
     */
    protected function getData(string $attr, $placeHolder = null)
    {
        $value = $placeHolder;

        if (isset($this->egovAppData[$attr])) {
            if (strlen(trim($this->egovAppData[$attr]))) {
                $value = trim($this->egovAppData[$attr]);
            }
        }

        return $value;
    }
}

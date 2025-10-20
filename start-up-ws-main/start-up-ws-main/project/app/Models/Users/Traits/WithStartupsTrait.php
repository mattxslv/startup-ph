<?php

namespace App\Models\Users\Traits;

use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Startup;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait WithStartupsTrait
{
    /**
     * Startups
     *
     * @return HasMany
     */
    public function startup(): HasOne
    {
        return $this->hasOne(Startup::class, 'user_id')->latest('id');
    }

    /**
     * Get startup
     *
     * @return Startup
     */
    public function getStartup(): Startup
    {
        return $this->startup()->firstOrFail();
    }

    /**
     * Create or Update startup
     *
     * @param array $data
     * @return Startup
     */
    public function createOrUpdateStartup(array $data): Startup
    {
        if ($startup = $this->startup) {
            $startup
                ->checkStatus([
                    StartupEnum::STATUS['UNVERIFIED'],
                    StartupEnum::STATUS['FOR RESUBMISSION'],
                    StartupEnum::STATUS['VERIFIED'],
                    StartupEnum::STATUS['FOR VERIFICATION'], // Temporary add for verification status in update
                ])
                ->update($data);
        }

        if (!$startup) {
            $startup = $this->startup()->create([
                ...$data,
                'status' => StartupEnum::STATUS['UNVERIFIED'],
            ]);

            $startup->generateStartupNumber();
        }

        return $startup;
    }
}

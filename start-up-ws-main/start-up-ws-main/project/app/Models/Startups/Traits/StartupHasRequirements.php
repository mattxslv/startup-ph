<?php

namespace App\Models\Startups\Traits;

use App\Models\Startups\Requirements\StartupRequirement;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

trait StartupHasRequirements
{
    /**
     * Requirements
     *
     * @return HasMany
     */
    public function requirements(): HasMany
    {
        return $this->hasMany(StartupRequirement::class, 'startup_id');
    }

    /**
     * Create or Update Requirements
     *
     * @param array $data
     * @return StartupRequirement
     */
    public function createOrUpdateRequirements(array $data): StartupRequirement
    {
        return DB::transaction(function () use ($data) {
            $this->requirements()
                ->isActive()
                ->where('requirement_id', $data['requirement_id'])
                ->update(['is_active' => 0]);

            return $this->requirements()->create([
                ...$data,
                'is_active' => 1,
            ]);
        });
    }
}

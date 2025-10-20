<?php

namespace App\Models\Applications\Traits;

use App\Models\Applications\Application;
use App\Models\Misc\Requirements\Requirement;
use App\Models\Programs\Program;
use App\Models\Startups\Requirements\StartupRequirement;
use App\Models\Startups\Startup;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait ApplicationHasRequirements
{
    /**
     * Requirements
     *
     * @return BelongsToMany
     */
    public function requirements(): BelongsToMany
    {
        return $this->belongsToMany(
            StartupRequirement::class,
            'applications_has_requirements',
            'application_id',
            'requirement_id'
        );
    }

    /**
     * Sync requirements
     *
     * @param Startup $startup
     * @param Program $program
     * @return Application
     */
    public function syncRequirements(Startup $startup, Program $program): Application
    {
        $requirements = $startup->requirements()->isActive()
            ->whereIn('requirement_id', $program->requirements()->pluck('id'))
            ->get();

        $this->requirements()->sync($requirements);

        return $this;
    }
}

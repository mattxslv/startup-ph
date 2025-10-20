<?php

namespace App\Models\Startups\Traits;

use App\Models\Applications\Application;
use App\Models\Programs\Program;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait StartupHasPrograms
{
    /**
     * Requirements
     *
     * @return BelongsToMany
     */
    public function programs(): BelongsToMany
    {
        return $this->belongsToMany(
            Program::class,
            'applications',
            'startup_id',
            'program_id'
        )
        // ->where('is_active', 1)
        ->withPivot([
            'id',
            ...Application::FILLABLES
        ]);
    }
}

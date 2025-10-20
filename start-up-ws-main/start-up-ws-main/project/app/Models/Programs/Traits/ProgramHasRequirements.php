<?php

namespace App\Models\Programs\Traits;

use App\Models\Misc\Requirements\Requirement;
use App\Models\Programs\Program;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait ProgramHasRequirements
{
    /**
     * Requirements
     *
     * @return BelongsToMany
     */
    public function requirements(): BelongsToMany
    {
        return $this->belongsToMany(
            Requirement::class,
            'programs_has_requirements',
            'program_id',
            'requirement_id'
        )
        // ->where('is_active', 1)
        ->withPivot('is_required');
    }

    /**
     * Sync requirements
     *
     * @param array $requirements
     * @return Program
     */
    public function syncRequirements(array $requirements): Program
    {
        $requirements = collect($requirements)->unique('requirement_id')
            ->mapWithKeys(function ($req) {
                return [$req['requirement_id'] => ['is_required' => $req['is_required']]];
            });

        $this->auditSync('requirements', $requirements);
        // $this->requirements()->sync($requirements);

        return $this;
    }
}

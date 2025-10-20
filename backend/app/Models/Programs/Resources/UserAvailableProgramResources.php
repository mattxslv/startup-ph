<?php

namespace App\Models\Programs\Resources;

use App\Models\Applications\Application;
use App\Models\Applications\Resources\ApplicationResources;
use App\Models\Programs\Program;
use App\Models\Startups\Startup;
use App\Models\Users\User;

class UserAvailableProgramResources extends ProgramResources
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $startup = User::authenticated()->getStartup();

        return [
            ...parent::toArray($request),
            'application' => new ApplicationResources($this->getApplication($startup)),
        ];
    }

    /**
     * Get application
     *
     * @param Startup $startup
     * @return Application|null
     */
    protected function getApplication(Startup $startup): ?Application
    {
        return $startup->applications()->where('program_id', $this->id)->first();
    }
}

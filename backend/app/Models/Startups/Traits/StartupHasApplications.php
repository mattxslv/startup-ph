<?php

namespace App\Models\Startups\Traits;

use App\Mail\ApplicationSubmittedMail;
use App\Models\Applications\Application;
use App\Models\Applications\Enums\ApplicationEnum;
use App\Models\Applications\Exceptions\ExistingProgramApplicationException;
use App\Models\Applications\Exceptions\ProgramNotOpenForApplicationException;
use App\Models\Programs\Program;
use App\Models\Startups\Exceptions\StartupNotVerifiedException;
use App\Models\Startups\Startup;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

trait StartupHasApplications
{
    /**
     * Applications
     *
     * @return HasMany
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'startup_id');
    }

    /**
     * Get application by id
     *
     * @param mixed $id
     * @return Application
     */
    public function getApplicationById(mixed $id): Application
    {
        return $this->applications()->findOrFail($id);
    }

    /**
     * Submit application
     *
     * @param array $data
     * @return Application
     */
    public function submitApplication(array $data): Application
    {
        return DB::transaction(function () use ($data) {
            $program = Program::find($data['program_id']);

            $this->checkStartupIfQualified($program);

            $application = $this->createApplication([
                'user_id' => $this->user->id,
                'program_id' => $program->id,
                'program_name' => $program->name,
                'startup_id' => $this->id,
                'startup_name' => $this->name,
                'status' => ApplicationEnum::STATUS['FOR ASSESSMENT'],
                'submitted_at' => date('Y-m-d H:i:s')
            ]);

            $application->syncRequirements($this, $program);

            Mail::to($this->user)->queue(new ApplicationSubmittedMail($this));

            return $application;
        });
    }

    /**
     * Create application
     *
     * @param array $data
     * @return Application
     */
    protected function createApplication(array $data): Application
    {
        return $this->applications()->create($data);
    }

    /**
     * Check startup if qualified
     *
     * @param Program $program
     * @return Startup
     * @throws StartupNotVerifiedException
     * @throws ExistingProgramApplicationException
     * @throws ProgramNotOpenForApplicationException
     */
    protected function checkStartupIfQualified(Program $program): Startup
    {
        // Note: This is to validate if verified
        if ($program->is_verified_required && !$this->is_verified) {
            throw new StartupNotVerifiedException();
        }
        // Check if existing
        if ($this->applications()->where('program_id', $program->id)->first()) {
            throw new ExistingProgramApplicationException();
        }

        if (!$program->is_open_for_application) {
            throw new ProgramNotOpenForApplicationException();
        }

        return $this;
    }
}

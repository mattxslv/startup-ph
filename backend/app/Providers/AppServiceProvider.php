<?php

namespace App\Providers;

use App\Models\Access\Role;
use App\Models\Administrators\Administrator;
use App\Models\Applications\Application;
use App\Models\Misc\AssessmentTags\AssessmentTag;
use App\Models\Misc\Datasets\Dataset;
use App\Models\Misc\Requirements\Requirement;
use App\Models\News\News;
use App\Models\Partners\Partner;
use App\Models\Programs\Program;
use App\Models\Resources\Resource;
use App\Models\Startups\Requirements\StartupRequirement;
use App\Models\Startups\Startup;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::enforceMorphMap([
            'User' => User::class,
            'Administrator' => Administrator::class,
            'Partner' => Partner::class,

            'Role' => Role::class,
            'Dataset' => Dataset::class,
            'Requirement' => Requirement::class,
            'Startup' => Startup::class,
            'Program' => Program::class,
            'Application' => Application::class,
            'Startup Requirement' => StartupRequirement::class,
            'News' => News::class,
            'Resource' => Resource::class,
            'Assessment Tag' => AssessmentTag::class,
        ]);
    }
}

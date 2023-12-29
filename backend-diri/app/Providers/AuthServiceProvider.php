<?php

namespace App\Providers;
use Laravel\Passport\Passport;
// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Passport::ignoreRoutes();
        // Mandatory to define Scope
        Passport::tokensCan([
            'admin' => 'Admin Scope',
            'koordinator' => 'koordinator Scope',
            'manajer' => 'manajer Scope',
            'manajer_alat' => 'manajer_alat Scope',
            'public' => 'public Scope'
        ]);

        Passport::setDefaultScope([
            'public'
        ]);

    }
}

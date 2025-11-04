<?php

require_once __DIR__ . '/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);

$app->withFacades();

$app->withEloquent();

$app->configure('ph_address');

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    \Laravel\Lumen\Exceptions\Handler::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    \Laravel\Lumen\Console\Kernel::class
);

$app->register(\Dmn\PhAddress\PhAddressServiceProvider::class);

$app->router->group([
    'namespace' => 'Dmn\PhAddress\Http\Controllers',
], function ($router) {
    require __DIR__ . '/../routes/web.php';
});

return $app;

<?php

$router->get('country', 'CountryController@index');

$router->group(
    ['prefix' => 'region'],
    function ($router) {
        $router->get('/', 'RegionController@index');
        $router->get('{regionCode}/province', 'RegionController@province');
    }
);

$router->group(
    ['prefix' => 'province'],
    function ($router) {
        $router->get('/', 'ProvinceController@index');
        $router->get('{provinceCode}/municipality', 'ProvinceController@municipality');
    }
);

$router->group(
    ['prefix' => 'municipality'],
    function ($router) {
        $router->get('/', 'MunicipalityController@index');
        $router->get('{municipalityCode}/sub_municipality', 'MunicipalityController@subMunicipality');
        $router->get('{municipalityCode}/barangay', 'MunicipalityController@barangay');
    }
);

$router->group(
    ['prefix' => 'sub_municipality'],
    function ($router) {
        $router->get('/', 'SubMunicipalityController@index');
        $router->get('{subMunicipalityCode}/barangay', 'SubMunicipalityController@barangay');
    }
);

$router->group(
    ['prefix' => 'barangay'],
    function ($router) {
        $router->get('/', 'BarangayController@index');
    }
);

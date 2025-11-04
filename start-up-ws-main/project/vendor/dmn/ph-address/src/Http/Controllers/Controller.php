<?php

namespace Dmn\PhAddress\Http\Controllers;

class Controller
{
    /**
     * Get per page
     *
     * @return int
     */
    protected function getPerPage(): int
    {
        return request()->get(
            'per_page',
            config('ph_address.default_per_page')
        );
    }

    /**
     * get Query
     *
     * @return void
     */
    protected function getQuery()
    {
        return request()->get('q', null);
    }
}

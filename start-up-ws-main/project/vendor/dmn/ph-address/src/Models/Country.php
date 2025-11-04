<?php

namespace Dmn\PhAddress\Models;

use Dmn\PhAddress\Factories\CountryFactory;
use Dmn\PhAddress\Models\Traits\Address;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use Address;
    use HasFactory;

    /**
     * Factory
     *
     * @return Factory
     */
    protected static function newFactory(): Factory
    {
        return new CountryFactory();
    }

    protected $table = 'countries';

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;
}

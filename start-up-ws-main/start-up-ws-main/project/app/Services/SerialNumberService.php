<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class SerialNumberService
{
    public const TYPES = [
        'STARTUP_ID' => 'STARTUP_ID',
    ];

    /**
     * @var Builder
     */
    protected $query;

    /**
     * SerialNumberService constructor
     *
     * @param string $type
     * @param array $identifiers
     */
    public function __construct(protected string $type, protected array $identifiers = [])
    {
        $this->query = DB::table('serial_numbers');
    }

    /**
     * Generate
     *
     * @param string $type
     * @param array $identifiers
     * @return integer
     */
    public static function generate(string $type, array $identifiers = []): int
    {
        return (new self($type, $identifiers))->generateSerialNumber();
    }

    /**
     * Generate serial number
     *
     * @return integer
     */
    public function generateSerialNumber(): int
    {
        return DB::transaction(function () {
            if ($record = $this->getLastRecord()) {
                $number = $record->last_number + 1;

                $this->query
                    ->where('id', $record->id)
                    ->update([
                        'last_number' => $number,
                        'updated_at' => now(),
                    ]);

                return $number;
            }

            return $this->createNewRecord();
        });
    }

    /**
     * Get last record
     *
     * @return mixed
     */
    protected function getLastRecord()
    {
        return $this->query
            ->where('type', $this->type)
            ->where($this->identifiers)
            ->first();
    }

    /**
     * Create new record
     *
     * @return integer
     */
    public function createNewRecord(): int
    {
        $number = 1;

        $this->query->insert([
            'type' => $this->type,
            ...$this->identifiers,
            'last_number' => $number,
            'created_at' => now(),
        ]);

        return $number;
    }
}

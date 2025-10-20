<?php

namespace App\Services;

use App\Enums\Common;
use App\Models\Addresses\Barangays\Barangay;
use App\Models\Addresses\Municipalities\Municipality;
use App\Models\Addresses\Provinces\Province;
use App\Models\Addresses\Regions\Region;
use App\Models\Programs\Program;
use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Startup;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class DashBoardService
{
    protected $dateFilter = [
        'UNVERIFIED' => 'created_at',
        'FOR VERIFICATION' => 'submitted_at',
        'VERIFIED' => 'verified_at',
        'REJECTED' => 'rejected_at',
        'FOR RESUBMISSION' => 'returned_at',
    ];

    protected $addressClassMap = [
        'region' => Region::class,
        'province' => Province::class,
        'municipality' => Municipality::class,
        'barangay' => Barangay::class,
    ];

    protected $addressContentMap = [
        'all' => 'region',
        'region' => 'province',
        'province' => 'municipality',
        'municipality' => 'barangay',
    ];

    protected $subjectIndex = [
        'status' => 'status',
        'assessment_tags' => 'assessment_tags.code.keyword',
    ];

    /**
     * Get statistics
     *
     * @param array $filters
     * @return array
     */
    public function getStatictics(array $filters): array
    {
        $date = new Carbon();

        $startupQuery = Startup::query();
        $startupCounts = [];

        $programQuery = Program::query();
        $programCounts = [];

        $verifiedStartupQuery = Startup::query()->whereNotNull('verified_at');
        $verifiedStartupCounts = [];

        $forVerificationStartupQuery = Startup::query()->where('status', StartupEnum::STATUS['FOR VERIFICATION']);
        $forVerificationStartupCounts = [];

        switch ($filters['filter']) {
            case 'current_day':
                $period = 'Day';
                $format = 'Y-m-d';

                $previousStartupCount = $this->getQueryCount((clone $startupQuery), (clone $date)->subDay(), 'created_at', $period, $format);
                $currentStartupCount = $this->getQueryCount((clone $startupQuery), (clone $date), 'created_at', $period, $format);

                $startupCounts = [
                    'previous' => $previousStartupCount,
                    'current' => $currentStartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousStartupCount['count'], $currentStartupCount['count'])
                ];

                $previousProgramCount = $this->getQueryCount((clone $programQuery), (clone $date)->subDay(), 'created_at', $period, $format);
                $currentProgramCount = $this->getQueryCount((clone $programQuery), (clone $date), 'created_at', $period, $format);

                $programCounts = [
                    'previous' => $previousProgramCount,
                    'current' => $currentProgramCount,
                    'trend_percentage' => $this->getTrendPercentage($previousProgramCount['count'], $currentProgramCount['count'])
                ];

                $previousVerifiedStartupCount = $this->getQueryCount((clone $verifiedStartupQuery), (clone $date)->subDay(), 'verified_at', $period, $format);
                $currentSVerifiedtartupCount = $this->getQueryCount((clone $verifiedStartupQuery), (clone $date), 'verified_at', $period, $format);

                $verifiedStartupCounts = [
                    'previous' => $previousVerifiedStartupCount,
                    'current' => $currentSVerifiedtartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousVerifiedStartupCount['count'], $currentSVerifiedtartupCount['count'])
                ];

                $previousForVerificationStartupCount = $this->getQueryCount((clone $forVerificationStartupQuery), (clone $date)->subDay(), 'submitted_at', $period, $format);
                $currentForVerificationtartupCount = $this->getQueryCount((clone $forVerificationStartupQuery), (clone $date), 'submitted_at', $period, $format);

                $forVerificationStartupCounts = [
                    'previous' => $previousForVerificationStartupCount,
                    'current' => $currentForVerificationtartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousForVerificationStartupCount['count'], $currentForVerificationtartupCount['count'])
                ];
                break;

            case 'current_month':
                $period = 'Month';
                $format = 'Y-m';

                $previousStartupCount = $this->getQueryCount((clone $startupQuery), (clone $date)->subMonth(), 'created_at', $period, $format);
                $currentStartupCount = $this->getQueryCount((clone $startupQuery), (clone $date), 'created_at', $period, $format);

                $startupCounts = [
                    'previous' => $previousStartupCount,
                    'current' => $currentStartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousStartupCount['count'], $currentStartupCount['count'])
                ];

                $previousProgramCount = $this->getQueryCount((clone $programQuery), (clone $date)->subMonth(), 'created_at', $period, $format);
                $currentProgramCount = $this->getQueryCount((clone $programQuery), (clone $date), 'created_at', $period, $format);

                $programCounts = [
                    'previous' => $previousProgramCount,
                    'current' => $currentProgramCount,
                    'trend_percentage' => $this->getTrendPercentage($previousProgramCount['count'], $currentProgramCount['count'])
                ];

                $previousVerifiedStartupCount = $this->getQueryCount((clone $verifiedStartupQuery), (clone $date)->subMonth(), 'verified_at', $period, $format);
                $currentSVerifiedtartupCount = $this->getQueryCount((clone $verifiedStartupQuery), (clone $date), 'verified_at', $period, $format);

                $verifiedStartupCounts = [
                    'previous' => $previousVerifiedStartupCount,
                    'current' => $currentSVerifiedtartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousVerifiedStartupCount['count'], $currentSVerifiedtartupCount['count'])
                ];

                $previousForVerificationStartupCount = $this->getQueryCount((clone $forVerificationStartupQuery), (clone $date)->subMonth(), 'submitted_at', $period, $format);
                $currentForVerificationtartupCount = $this->getQueryCount((clone $forVerificationStartupQuery), (clone $date), 'submitted_at', $period, $format);

                $forVerificationStartupCounts = [
                    'previous' => $previousForVerificationStartupCount,
                    'current' => $currentForVerificationtartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousForVerificationStartupCount['count'], $currentForVerificationtartupCount['count'])
                ];
                break;

            case 'current_year':
                $period = 'Year';
                $format = 'Y';

                $previousStartupCount = $this->getQueryCount((clone $startupQuery), (clone $date)->subYear(), 'created_at', $period, $format);
                $currentStartupCount = $this->getQueryCount((clone $startupQuery), (clone $date), 'created_at', $period, $format);

                $startupCounts = [
                    'previous' => $previousStartupCount,
                    'current' => $currentStartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousStartupCount['count'], $currentStartupCount['count'])
                ];

                $previousProgramCount = $this->getQueryCount((clone $programQuery), (clone $date)->subYear(), 'created_at', $period, $format);
                $currentProgramCount = $this->getQueryCount((clone $programQuery), (clone $date), 'created_at', $period, $format);

                $programCounts = [
                    'previous' => $previousProgramCount,
                    'current' => $currentProgramCount,
                    'trend_percentage' => $this->getTrendPercentage($previousProgramCount['count'], $currentProgramCount['count'])
                ];

                $previousVerifiedStartupCount = $this->getQueryCount((clone $verifiedStartupQuery), (clone $date)->subYear(), 'verified_at', $period, $format);
                $currentSVerifiedtartupCount = $this->getQueryCount((clone $verifiedStartupQuery), (clone $date), 'verified_at', $period, $format);

                $verifiedStartupCounts = [
                    'previous' => $previousVerifiedStartupCount,
                    'current' => $currentSVerifiedtartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousVerifiedStartupCount['count'], $currentSVerifiedtartupCount['count'])
                ];

                $previousForVerificationStartupCount = $this->getQueryCount((clone $forVerificationStartupQuery), (clone $date)->subYear(), 'submitted_at', $period, $format);
                $currentForVerificationtartupCount = $this->getQueryCount((clone $forVerificationStartupQuery), (clone $date), 'submitted_at', $period, $format);

                $forVerificationStartupCounts = [
                    'previous' => $previousForVerificationStartupCount,
                    'current' => $currentForVerificationtartupCount,
                    'trend_percentage' => $this->getTrendPercentage($previousForVerificationStartupCount['count'], $currentForVerificationtartupCount['count'])
                ];
                break;

            case 'date_range':
                $from = (new Carbon($filters['date_from']))->startOfDay();
                $to = (new Carbon($filters['date_to']))->endOfDay();

                $startupCounts = [
                    'current' => [
                        'period' => $from->format('Y-m-d') . ' - ' . $to->format('Y-m-d'),
                        'count' => (clone $startupQuery)->whereBetween('created_at', [
                            $from->format('Y-m-d H:i:s'),
                            $to->format('Y-m-d H:i:s')
                        ])->count(),
                    ],
                ];

                $programCounts = [
                    'current' => [
                        'period' => $from->format('Y-m-d') . ' - ' . $to->format('Y-m-d'),
                        'count' => (clone $programQuery)->whereBetween('created_at', [
                            $from->format('Y-m-d H:i:s'),
                            $to->format('Y-m-d H:i:s')
                        ])->count(),
                    ],
                ];

                $verifiedStartupCounts = [
                    'current' => [
                        'period' => $from->format('Y-m-d') . ' - ' . $to->format('Y-m-d'),
                        'count' => (clone $verifiedStartupQuery)->whereBetween('verified_at', [
                            $from->format('Y-m-d H:i:s'),
                            $to->format('Y-m-d H:i:s')
                        ])->count(),
                    ],
                ];

                $forVerificationStartupCounts = [
                    'current' => [
                        'period' => $from->format('Y-m-d') . ' - ' . $to->format('Y-m-d'),
                        'count' => (clone $forVerificationStartupQuery)->whereBetween('submitted_at', [
                            $from->format('Y-m-d H:i:s'),
                            $to->format('Y-m-d H:i:s')
                        ])->count(),
                    ],
                ];
                break;

            default:
                $startupCounts = [
                    'current' => [
                        'period' => 'all_time',
                        'count' => (clone $startupQuery)->count(),
                    ]
                ];

                $programCounts = [
                    'current' => [
                        'period' => 'all_time',
                        'count' => (clone $programQuery)->count(),
                    ]
                ];

                $verifiedStartupCounts = [
                    'current' => [
                        'period' => 'all_time',
                        'count' => (clone $verifiedStartupQuery)->count(),
                    ]
                ];

                $forVerificationStartupCounts = [
                    'current' => [
                        'period' => 'all_time',
                        'count' => (clone $forVerificationStartupQuery)->count(),
                    ]
                ];
                break;
        }

        return [
            'startups' => $startupCounts,
            'programs' => $programCounts,
            'verified_startups' => $verifiedStartupCounts,
            'for_verification_startups' => $forVerificationStartupCounts,
        ];
    }

    /**
     * Get query count
     *
     * @param Builder $query
     * @param Carbon $date
     * @param string $period
     * @param string $format
     * @return array
     */
    protected function getQueryCount(Builder $query, Carbon $date, string $column, string $period, string $format): array
    {
        $fromQuery = 'startOf' . $period;
        $toQuery = 'endOf' . $period;

        $from = (clone $date)->$fromQuery()->format('Y-m-d H:i:s');
        $to = (clone $date)->$toQuery()->format('Y-m-d H:i:s');

        return [
            'period' => (clone $date)->format($format),
            'count' => (clone $query)->whereBetween($column, [$from, $to])->count(),
        ];
    }

    /**
     * Get trend percentage
     *
     * @param integer $previousCount
     * @param integer $currentCount
     * @return array|null
     */
    protected function getTrendPercentage(int $previousCount, int $currentCount): ?array
    {
        $percentageData = null;

        if (!is_null($previousCount) && !is_null($currentCount)) {
            $percentage = 100;

            if ($previousCount == $currentCount) {
                $percentage = 0;
            }

            if ($previousCount && $previousCount != $currentCount) {
                $percentage = round((($currentCount - $previousCount) / $previousCount) * 100, 1);
            }

            $percentageData = [
                'value' => $percentage,
                'formatted_value' => $percentage . '%',
            ];

            if (!$percentage) {
                $percentageData['trend'] = 'equal';
            }

            if ($percentage) {
                $percentageData['trend'] = ($percentage > 0) ? 'upward' : 'downward';
            }
        }

        return $percentageData;
    }

    /**
     * Get startup count
     *
     * @return array
     */
    public function getStartupCount(string $type, string $status, string $dateFrom, string $dateTo)
    {
        $aggQuery = [];
        $dateFilter = $this->dateFilter[$status];

        if ($type == Common::DASHBOARD_DATE_TYPE['hour']) {
            $labelFormat = 'g A';
            $dateFrom = (new Carbon($dateFrom))->startOfHour();
            $dateTo = (new Carbon($dateTo))->endOfHour();
            $hour = clone $dateFrom;

            do {
                $aggQuery[(clone $hour)->format('Y-m-d H:i:s')] = [
                    'filter' => ['range' => [$dateFilter => [
                        'gte' => (clone $hour)->format('Y-m-d H:i:s'),
                        'lte' => (clone $hour)->endOfHour()->format('Y-m-d H:i:s')
                    ]]],
                ];

                $hour = clone $hour->addHour();
            } while ($hour <= $dateTo);
        }

        if ($type == Common::DASHBOARD_DATE_TYPE['day']) {
            $labelFormat = 'M j';
            $dateFrom = (new Carbon($dateFrom))->startOfDay();
            $dateTo = (new Carbon($dateTo))->endOfDay();

            $day = clone $dateFrom;

            do {
                $aggQuery[(clone $day)->format('Y-m-d')] = [
                    'filter' => ['range' => [$dateFilter => [
                        'gte' => (clone $day)->format('Y-m-d H:i:s'),
                        'lte' => (clone $day)->endOfDay()->format('Y-m-d H:i:s')
                    ]]],
                ];

                $day = clone $day->addDay();
            } while ($day <= $dateTo);
        }

        if ($type == Common::DASHBOARD_DATE_TYPE['month']) {
            $labelFormat = 'M Y';
            $dateFrom = (new Carbon($dateFrom))->startOfMonth();
            $dateTo = (new Carbon($dateTo))->endOfMonth();

            $month = clone $dateFrom;

            do {
                $aggQuery[(clone $month)->format('Y-m')] = [
                    'filter' => ['range' => [$dateFilter => [
                        'gte' => (clone $month)->format('Y-m-d H:i:s'),
                        'lte' => (clone $month)->endOfMonth()->format('Y-m-d H:i:s')
                    ]]],
                ];

                $month = clone $month->addMonth();
            } while ($month <= $dateTo);
        }

        $filters = ['bool' => ['must' => [
            ['term' => ['status' => $status]],
            ['range' => [$dateFilter => [
                'gte' => $dateFrom->format('Y-m-d H:i:s'),
                'lte' => $dateTo->format('Y-m-d H:i:s')
            ]]]
        ]]];

        $result = Startup::searchQuery($filters)
            ->size(0)
            ->aggregateRaw($aggQuery)
            ->execute()
            ->raw();

        $mappedAggs = collect($result['aggregations'])
            ->sortBy(function ($value, $key) {
                return strtotime($key);
            })
            ->transform(function ($value, $key) use ($labelFormat) {
                return [
                    'label' => (new Carbon($key))->format($labelFormat),
                    'value' => $key,
                    'count' => $value['doc_count']];
            })
            ->values()
            ->all();

        return [
            'total' => $result['hits']['total']['value'],
            $dateFilter => $mappedAggs,
            'query' => [
                'type' => $type,
                'status' => $status,
                'date_filter' => $dateFilter,
                'date_from' => $dateFrom->format('Y-m-d H:i:s'),
                'date_to' => $dateTo->format('Y-m-d H:i:s'),
            ],
        ];
    }

    /**
     * Startup by address code
     *
     * @param array $filters
     * @return array
     */
    public function startupByAddressCode(array $filters, array $query)
    {
        $level = $filters['level'];
        $aggQuery = [];

        if ($level != Common::LOCATION_SUBJECTS['all']) {
            $class = $this->addressClassMap[$level];
            $codeSelector = $level . '_code';
            $codeValue = $filters[$codeSelector];

            $address = $class::find($codeValue);
        }

        if ($level != Common::LOCATION_SUBJECTS['barangay']) {
            $content = $this->addressContentMap[$level];

            $aggQuery = [$content => [
                'terms' => [
                    'field' => $content . '_code.keyword',
                    'size' => 10000,
                    'missing' => 'others'
                ]
            ]];
        }

        $filters = Startup::filterES($query);
        // NOTE: This is to remove null values
        // array_push($filters['bool']['must'], ['exists' => ['field' => $content . '_code.keyword']]);
        $result = Startup::searchQuery($filters)
            ->trackTotalHits(true)
            ->size(0)
            ->aggregateRaw($aggQuery)
            ->execute()
            ->raw();

        $data = [
            'total' => $result['hits']['total']['value'],
        ];

        if (isset($address)) {
            $data[$level] = $address;
        }

        if (isset($result['aggregations'])) {
            $contentClass = $this->addressClassMap[$content];

            $mappedAggs = collect($result['aggregations'][$content]['buckets'])
                ->map(function ($value) use ($contentClass) {
                    if ($value['key'] == 'others') {
                        $label = 'OTHERS';
                    } else {
                        $contentAddress = $contentClass::find($value['key']);

                        $label = $contentAddress->name ?? null;
                    }

                    return [
                        'label' => $label,
                        'value' => $value['key'],
                        'count' => $value['doc_count'],
                    ];
                })
                ->values()
                ->all();

            $data[\Str::plural($content)] = $mappedAggs;
        }

        return $data;
    }

    /**
     * Startup by address geoloc
     *
     * @param array $filters
     * @return array
     */
    public function startupByAddressGeoloc(array $filters)
    {
        $level = $filters['level'];

        if ($level != Common::LOCATION_SUBJECTS['all']) {
            $class = $this->addressClassMap[$level];
            $codeSelector = $level . '_code';
            $codeValue = $filters[$codeSelector];

            $address = $class::find($codeValue);
        }

        $result = Startup::searchQuery(Startup::filterES($filters))
            ->size(10000)
            ->execute()
            ->raw();

        $mappedData = collect($result['hits']['hits'])
            ->map(function ($value) {
                // $contentAddress = $contentClass::find($value['key']);
                $source = $value['_source'];

                return [
                    'id' => $source['id'],
                    'startup_id' => $source['startup_id'],
                    'startup_name' => $source['name'],
                    'logo_url' => $source['logo_url'],
                    'value' => $source['address_geoloc'],
                ];
            })
            ->values()
            ->all();

        $data = [
            'total' => $result['hits']['total']['value'],
        ];

        if (isset($address)) {
            $data[$level] = $address;
        }

        $data['startups'] = $mappedData;

        return $data;
    }

    /**
     * Start by subject
     *
     * @param string $subject
     * @param array $filters
     * @param callable|null $labelFormatter
     * @return array
     */
    public function startupBySubject(string $subject, array $filters = [], callable $labelFormatter = null)
    {
        $content = 'by_' . $subject;
        $index = $this->subjectIndex[$subject];

        $aggQuery = [$content => [
            'terms' => [
                'field' => $index,
                'size' => 10000,
                'missing' => 'others'
            ]
        ]];

        $result = Startup::searchQuery(Startup::filterES($filters))
            ->trackTotalHits(true)
            ->size(0)
            ->aggregateRaw($aggQuery)
            ->execute()
            ->raw();

        $data = [
            'total' => $result['hits']['total']['value'],
        ];

        if (isset($result['aggregations'])) {
            $mappedAggs = collect($result['aggregations'][$content]['buckets'])
                ->map(function ($bucket) use ($labelFormatter) {
                    $label = is_callable($labelFormatter) ? $labelFormatter($bucket['key']) : $bucket['key'];

                    return [
                        'label' => $label,
                        'value' => $bucket['key'],
                        'count' => $bucket['doc_count'],
                    ];
                })
                ->values()
                ->all();

            $data[\Str::plural($content)] = $mappedAggs;
        }

        return $data;
    }
}

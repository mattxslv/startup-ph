<?php

namespace App\Services\Vendor;

use Aws\CloudWatchLogs\CloudWatchLogsClient;
use Monolog\Formatter\LineFormatter;
use Pagevamp\Logger as PagevampLogger;
use PhpNexus\Cwh\Handler\CloudWatch;

class Logger extends PagevampLogger
{
    /**
     * Invoke
     *
    * @param array $config
     * @return void
     */
    public function __invoke(array $config)
    {
        $loggingConfig = $config;

        $loggingConfig['name'] = config('app.app_service_name') . '-' . config('app.version');

        $awsConfig = [
            'region' => $config['region'],
            'version' => $config['version'],
            'credentials' => $config['credentials'],
        ];

        $cwClient = new CloudWatchLogsClient($awsConfig);

        $streamName = $loggingConfig['stream_name'];
        $retentionDays = $loggingConfig['retention'];
        $groupName = $loggingConfig['group_name'];
        $batchSize = isset($loggingConfig['batch_size']) ? $loggingConfig['batch_size'] : 10000;

        $logHandler = new CloudWatch($cwClient, $groupName, $streamName, $retentionDays, $batchSize);
        $logger = new \Monolog\Logger($loggingConfig['name']);

        $logHandler->setFormatter($this->formatter());
        $logger->pushHandler($logHandler);

        return $logger;
    }

    /**
     * Formatter
     *
     * @return \Monolog\Formatter\LineFormatter
     */
    public function formatter(): LineFormatter
    {
        return new LineFormatter(
            '%channel%: %level_name%: %message% %context% %extra%',
            null,
            false,
            true
        );
    }
}

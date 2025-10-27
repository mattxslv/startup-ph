<?php

namespace App\AuditDrivers;

use App\Models\Audits\Audit;
use Elasticsearch\ClientBuilder;
use OwenIt\Auditing\Contracts\Audit as AuditContract;
use OwenIt\Auditing\Contracts\AuditDriver;
use OwenIt\Auditing\Contracts\Auditable;

class ElasticSearchAuditDriver implements AuditDriver
{
    /**
     * Perform an audit.
     *
     * @param \OwenIt\Auditing\Contracts\Auditable $model
     *
     * @return \OwenIt\Auditing\Contracts\Audit
     */
    public function audit(Auditable $model): AuditContract
    {
        $audit = new Audit($model->toAudit());

        try {
            $client = ClientBuilder::create()
                    ->setHosts(config('elastic.client.hosts'))
                    ->build();

            $client->index([
                'index' => $audit->searchableAs(),
                'type' => '_doc',
                'body' => $audit->toSearchableArray(),
            ]);
        } catch (\Throwable $e) {
            $audit->error = $e->getMessage();
        }

        // Attempt to save audit to database
        // Wrap in try-catch to prevent Elasticsearch sync errors from breaking the request
        try {
            $audit->save();
        } catch (\Throwable $e) {
            // Log the error but don't throw it to prevent breaking the user's request
            \Log::error('Failed to save audit log: ' . $e->getMessage(), [
                'audit' => $audit->toArray(),
                'exception' => $e,
            ]);
        }

        return $audit;
    }

    /**
     * Remove older audits that go over the threshold.
     *
     * @param \OwenIt\Auditing\Contracts\Auditable $model
     *
     * @return bool
     */
    public function prune(Auditable $model): bool
    {
        return false;
    }
}

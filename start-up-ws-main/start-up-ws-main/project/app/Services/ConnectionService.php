<?php

namespace App\Services;

use App\Exceptions\CustomMessageException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ConnectionService
{
    /**
     * @var string
     */
    protected $type;

    /**
     * @var string
     */
    protected $url;

    /**
     * @var array
     */
    protected $headers = [];

    /**
     * @var array
     */
    protected $params = [];

    /**
     * @var array
     */
    protected $payload = [];

    /**
     * @var Query
     */
    protected $query;

    /**
     * ExchangeCodeService constructor
     */
    public function __construct()
    {
        $this->query = DB::table('connections');
    }

    /**
     * Get
     *
     * @param mixed $reference
     * @return array
     */
    public function get($reference = null): array
    {
        try {
            $response = Http::withHeaders($this->headers)
                ->withBody(json_encode($this->payload))
                ->get($this->url, $this->params);

            if ($response->failed()) {
                $response->throw();
            }

            $this->query->insert([
                'reference' => $reference,
                'type' => $this->type,
                'method' => 'GET',
                'url' => $this->url,
                'headers' => json_encode($this->headers),
                'payload' => json_encode($this->payload),
                'params' => json_encode($this->params),
                'code' => $response->status(),
                'response' => json_encode($response->json()),
                'created_at' => now()->format('Y-m-d H:i:s')
            ]);

            return $response->json();
        } catch (\Exception $e) {
            $this->query->insert([
                'reference' => $reference,
                'type' => $this->type,
                'method' => 'GET',
                'url' => $this->url,
                'headers' => json_encode($this->headers),
                'payload' => json_encode($this->payload),
                'params' => json_encode($this->params),
                'code' => $e->getCode(),
                'exception' => $e->getMessage(),
                'created_at' => now()->format('Y-m-d H:i:s')
            ]);

            throw $e;
        }
    }

    /**
     * Post
     *
     * @param mixed $reference
     * @return array
     */
    public function post($reference = null): array
    {
        try {
            $response = Http::withHeaders($this->headers)
                ->post($this->url, $this->payload);

            if ($response->failed()) {
                if ($response->status() == Response::HTTP_UNPROCESSABLE_ENTITY) {
                    // throw new CustomMessageException($response->json()['message']);
                }

                $response->throw();
            }

            $this->query->insert([
                'reference' => $reference,
                'type' => $this->type,
                'method' => 'POST',
                'url' => $this->url,
                'headers' => json_encode($this->headers),
                'payload' => json_encode($this->payload),
                'params' => json_encode($this->params),
                'code' => $response->status(),
                'response' => json_encode($response->json()),
                'created_at' => now()->format('Y-m-d H:i:s')
            ]);

            return $response->json();
        } catch (\Exception $e) {
            $this->query->insert([
                'reference' => $reference,
                'type' => $this->type,
                'method' => 'POST',
                'url' => $this->url,
                'headers' => json_encode($this->headers),
                'payload' => json_encode($this->payload),
                'params' => json_encode($this->params),
                'code' => $e->getCode(),
                'exception' => $e->getMessage(),
                'created_at' => now()->format('Y-m-d H:i:s')
            ]);

            throw $e;
        }
    }

    /**
     * Log connection
     *
     * @param array $data
     * @return void
     */
    public function logConnection(array $data): void
    {
        $this->query->insert($data);
    }
}

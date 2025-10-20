<?php

namespace App\Models\Concerns;

use App\Mail\SendConcernMail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Concern extends Model
{
    public const RESOURCE_KEY = 'concerns';

    public const FILLABLES = [
        'email',
        'mobile_no',
        'name',
        'subject',
        'body',
        'sent_at',
    ];

    public const FILTERS = [
        'q',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = self::FILLABLES;

    /**
     * Scope filter
     *
     * @param mixed $query
     * @param mixed $filters
     * @return $query
     */
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where(self::RESOURCE_KEY . '.subject', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.body', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Send email
     *
     * @return void
     */
    public function sendEmail()
    {
        Mail::to(config('mail.support_email'))->send(new SendConcernMail($this));

        $this->update(['sent_at' => now()]);
    }
}

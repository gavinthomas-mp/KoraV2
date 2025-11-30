<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Call extends Model
{
    protected $table = 'ccact_call_logs';
    protected $fillable = [
        'twilio_call_sid',
        'from_number',
        'to_number',
        'operator_id',
        'skill_id',
        'status',
        'duration',
        'started_at',
        'ended_at',
        'recording_url',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    public $timestamps = false;

    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }

    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class);
    }
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

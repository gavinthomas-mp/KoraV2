<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CallLog extends Model
{
    protected $table = 'ccact_call_logs';

    // Define fillable fields
    protected $fillable = [
        'account_id',
        'did_number',
        'user_id',
        'extension',
        'queue',
        'start_time',
        'end_time',
        'wrapup_time',
        'cid_name',
        'cid_number',
        'unique_id',
        'tag',
        'sip_call_id',
        'user_name',
        'queue_time_secs',
        'disable_billing',
        'chinwag_sid',
        'conference_sid',
        'task_sid'
    ];

    public $timestamps = false;

    public function messages()
    {
        return $this->hasMany(Message::class, 'call_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSetting extends Model
{
    protected $table = 'vn_user_settings';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'emp_id',
        'gc_staff',
        'gc_participant',
        'vn_employee',
        'vnl_employee',
        'timeoff_requests_admin',
        'incidents_admin',
        'upload_schedule',
        'view_schedules',
        'forecasting',
        'timecard_admin',
        'call_evaluation',
        'call_evaluation_delete',
        'access_recording',
        'remote_agent',
        'mp_employee',
        'dispatching',
        'view_emails',
        'enable_peopleware',
        'configuration',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

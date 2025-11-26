<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CallTypeEmployee extends Model
{
    protected $table = 'ccact_calltype_employees';

    public function callType(): BelongsTo
    {
        return $this->belongsTo(CallType::class, 'calltype_id');
    }
}

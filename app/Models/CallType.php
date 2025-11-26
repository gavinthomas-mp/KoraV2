<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class CallType extends Model
{
    protected $table = 'ccact_calltypes';

    public function didNumber(): BelongsTo
    {
        return $this->belongsTo(DidNumber::class, 'did_id');
    }

    public function sections(): HasManyThrough
    {
        return $this->hasManyThrough(Section::class, Schedule::class, 'id', 'schedule_id', 'id');
    }

    public function actions(): HasManyThrough
    {
        return $this->hasManyThrough(Action::class, Schedule::class, 'id', 'schedule_id', 'id');
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'calltype_id');
    }

    public function prompts(): HasManyThrough
    {
        return $this->through('actions')->has('prompts');
    }
}

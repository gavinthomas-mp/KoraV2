<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'ccact_schedules';

    public function sections()
    {
        return $this->hasMany(Section::class, 'schedule_id', 'id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class, 'schedule_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Action extends Model
{
    protected $table = 'ccact_actions';

    public function prompts(): HasMany
    {
        return $this->hasMany(Prompt::class, 'action_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('not_deleted', function ($builder) {
            $builder->where('deleted', 0);
        });
    }
}

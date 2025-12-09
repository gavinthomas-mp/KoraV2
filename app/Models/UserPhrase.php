<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPhrase extends Model
{
    protected $table = 'ccact_users_phrases';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'title',
        'phrase',
        'deleted'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeNotDeleted($query)
    {
        return $query->where('deleted', 0);
    }
}

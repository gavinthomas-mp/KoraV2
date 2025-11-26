<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DidNumber extends Model
{
    protected $table = 'ccact_did_numbers';

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'did_id');
    }

    public function callTypes(): HasMany
    {
        return $this->hasMany(CallType::class, 'did_id');
    }
}

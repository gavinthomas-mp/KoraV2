<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    protected $table = 'ccact_accounts';

    public function subaccounts(): HasMany
    {
        return $this->hasMany(DidNumber::class, 'account_id', 'id');
    }
}

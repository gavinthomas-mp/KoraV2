<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DidNumberEntry extends Model
{
    protected $table = 'ccact_did_numbers_entries';

    protected $fillable = [
        'did_id',
        'number',
        'alias',
        'name',
        'answerphrase'
    ];
    
    public $timestamps = false;

    public function didNumber()
    {
        return $this->belongsTo(DidNumber::class, 'did_id');
    }
}

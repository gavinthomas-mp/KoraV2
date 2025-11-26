<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    protected $table = 'ccact_images';

    public function widget(): BelongsTo
    {
        return $this->belongsTo(HomeWidget::class, 'image_id', 'id');
    }
}

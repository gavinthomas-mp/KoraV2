<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Skill extends Model
{
    protected $fillable = [
        'name', 'description'];

    public function operators(): BelongsToMany
    {
        return $this->belongsToMany(Operator::class)
            ->withPivot('proficiency')
            ->withTimestamps();
    }

    public function calls(): HasMany
    {
        return $this->hasMany(Call::class);
    }
}
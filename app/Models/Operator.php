<?php
// app/Models/Operator.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Operator extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
        'max_concurrent_calls',
    ];

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class)
            ->withPivot('proficiency')
            ->withTimestamps();
    }

    public function calls(): HasMany
    {
        return $this->hasMany(Call::class);
    }

    public function activeCalls(): HasMany
    {
        return $this->hasMany(Call::class)
            ->whereIn('status', ['ringing', 'in_progress']);
    }

    public function isAvailable(): bool
    {
        return $this->status === 'available' && 
               $this->activeCalls()->count() < $this->max_concurrent_calls;
    }

    public function hasSkill(int $skillId): bool
    {
        return $this->skills()->where('skill_id', $skillId)->exists();
    }
}
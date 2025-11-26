<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    protected $table = 'ccact_employees';

    public function callTypes(): HasMany
    {
        return $this->hasMany(EmployeeCalltype::class, 'employee_id');
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(EmployeeContact::class, 'employee_id');
    }

    public function configurations(): HasMany
    {
        return $this->hasMany(EmployeeConfiguration::class, 'employee_id');
    }

    public function statuses(): HasMany
    {
        return $this->hasMany(EmployeeStatus::class, 'employee_id');
    }

    public function didNumber(): BelongsTo
    {
        return $this->belongsTo(DidNumber::class, 'did_id');
    }

    public function employeeContacts(): HasMany
    {
        return $this->hasMany(EmployeeContact::class, 'employee_id')->where('deleted', 0);
    }
}

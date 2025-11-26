<?php
// app/Services/CallRouterService.php
namespace App\Services;

use App\Models\Operator;
use App\Models\Skill;

class CallRouterService
{
    /**
     * Find the best available operator for a call
     * 
     * @param int|null $skillId Optional skill requirement
     * @return Operator|null
     */
    public function findAvailableOperator(?int $skillId = null): ?Operator
    {
        $query = Operator::where('status', 'available')
            ->withCount('activeCalls');

        // If a skill is required, filter by skill
        if ($skillId) {
            $query->whereHas('skills', function ($q) use ($skillId) {
                $q->where('skill_id', $skillId);
            });
        }

        // Get operators who haven't reached max concurrent calls
        $operators = $query->get()->filter(function ($operator) {
            return $operator->active_calls_count < $operator->max_concurrent_calls;
        });

        if ($operators->isEmpty()) {
            return null;
        }

        // If skill-based routing, prioritize by proficiency
        if ($skillId) {
            return $operators->sortByDesc(function ($operator) use ($skillId) {
                $skill = $operator->skills->firstWhere('id', $skillId);
                return $skill ? $skill->pivot->proficiency : 0;
            })->first();
        }

        // Otherwise, load balance by fewest active calls
        return $operators->sortBy('active_calls_count')->first();
    }

    /**
     * Assign a call to an operator
     * 
     * @param Operator $operator
     * @return void
     */
    public function assignCall(Operator $operator): void
    {
        // Update operator status if they hit max concurrent calls
        if ($operator->activeCalls()->count() >= $operator->max_concurrent_calls - 1) {
            $operator->update(['status' => 'on_call']);
        }
    }

    /**
     * Release operator after call ends
     * 
     * @param Operator $operator
     * @return void
     */
    public function releaseOperator(Operator $operator): void
    {
        // If they have capacity, make them available again
        if ($operator->activeCalls()->count() < $operator->max_concurrent_calls) {
            $operator->update(['status' => 'available']);
        }
    }
}
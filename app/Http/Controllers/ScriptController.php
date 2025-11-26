<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\CallLog;
use App\Models\CallType;
use App\Models\CallTypeEmployee;
use App\Models\EmployeeContact;
use App\Models\Employee;
use App\Models\Schedule;
use DateTimeZone;
use Illuminate\Http\Request;

class ScriptController extends Controller
{
    public function show(Request $request, $did_id, $calltype_id, $call_id)
    {
        $customEmployeeCalltype = false;
        $schedule_id = '';
        $type = $request->post('type', 'default');
        $types = $request->post('types', []);
        $call = CallLog::find($call_id);
        $employee = null;
        
        if (!$call) {
            return response()->json(['error' => 'Call not found'], 404);
        }
        if ($type === 'employee') {
            $employee = Employee::where('id', $calltype_id)->first();
            if (!$employee) {
                return response()->json(['error' => 'Employee not found'], 404);
            }

            // Check for custom employee calltype
            $customEmployeeCalltype = CallTypeEmployee::where('employee_id', $employee->id)->first() ?? false;

            if ($customEmployeeCalltype && $customEmployeeCalltype->callType) {
                $callType = $customEmployeeCalltype->callType;
                $calltype_id = $callType->id;
            } else {
                // Fallback to default Employee calltype associated with did_id
                $callType = CallType::where('did_id', $did_id)
                    ->where('employee_calltype', 2)
                    ->where('deleted', 0)
                    ->first();
                
                if ($callType) {
                    $calltype_id = $callType->id;
                } else {
                    return response()->json(['error' => 'No default Employee CallType found for this DID'], 404);
                }
            }
        } else {
            $callType = CallType::where('did_id', $did_id)
                ->where('id', $calltype_id)
                ->where('deleted', 0)
                ->first();
        }
        if (!$callType) {
            return response()->json(['error' => 'CallType not found'], 404);
        }

        $schedule = $this->_findActiveScheduleForCalltype($calltype_id, $call->message->schedule_id ?? '');

        if (!$schedule) {
            return response()->json(['error' => 'No active schedule found for this CallType'], 404);
        }

        $on_calls = [];
        $employee_contact_ids = $action_ids = [];

        $employee_contact_ids = array_filter(array_unique($employee_contact_ids), function ($value) {
            return !is_null($value) && $value !== '' && $value !== 'null';
        });

        $contacts = $employees = [];
        if (!empty($employee_contact_ids)) {
            $contacts = EmployeeContact::whereIn('id', $employee_contact_ids)
                ->where('deleted', 0)
                ->where('left_company', 'is', NULL)
                ->orderBy('contact_type')
                ->get();
        }

        $output = [
            'id' => $calltype_id,
            'did_id' => $did_id,
            'title' => $callType->title,
            'calltype_id' => $calltype_id,
            'actions' => $schedule->actions->map(function ($action) use ($type, $employee, $customEmployeeCalltype) {
                if ($type === 'employee') {
                    $employeeContact = EmployeeContact::select('contact', 'contact_type', 'employee_id')
                        ->whereHas('employee', function ($query) use ($employee) {
                            $query->where('id', $employee->id);
                        })
                        ->where('deleted', 0)
                        ->with('employee')
                        ->first();
                } else {
                    $employeeContact = EmployeeContact::select('contact', 'contact_type', 'employee_id')
                        ->where('id', $action->eid)
                        ->where('deleted', 0)
                        ->with('employee')
                        ->first();
                }
                $action->props = new \stdClass();
                $action->props->actionName = config('global_options.actions')[$action->action_type]['label'] ?? null;
                $action->props->actionContact = $employeeContact;

                return $action;
            }),
            'employees' => $employees,
            'contacts' => $contacts,
            'prompts' => $schedule->prompts,
            'sections' => $schedule->sections,
        ];
        return response()->json($output);
    }

    private function _findActiveScheduleForCalltype($calltype_id = null, $schedule_id = null, $test_time = '')
    {
        if ($calltype_id) {
            $calltype = CallType::find($calltype_id);
            $client_timezone = $calltype->didNumber->timezone ?? 'UTC';
        }

        if ($test_time) {
            $datetime = new \DateTime($test_time);
        } else {
            $datetime = new \DateTime('now');
            $client_time = new DateTimeZone($client_timezone);
            $datetime->setTimezone($client_time);
        }

        $day = $datetime->format('w');

        if ($day == 0) {
            $day = 7;
        }
        
        $time = $datetime->format('Hi');
        $datetime_formatted = $datetime->format('Y-m-d H:i:s');
        $time_formatted = $datetime->format('H:i:s');
        $day_of_week = strtolower($datetime->format('D'));
        $yesterday_day_of_week = strtolower($datetime->modify('-1 day')->format('D'));

        if (!empty($schedule_id)) {
            $res = Schedule::select([
                    'ccact_calltypes.description',
                    'ccact_calltypes.title',
                    'ccact_calltypes.id as calltype_id',
                    'ccact_calltypes.show_logic',
                    'ccact_calltypes.sort',
                    'ccact_schedules.*'
                ])
                ->leftJoin('ccact_calltypes', 'ccact_calltypes.id', '=', 'ccact_schedules.calltype_id')
                ->where('ccact_schedules.id', $schedule_id)
                ->with('sections')
                ->first();
        } else {
            $res = CallType::select([
                    'ccact_calltypes.description',
                    'ccact_calltypes.title',
                    'ccact_calltypes.id',
                    'ccact_calltypes.show_logic',
                    'ccact_calltypes.sort',
                    'ccact_schedules.*'
                ])
                ->leftJoin('ccact_schedules', 'ccact_calltypes.id', '=', 'ccact_schedules.calltype_id')
                ->where('ccact_calltypes.id', $calltype_id)
                ->whereRaw('ccact_schedules.did_id = ccact_calltypes.did_id')
                ->where('ccact_schedules.active', '1')
                ->where('ccact_schedules.deleted', 0)
                ->where(function($query) use ($datetime_formatted, $time, $day_of_week, $time_formatted, $yesterday_day_of_week) {
                    $query->where(function($q) use ($datetime_formatted) {
                        $q->where('ccact_schedules.start_date', '<=', $datetime_formatted)
                        ->where('ccact_schedules.end_date', '>=', $datetime_formatted);
                    })
                    ->orWhere(function($q) use ($time) {
                        $q->where('ccact_schedules.start_day', '<=', $time)
                        ->where('ccact_schedules.end_day', '>=', $time);
                    })
                    ->orWhere(function($q) use ($time) {
                        $q->where('ccact_schedules.start_day', '<=', $time + 70000)
                        ->where('ccact_schedules.end_day', '>=', $time + 70000);
                    })
                    ->orWhere(function($q) use ($day_of_week) {
                        $q->where('check_days', 1)
                        ->where($day_of_week, '1')
                        ->whereNull('start_time');
                    })
                    ->orWhere(function($q) use ($day_of_week, $time_formatted) {
                        $q->where('check_days', 1)
                        ->where($day_of_week, '1')
                        ->where('start_time', '<', $time_formatted)
                        ->where('end_time', '>', $time_formatted);
                    })
                    ->orWhere(function($q) use ($day_of_week, $time_formatted) {
                        $q->where('check_days', 1)
                        ->where($day_of_week, '1')
                        ->whereRaw('start_time > end_time')
                        ->where('start_time', '<', $time_formatted);
                    })
                    ->orWhere(function($q) use ($yesterday_day_of_week, $time_formatted) {
                        $q->where('check_days', 1)
                        ->where($yesterday_day_of_week, '1')
                        ->whereRaw('start_time > end_time')
                        ->where('end_time', '>', $time_formatted);
                    })
                    ->orWhere(function($q) {
                        $q->whereNull('start_date')
                        ->whereNull('start_day')
                        ->where('check_days', 0);
                    });
                })
                ->orderBy('ccact_calltypes.sort', 'ASC')
                ->orderBy('ccact_calltypes.title', 'ASC')
                ->orderBy('ccact_schedules.start_date', 'DESC')
                ->orderBy('ccact_schedules.start_day', 'DESC')
                ->orderBy('ccact_schedules.check_days', 'DESC')
                ->first();
        }

        return $res ?? null;
    }
}

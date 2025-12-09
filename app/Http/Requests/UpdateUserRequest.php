<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|max:64|unique:ccact_users,username,' . $this->route('id'),
            'password' => 'nullable|string|max:64',
            'name' => 'required|string|max:32',
            'extension' => 'nullable|string|max:16',
            'old_role' => 'nullable|string|size:1',
            'firstname' => 'required|string|max:128',
            'lastname' => 'required|string|max:128',
            'email' => 'required|email|max:128|unique:ccact_users,email,' . $this->route('id'),
            'account_id' => 'nullable|integer',
            'subaccount_id' => 'nullable|string',
            'employee_id' => 'nullable|string',
            'deleted' => 'sometimes|boolean',
            'operator' => 'required|boolean',
            'display_stat' => 'required|boolean',
            'alias' => 'nullable|string|max:64',
            'monitor' => 'required|boolean',
            'add_account_notes' => 'required|boolean',
            'role' => 'nullable|integer|exists:roles,id',
            'autoanswer' => 'required|boolean',
            'twilio' => 'required|boolean',
            'view_oq' => 'required|boolean',
            'agent_bio' => 'nullable|string|max:300',
            'employee_group' => 'required|string|max:127',
            'force_password_reset' => 'sometimes|boolean',
            'sso_setting' => 'nullable|in:system,enabled,disabled',

            // UserSetting fields
            'user_setting.emp_id' => 'nullable|string|max:16',
            'user_setting.gc_staff' => 'required|boolean',
            'user_setting.gc_participant' => 'required|boolean',
            'user_setting.vn_employee' => 'required|boolean',
            'user_setting.vnl_employee' => 'required|boolean',
            'user_setting.timeoff_requests_admin' => 'required|boolean',
            'user_setting.incidents_admin' => 'required|boolean',
            'user_setting.upload_schedule' => 'required|boolean',
            'user_setting.view_schedules' => 'required|boolean',
            'user_setting.forecasting' => 'required|boolean',
            'user_setting.timecard_admin' => 'required|boolean',
            'user_setting.call_evaluation' => 'required|boolean',
            'user_setting.call_evaluation_delete' => 'required|boolean',
            'user_setting.access_recording' => 'required|boolean',
            'user_setting.remote_agent' => 'required|string|max:45',
            'user_setting.mp_employee' => 'required|boolean',
            'user_setting.dispatching' => 'required|boolean',
            'user_setting.view_emails' => 'required|boolean',
            'user_setting.enable_peopleware' => 'required|boolean',
        ];
    }
}

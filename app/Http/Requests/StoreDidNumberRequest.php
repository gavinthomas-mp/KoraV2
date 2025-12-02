<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDidNumberRequest extends FormRequest
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
            'account_id' => 'required|integer|exists:accounts,id',
            'status' => 'required|string|in:active,inactive',
            'did_number' => 'required|string|unique:did_numbers,did_number',
            'industry' => 'nullable|string',
            'alias_number' => 'nullable|string',
            'difficulty_level' => 'nullable|integer|min:1|max:10',
            'company' => 'nullable|string',
            'company_visible' => 'nullable|boolean',
            'businesstype' => 'nullable|string',
            'date_entered' => 'nullable|date',
            'date_modified' => 'nullable|date',
            'modified_user_id' => 'nullable|integer|exists:users,id',
            'created_by' => 'nullable|integer|exists:users,id',
            'description' => 'nullable|string',
            'assigned_user_id' => 'nullable|integer|exists:users,id',
            'timezone' => 'nullable|string',
            'contact_name' => 'nullable|string',
            'contact_phone' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'address1' => 'nullable|string',
            'address_visible' => 'nullable|boolean',
            'address2' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zip' => 'nullable|string',
            'province' => 'nullable|string',
            'main_phone' => 'nullable|string',
            'main_phone_visible' => 'nullable|boolean',
            'main_fax' => 'nullable|string',
            'main_fax_visible' => 'nullable|boolean',
            'alt_phone' => 'nullable|string',
            'alt_phone_visible' => 'nullable|boolean',
            'website' => 'nullable|string',
            'website_visible' => 'nullable|boolean',
            'hours' => 'nullable|string',
            'hours_visible' => 'nullable|boolean',
            'email' => 'nullable|email',
            'email_visible' => 'nullable|boolean',
            'type' => 'nullable|string',
            'privacy' => 'nullable|string',
            'answerphrase' => 'nullable|string',
            'did_color' => 'nullable|string',
            'has_oncall' => 'nullable|boolean',
            'legacy' => 'nullable|boolean',
            'legacy_accountcode' => 'nullable|string',
            'legacy_dispatchcode' => 'nullable|string',
            'deleted' => 'nullable|boolean',
            'deleted_ts' => 'nullable|date',
            'legacy_multi_oncall' => 'nullable|boolean',
            'overflow' => 'nullable|integer',
            'primary_or_overflow' => 'nullable|boolean',
            'radio_advertising' => 'nullable|boolean',
            'calls_per_day' => 'nullable|integer',
            'calls_timing' => 'nullable|string',
            'calls_timing_other' => 'nullable|string',
            'service_sku' => 'nullable|string',
            'email_format' => 'nullable|integer',
            'email_subject_template' => 'nullable|string',
            'include_cid' => 'nullable|boolean',
            'exclude_prompts' => 'nullable|boolean',
            'include_msg_id' => 'nullable|boolean',
            'include_call_events' => 'nullable|boolean',
            'scheduling_option' => 'nullable|integer',
            'advanced_setup' => 'nullable|boolean',
            'billto_account' => 'nullable|string',
            'bilingual' => 'nullable|boolean',
            'hipaa' => 'nullable|boolean',
            'pci' => 'nullable|boolean',
            'smtp_profile' => 'nullable|string',
            'security_question_1' => 'nullable|string',
            'security_question_2' => 'nullable|string',
            'security_question_3' => 'nullable|string',
            'security_answer_1' => 'nullable|string',
            'security_answer_2' => 'nullable|string',
            'security_answer_3' => 'nullable|string',
            'enable_voicemail' => 'nullable|boolean',
            'skip_autofill' => 'nullable|boolean',
            'tiger_connect_org' => 'nullable|string',
            'tiger_connect_api_key' => 'nullable|string',
            'disable_recording' => 'nullable|boolean',
            'show_agent_bio' => 'nullable|boolean',
            'advanced_routing' => 'nullable|boolean',
            'translator' => 'nullable|boolean',
            'recording' => 'nullable|boolean',
            'high_priority' => 'nullable|boolean',
            'spam_blocking' => 'nullable|boolean',
            'delayed_answer' => 'nullable|boolean',
            'routing_product_tier' => 'nullable|string',
            'call_list_notes' => 'nullable|string',
            'external_key' => 'nullable|string',
            'routing_sector' => 'nullable|string',
            'pmd_api_key' => 'nullable|string',
            'directions' => 'nullable|string',
            'show_mp_number' => 'nullable|boolean',
            'transfer_timer' => 'nullable|integer'

        ];
    }
}

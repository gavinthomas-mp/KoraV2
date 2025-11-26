<?php
define('ACTION_TXF', '1');
define('ACTION_BLINDTXF', '2');
define('ACTION_TXTMSG', '3');
define('ACTION_EMAIL', '4');
define('ACTION_WEB', '5');
define('ACTION_VMOFFER', '6');
define('ACTION_HOLD', '7');
define('ACTION_EMAIL_DELIVER', '8');
define('ACTION_TEXT_DELIVER', '9');
define('ACTION_DELIVER', '10');
define('ACTION_LMR', '11');
define('ACTION_DISPATCH', '12');
define('ACTION_EMAIL_MINDER', '13');
define('ACTION_TXTMSG_CONFIRM', '33');
define('ACTION_EMAIL_CONFIRM', '34');
define('ACTION_EMAIL_FORWARD', '38');
define('ACTION_PROMPTS', '30');
define('ACTION_LABEL', '31');
define('ACTION_NONE', '40');
define('ACTION_INFO', '45');
define('ACTION_LEGACY', '50');
define('ACTION_TXF_DELIVER', '14');
define('ACTION_BLINDTXF_DELIVER', '15');
define('ACTION_FAX', '16');
define('ACTION_FAX_DELIVER', '17');
define('ACTION_LMR_DELIVER', '18');
define('ACTION_HOLDTIL', '19');
define('ACTION_VM', '20');
define('ACTION_VM_DELIVER', '21');
define('ACTION_VMOFFER_DELIVER', '22');
define('ACTION_TXF_NO_ANNOUNCEMENT', '23');
define('ACTION_TXF_NO_ANNOUNCEMENT_DELIVER', '24');
define('ACTION_CALENDAR', '25');
define('ACTION_CALENDAR_DELIVER', '26');
define('ACTION_DELIVER_LMR', '27');
define('ACTION_WEBHOOK_DELIVER', '32');
define('ACTION_PAGE', '35');
define('ACTION_PAGE_DELIVER', '36');
define('ACTION_DELIVER_IFCONFIRMED', '28');
//Actions 6* are assigned for CRM interactions only
define('ACTION_STATUS_CHANGE', '37');
define('ACTION_OFFSCRIPT', '41');
define('ACTION_CRM', '60');
define('ACTION_ONCALL', '51');
define('ACTION_ONCALL_CONFIRM', '52');

define('BREAK_REASON1', 'Bathroom Break');
define('BREAK_REASON2', 'Snack Break');
define('BREAK_REASON3', 'Dispatching Duties');
define('BREAK_REASON4', 'Lunch');
define('BREAK_REASON5', 'Mentor Meeting');
define('BREAK_REASON6', 'Staff Meeting');
define('BREAK_REASON7', 'Start of Shift');
define('BREAK_REASON8', 'End of Shift');
define('BREAK_REASON9', 'Technical Issue');
define('BREAK_REASON10', 'Training');
define('BREAK_REASON11', 'Other');
define('BREAK_REASON12', 'EVP');

define('EVENT_TEXT', 1);
define('EVENT_BTNCLICK', 2);
define('EVENT_MINDERCLICK', 3);
define('EVENT_MSGEDITED', 4);
define('EVENT_DELIVER', 5);
define('EVENT_UNDELIVER', 6);
define('EVENT_MINDER', 7);
define('EVENT_UNMINDER', 8);

define('EVENT_CALLSTART', 10);
define('EVENT_CALLEND', 11);
define('EVENT_TRANSFER', 12);
define('EVENT_DELIVERY', 13);
define('EVENT_HANGUP', 14);
define('EVENT_ADMIN', 15);
define('EVENT_CUSTOM', 16);
define('EVENT_ACTIONCLICK', 17);
define('EVENT_DIALOUT', 18);
define('EVENT_PATCH', 19);
define('EVENT_HOLD', 21);
define('EVENT_UNHOLD', 22);
define('EVENT_FILL_PROMPT', 23);
define('EVENT_CALLTYPE', 24);
define('EVENT_AUDIT', 25);
define('EVENT_CALENDAR', 26);
define('EVENT_REPOP', 27);
define('EVENT_MSGVIEW', 28);
define('EVENT_TRANSFER_RESULT', 29);
define('EVENT_LEAD', 30);
define('EVENT_CANCEL', 31);
define('EVENT_DIALOUT_OVERRIDE', 32);
define('EVENT_SECURITY', 101);
define('EVENT_REPEATCALLER', 33);
define('EVENT_OFFSCRIPT', 34);

define('EVENT_OTHER', 99);
define('EVENT_DEBUG', 100);

define('USEREVT_LOGIN', 1);
define('USEREVT_LOGOUT', 2);
define('USEREVT_BREAK', 3);
define('USEREVT_START_SHIFT', 4);
define('USEREVT_END_SHIFT', 5);
define('USEREVT_TAKING_CALLS', 6);
define('USEREVT_NOT_TAKING_CALLS', 7);
define('USEREVT_LEAVE_BREAK', 8);
define('USEREVT_NOT_TAKING_CALLS_BTN', 9);
define('USEREVT_TAKING_CALLS_BTN', 10);
define('USEREVT_REFRESH_BROWSER', 11);
define('USEREVT_OA_PAGE_LOAD', 12);
define('USEREVT_TWILIO', 13);
define('USEREVT_MISC', 99);

define('CONTACT_PHONE', '1');
define('CONTACT_CELL', '2');
define('CONTACT_EMAIL', '3');
define('CONTACT_VMAIL', '4');
define('CONTACT_TEXT', '5');
define('CONTACT_WEB', '6');
define('CONTACT_PAGER', '7');
define('CONTACT_FAX', '8');
define('CONTACT_LMR', '11');
define('CONTACT_CALENDAR', '12');
define('BUTTON_DISPATCH', '9');
define('BUTTON_UNDISPATCH', '13');
define('BUTTON_DELIVER', '10');
define('BUTTON_DELIVER_LMR', '14');
define('BUTTON_OFFSCRIPT', '15');

define('EVT_LVL_CUSTOMER', 1);
define('EVT_LVL_OPERATOR', 10);
define('EVT_LVL_MANAGER', 20);
define('EVT_LVL_ADMIN', 30);
define('EVT_LVL_SUPERUSER', 40);

define('FAX_EMAIL', '');
define('PROMPT_NAME', 'First and Last Name');
define('PROMPT_MISC', 'Misc');
define('PROMPT_PHONE', 'Phone Number');

define('PROMPT_TYPE_SINGLELINE', 1);
define('PROMPT_TYPE_MULTILINE', 2);
define('PROMPT_TYPE_DROPDOWN', 3);
define('PROMPT_TYPE_CONDITIONAL', 4);
define('PROMPT_TYPE_STRICTDROPDOWN', 5);
define('PROMPT_TYPE_DBLOOKUP', 6);
define('MSG_EMAIL_SUBJECT', 'Answering Service Message');

define('EMPLOYEE_TYPE_EMPLOYEE', 'Employee');
define('EMPLOYEE_TYPE_GENERIC_CONTACT', 'Generic Contact');

return [
    'security_questions' => [
        'Pin Number' => 'Pin Number',
        'Last 4 of SSN' => 'Last 4 of SSN',
        'What city were you born in?' => 'What city were you born in?',
    ],
    'email_format' => [
        '0' => 'html',
        '1' => 'text',
    ],
    'smtp_profiles' => [
        'default' => 'Not Secure',
        'secure_only' => 'Secure Only',
        'dexyp' => 'DexYP',
    ],
    'icons' => [
        'welcome' => 'fa-home',
        'accounts' => 'fa-bars',
        'setup' => 'fa-cogs',
        'reports' => 'fa-bar-chart',
        'calls' => 'fa-list',
        'messages' => 'fa-envelope',
        'inbox' => 'fa-envelope',
        'complaints' => 'fa-thumbs-down',
        'mistakes' => 'fa-frown',
        'bulletins' => 'fa-thumb-tack',
        'campaigns' => 'fa-share-square',
        'users' => 'fa-user',
        'roles' => 'fa-users',
        'settings' => 'fa-wrench',
        'logout' => 'fa-power-off',
    ],
    'contact_types' => [
        CONTACT_PHONE => 'Phone',
        CONTACT_CELL => 'Cell',
        CONTACT_EMAIL => 'Email',
        CONTACT_VMAIL => 'Vmail',
        CONTACT_TEXT => 'Text',
        CONTACT_FAX => 'Fax',
        CONTACT_WEB => 'Webform',
        CONTACT_LMR => 'LMR',
        CONTACT_CALENDAR => 'Calendar',
    ],
    'actions' => [
        ACTION_LEGACY => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_LEGACY'],
        ACTION_PROMPTS => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_PROMPTS'],
        ACTION_NONE => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_NONE'],
        ACTION_INFO => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_INFO'],
        ACTION_TXF => ['action_label' => 'Transfer', 'label' => 'Transfer to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TXF'],
        ACTION_TXF_DELIVER => ['action_label' => 'Transfer', 'label' => 'Transfer (and DELIVER) to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TXF_DELIVER'],
        ACTION_BLINDTXF => ['action_label' => 'Transfer', 'label' => 'Blind Transfer to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_BLINDTXF'],
        ACTION_BLINDTXF_DELIVER => ['action_label' => 'Transfer', 'label' => 'Blind Transfer to (and DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_BLINDTXF_DELIVER'],
        ACTION_EMAIL => ['action_label' => 'Email', 'label' => 'Email', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_EMAIL'],
        ACTION_EMAIL_CONFIRM => ['action_label' => 'Email (with CONFIRMATION)', 'label' => 'Email (with CONFIRMATION)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_EMAIL_CONFIRM'],
        ACTION_EMAIL_DELIVER => ['action_label' => 'Email', 'label' => 'Email (and DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_EMAIL_DELIVER'],
        ACTION_EMAIL_FORWARD => ['action_label' => 'Email (w/org email)', 'label' => 'Email (w/org email)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_EMAIL_FORWARD'],
        ACTION_PAGE => ['action_label' => 'Page', 'label' => 'Page', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_PAGE'],
        ACTION_PAGE_DELIVER => ['action_label' => 'Page', 'label' => 'Page (and DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_PAGE_DELIVER'],
        ACTION_VMOFFER => ['label' => 'Offer voicemail of', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_VMOFFER'],
        ACTION_VMOFFER_DELIVER => ['label' => 'Offer voicemail of (AND DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_VMOFFER_DELIVER'],
        ACTION_VM => ['action_label' => 'Voicemail', 'label' => 'Send to voicemail of', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_VM'],
        ACTION_VM_DELIVER => ['action_label' => 'Transfer', 'label' => 'Send to voicemail of (and DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_VM_DELIVER'],
        ACTION_HOLD => ['action_label' => 'Save and Hold', 'label' => 'Save & Hold', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_HOLD'],
        ACTION_HOLDTIL => ['action_label' => 'Hold Until', 'label' => 'Hold Til', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_HOLDTIL'],
        ACTION_TXTMSG => ['action_label' => 'Text', 'label' => 'Text to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TXTMSG'],
        ACTION_TXTMSG_CONFIRM => ['action_label' => 'Text (with CONFIRMATION)', 'label' => 'Text (with CONFIRMATION) to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TXTMSG_CONFIRM'],
        ACTION_TEXT_DELIVER => ['action_label' => 'Text', 'label' => 'Text (and DELIVER) to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TEXT_DELIVER'],
        ACTION_DELIVER => ['label' => 'Mark as DELIVERED', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_DELIVER'],
        ACTION_DELIVER_LMR => ['label' => 'Mark as DELIVERED BY LMR', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_DELIVER_LMR'],
        ACTION_DELIVER_IFCONFIRMED => ['label' => 'Mark as DELIVERED if CONFIRMED', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_DELIVER_IFCONFIRMED'],
        ACTION_LMR => ['action_label' => 'LMR', 'label' => 'LMR to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_LMR'],
        ACTION_LMR_DELIVER => ['action_label' => 'LMR', 'label' => 'LMR to (and DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_LMR_DELIVER'],
        ACTION_DISPATCH => ['label' => 'Send to DISPATCH', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_DISPATCH'],
        ACTION_WEB => ['action_label' => 'Web form', 'label' => 'Fill web form', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_WEB'],
        ACTION_FAX => ['action_label' => 'Fax', 'label' => 'Fax', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_FAX'],
        ACTION_FAX_DELIVER => ['action_label' => 'Fax', 'label' => 'Fax (and DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_FAX_DELIVER'],
        ACTION_CALENDAR => ['label' => 'Schedule appointment for', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_CALENDAR'],
        ACTION_CRM => ['action_label' => 'Contacts', 'label' => 'CRM', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_CRM'],
        ACTION_WEBHOOK_DELIVER => ['action_label' => 'Post to URL and DELIVER', 'label' => 'Post to URL (and DELIVER)', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_WEBHOOK_DELIVER'],
        ACTION_STATUS_CHANGE => ['action_label' => 'Change Status', 'label' => 'Change Status', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_STATUS_CHANGE'],
        ACTION_OFFSCRIPT => ['action_label' => 'Deliver Offscript Message', 'label' => 'Deliver Offscript Message', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_OFFSCRIPT'],
        ACTION_ONCALL => ['action_label' => 'Contact On-call', 'label' => 'Contact On-call', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_ONCALL'],
        ACTION_ONCALL_CONFIRM => ['action_label' => 'Contact On-call (with CONFIRMATION)', 'label' => 'Contact On-call (with CONFIRMATION)', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_ONCALL_CONFIRM'],
    ],
    'actions_customers' => [
        ACTION_LEGACY => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_LEGACY'],
        ACTION_PROMPTS => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_PROMPTS'],
        ACTION_NONE => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_NONE'],
        ACTION_INFO => ['label' => '', 'need_eid' => false, 'show' => false, 'type' => 'ACTION_INFO'],
        ACTION_TXF => ['label' => 'Transfer the call to to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TXF'],
        ACTION_TXF_DELIVER => ['label' => 'Transfer the call to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TXF_DELIVER'],
        ACTION_BLINDTXF => ['label' => 'Blind transfer to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_BLINDTXF'],
        ACTION_BLINDTXF_DELIVER => ['label' => 'Blind transfer the call to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_BLINDTXF_DELIVER'],
        ACTION_EMAIL => ['label' => 'Email', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_EMAIL'],
        ACTION_EMAIL_DELIVER => ['label' => 'Email caller info to ', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_EMAIL_DELIVER'],
        ACTION_VMOFFER => ['label' => 'Offer voicemail of', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_VMOFFER'],
        ACTION_VM => ['label' => 'Send to voicemail of', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_VM'],
        ACTION_VM_DELIVER => ['label' => 'Send to voicemail of (and DELIVER)', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_VM_DELIVER'],
        ACTION_HOLD => ['label' => 'Save & Hold', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_HOLD'],
        ACTION_TXTMSG => ['label' => 'Text caller info to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TXTMSG'],
        ACTION_TEXT_DELIVER => ['label' => 'Text caller info to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_TEXT_DELIVER'],
        ACTION_DELIVER => ['label' => 'Mark as DELIVERED', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_DELIVER'],
        ACTION_LMR => ['label' => 'LMR to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_LMR'],
        ACTION_LMR_DELIVER => ['label' => 'Live message relay to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_LMR_DELIVER'],
        ACTION_DISPATCH => ['label' => 'Send to DISPATCH', 'need_eid' => false, 'show' => true, 'type' => 'ACTION_DISPATCH'],
        ACTION_WEB => ['label' => 'Fill web form', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_WEB'],
        ACTION_FAX => ['label' => 'Fax', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_FAX'],
        ACTION_FAX_DELIVER => ['label' => 'Fax caller info to', 'need_eid' => true, 'show' => true, 'type' => 'ACTION_FAX_DELIVER'],
    ],
    'privacy' => [
        '1' => 'Public',
        '2' => 'Private'
    ],
    'type' => [
        '1' => 'Virtual Receptionist',
        '2' => 'Answering Service'
    ],
    'difficulty' => [
        '1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5', '6' => '6', '7' => '7', '8' => '8', '9' => '9', '10' => '10', '11' => '11', '12' => '12', '13' => '13', '14' => '14', '15' => '15', '16' => '16', '17' => '17', '18' => '18', '19' => '19', '20' => '20'
    ],
];
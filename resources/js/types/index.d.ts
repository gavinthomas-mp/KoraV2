import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Types
export interface Employee {
    id: string;
    name: string;
    gender?: '1' | '2';
    excuse?: string;
    no_action?: boolean;
}

export interface Contact {
    contact: string;
    ext: string;
    employee_id: string;
    contact_type: number;
    label?: string;
    contact_natl?: string;
    prefix?: string;
    addr?: string;
    carrier?: string;
}

export interface Prompt {
    caption: string;
    ptype: number;
    value?: string;
    required?: boolean;
    maxchar: number;
    helptext?: string;
    hide_logic?: string;
    show_logic?: string;
    verification?: string;
    options?: string;
    action_id?: number;
    actionName?: string;
}

export interface Action {
    id: string;
    section: number;
    action_type: number;
    action_text: string;
    action_label?: string;
    helper?: string;
    dispatch_only?: boolean;
    show_logic?: string;
    eid?: string;
    sort: number;
    props?: any;
    section?: number;
}

export interface Section {
    section_num: number;
    visible: number;
    section_action?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}
export interface ScriptData {
    schedule: {
        id: string;
        title: string;
        calltype_id: string;
        did_id: string;
        actions: Action[];
    };
    employee?: Employee;
    sections: Record<number, Section>;
    employees: Record<string, Employee>;
    contacts: Record<string, Contact>;
    prompts: Record<string, Prompt[]>;
    requested_employee_id?: string;
}

export interface DidNumber {
    id: number;
    account_id: number;
    status: boolean;
    did_number: number;
    industry: string;
    alias_number: string;
    difficulty: string;
    company: string;
    company_visible: boolean;
    businesstype: string;
    date_entered: Date;
    date_modified: Date;
    modified_user_id: string;
    created_by: string;
    description: string;
    assigned_user_id: string;
    timezone: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    address1: string;
    address_visible: boolean;
    address2: string;
    city: string;
    state: string;
    zip: string;
    province: string;
    main_phone: string;
    main_phone_visible: boolean;
    main_fax: string;
    main_fax_visible: boolean;
    alt_phone: string;
    alt_phone_visible: boolean;
    website: string;
    website_visible: boolean;
    hours: string;
    hours_visible: boolean;
    email: string;
    email_visible: boolean;
    type: string;
    privacy: string;
    country: string;
    answerphrase: string;
    did_color: string;
    has_oncall: number;
    legacy: boolean;
    legacy_accountcode: string;
    legacy_dispatch: string;
    deleted: boolean;
    deleted_ts: Date;
    legacy_multi_oncall: boolean;
    overflow: number;
    primary_or_overflow: number;
    radio_advertising: boolean;
    calls_per_day: number;
    calls_timing: string;
    calls_timing_other: string;
    service_sku: string;
    email_format: number;
    email_subject_template: string;
    include_cid: number;
    exclude_prompts: number;
    include_msg_id: number;
    include_call_events: number;
    scheduling_option: number;
    advanced_setup: number;
    billto_account: string;
    bilingual: number;
    hipaa: number;
    pci: number;
    smtp_profile: string;
    security_question_1: string;
    security_question_2: string;
    security_question_3: string;
    security_answer_1: string;
    security_answer_2: string;
    security_answer_3: string;
    enable_voicemail: number;
    skip_autofill: number;
    tiger_connect_org: string;
    tiger_connect_api_key: string;
    disable_recording: number;
    show_agent_bio: number;
    advanced_routing: number;
    translator: number;
    recording: number;
    high_priority: number;
    spam_blocking: number;
    delayed_answer: number;
    routing_product_tier: string;
    call_list_notes: string;
    external_key: string;
    routing_sector: string;
    pmd_api_key: string;
    directions: string;
    show_mp_number: boolean;
    transfer_timer: number;
}
export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    extension: string;
    old_role: string;
    firstname: string;
    lastname: string;
    email: string;
    account_id: number;
    subaccount_id: number;
    employee_id: number;
    created: Date;
    deleted: boolean | null;
    deleted_ts: Date | null;
    operator: boolean;
    display_stat: boolean;
    alias: string;
    monitor: boolean;
    add_account_notes: boolean;
    photo: string | null;
    role: string;
    roleName: string;
    autoanswer: boolean;
    twilio: boolean;
    agent_bio: string;
    employee_group: string;
    disabled_on: Date | null;
    force_password_reset: boolean;
    injixo_id: string | null;
}


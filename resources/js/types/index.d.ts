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
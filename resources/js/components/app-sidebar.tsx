import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index } from '@/routes/accounts';
import { index as didNumbers } from '@/routes/didnumbers';
import { index as reportsIndex } from '@/routes/reports';
import { index as callLogIndex } from '@/routes/call_logs';
import { index as messagesIndex } from '@/routes/messages';
import { index as complaintsIndex } from '@/routes/complaints';
import { index as mistakesIndex } from '@/routes/mistakes';
import { index as bulletinIndex } from '@/routes/bulletins';
import { index as inboxIndex } from '@/routes/inbox';
import { index as usersIndex } from '@/routes/users';
import { index as rolesIndex } from '@/routes/roles';
import { index as settingsIndex } from '@/routes/settings';
import { index as recentCallsIndex } from '@/routes/recent_calls';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartColumnIncreasing, Folder, Frown, History, Inbox, LayoutGrid, Mails, MonitorCheck, Pin, ScrollText, Settings, ShieldCheck, Users, Wrench } from 'lucide-react';
import AppLogo from './app-logo';
import complaints from '@/routes/complaints';

const mainNavItems: NavItem[] = [
    {
        title: 'Accounts',
        href: index().url,
        icon: LayoutGrid,
    },
    {
        title: 'Setup',
        href: didNumbers().url,
        icon: Settings,
    },
    {
        title: 'Reports',
        href: reportsIndex().url,
        icon: ChartColumnIncreasing,
    },
    {
        title: 'Call Log',
        href: callLogIndex().url,
        icon: ScrollText,
    },
    {
        title: 'Messages',
        href: messagesIndex().url,
        icon: Mails,
    },
    {
        title: 'Complaints',
        href: complaintsIndex().url,
        icon: MonitorCheck,
    },
    {
        title: 'Mistakes',
        href: mistakesIndex().url,
        icon: Frown,
    },
    {
        title: 'Bulletin',
        href: bulletinIndex().url,
        icon: Pin,
    },
    {
        title: 'Inbox',
        href: inboxIndex().url,
        icon: Inbox,
    },
    {
        title: 'Users',
        href: usersIndex().url,
        icon: Users,
    },
    {
        title: 'Roles',
        href: rolesIndex().url,
        icon: ShieldCheck,
    },
    {
        title: 'Settings',
        href: settingsIndex().url,
        icon: Wrench,
    },
    {
        title: 'Recent Calls',
        href: recentCallsIndex().url,
        icon: History,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'QView',
        href: '/',
        icon: MonitorCheck,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

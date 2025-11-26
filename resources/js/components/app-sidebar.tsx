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
        href: index(),
        icon: LayoutGrid,
    },
    {
        title: 'Setup',
        href: didNumbers(),
        icon: Settings,
    },
    {
        title: 'Reports',
        href: reportsIndex(),
        icon: ChartColumnIncreasing,
    },
    {
        title: 'Call Log',
        href: callLogIndex(),
        icon: ScrollText,
    },
    {
        title: 'Messages',
        href: messagesIndex(),
        icon: Mails,
    },
    {
        title: 'Complaints',
        href: complaintsIndex(),
        icon: MonitorCheck,
    },
    {
        title: 'Mistakes',
        href: mistakesIndex(),
        icon: Frown,
    },
    {
        title: 'Bulletin',
        href: bulletinIndex(),
        icon: Pin,
    },
    {
        title: 'Inbox',
        href: inboxIndex(),
        icon: Inbox,
    },
    {
        title: 'Users',
        href: usersIndex(),
        icon: Users,
    },
    {
        title: 'Roles',
        href: rolesIndex(),
        icon: ShieldCheck,
    },
    {
        title: 'Settings',
        href: settingsIndex(),
        icon: Wrench,
    },
    {
        title: 'Recent Calls',
        href: recentCallsIndex(),
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
                            <Link href={dashboard()} prefetch>
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

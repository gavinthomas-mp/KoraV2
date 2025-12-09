import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { MyStatusContent } from '@/components/my-status-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronRight, ChevronsUpDown } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { WorkerContext } from '@/Layouts/AppLayout';

export function NavUser() {
    const { workerObject } = useContext(WorkerContext);
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const [currentActivityName, setCurrentActivityName] =  useState<string | null>(workerObject?.activity?.name || 'Offline');

    useEffect(() => {
        if (workerObject) {
            const updateActivityName = () => {
                const activity = workerObject?.activity;
                setCurrentActivityName(activity ? activity.name : 'Offline');
            };

            // Initial activity name set
            updateActivityName();

            // Listen for activity changes
            workerObject.on('activityUpdated', updateActivityName);

            // Cleanup listener on unmount
            return () => {
                workerObject.off('activityUpdated', updateActivityName);
            };
        }
    }, [workerObject]);
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                            data-test="sidebar-menu-button"
                        >
                            <UserInfo  user={auth.user} currentActivityName={currentActivityName} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        side={
                            isMobile
                                ? 'bottom'
                                : state === 'collapsed'
                                  ? 'left'
                                  : 'bottom'
                        }
                    >
                        <UserMenuContent user={auth.user} />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='flex items-center'>
                                <DropdownMenuItem disabled className={`w-full flex items-center ${currentActivityName === 'Logged In' ? 'text-black !opacity-100' : ''}`}>
                                    {currentActivityName} 
                                    <div className='ml-auto pl-5'>
                                        <ChevronRight className='size-4' />
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <MyStatusContent />
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

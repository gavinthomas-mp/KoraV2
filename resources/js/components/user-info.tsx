import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { WorkerContext } from '@/Layouts/AppLayout';
import { cn } from '@/lib/utils';
import { type User } from '@/types';
import { useContext, useEffect } from 'react';

export function UserInfo({
    user,
    showEmail = false,
    currentActivityName,
}: {
    user: User;
    showEmail?: boolean;
    currentActivityName?: string;
}) {
    const getInitials = useInitials();
    const statusIcon = cn(
        'inline-block h-2 w-2 rounded-full mr-1 absolute top-2 left-8 z-10',
        {
            'bg-green-500': currentActivityName === 'Available' || currentActivityName === 'Logged In',
            'bg-red-500': currentActivityName !== 'Logged In' || currentActivityName === 'Unavailable'
        }
    )

    return (
        <>
            {currentActivityName && (
                <span className={statusIcon} title={currentActivityName}></span>
            )}
            <Avatar className="h-8 w-8 overflow-hidden rounded-full relative">
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.firstname, user.lastname)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.firstname} {user.lastname}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}

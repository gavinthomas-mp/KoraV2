import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { useContext } from 'react';
import { WorkerContext } from '@/Layouts/AppLayout';

export function MyStatusContent() {
    const { workerObject } = useContext(WorkerContext);

    const handleActivityChange = (activitySid: string) => {
        if (workerObject) {
            const selectedActivity = workerObject.activities.get(activitySid);
            if (selectedActivity) {
                selectedActivity.setAsCurrent()
                .then(() => {
                    console.log(`Activity changed to ${selectedActivity.name}`);
                })
                .catch((error: any) => {
                    console.error("Error changing activity:", error);
                });
            }
        }
    }
    return (
        <>
            {workerObject?.activities && Array.from(workerObject.activities.values()).map((activity: any) => (
                <DropdownMenuItem
                    key={activity.sid} 
                    className="activity-item text-xs"
                    onClick={() => handleActivityChange(activity.sid)}
                    >
                    {activity?.name}
                </DropdownMenuItem>
            ))}

        </>
    );
}
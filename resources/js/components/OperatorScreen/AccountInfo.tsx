import React, { useEffect, useState, useContext } from "react";
import { WorkerContext } from "@/Layouts/AppLayout";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Timer } from "../ui/timer";
export default function AccountInfo({}) {
    const [callTimer, setCallTimer] = useState<string | null>(null);
    const [localTime, setLocalTime] = useState<string | null>(null);
    const [waitTime, setWaitTime] = useState<string | null>(null);
    const [wrapUpTime, setWrapUpTime] = useState<string | null>(null);
    const [testDate, setTestDate] = useState<Date | null>(null);
    const {workerObject, workSpace, deviceObject, activities, currentCallStart} = useContext(WorkerContext);
    const [activitySid, setActivitySid] = useState<string | null>(null);
    useEffect(() => {
        const timerInterval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setLocalTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);
        const callInterval = setInterval(() => {
            if (currentCallStart) {
                const now = new Date();
                const elapsedMs = now.getTime() - currentCallStart.getTime();
                const elapsedSeconds = Math.floor(elapsedMs / 1000);
                const hours = Math.floor(elapsedSeconds / 3600).toString().padStart(2, '0');
                const minutes = Math.floor((elapsedSeconds % 3600) / 60).toString().padStart(2, '0');
                const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
                setCallTimer(`${hours}:${minutes}:${seconds}`);
            }
        }, 1000);

    }, [activities, workerObject, currentCallStart]);

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
        <div id="account_info" className="bg-[#302850] text-white uppercase py-2 items-center justify-center flex text-sm gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger className="w-[150px] flex relative items-center gap-2 mr-6 px-2 py-0.5 text-white cursor-pointer text-xs bg-[#473C77] border-solid border-[#ADA2DD] border normal-case rounded-sm">
                    {workerObject?.activity?.name || 'My Status'}
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={2} className="bg-black">
                    {workerObject?.activities && Array.from(workerObject.activities.values()).map((activity: any) => (
                        <DropdownMenuItem 
                            key={activity.sid} 
                            className="activity-item text-xs"
                            onClick={() => handleActivityChange(activity.sid)}
                            >
                            {activity?.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center">
                Call Timer: 
                <Timer variant="default" size="sm">
                    {
                        callTimer ? callTimer : '00:00:00'
                    }
                </Timer>
            </div>
            <div className="flex items-center">
                Local Time:
                <Timer variant="default" size="sm">
                {
                    localTime ? localTime : '00:00:00'
                }
                </Timer>
            </div>
            <div className="flex items-center">
                Wait Time:
                <Timer variant="default" size="sm">
                {
                    waitTime ? waitTime : '00:00:00'
                }
                </Timer>
            </div>
            <div className="flex items-center">
                Wrap-up:

                <Timer variant="default" size="sm">
                {
                    wrapUpTime ? wrapUpTime : '00:00:00'
                }
                </Timer>
            </div>
            <div className="">
                Test:
                {
                    testDate && (
                        <span id="test-date" className="ml-1">{testDate.toLocaleString()}</span>
                    )
                }
            </div>
        </div>
    )
}
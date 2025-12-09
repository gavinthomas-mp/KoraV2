import { createContext, useMemo, useState, useEffect, ReactNode } from 'react';
import OperatorScreen from '@/components/OperatorScreen';
import { token } from '@/elements/token';
import { AppContent } from '@/components/app-content';
import AppSidebarLayout from './app/app-sidebar-layout';
import { Supervisor, WorkerInfo, Workspace } from "twilio-taskrouter";
import { Device } from "@twilio/voice-sdk";
import { usePage } from "@inertiajs/react";
import { BreadcrumbItem } from '@/types';
import { initializeTwilioWorker } from '@/lib/twilioWorker';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export const WorkerContext = createContext<any>(null);
export const CalltypeContext = createContext<any>({
    selectedCalltype: null,
    setSelectedCalltype: (callTypeId: number) => {}
});

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const [enableDisconnectWorker, setEnableDisconnectWorker] = useState<boolean>(false);

    const [workerObject, setWorkerObject] = useState<Supervisor | null>(null);
    const [workSpace, setWorkSpace] = useState<Workspace | null>(null);
    const [reservationObject, setReservationObject] = useState<any>(null);
    const [activities, setActivities] = useState<any[]>([]);

    const [deviceObject, setDeviceObject] = useState<Device | null>(null);

    const [activeCall, setActiveCall] = useState<any>(null);
    const [currentCallStart, setCurrentCallStart] = useState<any>(new Date());

    const [currentReservations, setCurrentReservations] = useState<Map<string, any>[]>([]);

    const [didId, setDidId] = useState<number | null>(33);
    const [selectedCalltype, setSelectedCalltype] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [operatorScreenOpen, setOperatorScreenOpen] = useState<boolean>(false);
    
    const props = usePage().props;
    const tokenValue = token.token as string | null;

    const handleDisconnectWorker = () => {
        if (workerObject) {
            workerObject.disconnect();
        }
    };

    const handleIncomingCall = (call: any) => {
        setActiveCall(call);

        call.accept();
    };

    const handleAccept = (reservation: any = null) => {
        if (reservation) {
            setOperatorScreenOpen(true);
            return reservation.conference({
                endConferenceOnExit: true,
                beep: false,
                startConferenceOnEnter: true,
                from: reservation.task.attributes.from,
                to: 'client:gthomas'
            })
            .then((conference: any) => {
                setCurrentCallStart(new Date());
            })
            .catch((error: any) => {
                console.error("Error accepting reservation:", error);
            })
        }
    }

    const handleReject = () => {
        if (reservationObject) {
            reservationObject?.reject().then((rejectedReservation: {
                status: any
            }) => {
                console.log("Reservation rejected:", rejectedReservation.status);
            })
            .catch((error: any) => {
                console.error("Error rejecting reservation:", error);
            })
        }
    }

    const handleFetchWorkersInfo = async() => {
        try {
            const fetchWorkersInfoReq = await workSpace?.fetchWorkersInfo();

            if (fetchWorkersInfoReq) {
                const workers = Array.from(fetchWorkersInfoReq.values());

                workers.forEach((worker: WorkerInfo) => {
                    console.log("Worker Info:", worker.friendlyName, worker.activityName, worker.sid);
                });
            }
        } catch (error) {
            console.error("Error fetching workers info:", error);
        }
    }

    // Initialize or retrieve existing Twilio instances from singleton
    useEffect(() => {
        if (!tokenValue) {
            return;
        }

        const instances = initializeTwilioWorker(tokenValue);
        // Set state from singleton instances
        setWorkerObject(instances.worker);
        setWorkSpace(instances.workspace);
        setDeviceObject(instances.device);

        // No cleanup needed - instances persist in module scope
    }, [tokenValue]);

    // Set up worker event listeners
    useEffect(() => {
        if (!workerObject) {
            return;
        }

        const handleReady = (readyWorker: { sid: any, friendlyName: any }) => {
            console.log("Worker is ready to receive tasks");
        };

        const handleTokenExpired = () => {
            console.log("Worker token has expired");
        };

        const handleTokenUpdated = () => {
            console.log("Worker token has been updated");
        };

        const handleActivityUpdated = (activity: any) => {
            console.log("Worker activity updated to:", activity);
        };

        const handleDisconnected = (reason: any) => {
            setCurrentReservations([]);
        };

        const handleReservationCreated = (reservation: any) => {
            setReservationObject(reservation)
            handleAccept(reservation);
            setCurrentReservations((prevReservations) => [...prevReservations, reservation]);
        };

        workerObject.on('ready', handleReady);
        workerObject.on('tokenExpired', handleTokenExpired);
        workerObject.on('tokenUpdated', handleTokenUpdated);
        workerObject.on('activityUpdated', handleActivityUpdated);
        workerObject.on('disconnected', handleDisconnected);
        workerObject.on('reservationCreated', handleReservationCreated);

        // Cleanup listeners when component unmounts
        return () => {
            workerObject.off('ready', handleReady);
            workerObject.off('tokenExpired', handleTokenExpired);
            workerObject.off('tokenUpdated', handleTokenUpdated);
            workerObject.off('activityUpdated', handleActivityUpdated);
            workerObject.off('disconnected', handleDisconnected);
            workerObject.off('reservationCreated', handleReservationCreated);
        };
    }, [workerObject]);

    // Set up reservation event listeners
    useEffect(() => {
        if (!reservationObject) {
            return;
        }

        const handleAccepted = (reservation: { status: any }) => {
            console.log("Reservation accepted event:", reservation.status);
        };

        const handlePending = (reservation: { status: any }) => {
            console.log("Reservation pending event:", reservation.status);
        };

        const handleRejected = (reservation: { status: any }) => {
            console.log("Reservation rejected event:", reservation.status);
        };

        const handleTimeout = (reservation: { status: any }) => {
            console.log("Reservation timeout event:", reservation.status);
            setEnableDisconnectWorker(false);
        };

        const handleCanceled = (reservation: { status: any }) => {
            console.log("Reservation canceled event:", reservation.status);
            setEnableDisconnectWorker(false);
        };

        const handleRescinded = (reservation: { status: any }) => {
            console.log("Reservation rescinded event:", reservation.status);
        };

        const handleWrappingUp = (reservation: { status: any }) => {
            console.log("Reservation wrappingUp event:", reservation.status);
        };

        const handleCompleted = (reservation: { status: any }) => {
            console.log("Reservation completed event:", reservation.status);
            setEnableDisconnectWorker(false);
        };

        reservationObject.on('accepted', handleAccepted);
        reservationObject.on('pending', handlePending);
        reservationObject.on('rejected', handleRejected);
        reservationObject.on('timeout', handleTimeout);
        reservationObject.on('canceled', handleCanceled);
        reservationObject.on('rescinded', handleRescinded);
        reservationObject.on('wrappingUp', handleWrappingUp);
        reservationObject.on('completed', handleCompleted);

        if (workerObject && workerObject.reservations) {
            let reservationsArray: any[] = [];

            for (let reservation of workerObject.reservations.values()) {
                reservationsArray.push({
                    sid: reservation.sid,
                    status: reservation.status,
                    task: {
                        sid: reservation.task.sid,
                        status: reservation.task.status,
                        priority: reservation.task.priority,
                        queueName: reservation.task.queueName,
                        taskChannelUniqueName: reservation.task.taskChannelUniqueName
                    }
                });
            }
        }

        // Cleanup listeners when reservation changes or component unmounts
        return () => {
            reservationObject.off('accepted', handleAccepted);
            reservationObject.off('pending', handlePending);
            reservationObject.off('rejected', handleRejected);
            reservationObject.off('timeout', handleTimeout);
            reservationObject.off('canceled', handleCanceled);
            reservationObject.off('rescinded', handleRescinded);
            reservationObject.off('wrappingUp', handleWrappingUp);
            reservationObject.off('completed', handleCompleted);
        };
    }, [reservationObject, workerObject]);

    useEffect(() => {
        if (deviceObject) {
            deviceObject.on('incoming', handleIncomingCall);
        }

        return () => {
            if (deviceObject) {
                deviceObject.off('incoming', handleIncomingCall);
            }
        };
    }, [deviceObject]);

    const workerContextValue = useMemo(() => ({
        workerObject,
        workSpace,
        deviceObject,
        activities,
        currentCallStart,
        didId,
        operatorScreenOpen,
        setOperatorScreenOpen
    }), [workerObject, workSpace, deviceObject, activities, currentCallStart, didId, operatorScreenOpen]);
    
    const callTypeContextValue = useMemo(() => ({
        selectedCalltype,
        setSelectedCalltype,
        searchQuery,
        setSearchQuery,
    }), [selectedCalltype, searchQuery]);
    
    return (
        <WorkerContext.Provider value={workerContextValue}>
            <CalltypeContext.Provider value={callTypeContextValue}>
                <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
                    <AppContent variant='sidebar' className='overflow-x-hidden'>
                        <main className="py-10">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    {children}
                                </div>
                            </div>
                        </main>
                        <OperatorScreen />
                    </AppContent>
                </AppSidebarLayout>
            </CalltypeContext.Provider>
        </WorkerContext.Provider>
    );
}
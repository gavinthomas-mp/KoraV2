import React, { createContext, useMemo, useState, useEffect } from 'react';
import OperatorScreen from '@/components/OperatorScreen';
import { Link } from '@inertiajs/react';
import { token } from '@/elements/token';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import AppSidebarLayout from './app/app-sidebar-layout';
import { Supervisor, WorkerInfo, Workspace } from "twilio-taskrouter";
import { Device } from "@twilio/voice-sdk";
import { usePage } from "@inertiajs/react";

export const WorkerContext = createContext<any>(null);
export const CalltypeContext = createContext<any>({
    selectedCalltype: null,
    setSelectedCalltype: (callTypeId: number) => {}
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [enableDisconnectWorker, setEnableDisconnectWorker] = useState<boolean>(false);

    const [workerObject, setWorkerObject] = useState<Supervisor | null>(null);
    const [workSpace, setWorkSpace] = useState<Workspace | null>(null);
    const [reservationObject, setReservationObject] = useState<any>(null);
    const [activities, setActivities] = useState<any[]>([]);

    const [deviceObject, setDeviceObject] = useState<Device | null>(null);

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

    const handleAccept = () => {
        if (reservationObject) {
            return reservationObject.conference({
                endConferenceOnExit: true,
                beep: false,
                startConferenceOnEnter: true,
                from: reservationObject.task.attributes.from,
                to: 'client:gthomas'
            })
            .then((conference: any) => {
                console.log("Conference established for reservation", conference.sid);
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

    useEffect(() => {
        if (!tokenValue) {
            return;
        }

        const worker = new Supervisor(tokenValue);

        const device = new Device(tokenValue);
        
        device.register();

        const workspace = new Workspace(tokenValue);

        setWorkerObject(worker);
        setWorkSpace(workspace);
        setDeviceObject(device);

        return () => {
            if (worker) {
                worker.disconnect();
            }
        }
    }, [token]);

    useEffect(() => {
        if (!workerObject) {
            return;
        }

        workerObject.on('ready', (readyWorker: { sid: any, friendlyName: any}) => {
            console.log("Worker is ready to receive tasks");
        });

        workerObject.on('tokenExpired', () => {
            console.log("Worker token has expired");
        });

        workerObject.on('tokenUpdated', () => {
            console.log("Worker token has been updated");
        });

        workerObject.on('activityUpdated', (activity) => {
            console.log("Worker activity updated to:", activity);
        });

        workerObject.on('disconnected', (reason: any) => {
            setCurrentReservations([]);
        })

        workerObject.on('reservationCreated', (reservation) => {
            console.log("New reservation created:", reservation.sid);
            setReservationObject(reservation);
            handleAccept();
            setCurrentReservations((prevReservations) => [...prevReservations, reservation]);
        });
    }, [workerObject]);

    useEffect(() => {
        if (!reservationObject) {
            return;
        }

        reservationObject.on('accepted', (reservation: { status: any }) => {
            console.log("Reservation accepted event:", reservation.status);
        });

        reservationObject.on('pending', (reservation: { status: any }) => {
            console.log("Reservation pending event:", reservation.status);
        });

        reservationObject.on('rejected', (reservation: { status: any }) => {
            console.log("Reservation rejected event:", reservation.status);
        });

        reservationObject.on('timeout', (reservation: { status: any }) => {
            console.log("Reservation timeout event:", reservation.status);
            setEnableDisconnectWorker(false);
        });

        reservationObject.on('canceled', (reservation: { status: any }) => {
            console.log("Reservation canceled event:", reservation.status);
            setEnableDisconnectWorker(false);
        });
        
        reservationObject.on('rescinded', (reservation: { status: any }) => {
            console.log("Reservation rescinded event:", reservation.status);
        });

        reservationObject.on('wrappingUp', (reservation: { status: any }) => {
            console.log("Reservation wrappingUp event:", reservation.status);
        });
        
        reservationObject.on('completed', (reservation: { status: any }) => {
            console.log("Reservation completed event:", reservation.status);
            setEnableDisconnectWorker(false);
        });

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
    })

    const workerContextValue = useMemo(() => ({
        workerObject,
        workSpace,
        deviceObject,
        activities,
        currentCallStart,
        didId,
        operatorScreenOpen,
        setOperatorScreenOpen
    }), [workerObject, workSpace, deviceObject, activities, currentCallStart, didId, operatorScreenOpen, setOperatorScreenOpen]);
    const callTypeContextValue = useMemo(() => ({
        selectedCalltype,
        setSelectedCalltype,
        searchQuery,
        setSearchQuery,
    }), [selectedCalltype, setSelectedCalltype, searchQuery, setSearchQuery]);
    
    return (
        <WorkerContext.Provider value={workerContextValue}>
            <CalltypeContext.Provider value={callTypeContextValue}>
                <AppSidebarLayout>
                    <AppContent variant='sidebar' className='overflow-x-hidden'>
                        <main className="py-10">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                {children}
                            </div>
                        </main>
                        <OperatorScreen />
                    </AppContent>
                </AppSidebarLayout>
            </CalltypeContext.Provider>
        </WorkerContext.Provider>
    );
}
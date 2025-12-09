import { Supervisor, Workspace } from "twilio-taskrouter";
import { Device } from "@twilio/voice-sdk";

let workerInstance: Supervisor | null = null;
let workspaceInstance: Workspace | null = null;
let deviceInstance: Device | null = null;
let isInitialized = false;

export const initializeTwilioWorker = (token: string) => {
    if (isInitialized && workerInstance) {
        return {
            worker: workerInstance,
            workspace: workspaceInstance,
            device: deviceInstance
        };
    }

    workerInstance = new Supervisor(token);
    deviceInstance = new Device(token);
    deviceInstance.register();
    workspaceInstance = new Workspace(token);
    
    isInitialized = true;

    return {
        worker: workerInstance,
        workspace: workspaceInstance,
        device: deviceInstance
    };
};

export const getTwilioInstances = () => ({
    worker: workerInstance,
    workspace: workspaceInstance,
    device: deviceInstance,
    isInitialized
});

export const disconnectTwilioWorker = () => {
    if (workerInstance) {
        workerInstance.disconnect();
    }
    workerInstance = null;
    workspaceInstance = null;
    deviceInstance = null;
    isInitialized = false;
};
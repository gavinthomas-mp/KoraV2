import React, { useMemo } from "react";
import { useForm } from "@inertiajs/react";

interface CalltypeSelectorProps {
    children: React.ReactNode;
}

export const CalltypeContext = React.createContext<any>(null);

const CalltypeSelector: React.FC<CalltypeSelectorProps> = ({ children }: { children: React.ReactNode }) => {
    const contextValue = useMemo(() => ({
        selectedScript: null,
        selectCallType: (callTypeId: number) => {
            // Logic to select call type and update selectedScript
        },
    }), [])
    return (
        <CalltypeContext.Provider value={contextValue}>
            {children}
        </CalltypeContext.Provider>
    );
}

export { CalltypeSelector };
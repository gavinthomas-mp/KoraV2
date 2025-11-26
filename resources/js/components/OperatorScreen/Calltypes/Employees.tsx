import React, { useEffect, useState, useMemo, useContext } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CalltypeContext } from "@/Layouts/AppLayout";
const callTypeContainer = cva(
    "border-l-5 border-gray-300 border-solid font-bold rounded-md cursor-pointer relative bg-gray-100 px-4 py-2 mb-2 hover:bg-gray-200 transition-colors",
    {
        variants: {
            variant: {
                default: {},
                highlighted: {
                    borderColor: "border-blue-500",
                    boxShadow: "shadow-lg",
                },
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Employees({ didId }: { didId: number | null }) {
    const [callTypes, setCallTypes] = useState<any[]>([]);
    const { selectedCalltype, setSelectedCalltype } = useContext(CalltypeContext);

    useEffect(() => {
        fetch(`/calltypes/${didId}/employees`)
            .then(response => response.json())
            .then(data => setCallTypes(data))
            .catch(error => console.error('Error fetching call types:', error));
    }, [didId]);

    const handleCallTypeSelect = (callTypeId: number) => {
        setSelectedCalltype({
            type: 'employee',
            id: callTypeId
        });
    }
    return (
        <>
            {callTypes.map((callType) => (
                <div key={callType.id} className={cn(callTypeContainer())} onClick={() => handleCallTypeSelect(callType.id)}>
                    <p className="text-sm text-gray-500">{callType.name}</p>
                </div>
            ))}
        </>
    );
}

export { Employees };
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

function AllCallTypes({ searchResults }: { searchResults: any[] }) {
    const { selectedCalltype, setSelectedCalltype } = useContext(CalltypeContext);

    const handleCallTypeSelect = (callTypeId: number) => {
        setSelectedCalltype({
            type: 'calltype',
            id: callTypeId
        });
    }
    const handleEmployeeSelect = (employeeId: number) => {
        setSelectedCalltype({
            type: 'employee',
            id: employeeId
        });
    }
    return (
        <>
            {searchResults.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No call types found.</p>
            ) : (
                <ul>
                    {searchResults?.calltypes.map((searchResult) => (
                        <div key={searchResult.id} className={cn(callTypeContainer())} onClick={() => handleCallTypeSelect(searchResult.id)}>
                            <p className="text-sm text-gray-500">{searchResult.title}</p>
                        </div>
                    ))}
                    {searchResults?.employees.map((searchResult) => (
                        <div key={searchResult.id} className={cn(callTypeContainer())} onClick={() => handleEmployeeSelect(searchResult.id)}>
                            <p className="text-sm text-gray-500">{searchResult.name}</p>
                        </div>
                    ))}
                </ul>
            )}
        </>
    );
}

export { AllCallTypes };
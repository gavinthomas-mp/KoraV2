import React, { useState, useEffect } from "react";

const callerDetailsHistoryExample = [
    {
        id: 1,
        callType: 'Inbound',
        date: '2024-06-01 10:00 AM',
        duration: '5 mins',
    },
    {
        id: 2,
        callType: 'Outbound',
        date: '2024-06-02 02:30 PM',
        duration: '10 mins',
    },
    {
        id: 3,
        callType: 'Missed',
        date: '2024-06-03 11:15 AM',
        duration: '0 mins',
    }
];
function CallerDetailsHistory() {
    return (
        <>
            {callerDetailsHistoryExample.map((call) => (
                <div key={call.id} className="p-3 border-b last:border-0">
                    <p><strong>Call Type:</strong> {call.callType}</p>
                    <p><strong>Date:</strong> {call.date}</p>
                    <p><strong>Duration:</strong> {call.duration}</p>
                </div>
            ))}
        </>
    );
}

export { CallerDetailsHistory };
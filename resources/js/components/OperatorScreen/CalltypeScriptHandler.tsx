import React, { useContext, useState, useEffect } from "react";
import { WorkerContext } from "@/Layouts/AppLayout";
import ScriptRenderer from "./Scripts/ScriptRenderer";


function CalltypeScriptHandler() {
    const { selectedCalltype, didId } = useContext<any>(WorkerContext) || {};
    const [scriptContent, setScriptContent] = useState<string>("");

    const onScreenPop = () => {
        fetch(`/scripts/${didId}/${selectedCalltype?.id}/13649`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedCalltype),
        })
        .then(response => response.json())
        .then(data => setScriptContent(data))
        .catch(error => console.error('Error fetching script:', error));
    }

    return (
        <>
            {
                selectedCalltype ? (
                    <ScriptRenderer scriptContent={scriptContent} setScriptContent={setScriptContent} />
                ) : (
                    <div className="basis-full flex items-center justify-center flex-col">
                        <p className="font-bold">No calltype selected</p>
                        <p className="text-sm text-gray-500">Select the relevant calltype or use the search to find the correct calltype</p>
                    </div>
                )
            }
        </>
    );
}

export { CalltypeScriptHandler };
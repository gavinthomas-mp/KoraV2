import React, {useContext} from "react";
import { WorkerContext } from "@/Layouts/AppLayout";
import { Button } from "../ui/button";

export default function FooterControls({}) {
    const { setOperatorScreenOpen } = useContext(WorkerContext);
    return (
        <div id="footer_controls" className="bg-[#201F2E] text-white uppercase p-1 items-center justify-center flex text-sm gap-4">
            <div className="">
                Footer Controls Placeholder
            </div>
            <Button variant="default" onClick={() => setOperatorScreenOpen(false)}>
                Close Operator Screen
            </Button>
        </div>
    );
}
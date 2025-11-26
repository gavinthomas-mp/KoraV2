import { Instructions } from "./Instructions";
import { CalltypeScriptHandler } from "./CalltypeScriptHandler";
export default function ScriptArea({}) {
    return (
        <div id="script_area" className="relative h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10">
                <Instructions />
            </div>
            <CalltypeScriptHandler />
        </div>
    );
}
import { Tab, TabList, TabPanel, TabPanels, TabGroup } from "@headlessui/react";
import { useState } from "react";
import { ExistingCaller } from "../ui/existing-caller";
import { CallerDetailsForm } from "./CallerDetailsForm";
import { CallerDetailsHistory } from "./CallerDetailsHistory";
export default function RecentCaller({}) {
    const [existingCaller, setExistingCaller] = useState<boolean>(false);
    return (
        <div id="recent_caller">
            <TabGroup>
                <TabList className="flex gap-4">
                    <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline text-[rgb(119,119,119)] after:content-[''] data-selected:text-black after:block after:h-1 data-selected:after:bg-[#e70175] after:mt-1 after:w-full after:transition-all hover:after:bg-gray-300">
                        Recent Caller
                    </Tab>
                    <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline text-[rgb(119,119,119)] after:content-[''] data-selected:text-black after:block after:h-1 data-selected:after:bg-[#e70175] after:mt-1 after:w-full after:transition-all hover:after:bg-gray-300">
                        History
                    </Tab>
                </TabList>
                <TabPanels className="mt-2">
                    <TabPanel>
                        <ExistingCaller existingCaller={existingCaller} />
                        <CallerDetailsForm setExistingCaller={setExistingCaller} />
                    </TabPanel>
                    <TabPanel>
                        <CallerDetailsHistory />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
}
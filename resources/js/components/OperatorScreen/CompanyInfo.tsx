import { useContext, useState } from "react";
import { WorkerContext } from "@/Layouts/AppLayout";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/ui/tabs";
import Search from "./Search";
import { CompanyData } from "./Calltypes/CompanyData";
import { AllCallTypes } from "./Calltypes/AllCallTypes";
import { CallTypes } from "./Calltypes/CallTypes";
import { Employees } from "./Calltypes/Employees";

export default function CompanyInfo({}) {
    const {workerObject, setWorkerObject, didId} = useContext(WorkerContext);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const categories = [
      {
        name: 'Company Info',
        element: <CompanyData didId={didId} />
      },
      {
        name: 'All',
        element: <AllCallTypes searchResults={searchResults} />
      },
      {
        name: 'Calltypes',
        element: <CallTypes didId={didId} />
      },
      {
        name: 'Employees',
        element: <Employees didId={didId} />
      }
    ];
    return (
        <div className="">
            <div className="w-full max-w-md">
                <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <TabList>
                        {categories.map(({ name }) => (
                            <Tab
                                key={name}
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                    <Search selectedTab={[selectedTab, setSelectedTab]} didId={didId} searchResults={searchResults} setSearchResults={setSearchResults} />
                    <TabPanels className="mt-3">
                        {categories.map(({ name, element }) => (
                          <TabPanel key={name}>
                              {element}
                          </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
}
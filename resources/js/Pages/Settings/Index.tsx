import AppLayout from "@/Layouts/AppLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/ui/tabs";
import { usePage } from "@inertiajs/react";

function Index(props: any) {
    const appSettings = props?.settings?.appSettings;
    const miscSettings = props?.settings?.miscSettings;
    return (
        <AppLayout>
            <TabGroup>
                <TabList>
                    <Tab>Color Highlights</Tab>
                    <Tab>Misc Settings</Tab>
                    <Tab>Dry Run Settings</Tab>
                    <Tab>Grouped Subaccounts Settings</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {appSettings && (
                            appSettings.map((setting: any) => (
                                <div key={setting.id} className="mb-4 flex gap-4 items-center">
                                    <Label className="mb-1">{setting.field}</Label>
                                    <Input value={setting.value} />
                                </div>
                            ))
                        )}
                    </TabPanel>
                    <TabPanel>
                        {miscSettings && (
                            miscSettings.map((setting: any) => (
                                <div key={setting.id} className="mb-4 flex gap-4 items-center">
                                    <Label className="mb-1">{setting.name}</Label>
                                    <Input value={setting.value} />
                                </div>
                            ))
                        )}
                    </TabPanel>
                    <TabPanel>
                        <div>Dry Run Settings Content</div>
                    </TabPanel>
                    <TabPanel>
                        <div>Grouped Subaccounts Settings Content</div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </AppLayout>
    )
}

export default Index;
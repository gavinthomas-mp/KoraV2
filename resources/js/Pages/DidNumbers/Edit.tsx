import Heading from "@/components/heading";
import { Label } from "@/components/ui/label";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/ui/tabs";
import AppLayout from "@/Layouts/AppLayout";
import { Form, Link } from "@inertiajs/react";

function Edit(props:{ didNumber: any, account: any }) {
    return (
        <AppLayout>
            <TabGroup>
                <TabList>
                    <Tab>
                        Basic Info
                    </Tab>
                    <Tab>
                        Did Numbers
                    </Tab>
                    <Tab>
                        Call Types
                    </Tab>
                    <Tab>
                        Contacts
                    </Tab>
                    <Tab>
                        On-Call
                    </Tab>
                    <Tab>
                        Calls
                    </Tab>
                    <Tab>
                        Messages
                    </Tab>
                    <Tab>
                        Advertisements
                    </Tab>
                    <Tab>
                        Edit History
                    </Tab>
                    <Tab>
                        Skills
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Heading title="Basic Info" />
                        <Link href={'#'} className="border-b border-black">
                            Edit Basic Info
                        </Link>
                        <Form method="post" action={'#'} className="mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name" className="mb-1 block font-medium">
                                        ID:
                                    </Label>
                                    <div className="text-sm text-gray-700">
                                        { props.account.id }
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Did Numbers" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Call Types" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Contacts" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="On-Call" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Calls" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Messages" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Advertisements" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Edit History" />
                    </TabPanel>
                    <TabPanel>
                        <Heading title="Skills" />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </AppLayout>

    )
}

export default Edit;
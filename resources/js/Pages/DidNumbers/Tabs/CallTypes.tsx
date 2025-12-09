import { JSX } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Switch } from "@headlessui/react";
import AppLayout from "@/Layouts/AppLayout";
import { DidNumberTabs } from "@/components/Tabs/DidNumberTabs";
import { BreadcrumbItem } from "@/types";
import { index } from "@/routes/didnumbers";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'DID Numbers',
        href: index().url,
    },
    {
        title: 'Call Types',
        href: ''
    }
]

interface PaginatedResponse<T> {
    data: T[];
    links: Array<{
        url: string;
        label: string;
        active: boolean;
    }>;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

interface CallType {
    id: number;
    title: string;
    schedule: string;
    template: string;
    active: boolean;
}

interface CallTypesPageProps {
    id: number;
    callTypes: PaginatedResponse<CallType>;
}

function CallTypes(props: CallTypesPageProps): JSX.Element {
    const id = props.id;
    const callTypes = props.callTypes.data ?? [];
    const links = props.callTypes.links ?? [];

    const setActiveCalltype = (callTypeId: number, isActive: boolean) => {
        // Logic to update call type active status
        console.log(`Call Type ID: ${callTypeId}, Active: ${isActive}`);
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DidNumberTabs id={id} />
            {
                callTypes && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Call Type</TableHead>
                                <TableHead>Schedule</TableHead>
                                <TableHead>Template</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {callTypes.map((callType) => (
                                <TableRow key={callType.id}>
                                    <TableCell>{callType.title}</TableCell>
                                    <TableCell>{callType.schedule}</TableCell>
                                    <TableCell>{callType.template}</TableCell>
                                    <TableCell>
                                        <Switch
                                            id={`active_calltype_${callType.id}`}
                                            name={`active_calltype_${callType.id}`}
                                            checked={callType.active}
                                            onChange={(isActive) => setActiveCalltype(callType.id, isActive)}
                                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                        >
                                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                        </Switch>
                                        
                                    </TableCell>
                                    <TableCell>
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            }
            {
                links && (
                    <Pagination>
                        <PaginationContent>
                            {links.map((link, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink size={'default'} isActive={link.active} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
            )}
        </AppLayout>
    )
}
export default CallTypes;
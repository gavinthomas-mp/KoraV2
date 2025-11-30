import React, { JSX } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AppLayout from "@/Layouts/AppLayout";
import { DidNumberTabs } from "@/components/DidNumberTabs";
import { BreadcrumbItem } from "@/types";
import { index } from "@/routes/didnumbers";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'DID Numbers',
        href: index().url,
    },
    {
        title: 'Calls',
        href: ''
    }
]
interface PaginatedResponse<T> {
    data: T[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

interface Call {
    id: number;
    start_time: string;
    name: string;
    extension: string;
    queue: string;
    end_time: string;
    duration: string;
    cid_number: string;
}

interface CallsPageProps {
    id: number;
    calls: PaginatedResponse<Call>;
}

function Calls(props: CallsPageProps): JSX.Element {
    const calls = props.calls?.data ?? [];
    const links = props.calls?.links;
    const id = props.id;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <DidNumberTabs id={id} />
        {
            calls.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Start Time</TableHead>
                            <TableHead>Operator</TableHead>
                            <TableHead>Ext.</TableHead>
                            <TableHead>Queue / Wait Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>CID Number</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {calls.map((call: any) => (
                            <TableRow key={call.id}>
                                <TableCell>{call.start_time}</TableCell>
                                <TableCell>{call.name}</TableCell>
                                <TableCell>{call.extension}</TableCell>
                                <TableCell>{call.queue}</TableCell>
                                <TableCell>{call.end_time}</TableCell>
                                <TableCell>{call.duration}</TableCell>
                                <TableCell>{call.cid_number}</TableCell>
                                <TableCell>{/* Actions can be added here */}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {
                links && (
                    <Pagination>
                        <PaginationContent>
                            {links.map((link: any, index: number) => (
                                <PaginationItem key={index}>
                                    <PaginationLink size={'default'} isActive={link.active} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
            )}
        </AppLayout>
    );
}

export default Calls;
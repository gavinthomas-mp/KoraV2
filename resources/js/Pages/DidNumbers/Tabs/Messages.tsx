import { JSX } from "react";
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
        title: 'Messages',
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
interface Message {
    id: number;
    operator: string;
    dateSent: string;
    calltypeMessage: string;
    delivered: number;
    minder: number;
    hold: number;
}

interface MessagesPageProps {
    id: number;
    messages: PaginatedResponse<Message>;
}
function Messages(props: MessagesPageProps): JSX.Element {
    const messages = props.messages?.data ?? [];
    const links = props.messages?.links;
    const id = props.id;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DidNumberTabs id={id} />
        {
            messages.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Message ID</TableHead>
                            <TableHead>Operator</TableHead>
                            <TableHead>Created Duration/Wrapup</TableHead>
                            <TableHead>Calltype/Message</TableHead>
                            <TableHead>Delivered</TableHead>
                            <TableHead>Minder</TableHead>
                            <TableHead>Hold</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((message: any) => (
                            <TableRow key={message.id}>
                                <TableCell>{message.id}</TableCell>
                                <TableCell>{message.user_name}</TableCell>
                                <TableCell>{message.dateSent}</TableCell>
                                <TableCell>{message.calltype}</TableCell>
                                <TableCell>{message.delivered == 1 ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{message.minder == 1 ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{message.hold == 1 ? 'Yes' : 'No'}</TableCell>
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

export default Messages;
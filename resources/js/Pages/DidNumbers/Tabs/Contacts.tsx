import AppLayout from "@/Layouts/AppLayout";
import { JSX } from "react";
import { DidNumberTabs } from "@/components/Tabs/DidNumberTabs";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { BreadcrumbItem } from "@/types";
import { index } from "@/routes/didnumbers";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'DID Numbers',
        href: index().url,
    },
    {
        title: 'Contacts',
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

interface Contact {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
}
interface ContactsPageProps {
    id: number;
    contacts: PaginatedResponse<Contact>;
}
type ContactsProps = ContactsPageProps;

function Contacts(props: ContactsProps): JSX.Element {
    const id = props.id;
    const contacts = props.contacts?.data ?? [];
    console.log(contacts);
    const links = props.contacts?.links ?? [];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DidNumberTabs id={id} />
            {
                contacts.length > 0 && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Sort Order</TableHead>
                                <TableHead>Job Title</TableHead>
                                <TableHead>Special Instructions</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Excuse</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact: any) => (
                                <TableRow key={contact.id}>
                                    <TableCell>{contact.id}</TableCell>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.sort}</TableCell>
                                    <TableCell>{contact.title}</TableCell>
                                    <TableCell>{contact.special_instructions}</TableCell>
                                    <TableCell>{contact.type}</TableCell>
                                    <TableCell>{contact.excuse}</TableCell>
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
                                <PaginationItem key={index} active={link.active}>
                                    <PaginationLink href={link.url || undefined} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                )
            }
        </AppLayout>
    );
}

export default Contacts;
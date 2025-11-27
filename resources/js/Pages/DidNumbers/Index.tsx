import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AppLayout from "@/Layouts/AppLayout";
import { Form, Link } from "@inertiajs/react";
import { Edit } from "lucide-react";

function Index(props:{ accounts: any }) {
    const accounts = props?.accounts?.data;
    const links = props?.accounts?.links;
    return (
        <AppLayout>
            {
                accounts && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Queue</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Number</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Taking Calls</TableHead>
                                <TableHead>Bilingual</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.map((didNumber: any) => (
                                <TableRow key={didNumber.id} className="cursor-pointer hover:bg-gray-100">
                                    <TableCell>{didNumber.queue_name}</TableCell>
                                    <TableCell>{didNumber.company}</TableCell>
                                    <TableCell>{didNumber.main_phone}</TableCell>
                                    <TableCell>{didNumber.date_entered}</TableCell>
                                    <TableCell>{didNumber.taking_calls ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{didNumber.bilingual ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Link 
                                            className="p-2.5 rounded-full bg-green-400 inline-flex items-center justify-center mr-2 transition-all hover:bg-green-500"
                                            href={`/didnumbers/${didNumber.id}`}>
                                            <Edit className="size-4 text-white" />
                                        </Link>
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
                            {links.map((link: any, index: number) => (
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

export default Index;
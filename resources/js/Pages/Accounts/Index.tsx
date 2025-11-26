import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AppLayout from "@/Layouts/AppLayout";
import { Link, router } from "@inertiajs/react";
import { Edit, Trash } from "lucide-react";
import DeleteAccount from "@/components/delete-account";

function Index(props: any) {
    const accounts = props?.accounts?.data;
    const links = props?.accounts?.links;

    const handleOnClick = (event: any) => {
        router.visit(`/accounts/${event}`);
    };
    return (
        <AppLayout>
            {
                accounts && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Account Name</TableHead>
                                <TableHead>Account Num</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.map((account: any) => (
                                <TableRow key={account.id} className="cursor-pointer hover:bg-gray-100">
                                    <TableCell>{account.account_name}</TableCell>
                                    <TableCell>{account.account_num}</TableCell>
                                    <TableCell>{account.created}</TableCell>
                                    <TableCell>
                                        <Link 
                                            className="p-2.5 rounded-full bg-green-400 inline-flex items-center justify-center mr-2 transition-all hover:bg-green-500"
                                            href={`/accounts/${account.id}`}>
                                            <Edit className="size-4" />
                                        </Link>
                                        <DeleteAccount accountId={account.id} />
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
import UsersController from "@/actions/App/Http/Controllers/UsersController";
import React, { useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { 
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow
} from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BreadcrumbItem } from "@/types";
import { index, edit } from "@/routes/users";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit } from "lucide-react";
import { Form, router, usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { User, PaginatedResponse } from "@/types";

interface UsersIndexProps {
    users: PaginatedResponse<User>;
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'username',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('username')}</div>
    },
    {
        accessorKey: 'firstname',
        header: ( { column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'lastname',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'roleName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'display_stat',
        header: 'Display Stat',
        cell: ({ row }) => (row.getValue('display_stat') ? 'Yes' : 'No')
    },
    {
        id: 'queues',
        header: 'Queues',
        cell: ({ row }) => (
            <a
                className="px-2 py-1 rounded-xl bg-mp-orange inline-flex items-center justify-center mr-2 transition-all hover:bg-mp-orange-dark text-white"
                href={`/users/${row.original.id}/queues`}
            >
                View Queues
            </a>
        )
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <Edit
                className="size-5 text-mp-orange hover:text-mp-orange-dark cursor-pointer"
                onClick={() => router.get(edit(row.original.id).url)}
            />
        )
    }
]
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: index().url,
    }
];
function UsersIndex(props: UsersIndexProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [users, setUsers] = React.useState(props.users?.data || []);
    const [links, setLinks] = React.useState(props.users?.links || []);
    const page = usePage();
    console.log(page.props);
    const [searchTerm, setSearchTerm] = React.useState(page.props.filters?.search || '');
    const table = useReactTable({
        data: users,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(index().url, {
            search: searchTerm
        }, {
            preserveState: true,
            onSuccess: (page) => {
                const props = page.props as any;
                setUsers(props.users?.data || []);
                setLinks(props.users?.links || []);
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex gap-2">
                <Input type="text" name="search" placeholder="Search users..." className="mr-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button type="submit" onClick={handleSearch}>
                    Search
                </Button>
                {
                    searchTerm && (
                        <Button variant="outline" onClick={() => {
                            setSearchTerm('');
                            router.get(index().url, {}, {
                                preserveState: true,
                                onSuccess: (page) => {
                                    const props = page.props as any;
                                    setUsers(props.users?.data || []);
                                    setLinks(props.users?.links || []);
                                }
                            })
                        }}>
                            Clear
                        </Button>
                    )
                }
            </div>
            {props.users && (
                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-gray-100">
                                        {
                                            row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            )}
            {
                links && (
                    <Pagination>
                        <PaginationContent>
                            {links.map((link, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink isActive={link.active} href={link.url || undefined} dangerouslySetInnerHTML={{ __html: link.label }} size={'default'} />
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                )
            }
        </AppLayout>
    )
}

export default UsersIndex;
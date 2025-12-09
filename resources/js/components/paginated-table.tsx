import { useState, useEffect} from 'react';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from './ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

interface PaginatedTableProps {
    data: any[];
    columns: { header: string; accessor: string }[];
    links: any;
}

function PaginatedTable({ data, columns, links }: PaginatedTableProps) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.accessor}>{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((col) => (
                                <TableCell key={col.accessor}>{row[col.accessor]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
        </>
    );
};

export { PaginatedTable };
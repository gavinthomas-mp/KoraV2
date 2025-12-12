import React, { useState } from "react";
import { SearchAccount } from "@/components/search-account";
import Heading from "@/components/heading";
import AppLayout from "@/Layouts/AppLayout";
import { index } from "@/routes/messages";
import { BreadcrumbItem, Message } from "@/types";
import { messages } from "@/routes/didnumbers";
import { PaginatedTable } from "@/components/paginated-table";


interface MessagesIndexProps {
    messages?: Array<Message>;
};
const breadcrumbs: BreadcrumbItem[] = [
    { 
        title: "Messages",
        href: index().url
    },
];

function MessagesIndex(props: MessagesIndexProps) {
    const [messageResults, setMessageResults] = useState<Array<any>>([]);
    const [messageResultsLinks, setMessageResultsLinks] = useState<Array<any>>([]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Heading title="Messages" />
            <SearchAccount searchUrl={index().url} setResults={setMessageResults} results={messageResults} setLinks={setMessageResultsLinks} links={messageResultsLinks} />
            {
                props.messages && props.messages.length > 0 ? (
                    <div className="mt-6">
                        <PaginatedTable
                            data={messageResults}
                            columns={}
                            links={messageResultsLinks}
                            />
                    </div>
                ) : (
                    <p className="mt-6 text-center text-gray-500">No messages found.</p>
                )
            }
        </AppLayout>
    )
}

export default MessagesIndex;
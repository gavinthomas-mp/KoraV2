import { useEffect, useState } from "react";
import Heading from "@/components/heading";
import AppLayout from "@/Layouts/AppLayout";
import { SearchAccount } from "@/components/search-account";
import { PaginatedTable } from "@/components/paginated-table";
import { BreadcrumbItem } from "@/types";
import { Download, Search } from "lucide-react";
import { index, show } from "@/routes/call_logs";
interface CallLogIndexProps {
    callLogs: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Call Logs",
        href: index().url,
    }
];

function CallLogIndex(props: CallLogIndexProps) {
    const [account, setAccount] = useState(null);
    const [callId, setCallId] = useState(null);
    const [queue, setQueue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [minDuration, setMinDuration] = useState(null);
    const [wrapUpPercentage, setWrapUpPercentage] = useState(null);
    const [type, setType] = useState(null);
    const [callResults, setCallResults] = useState<Array<any>>(props.callLogs.data || []);
    const [callResultsLinks, setCallResultsLinks] = useState<Array<any>>(props.callLogs.links || {});

    callResults.forEach((call) => {
        call.actions = [
            {
                name: "View Details",
                href: show(call.id).url,
                method: "get",
                as: "a",
                icon: <Search className="w-4 h-4" />,
            },
        ];
    });
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Heading title="Call Logs" />
            <SearchAccount searchUrl={index().url} setResults={setCallResults} results={callResults} setLinks={setCallResultsLinks} links={callResultsLinks} />
            {props.callLogs.data?.length > 0 ? (
                <div className="mt-6">
                    <PaginatedTable
                        data={callResults}
                        columns={[
                            { header: "Call ID", accessor: "id" },
                            { header: "Start Time", accessor: "start_time" },
                            { header: "Company", accessor: "company" },
                            { header: "Operator", accessor: "user_name" },
                            { header: "Queue/Wait Time", accessor: "queue_wait_time" },
                            { header: "End Time", accessor: "end_time" },
                            { header: "Duration", accessor: "duration" },
                            { header: "CID Number", accessor: "cid_number" },
                            { header: "Actions", accessor: "actions" },
                        ]}
                        links={callResultsLinks}
                    />
                </div>
            ): (
                <div className="mt-6 text-center text-gray-500">
                    No call logs found.
                </div>
            )}
            
        </AppLayout>
    )
}

export default CallLogIndex;
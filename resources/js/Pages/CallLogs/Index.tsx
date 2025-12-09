import { useState } from "react";
import Heading from "@/components/heading";
import AppLayout from "@/Layouts/AppLayout";
import { SearchAccount } from "@/components/search-account";
import { PaginatedTable } from "@/components/paginated-table";

interface CallLogIndexProps {
    callLogs: any;
}

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
    const [callResults, setCallResults] = useState<any[]>(props.callLogs.data || []);
    const [callResultsLinks, setCallResultsLinks] = useState<any>(props.callLogs.links || {});

    return (
        <AppLayout>
            <Heading title="Call Logs" />
            <SearchAccount setCallResults={setCallResults} callResults={callResults} setLinks={setCallResultsLinks} links={callResultsLinks} />
            {props.callLogs.data?.length > 0 && (
                <div className="mt-6">
                    <PaginatedTable
                        data={callResults}
                        columns={[
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
            )}
            
        </AppLayout>
    )
}

export default CallLogIndex;
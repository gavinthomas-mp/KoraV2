import { index } from "@/routes/call_logs";
import { BreadcrumbItem } from "@/types";
import AppLayout from "@/Layouts/AppLayout";

interface CallLogProps {
    id: number;
    start_time: string;
    end_time: string;
    duration: string;
    company: string;
    user_name: string;
    queue_wait_time: string;
    cid_number: string;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Call Logs",
        href: index().url
    },
    {
        title: "Show Call Log",
        href: "",
    }
];
function ShowCallLog(props: CallLogProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <h1 className="text-2xl font-semibold mb-4">Call Log Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <strong>Call ID:</strong> {props.id}
                </div>
                <div>
                    <strong>Start Time:</strong> {props.start_time}
                </div>
                <div>
                    <strong>End Time:</strong> {props.end_time}
                </div>
                <div>
                    <strong>Duration:</strong> {props.duration}
                </div>
                <div>
                    <strong>Company:</strong> {props.company}
                </div>
                <div>
                    <strong>Operator:</strong> {props.user_name}
                </div>
                <div>
                    <strong>Queue/Wait Time:</strong> {props.queue_wait_time}
                </div>
                <div>
                    <strong>CID Number:</strong> {props.cid_number}
                </div>
            </div>
        </AppLayout>
    )
}

export default ShowCallLog;
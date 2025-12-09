import AppLayout from "@/Layouts/AppLayout";
import { JSX } from "react";
import { DidNumberTabs } from "@/components/Tabs/DidNumberTabs";
import { BreadcrumbItem } from "@/types";
import { index } from "@/routes/didnumbers";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'DID Numbers',
        href: index().url,
    },
    {
        title: 'On-Call Schedules',
        href: ''
    }
]
interface OnCallProps {

}

interface OnCall {

}
function OnCall(props: OnCallProps): JSX.Element {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DidNumberTabs id={props.id} />
            <h2>On-Call Tab Content</h2>
        </AppLayout>
    );
}

export default OnCall;
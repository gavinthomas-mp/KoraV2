import AppLayout from "@/Layouts/AppLayout";
import { BasicInfo } from "./Tabs/BasicInfo";
import { JSX } from "react";
import { DidNumberTabs } from "@/components/Tabs/DidNumberTabs";
import { BreadcrumbItem } from "@/types";
import { index } from "@/routes/didnumbers";

interface EditProps {
    didNumber: any;
    account: any;
    groupAccount: any;
    accountSource: string;
    didNumbers: any;
    callTypes: any;
    calls: any;
    messages: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'DID Numbers',
        href: index().url,
    },
    {
        title: 'Edit DID Number',
        href: ``,
    }
]
function DidNumbersEdit(props: EditProps): JSX.Element {
    const id = props.account?.id;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DidNumberTabs id={id} />
            <BasicInfo account={props.account} groupAccount={props.groupAccount} accountSource={props.accountSource} />
        </AppLayout>

    )
}

export default DidNumbersEdit;
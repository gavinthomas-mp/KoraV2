import { UserTabs } from "@/components/Tabs/UserTabs";
import React, { JSX } from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { index } from "@/routes/users";

const breadcrumbs = [
    {
        title: 'Users',
        href: index().url
    },
    {
        title: 'Queue Assignments',
        href: ''
    }
]
function QueueAssignments(): JSX.Element {
    const props: any = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <UserTabs id={props.user.id} />
            <h2 className="text-2xl font-bold mb-4">Queue Assignments</h2>
            <p>This is the Queue Assignments tab content.</p>
        </AppLayout>
    );
}

export default QueueAssignments;
import AppLayout from "@/Layouts/AppLayout";
import React, { JSX } from "react";
import { usePage } from "@inertiajs/react";
import { UserTabs } from "@/components/Tabs/UserTabs";
import { index } from "@/routes/users";

const breadcrumbs = [
    {
        title: 'Users',
        href: index().url
    },
    {
        title: 'Bio',
        href: ''
    }
]
function Bio(): JSX.Element {
    const props: any = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <UserTabs id={props.user.id} />
            <h2 className="text-2xl font-bold mb-4">Bio</h2>
            <p>This is the Bio tab content.</p>
        </AppLayout>
    );
}

export default Bio;
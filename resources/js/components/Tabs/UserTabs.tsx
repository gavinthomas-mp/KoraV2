import { usePage } from "@inertiajs/react";
import { JSX } from "react";
import { Tabs } from "../tabs";
import { edit, queueAssignments, phrases, bio } from "@/routes/users";

interface UserTabsProps {
    id: number;
}

function UserTabs({ id }: UserTabsProps): JSX.Element {
    const links = [
        { name: 'Profile', route: edit(id).url, key: 'profile' },
        { name: 'Queue Assignments', route: queueAssignments(id).url, key: 'queue-assignments' },
        { name: 'Phrases', route: phrases(id).url, key: 'phrases' },
        { name: 'Bio', route: bio(id).url, key: 'bio' },
    ];

    const props = usePage().props;

    return (
        <Tabs id={id} links={links} />
    );
}

export { UserTabs };
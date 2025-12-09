import { usePage } from "@inertiajs/react";
import { contacts, didNumbers, callTypes, onCallSchedules, calls, messages, advisements, editHistory, skills, edit } from "@/routes/didnumbers";
import { JSX } from "react";
import { Tabs } from "../tabs";

interface DidNumberTabsProps {
    id: number;
}

function DidNumberTabs({ id }: DidNumberTabsProps): JSX.Element {
    const links = [
        { name: 'Basic Info', route: edit(id).url, key: 'basic-info' },
        { name: 'Did Numbers', route: didNumbers(id).url, key: 'did-numbers' },
        { name: 'Call Types', route: callTypes(id).url, key: 'call-types' },
        { name: 'Contacts', route: contacts(id).url, key: 'contacts' },
        { name: 'On-Call', route: onCallSchedules(id).url, key: 'on-call' },
        { name: 'Calls', route: calls(id).url, key: 'calls' },
        { name: 'Messages', route: messages(id).url, key: 'messages' },
        { name: 'Advisements', route: advisements(id).url, key: 'advisements' },
        { name: 'Edit History', route: editHistory(id).url, key: 'edit-history' },
        { name: 'Skills', route: skills(id).url, key: 'skills' },
    ];

    const props = usePage().props;

    return (
        <Tabs id={id} links={links} />
    );
}

export { DidNumberTabs };
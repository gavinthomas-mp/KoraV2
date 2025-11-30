import { Link, usePage } from "@inertiajs/react";
import { contacts, didNumbers, callTypes, onCallSchedules, calls, messages, advisements, editHistory, skills } from "@/routes/didnumbers";
import { edit } from "@/routes/didnumbers";
import { JSX } from "react";
import { cn } from "@/lib/utils";

interface DidNumberTabsProps {
    id: number;
}
function DidNumberTabs({ id }: DidNumberTabsProps): JSX.Element {
    const props = usePage().props;
    const isActive = (tab: string): boolean => {
        return props.currentTab === tab;
    }

    const linkStyles = (link: string = '') => {
        return cn(
            "relative px-3 py-2 text-sm font-medium after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-transparent hover:after:bg-[#e70175] after:transition-all after:duration-300 font-bold",
            isActive(link) ? 'text-black after:bg-[#e70175]' : 'text-[rgb(119,119,119)]'
        );
    }
    return (
        <>
            <div className="p-4 flex gap-4">
                <Link href={edit(id)} className={linkStyles('basic-info')}>
                    Basic Info
                </Link>
                <Link href={didNumbers(id)} className={linkStyles('did-numbers')}>
                    Did Numbers
                </Link>
                <Link href={callTypes(id)} className={linkStyles('call-types')}>
                    Call Types
                </Link>
                <Link href={contacts(id)} className={linkStyles('contacts')}>
                    Contacts
                </Link>
                <Link href={onCallSchedules(id)} className={linkStyles('on-call')}>
                    On-Call
                </Link>
                <Link href={calls(id)} className={linkStyles('calls')}>
                    Calls
                </Link>
                <Link href={messages(id)} className={linkStyles('messages')}>
                    Messages
                </Link>
                <Link href={advisements(id)} className={linkStyles('advisements')}>
                    Advisements
                </Link>
                <Link href={editHistory(id)} className={linkStyles('edit-history')}>
                    Edit History
                </Link>
                <Link href={skills(id)} className={linkStyles('skills')}>
                    Skills
                </Link>
            </div>
        </>
    );
}

export { DidNumberTabs };
import { Link, usePage } from "@inertiajs/react";
import { JSX } from "react";
import { linkStyles } from "./ui/linkstyles";

interface TabsProps {
    id: number;
    links: {
        name: string;
        route: string;
        key: string;
    }[];
}
function Tabs({ id, links }: TabsProps): JSX.Element {
    const props = usePage().props;
    const isActive = (tab: string): boolean => {
        return props.currentTab === tab;
    }

    return (
        <>
            <div className="p-4 flex gap-4">
                {
                    links.map((link) => (
                        <Link key={link.key} href={link.route} className={linkStyles(link.key, isActive)}>
                            {link.name}
                        </Link>
                    ))
                }
            </div>
        </>
    );
}

export { Tabs };
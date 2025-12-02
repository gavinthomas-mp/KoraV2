import AppLayout from "@/Layouts/AppLayout";
import { BreadcrumbItem } from "@/types";
import { index } from "@/routes/accounts";
import Create from "../Operators/Create";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: index().url,
    },
    {
        title: 'Create Account',
        href: ``,
    }
]
function AccountsCreate(props: any) {
    return (
        <AppLayout>
            <div>Create Account Page</div>
        </AppLayout>
    )
}

export default AccountsCreate;
import AppLayout from "@/Layouts/AppLayout";
import { BreadcrumbItem } from "@/types";
import { index } from "@/routes/accounts";

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
function Create(props: any) {
    return (
        <AppLayout>
            <div>Create Account Page</div>
        </AppLayout>
    )
}

export default Create;
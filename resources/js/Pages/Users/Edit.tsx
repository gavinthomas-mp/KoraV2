import AppLayout from '@/Layouts/AppLayout';
import { BreadcrumbItem } from '@/types';
import { index } from '@/routes/users';
import { User, Role } from '@/types';
import { UserTabs } from '@/components/Tabs/UserTabs';
import BasicInfo from './Tabs/BasicInfo';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: index().url,
    },
    {
        title: 'Edit User',
        href: ''
    }
]

function Edit({ user, roles }: { user: User, roles: Role[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <UserTabs id={user.id} />
            <BasicInfo user={user} roles={roles} />
       </AppLayout>
    )
}

export default Edit;
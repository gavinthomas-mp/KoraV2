import React from 'react';
import UsersController from '@/actions/App/Http/Controllers/UsersController';
import AppLayout from '@/Layouts/AppLayout';
import { BreadcrumbItem } from '@/types';
import { edit, index } from '@/routes/users';
import { User } from '@/types';
import Heading from '@/components/heading';
import { Form } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import ErrorInput from '@/components/input-error';
import { Input } from '@/components/ui/input';

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

function Edit({ user }: { user: User }) {
    const [selectedEmployeeGroup, setSelectedEmployeeGroup] = React.useState<string>(user.employee_group || '');
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Heading title={`Edit User: ${user.username}`} />
            <Form {...UsersController.update(user.id)} className="mt-4">
                {({ errors, processing, recentlySuccessful }) => (
                    <div>
                        <div className="grid grid-cols-2 gap-6 p-4 border rounded-2xl mb-4">
                            <div className="col-span-2">
                                <Label htmlFor="employee_group" className="mb-2 block font-medium text-sm text-gray-700">Employee Group</Label>
                                <Select onValueChange={setSelectedEmployeeGroup} value={selectedEmployeeGroup}>
                                    <SelectTrigger id="employee_group" className="w-full">
                                        <SelectValue placeholder="Select Employee Group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="voicenation">VoiceNation</SelectItem>
                                        <SelectItem value="moneypenny">Moneypenny</SelectItem>
                                        <SelectItem value="alphapage">Alphapage</SelectItem>
                                        <SelectItem value="dedicated_people">Dedicated People</SelectItem>
                                    </SelectContent>
                                    <ErrorInput message={errors.employee_group} />
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="alias" className="mb-2 block font-medium text-sm text-gray-700">Alias</Label>
                                <Input id="alias" name="alias" defaultValue={user.alias} />
                                <ErrorInput message={errors.alias} />
                            </div>
                            <div>
                                <Label htmlFor="username" className="mb-2 block font-medium text-sm text-gray-700">Username</Label>
                                <Input id="username" name="username" defaultValue={user.username} />
                                <ErrorInput message={errors.username} />
                            </div>
                            <div>
                                <Label htmlFor="firstname" className="mb-2 block font-medium text-sm text-gray-700">First Name</Label>
                                <Input id="firstname" name="firstname" defaultValue={user.firstname} />
                                <ErrorInput message={errors.firstname} />
                            </div>
                            <div>
                                <Label htmlFor="lastname" className="mb-2 block font-medium text-sm text-gray-700">Last Name</Label>
                                <Input id="lastname" name="lastname" defaultValue={user.lastname} />
                                <ErrorInput message={errors.lastname} />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2 block font-medium text-sm text-gray-700">Email</Label>
                                <Input id="email" name="email" type="email" defaultValue={user.email} />
                                <ErrorInput message={errors.email} />
                            </div>
                            <div>
                                <Label htmlFor="twilio_sid" className="mb-2 block font-medium text-sm text-gray-700">Twilio SID</Label>
                                <Input id="twilio_sid" name="twilio_sid" defaultValue={user.twilio_sid} />
                                <ErrorInput message={errors.twilio_sid} />
                            </div>
                        </div>
                    </div>
                )}
                </Form>
        </AppLayout>
    )
}

export default Edit;
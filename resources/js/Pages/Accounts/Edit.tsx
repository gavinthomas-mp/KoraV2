import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/ui/tabs";
import AppLayout from "@/Layouts/AppLayout";
import { BreadcrumbItem } from "@/types";
import { Form, Link } from "@inertiajs/react";
import { SelectValue } from "@radix-ui/react-select";
import { index, show } from "@/routes/accounts";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: index().url,
    },
    {
        title: 'Edit Account',
        href: ''
    }
]
function AccountsEdit(props: any) {
    const account = props?.account;
    const subAccounts = props?.subAccounts;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <TabGroup className="mb-6">
                <TabList>
                    <Tab>Details</Tab>
                    <Tab>Sub Accounts</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Form method="post" action={`/accounts/${account.id}`}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label>Created</Label>
                                    <Input
                                        type="text"
                                        name="created"
                                        defaultValue={account.created}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Account Name</Label>
                                    <Input
                                        type="text"
                                        name="account_name"
                                        defaultValue={account.account_name}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Account Group Number</Label>
                                    <Input
                                        type="text"
                                        name="account_num"
                                        defaultValue={account.account_num}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Status</Label>
                                    <Select name="status" value={account.status}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Active</SelectItem>
                                            <SelectItem value="0">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Contact Name</Label>
                                    <Input
                                        type="text"
                                        name="contact_name"
                                        defaultValue={account.contact_name}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Billing Address 1</Label>
                                    <Input
                                        type="text"
                                        name="billing_address_1"
                                        defaultValue={account.billing_address1}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Billing Address 2</Label>
                                    <Input
                                        type="text"
                                        name="billing_address_2"
                                        defaultValue={account.billing_address2}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Billing City</Label>
                                    <Input
                                        type="text"
                                        name="billing_city"
                                        defaultValue={account.billing_city}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Billing State</Label>
                                    <Input
                                        type="text"
                                        name="billing_state"
                                        defaultValue={account.billing_state}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Billing Zip</Label>
                                    <Input
                                        type="text"
                                        name="billing_zip"
                                        defaultValue={account.billing_zip}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Billing Country</Label>
                                    <Select name="billing_country" value={account.billing_country}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="US">United States</SelectItem>
                                            <SelectItem value="CA">Canada</SelectItem>
                                            <SelectItem value="GB">United Kingdom</SelectItem>
                                            <SelectItem value="AU">Australia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Phone</Label>
                                    <Input
                                        type="text"
                                        name="phone"
                                        defaultValue={account.phone}
                                    />
                                </div>
                            </div>
                        </Form> 
                    </TabPanel>
                    <TabPanel>
                        {
                            subAccounts ? (
                                <div className="space-y-4">
                                    {subAccounts.map((subAccount: any) => (
                                        <div key={subAccount.id} className="p-4 border rounded-lg">
                                            <h3 className="text-lg font-medium mb-2">{subAccount.account_name}</h3>
                                            <p><strong>Account Number:</strong> {subAccount.account_num}</p>
                                            <p><strong>Created:</strong> {subAccount.created}</p>
                                            <p><strong>Status:</strong> {subAccount.status === 1 ? 'Active' : 'Inactive'}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <p>No sub accounts found.</p>
                                    <Link href={`/did_numbers/create?account_id=${account.id}`}>Create Sub Account</Link>
                                </div>
                            )
                        }
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </AppLayout>
    )
}

export default AccountsEdit;
import UsersController from "@/actions/App/Http/Controllers/UsersController";
import React, { JSX } from "react";
import Heading from "@/components/heading";
import { Form } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputError from "@/components/input-error";
import { Switch } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { User, Role } from "@/types";
interface BasicInfoProps {
    user: User;
    roles: {
        id: number;
        role: string;
    }[];
}
function BasicInfo({ user, roles }: BasicInfoProps): JSX.Element {
    const [selectedEmployeeGroup, setSelectedEmployeeGroup] = React.useState<string>(user.employee_group || '');
    const [vnStaff, setVnStaff] = React.useState<boolean>(user.user_setting?.vn_employee || false);
    const [mpStaff, setMpStaff] = React.useState<boolean>(user.user_setting?.mp_staff || false);
    const [remoteAgent, setRemoteAgent] = React.useState<boolean>(user.user_setting?.remote_agent || false);
    const [dispatching, setDispatching] = React.useState<boolean>(user.user_setting?.dispatching || false);
    const [viewEmails, setViewEmails] = React.useState<boolean>(user.user_setting?.view_emails || false);
    const [enablePeopleware, setEnablePeopleware] = React.useState<boolean>(user.user_setting?.enable_peopleware || false);
    const [twilioAutoanswer, setTwilioAutoanswer] = React.useState<boolean>(user.autoanswer || false);
    const [oQAcess, setOQAccess] = React.useState<boolean>(user.user_setting?.access_recording || false);
    const [callEvaluation, setCallEvaluation] = React.useState<boolean>(user.user_setting?.call_evaluation || false);
    const [viewIncidents, setViewIncidents] = React.useState<boolean>(user.user_setting?.incidents_admin || false);
    const [role, setRole] = React.useState<string>(user.role || '');
    return (
        <div>
            <Heading title={`Edit User: ${user.username}`} />
            <Form 
                {...UsersController.update(user.id)}className="mt-4">
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
                                    <InputError message={errors.employee_group} />
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="alias" className="mb-2 block font-medium text-sm text-gray-700">Alias</Label>
                                <Input id="alias" name="alias" defaultValue={user.alias} />
                                <InputError message={errors.alias} />
                            </div>
                            <div>
                                <Label htmlFor="username" className="mb-2 block font-medium text-sm text-gray-700">Username</Label>
                                <Input id="username" name="username" defaultValue={user.username} />
                                <InputError message={errors.username} />
                            </div>
                            <div>
                                <Label htmlFor="firstname" className="mb-2 block font-medium text-sm text-gray-700">First Name</Label>
                                <Input id="firstname" name="firstname" defaultValue={user.firstname} />
                                <InputError message={errors.firstname} />
                            </div>
                            <div>
                                <Label htmlFor="lastname" className="mb-2 block font-medium text-sm text-gray-700">Last Name</Label>
                                <Input id="lastname" name="lastname" defaultValue={user.lastname} />
                                <InputError message={errors.lastname} />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2 block font-medium text-sm text-gray-700">Email</Label>
                                <Input id="email" name="email" type="email" defaultValue={user.email} />
                                <InputError message={errors.email} />
                            </div>
                            <div>
                                <Label htmlFor="twilio_sid" className="mb-2 block font-medium text-sm text-gray-700">Twilio SID</Label>
                                <Input id="twilio_sid" name="twilio_sid" defaultValue={user.twilio_sid} />
                                <InputError message={errors.twilio_sid} />
                            </div>
                            <div>
                                <Label htmlFor="role" className="mb-2 block font-medium text-sm text-gray-700">Role</Label>
                                <Select onValueChange={setRole} value={role}>
                                    <SelectTrigger id="role" className="w-full">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles && roles.map((roleOption) => (
                                            <SelectItem key={roleOption.id} value={roleOption.role}>{roleOption.role}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    <InputError message={errors.role} />
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="vn_staff" className="mb-2 block font-medium text-sm text-gray-700">VN Staff</Label>
                                <Switch
                                    id="vn_staff"
                                    name="vn_staff"
                                    checked={vnStaff}
                                    onChange={setVnStaff}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="mp_staff" className="mb-2 block font-medium text-sm text-gray-700">MP Staff</Label>
                                <Switch
                                    id="mp_staff"
                                    name="mp_staff"
                                    checked={mpStaff}
                                    onChange={setMpStaff}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="remote_agent" className="mb-2 block font-medium text-sm text-gray-700">Remote Agent</Label>
                                <Switch
                                    id="remote_agent"
                                    name="remote_agent"
                                    checked={remoteAgent}
                                    onChange={setRemoteAgent}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="dispatching" className="mb-2 block font-medium text-sm text-gray-700">Dispatching</Label>
                                <Switch
                                    id="dispatching"
                                    name="dispatching"
                                    checked={dispatching}
                                    onChange={setDispatching}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="view_emails" className="mb-2 block font-medium text-sm text-gray-700">View Emails</Label>
                                <Switch
                                    id="view_emails"
                                    name="view_emails"
                                    checked={viewEmails}
                                    onChange={setViewEmails}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="enable_peopleware" className="mb-2 block font-medium text-sm text-gray-700">Enable Peopleware</Label>
                                <Switch
                                    id="enable_peopleware"
                                    name="enable_peopleware"
                                    checked={enablePeopleware}
                                    onChange={setEnablePeopleware}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="autoanswer" className="mb-2 block font-medium text-sm text-gray-700">Twilio Autoanswer</Label>
                                <Switch
                                    id="autoanswer"
                                    name="autoanswer"
                                    checked={twilioAutoanswer}
                                    onChange={setTwilioAutoanswer}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="access_recording" className="mb-2 block font-medium text-sm text-gray-700">OQ Access</Label>
                                <Switch
                                    id="access_recording"
                                    name="access_recording"
                                    checked={oQAcess}
                                    onChange={setOQAccess}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="call_evaluation" className="mb-2 block font-medium text-sm text-gray-700">Call Evaluation</Label>
                                <Switch
                                    id="call_evaluation"
                                    name="call_evaluation"
                                    checked={callEvaluation}
                                    onChange={setCallEvaluation}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div>
                                <Label htmlFor="incidents_admin" className="mb-2 block font-medium text-sm text-gray-700">View Incidents</Label>
                                <Switch
                                    id="incidents_admin"
                                    name="incidents_admin"
                                    checked={viewIncidents}
                                    onChange={setViewIncidents}
                                    value='1'
                                    className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                                >
                                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                                </Switch>
                            </div>
                            <div className="col-span-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                </Form>
        </div>
    );
}

export default BasicInfo;
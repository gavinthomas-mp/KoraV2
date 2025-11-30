import DidNumberController from "@/actions/App/Http/Controllers/DidNumberController";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash } from "lucide-react";
import { JSX } from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import AppLayout from "@/Layouts/AppLayout";
import { DidNumberTabs } from "@/components/DidNumberTabs";
import { BreadcrumbItem } from "@/types";
import { index, create } from "@/routes/didnumbers";
import { store } from "@/routes/didnumbers/did-numbers";
import { Form } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import InputError from "@/components/input-error";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'DID Numbers',
        href: index().url,
    },
    {
        title: 'Manage DID Numbers',
        href: ''
    }
]

interface DidNumbersProps {
    didNumbers: any;
    account: any;
}

interface DidNumber {
    id: number;
    number: string;
    answerphrase: string;
}

function DidNumbers(props: DidNumbersProps): JSX.Element {
    const id = props.account?.id;
    const didNumbers = props.didNumbers ?? [];
    const handleAddDidNumber = () => {
        // Logic to add a new DID number entry
        console.log("Add Did Number clicked");
    }

    const handleDeleteDidNumber = () => {
        // Logic to delete a DID number entry
        console.log("Delete Did Number clicked");
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DidNumberTabs id={id} />
            {
                didNumbers.length > 0 ? (
                    <div className="border rounded-2xl p-4 mb-4">
                        {didNumbers.map((didNumber: any, index: number) => (
                            <div key={didNumber.id}>
                                <div className={`flex items-center gap-x-4 ${index === props.didNumbers.length - 1 ? '' : 'border-b mb-4 pb-4'}`}>
                                    <div className="flex-grow">
                                        <Label className="min-w-[100px]">DID Number:</Label>
                                        <Input value={didNumber.number} />
                                        <Label className="min-w-[100px] mt-2">Answerphrase:</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder={didNumber.answerphrase || "Select Answerphrase"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Option 1">Option 1</SelectItem>
                                                <SelectItem value="Option 2">Option 2</SelectItem>
                                                <SelectItem value="Option 3">Option 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Trash onClick={handleDeleteDidNumber} className="size-5 text-red-600 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No DID Numbers available.</p>
                )
            }
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={handleAddDidNumber}>Add DID Number</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New DID Number</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <Form {...DidNumberController.storeDidNumber(id)}>
                            {({ processing, recentlySuccessful, errors }) => (
                                <div>
                                    <Label htmlFor="didNumber">DID Number:</Label>
                                    <Input id="didNumber" name="number" placeholder="Enter DID Number" className="mb-4" />
                                    <InputError message={errors.number} className="mb-4" />
                                    <Label htmlFor="answerphrase">Answerphrase:</Label>
                                    <Select name="answerphrase">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Answerphrase" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Option 1">Option 1</SelectItem>
                                            <SelectItem value="Option 2">Option 2</SelectItem>
                                            <SelectItem value="Option 3">Option 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.answerphrase} className="mb-4" />
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Saved
                                        </p>
                                    </Transition>
                                    <Button className="mt-4 w-full" type="submit" disabled={processing}>Save DID Number</Button>
                                </div>
                            )}
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}

export default DidNumbers;
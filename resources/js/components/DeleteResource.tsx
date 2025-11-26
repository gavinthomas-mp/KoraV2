import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { useRef } from 'react';

export default function DeleteResource(props: { resourceName: string; resourceId: number; form: any }) {
    const resourceController = props;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="p-1 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-all"
                >
                    <Trash className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Are you sure you want to delete this {props.resourceName}?
                </DialogTitle>
                <Form
                    {...resourceController.form}
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnSuccess
                    className="space-y-6"
                >
                    {({ resetAndClearErrors, processing, errors }) => (
                        <>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            resetAndClearErrors()
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    variant="destructive"
                                    asChild
                                >
                                    <button
                                        type="submit"
                                        data-test="confirm-delete-user-button"
                                    >
                                        Delete account
                                    </button>
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    )
}
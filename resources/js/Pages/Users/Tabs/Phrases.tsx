import UserPhraseController from "@/actions/App/Http/Controllers/UserPhraseController";
import { UserTabs } from "@/components/Tabs/UserTabs";
import AppLayout from "@/Layouts/AppLayout";
import React, { JSX, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { index } from "@/routes/users";
import { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogOverlay, 
    DialogPortal, 
    DialogTitle, 
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";

const breadcrumbs = [
    {
        title: 'Users',
        href: index().url
    },
    {
        title: 'Phrases',
        href: ''
    }
];

interface Phrase {
    id: number;
    title: string;
    phrase: string;
    deleted: number;
}

interface PhrasesProps {
    user: User;
    phrases: Phrase[];
}

function Phrases({ user, phrases }: PhrasesProps): JSX.Element {
    const { errors } = usePage().props as any;
    const [editedPhrases, setEditedPhrases] = useState<Map<number, Phrase>>(new Map());
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [phraseToDelete, setPhraseToDelete] = useState<number | null>(null);
    const [newPhrase, setNewPhrase] = useState({ title: '', phrase: '' });
    const [formErrors, setFormErrors] = useState<{ title?: string; phrase?: string }>({});

    const handleInputChange = (phraseId: number, field: 'title' | 'phrase', value: string) => {
        const phrase = phrases.find(p => p.id === phraseId);
        if (!phrase) return;

        setEditedPhrases(prev => {
            const updated = new Map(prev);
            const current = updated.get(phraseId) || phrase;
            updated.set(phraseId, { ...current, [field]: value });
            return updated;
        });
    };

    const getCurrentPhrase = (phraseId: number): Phrase => {
        return editedPhrases.get(phraseId) || phrases.find(p => p.id === phraseId)!;
    };

    const handleSavePhrase = (phraseId: number) => {
        const phrase = getCurrentPhrase(phraseId);
        
        router.put(
            UserPhraseController.update({
                id: phraseId,
                title: phrase.title,
                phrase: phrase.phrase
            }),
            {
                title: phrase.title,
                phrase: phrase.phrase
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setEditedPhrases(prev => {
                        const updated = new Map(prev);
                        updated.delete(phraseId);
                        return updated;
                    });
                }
            }
        );
    };

    const handleDeletePhrase = (phraseId: number) => {
        setPhraseToDelete(phraseId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (phraseToDelete === null) return;

        router.delete(UserPhraseController.delete(phraseToDelete), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setPhraseToDelete(null);
            }
        });
    };

    const handleAddPhrase = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        if (!newPhrase.title.trim()) {
            setFormErrors(prev => ({ ...prev, title: 'Title is required' }));
            return;
        }

        if (!newPhrase.phrase.trim()) {
            setFormErrors(prev => ({ ...prev, phrase: 'Phrase is required' }));
            return;
        }

        router.post(
            UserPhraseController.store(),
            {
                user_id: user.id,
                title: newPhrase.title,
                phrase: newPhrase.phrase
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDialogOpen(false);
                    setNewPhrase({ title: '', phrase: '' });
                    setFormErrors({});
                },
                onError: (errors) => {
                    setFormErrors(errors as any);
                }
            }
        );
    };

    const hasChanges = (phraseId: number): boolean => {
        return editedPhrases.has(phraseId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <UserTabs id={user.id} />
            
            <div className="space-y-4">
                {phrases.length > 0 ? (
                    phrases.map((phrase) => {
                        const current = getCurrentPhrase(phrase.id);
                        return (
                            <div key={phrase.id} className="flex items-center gap-2">
                                <Input 
                                    placeholder="Title" 
                                    value={current.title}
                                    onChange={(e) => handleInputChange(phrase.id, 'title', e.target.value)}
                                    className="w-1/4" 
                                />
                                <Input 
                                    placeholder="Phrase" 
                                    value={current.phrase}
                                    onChange={(e) => handleInputChange(phrase.id, 'phrase', e.target.value)}
                                    className="flex-1"
                                />
                                <Button 
                                    variant="default" 
                                    onClick={() => handleSavePhrase(phrase.id)}
                                    disabled={!hasChanges(phrase.id)}
                                >
                                    <Save size={16} />
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    onClick={() => handleDeletePhrase(phrase.id)}
                                >
                                    <Trash size={16} />
                                </Button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-muted-foreground">No phrases available.</p>
                )}
            </div>

            {errors && Object.keys(errors).length > 0 && (
                <div className="mt-4 rounded-md bg-destructive/10 p-4">
                    {Object.values(errors).map((error: any, index: number) => (
                        <p key={index} className="text-sm text-destructive">{error}</p>
                    ))}
                </div>
            )}

            <div className="mt-6">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Save size={16} className="mr-2" />
                            Add Phrase
                        </Button>
                    </DialogTrigger>
                    <DialogPortal>
                        <DialogOverlay />
                        <DialogContent>
                            <DialogTitle>Add New Phrase</DialogTitle>
                            <form onSubmit={handleAddPhrase} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input 
                                        id="title" 
                                        placeholder="Title" 
                                        value={newPhrase.title}
                                        onChange={(e) => setNewPhrase(prev => ({ ...prev, title: e.target.value }))}
                                    />
                                    <InputError message={formErrors.title} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phrase">Phrase</Label>
                                    <Input 
                                        id="phrase" 
                                        placeholder="Phrase" 
                                        value={newPhrase.phrase}
                                        onChange={(e) => setNewPhrase(prev => ({ ...prev, phrase: e.target.value }))}
                                    />
                                    <InputError message={formErrors.phrase} />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button 
                                        type="button" 
                                        variant="secondary" 
                                        onClick={() => setDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogPortal>
                    <DialogOverlay />
                    <DialogContent>
                        <DialogTitle>Delete Phrase</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this phrase? This action cannot be undone.
                        </DialogDescription>
                        <DialogFooter>
                            <Button 
                                type="button" 
                                variant="secondary" 
                                onClick={() => setDeleteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="button" 
                                variant="destructive" 
                                onClick={confirmDelete}
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </AppLayout>
    );
}

export default Phrases;
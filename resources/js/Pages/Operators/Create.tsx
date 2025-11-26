import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function OperatorCreate({ skills }: { skills: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        max_concurrent_calls: 1,
        skills: [],
    });

    const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

    const handleSkillToggle = (skill: any) => {
        const exists = selectedSkills.find(s => s.id === skill.id);
        if (exists) {
            const updated: any[] = selectedSkills.filter(s => s.id !== skill.id);
            setSelectedSkills(updated);
            setData('skills', updated);
        } else {
            const updated: any[] = [...selectedSkills, { id: skill.id, proficiency: 3 }];
            setSelectedSkills(updated);
            setData('skills', updated);
        }
    };

    const handleProficiencyChange = (skillId: number, proficiency: string) => {
        const updated: any[] = selectedSkills.map(s =>
            s.id === skillId ? { ...s, proficiency: parseInt(proficiency) } : s
        );
        setSelectedSkills(updated);
        setData('skills', updated);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/operators');
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Operator</h2>

                <form onSubmit={submit} className="bg-white shadow rounded-lg p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            placeholder="+1234567890"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Concurrent Calls</label>
                        <input
                            type="number"
                            min="1"
                            value={data.max_concurrent_calls}
                            onChange={e => setData('max_concurrent_calls', parseInt(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.max_concurrent_calls && <p className="mt-1 text-sm text-red-600">{errors.max_concurrent_calls}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
                        <div className="space-y-3">
                            {skills.map((skill) => {
                                const selected = selectedSkills.find(s => s.id === skill.id);
                                return (
                                    <div key={skill.id} className="flex items-center space-x-4">
                                        <input
                                            type="checkbox"
                                            checked={!!selected}
                                            onChange={() => handleSkillToggle(skill)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="flex-1 text-sm text-gray-700">
                                            {skill.name}
                                        </label>
                                        {selected && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-gray-500">Proficiency:</span>
                                                <select
                                                    value={selected.proficiency}
                                                    onChange={(e) => handleProficiencyChange(skill.id, e.target.value)}
                                                    className="text-sm rounded border-gray-300"
                                                >
                                                    <option value="1">1 - Beginner</option>
                                                    <option value="2">2 - Basic</option>
                                                    <option value="3">3 - Intermediate</option>
                                                    <option value="4">4 - Advanced</option>
                                                    <option value="5">5 - Expert</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <a
                            href="/operators"
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                            Create Operator
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
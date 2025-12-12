import React, { useState } from 'react';
import { User, Phone } from 'lucide-react';
import { search as accountSearch } from '@/routes/didnumbers';
import { search as userSearch } from '@/routes/users';
import { SearchableSelect } from './searchable-select';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { router, usePage } from '@inertiajs/react';
import { search } from '@/routes/calltypes';
interface Filters {
    callId: string;
    startTime: string;
    endTime: string;
}

interface SearchAccountProps {
    setResults: (results: any[]) => void;
    results: any[];
    setLinks: (links: any[]) => void;
    links: any[];
    searchUrl: string | URL;
}

// Main component using two SearchableSelects
const SearchAccount: React.FC<SearchAccountProps> = ({ setResults, results, setLinks, links, searchUrl }) => {
    const params = new URLSearchParams(usePage().url.split('?')[1]);
    const [selectedAccount, setSelectedAccount] = useState<number | string | null>(params.get('search[account_id]') || null);
    const [selectedOperator, setSelectedOperator] = useState<number | string | null>(params.get('search[operator_id]') || null);
    const [filters, setFilters] = useState<Filters>({
        callId: params.get('search[call_id]') || '',
        startTime: params.get('search[start_time]') || '',
        endTime: params.get('search[end_time]') || '',
    });

    const handleFilterChange = (field: keyof Filters, value: string): void => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const performSearch = async (): Promise<void> => {
        const params: Record<string, string> = {};

        if (selectedAccount) {
            params['account_id'] = selectedAccount.toString();
        }
        if (selectedOperator) {
            params['operator_id'] = selectedOperator.toString();
        }
        if (filters.callId) {
            params['call_id'] = filters.callId;
        }
        if (filters.startTime) {
            params['start_time'] = filters.startTime;
        }
        if (filters.endTime) {
            params['end_time'] = filters.endTime;
        }

        router.get(searchUrl, {
            search: params
        }, {
            preserveState: true,
            replace: true,
            onSuccess: (page) => {
                const props = page.props as any;
                setResults(props.callLogs?.data || []);
                setLinks(props.callLogs?.links || []);
            }
        })
    }

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <SearchableSelect
                        endpoint={accountSearch().url}
                        placeholder="Search for an account..."
                        label="Account"
                        icon={User}
                        value={selectedAccount}
                        onChange={setSelectedAccount}
                        displayField="company"
                    />
                    <SearchableSelect
                        endpoint={userSearch().url}
                        placeholder="Search for an operator..."
                        label="Operator"
                        icon={User}
                        value={selectedOperator}
                        onChange={setSelectedOperator}
                        displayField="username"
                        additionalFilters={selectedAccount ? { account_id: selectedAccount } : {}}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    <div>
                        <Label className="block text-sm font-medium text-slate-700 mb-2">
                            <Phone className="inline w-4 h-4 mr-1" />
                            Call ID
                        </Label>
                        <Input
                            type="text"
                            value={filters.callId}
                            onChange={(e) => handleFilterChange('callId', e.target.value)}
                            placeholder="Enter call ID..."
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-slate-700 mb-2">
                            Start Time
                        </Label>
                        <Input
                            type="datetime-local"
                            value={filters.startTime}
                            onChange={(e) => handleFilterChange('startTime', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-slate-700 mb-2">
                            End Time
                        </Label>
                        <Input
                            type="datetime-local"
                            value={filters.endTime}
                            onChange={(e) => handleFilterChange('endTime', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <Button
                    onClick={performSearch}
                    className="w-full bg-mp-orange hover:bg-mp-orange-dark text-white font-medium py-3 rounded-lg transition-colors"
                >
                    Search Calls
                </Button>
            </div>
        </div>
    );
};

export { SearchAccount };
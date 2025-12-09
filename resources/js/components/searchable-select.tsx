import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, X, Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchableItem {
    id: number | string;
    name: string;
    description?: string;
    [key: string]: any;
}

interface SearchableSelectProps {
    endpoint: string;
    placeholder?: string;
    label?: string;
    icon?: React.ComponentType<{ className?: string }>;
    value: number | string | null;
    onChange: (value: number | string | null) => void;
    displayField?: string;
    additionalFilters?: Record<string, any>;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ 
    endpoint, 
    placeholder = "Search...", 
    label,
    icon: Icon = Search,
    value,
    onChange,
    displayField = 'name',
    additionalFilters = {}
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [items, setItems] = useState<SearchableItem[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Get selected item label
    const selectedLabel = items.find(item => item.id === value)?.[displayField] || '';

    // Update search term when value changes externally
    useEffect(() => {
        if (value && selectedLabel) {
            setSearchTerm(selectedLabel);
        }
    }, [value, selectedLabel]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset highlighted index when items change
    useEffect(() => {
        setHighlightedIndex(0);
    }, [items]);

    // Perform API search
    const performSearch = async (query: string): Promise<void> => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        setIsLoading(true);

        try {
            const params = new URLSearchParams({
                search: query,
                ...additionalFilters
            });

            const response = await fetch(`${endpoint}?${params}`, {
                signal: abortControllerRef.current.signal,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) throw new Error('Search failed');

            const data = await response.json();
            setItems(data.items || data);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Search error:', error);
                setItems([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (val: string): void => {
        setSearchTerm(val);
        setIsOpen(true);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            performSearch(val);
        }, 300);
    };

    const handleSelect = (item: SearchableItem): void => {
        onChange(item.id);
        setSearchTerm(item[displayField]);
        setIsOpen(false);
        inputRef.current?.blur();
    };

    const handleClear = (): void => {
        onChange(null);
        setSearchTerm('');
        setItems([]);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
            setIsOpen(true);
            return;
        }

        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => prev < items.length - 1 ? prev + 1 : prev);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (items[highlightedIndex]) {
                    handleSelect(items[highlightedIndex]);
                }
            break;
            case 'Escape':
                setIsOpen(false);
                inputRef.current?.blur();
                break;
        }
    };

    return (
        <div>
            {label && (
                <Label className="block text-sm font-medium text-slate-700 mb-2">
                    {Icon && <Icon className="inline w-4 h-4 mr-1" />}
                    {label}
                </Label>
            )}
            
            <div className="relative">
            <div className="relative">
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-20 py-3 bg-white border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {isLoading && (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    )}
                    {value && !isLoading && (
                        <Button
                            onClick={handleClear}
                            className="p-1 hover:bg-slate-100 rounded transition-colors"
                            type="button"
                            variant={'ghost'}
                        >
                            <X className="w-4 h-4 text-slate-500" />
                        </Button>
                    )}
                    <ChevronDown 
                        className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-slate-200 max-h-64 overflow-y-auto"
                >
                {isLoading ? (
                    <div className="px-4 py-8 text-sm text-slate-500 text-center flex flex-col items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    <span>Searching...</span>
                    </div>
                ) : items.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-slate-500 text-center">
                        {searchTerm ? 'No results found' : 'Start typing to search...'}
                    </div>
                ) : (
                    <div className="py-2">
                    {items.map((item, index) => (
                        <Button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            variant={'ghost'}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                                index === highlightedIndex
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                            type="button"
                        >
                        <div className="flex flex-col">
                            <span className="font-medium">{item[displayField]}</span>
                            {item.description && (
                            <span className="text-xs text-slate-500">{item.description}</span>
                            )}
                        </div>
                        {value === item.id && (
                            <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                        </Button>
                    ))}
                    </div>
                )}
                </div>
            )}
            </div>
        </div>
    );
};

export { SearchableSelect };
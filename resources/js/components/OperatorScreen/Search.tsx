import React, { useState, useEffect, JSX, useContext, useMemo } from 'react';
import { CalltypeContext } from '@/Layouts/AppLayout';
import { Input } from '../ui/input';

export default function Search({didId, searchResults, setSearchResults, ...props}: {didId: number, searchResults: any[], setSearchResults: React.Dispatch<React.SetStateAction<any[]>>, selectedTab: [number, React.Dispatch<React.SetStateAction<number>>]}): JSX.Element {
    const { searchQuery, setSearchQuery } = useContext(CalltypeContext);
    const [ selectedTab, setSelectedTab ] = props?.selectedTab || useState<number>(0);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);

        fetch(`/calltypes/${didId}/search?query=${encodeURIComponent(event.target.value)}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    };

    return (
        <div className="p-4">
            <Input
                type="text"
                placeholder="Search employees/ calltypes/ keywords"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setSelectedTab(1)}
                className="w-full"
            />
        </div>
    );
}
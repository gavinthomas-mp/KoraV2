import React from 'react';
import { Textarea } from '@headlessui/react';
function Instructions() {
    return (
        <Textarea
            className="w-full h-24 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
            placeholder="Additional notes, free type here..."
        />
    );
}

export { Instructions };
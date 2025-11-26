import React from "react";

function CompanyData({ didId }: { didId: number | null }) {
    return (
        <div className="p-3">
            <p className="text-sm text-gray-500">Company data will be displayed here.</p>
        </div>
    );
}

export { CompanyData };
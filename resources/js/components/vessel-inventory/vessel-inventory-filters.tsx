import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Props {
    initialFilters: { search?: string; type?: string; status?: string };
}

export function VesselInventoryFilters({ initialFilters }: Props) {
    const [search, setSearch] = useState(initialFilters.search || '');
    const [type, setType] = useState(initialFilters.type || 'all');
    const [status, setStatus] = useState(initialFilters.status || 'all');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route('vessel-inventory'),
                { search, type, status },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, type, status]);

    // Render your existing filter UI here, binding values to these state variables
    // Example:
    // <input value={search} onChange={(e) => setSearch(e.target.value)} />
    // <select value={type} onChange={(e) => setType(e.target.value)}>...</select>
    // <select value={status} onChange={(e) => setStatus(e.target.value)}>...</select>
    
    return (
        <div className="mb-4 flex flex-wrap gap-4">
            {/* Your existing filter inputs/selects go here */}
            <input 
                placeholder="Search by vessel name, official number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-[#e6ebf1] px-4 py-2 text-sm focus:border-[#35ADD5] focus:outline-none"
            />
            <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="rounded-lg border border-[#e6ebf1] px-4 py-2 text-sm focus:border-[#35ADD5] focus:outline-none"
            >
                <option value="all">All Types</option>
                <option value="POWER">Power</option>
                <option value="SAIL">Sail</option>
            </select>
            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-lg border border-[#e6ebf1] px-4 py-2 text-sm focus:border-[#35ADD5] focus:outline-none"
            >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="flagged">Flagged</option>
            </select>
        </div>
    );
}
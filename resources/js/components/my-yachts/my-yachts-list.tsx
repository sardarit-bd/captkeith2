import { usePage } from '@inertiajs/react';
import type { YachtRecord } from './my-yachts-data';
import { YachtCard } from './yacht-card';

export function MyYachtsList() {
    const { props } = usePage<{ vessels: YachtRecord[] }>();
    const vessels = props.vessels ?? [];

    if (vessels.length === 0) {
        return (
            <p className="py-12 text-center text-sm text-gray-400">
                No vessels registered yet.
            </p>
        );
    }

    return (
        <section className="space-y-6">
            {vessels.map((yacht) => (
                <YachtCard key={yacht.id} yacht={yacht} />
            ))}
        </section>
    );
}

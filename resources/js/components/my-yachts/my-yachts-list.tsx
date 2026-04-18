import { YachtCard } from './yacht-card';
import { yachts } from './my-yachts-data';

export function MyYachtsList() {
    return (
        <section className="space-y-6">
            {yachts.map((yacht) => (
                <YachtCard key={yacht.id} yacht={yacht} />
            ))}
        </section>
    );
}

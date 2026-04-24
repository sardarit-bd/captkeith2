import { YachtsMatchCard } from './yachts-match-card';
import { yachtMatches } from './yachts-match-data';

export function YachtsMatchGrid() {
    return (
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
            {yachtMatches.map((yacht) => (
                <YachtsMatchCard key={yacht.id} yacht={yacht} />
            ))}
        </section>
    );
}

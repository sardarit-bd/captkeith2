import { ArrowRight } from 'lucide-react';
import { deckhandStats } from './deckhand-dashboard-data';

export function DeckhandStatsCards() {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deckhandStats.map((item) => (
                <article
                    key={item.label}
                    className="flex flex-col justify-between rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div>
                        <p className="mb-1 text-sm font-medium text-[#6b7280]">
                            {item.label}
                        </p>
                        <p
                            className={`text-[36px] leading-none font-bold ${item.valueClassName}`}
                        >
                            {item.value}
                        </p>
                    </div>

                    {item.actionLabel ? (
                        <button
                            type="button"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#0f172a] transition-colors hover:text-[#0A273F]"
                        >
                            {item.actionLabel}
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    ) : item.hint ? (
                        <div
                            className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${item.hintClassName}`}
                        >
                            {item.icon ? (
                                <item.icon className="h-4 w-4" />
                            ) : null}
                            <span>{item.hint}</span>
                        </div>
                    ) : null}
                </article>
            ))}
        </section>
    );
}

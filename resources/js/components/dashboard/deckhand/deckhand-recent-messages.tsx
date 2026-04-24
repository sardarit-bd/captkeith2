import { Link } from '@inertiajs/react';
import { messages } from '@/routes';
import { deckhandMessages } from './deckhand-dashboard-data';

export function DeckhandRecentMessages() {
    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-[18px] font-bold text-[#111827]">
                        Recent Messages
                    </h3>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                        Communications with owners and captains
                    </p>
                </div>
                <Link
                    href={messages()}
                    className="shrink-0 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[12px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    View All
                </Link>
            </header>

            <div className="space-y-3">
                {deckhandMessages.map((message) => (
                    <article
                        key={message.id}
                        className={`flex cursor-pointer gap-4 rounded-xl p-4 transition-colors sm:p-5 ${
                            message.unread
                                ? 'border border-blue-50 bg-[#F4F7FB] hover:bg-[#ebf0f8]'
                                : 'border border-[#f1f5f9] bg-white hover:bg-[#f9fafb]'
                        }`}
                    >
                        <img
                            src={message.avatar}
                            alt={message.sender}
                            className="h-12 w-12 shrink-0 rounded-full object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <div className="mb-1 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-[14px] font-bold text-[#111827]">
                                        {message.sender}
                                    </h4>
                                    <span className="rounded bg-[#e5e7eb] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#374151] uppercase">
                                        {message.role}
                                    </span>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                    <span
                                        className={`text-[11px] font-medium ${
                                            message.unread
                                                ? 'text-[#6b7280]'
                                                : 'text-[#9ca3af]'
                                        }`}
                                    >
                                        {message.time}
                                    </span>
                                    {message.unread ? (
                                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                                    ) : null}
                                </div>
                            </div>
                            <p
                                className={`truncate text-[13px] ${
                                    message.unread
                                        ? 'font-medium text-[#374151]'
                                        : 'text-[#6b7280]'
                                }`}
                            >
                                {message.body}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

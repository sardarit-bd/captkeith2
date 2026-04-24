import type { InviteCaptain } from './charterers-invite-data';

const statusClasses: Record<InviteCaptain['status'], string> = {
    pending: 'bg-[#f3f4f6] text-[#4b5563]',
    available: 'bg-[#ecfdf5] text-[#166534]',
};

const statusLabel: Record<InviteCaptain['status'], string> = {
    pending: 'Pending',
    available: 'Available',
};

export function CharterersInviteCaptainsList({
    captains,
}: {
    captains: InviteCaptain[];
}) {
    return (
        <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-6">
                <h3 className="text-base font-bold text-[#0f172a]">
                    Qualified Captains Notified
                </h3>
                <p className="mt-1 text-sm text-[#64748b]">
                    Waiting for captain responses
                </p>
            </header>

            <div className="space-y-4">
                {captains.map((captain) => (
                    <article
                        key={captain.id}
                        className="flex flex-col justify-between gap-4 rounded-xl border border-[#f1f5f9] bg-white p-4 sm:flex-row sm:items-center"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={captain.avatar}
                                alt={captain.name}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-sm font-bold text-[#111827]">
                                    {captain.name}
                                </h4>
                                <p className="mt-0.5 text-xs text-[#6b7280]">
                                    {captain.license}
                                </p>
                            </div>
                        </div>

                        <span
                            className={`inline-flex self-start rounded-md px-3 py-1.5 text-[11px] font-semibold tracking-wide sm:self-auto ${statusClasses[captain.status]}`}
                        >
                            {statusLabel[captain.status]}
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}

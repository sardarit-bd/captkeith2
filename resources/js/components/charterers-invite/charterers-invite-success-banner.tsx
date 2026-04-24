import { Copy } from 'lucide-react';
import { useState } from 'react';

export function CharterersInviteSuccessBanner({
    inviteLink,
}: {
    inviteLink: string;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <section className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-bold text-[#166534] sm:text-lg">
                Charter Created Successfully!
            </h2>
            <p className="mb-5 text-sm text-[#16a34a]">
                Share this link with your charterer
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="flex-1 rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#374151]"
                />
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                >
                    <Copy className="h-4 w-4" />
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
        </section>
    );
}

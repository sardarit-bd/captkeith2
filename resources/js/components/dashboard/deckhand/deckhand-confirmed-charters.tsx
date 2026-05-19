import { usePage } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Clock,
    Eye,
    MapPin,
    MessageSquare,
    Ship,
} from 'lucide-react';
import type { DeckhandDashboardData } from './deckhand-dashboard-types';

export function DeckhandConfirmedCharters() {
    const { dashboard } = usePage<{ dashboard: DeckhandDashboardData }>().props;
    const charters = dashboard.confirmedCharters;

    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-6">
                <h3 className="text-[18px] font-bold text-[#111827]">
                    Confirmed Charters
                </h3>
                <p className="mt-1 text-[13px] text-[#6b7280]">
                    Your upcoming charter assignments
                </p>
            </header>

            {charters.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CheckCircle2 className="mb-3 h-10 w-10 text-[#e5e7eb]" />
                    <p className="text-[14px] font-medium text-[#9ca3af]">
                        No confirmed charters yet
                    </p>
                    <p className="mt-1 text-[12px] text-[#d1d5db]">
                        Accepted requests will appear here once confirmed.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {charters.map((charter) => {
                        const yachtSpec = [
                            charter.yachtType,
                            charter.yachtLength,
                        ]
                            .filter(Boolean)
                            .join(' • ');

                        return (
                            <article
                                key={charter.id}
                                className="rounded-2xl border border-green-200 bg-[#F0FDF4] p-5 transition-all hover:shadow-sm sm:p-6"
                            >
                                <div className="flex flex-col justify-between gap-6 lg:flex-row">
                                    <div className="flex w-full flex-col gap-4 sm:w-2/3 sm:flex-row sm:gap-6">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="text-[16px] leading-tight font-bold text-[#111827]">
                                                        {charter.yachtName}
                                                    </h4>
                                                    {charter.captainName && (
                                                        <p className="mt-0.5 text-[12px] text-[#6b7280]">
                                                            Captain:{' '}
                                                            {
                                                                charter.captainName
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-white px-2.5 py-1 text-[10px] font-medium text-green-700 shadow-sm lg:hidden">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Confirmed
                                                </span>
                                            </div>

                                            {yachtSpec && (
                                                <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#4b5563]">
                                                    <div className="flex items-center gap-1.5">
                                                        <Ship className="h-4 w-4 text-[#9ca3af]" />
                                                        {yachtSpec}
                                                    </div>
                                                </div>
                                            )}

                                            {charter.marina && (
                                                <p className="flex items-center gap-1.5 text-[13px] text-[#4b5563]">
                                                    <MapPin className="h-4 w-4 text-[#9ca3af]" />
                                                    {charter.marina}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex w-full flex-col justify-between gap-4 border-t border-[#e5e7eb] pt-4 lg:w-1/3 lg:items-end lg:border-0 lg:pt-0">
                                        <div className="flex w-full flex-col lg:items-end">
                                            <span className="mb-3 hidden items-center gap-1 rounded-md border border-green-200 bg-white px-2.5 py-1 text-[10px] font-medium text-green-700 shadow-sm lg:inline-flex">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Confirmed
                                            </span>

                                            <p className="mb-1.5 flex items-center gap-2 text-[13px] text-[#4b5563]">
                                                <Calendar className="h-4 w-4 text-[#9ca3af]" />
                                                {charter.date} at{' '}
                                                {charter.startTime}
                                            </p>
                                            <p className="mb-1.5 flex items-center gap-2 text-[13px] text-[#4b5563]">
                                                <Clock className="h-4 w-4 text-[#9ca3af]" />
                                                {charter.duration}
                                            </p>
                                            <p className="text-[13px]">
                                                <span className="text-[#6b7280]">
                                                    Rate:{' '}
                                                </span>
                                                <span className="font-bold text-green-600">
                                                    {charter.rate}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex w-full flex-wrap gap-2 lg:justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[12px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                View Details
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[12px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                                            >
                                                <MessageSquare className="h-3.5 w-3.5" />
                                                Message Captain
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

import { Calendar, Clock3, Timer } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
    date: string;
    time: string;
    duration: string;
    specialNotes: string;
};

export function ChartererRequestCharterInfoCard({
    date,
    time,
    duration,
    specialNotes,
}: Props) {
    return (
        <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#111827]" />
                <h3 className="text-base font-bold text-[#111827]">
                    Charter Information
                </h3>
            </header>

            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <InfoItem
                    icon={<Calendar className="h-5 w-5 text-[#9ca3af]" />}
                    label="Date"
                    value={date}
                />
                <InfoItem
                    icon={<Clock3 className="h-5 w-5 text-[#9ca3af]" />}
                    label="Time"
                    value={time}
                />
                <InfoItem
                    icon={<Timer className="h-5 w-5 text-[#9ca3af]" />}
                    label="Duration"
                    value={duration}
                />
            </div>

            {specialNotes ? (
                <div className="rounded-xl border border-blue-50/50 bg-[#F4F7FB] p-5">
                    <p className="mb-1 text-sm font-semibold text-[#111827]">
                        Special Notes:
                    </p>
                    <p className="text-sm text-[#4b5563]">{specialNotes}</p>
                </div>
            ) : null}
        </section>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3">
            {icon}
            <div>
                <p className="mb-0.5 text-xs text-[#6b7280]">{label}</p>
                <p className="text-sm font-bold text-[#111827]">{value}</p>
            </div>
        </div>
    );
}

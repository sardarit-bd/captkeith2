import { Bell } from 'lucide-react';

export function NotificationsAlertBanner({
    unreadCount,
    helperText,
}: {
    unreadCount: number;
    helperText: string;
}) {
    const label = unreadCount === 1 ? 'notification' : 'notifications';

    return (
        <section className="mb-6 flex items-start gap-4 rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-5 shadow-sm sm:items-center">
            <Bell className="mt-0.5 h-5 w-5 shrink-0 text-[#06b6d4] sm:mt-0" />
            <div>
                <h3 className="mb-0.5 text-[15px] font-bold text-[#111827]">
                    You have {unreadCount} unread {label}
                </h3>
                <p className="inline-block text-[13px] font-medium text-[#06b6d4]">
                    {helperText}
                </p>
            </div>
        </section>
    );
}

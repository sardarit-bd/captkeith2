import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    DollarSign,
    FileText,
    MessageSquare,
    Ship,
    User,
    UserPlus,
    Users,
} from 'lucide-react';
import type { NotificationRecord } from './notifications-data';

const iconMap = {
    'alert-circle': AlertCircle,
    'check-circle-2': CheckCircle2,
    'file-text': FileText,
    'dollar-sign': DollarSign,
    user: User,
    calendar: Calendar,
    'user-plus': UserPlus,
    ship: Ship,
    'message-square': MessageSquare,
    users: Users,
};

const colorMap: Record<NotificationRecord['tone'], { bg: string; icon: string }> = {
    success: {
        bg: '#f0fdf4',
        icon: '#22c55e',
    },
    info: {
        bg: '#eff6ff',
        icon: '#3b82f6',
    },
    warning: {
        bg: '#fff7ed',
        icon: '#f97316',
    },
    accent: {
        bg: '#faf5ff',
        icon: '#a855f7',
    },
    neutral: {
        bg: '#f8fafc',
        icon: '#475569',
    },
};

export function NotificationCard({ notification }: { notification: NotificationRecord }) {
    const Icon = iconMap[notification.icon];
    const colors = colorMap[notification.tone];

    return (
        <article
            className={`group relative flex cursor-pointer gap-4 overflow-hidden rounded-xl border bg-white p-5 transition-colors hover:bg-gray-50 sm:gap-5 sm:p-6 ${
                notification.unread
                    ? 'border-blue-300 shadow-[0_4px_12px_rgba(59,130,246,0.08)]'
                    : 'border-gray-200 shadow-sm'
            }`}
        >
            {notification.unread ? (
                <span className="absolute inset-y-0 left-0 hidden w-1 bg-blue-400 sm:block" />
            ) : null}
            <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                    backgroundColor: colors.bg,
                    color: colors.icon,
                }}
            >
                <Icon className="h-6 w-6" />
            </span>

            <div className="min-w-0 flex-1">
                <header className="mb-1.5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h4 className="text-[16px] font-bold leading-tight text-[#111827]">
                        {notification.title}
                    </h4>

                    <div className="flex shrink-0 items-center gap-3">
                        {notification.unread ? (
                            <span className="w-fit rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-blue-700 sm:ml-auto">
                                New
                            </span>
                        ) : null}
                    </div>
                </header>

                <p className="text-[14px] text-[#4b5563]">{notification.message}</p>
                <p className="mt-2 text-[12px] font-medium text-gray-400">
                    {notification.timestamp}
                </p>

                {notification.action ? (
                    <button
                        type="button"
                        className="mt-4 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                    >
                        {notification.action.label}
                    </button>
                ) : null}
            </div>
        </article>
    );
}

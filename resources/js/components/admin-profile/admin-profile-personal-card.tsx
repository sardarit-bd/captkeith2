import { User } from 'lucide-react';
import { adminProfile } from './admin-profile-data';

export function AdminProfilePersonalCard() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <header className="flex items-center border-b border-[#e6ebf1] bg-slate-50/60 px-6 py-4">
                <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <User className="h-4 w-4" />
                </span>
                <h4 className="text-sm font-semibold text-[#11395d]">
                    Personal Details
                </h4>
            </header>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8">
                <label className="space-y-1.5">
                    <span className="block text-sm font-medium text-slate-700">
                        First Name
                    </span>
                    <input
                        type="text"
                        defaultValue={adminProfile.firstName}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                    />
                </label>

                <label className="space-y-1.5">
                    <span className="block text-sm font-medium text-slate-700">
                        Last Name
                    </span>
                    <input
                        type="text"
                        defaultValue={adminProfile.lastName}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                    />
                </label>

                <label className="space-y-1.5">
                    <span className="block text-sm font-medium text-slate-700">
                        Email Address
                    </span>
                    <input
                        type="email"
                        defaultValue={adminProfile.email}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                    />
                    <p className="text-xs text-slate-500">
                        Changing this will update your login credentials.
                    </p>
                </label>

                <label className="space-y-1.5">
                    <span className="block text-sm font-medium text-slate-700">
                        Phone Number
                    </span>
                    <input
                        type="tel"
                        defaultValue={adminProfile.phone}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                    />
                </label>
            </div>
        </section>
    );
}

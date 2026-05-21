import { Info, Lock } from 'lucide-react';

export function AdminProfileSecurityCard() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <header className="flex items-center border-b border-[#e6ebf1] bg-slate-50/60 px-6 py-4">
                <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <Lock className="h-4 w-4" />
                </span>
                <h4 className="text-sm font-semibold text-[#11395d]">
                    Security & Password
                </h4>
            </header>

            <div className="space-y-6 p-6 md:p-8">
                <label className="block space-y-1.5 space-x-2">
                    <span className="text-sm font-medium text-slate-700">
                        Current Password
                    </span>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:ring-2 focus:ring-[#35ADD5]/20 focus:outline-none"
                    />
                </label>

                <div className="grid grid-cols-1 gap-6 border-t border-slate-100 pt-4 md:grid-cols-2">
                    <label className="block space-y-1.5">
                        <span className="text-sm font-medium text-slate-700">
                            New Password
                        </span>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:ring-2 focus:ring-[#35ADD5]/20 focus:outline-none"
                        />
                    </label>

                    <label className="block space-y-1.5">
                        <span className="text-sm font-medium text-slate-700">
                            Confirm New Password
                        </span>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:ring-2 focus:ring-[#35ADD5]/20 focus:outline-none"
                        />
                    </label>
                </div>

                <div className="flex items-start space-x-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#35ADD5]" />
                    <div>
                        <h5 className="text-sm font-medium text-[#11395d]">
                            Password Requirements
                        </h5>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">
                            Ensure your new password is at least 12 characters
                            and includes uppercase letters, lowercase letters,
                            numbers, and symbols.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

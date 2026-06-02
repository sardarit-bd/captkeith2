import { Camera, Pencil, ShieldCheck } from 'lucide-react';
import { adminProfile } from './admin-profile-data';

export function AdminProfileAvatarCard() {
    return (
        <section className="flex flex-col items-center rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm sm:flex-row sm:space-x-8 md:p-8">
            <button type="button" className="group relative mb-4 sm:mb-0 cursor-pointer">
                <span className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-slate-50 bg-[#35ADD5] text-3xl font-semibold text-white shadow-sm sm:h-28 sm:w-28">
                    {adminProfile.initials}
                    <span className="absolute inset-0 flex flex-col items-center justify-center bg-[#35ADD5]/70 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        <Camera className="mb-1 h-6 w-6 text-white" />
                        <span className="text-[10px] font-medium tracking-wider text-white uppercase">
                            Update
                        </span>
                    </span>
                </span>
                <span className="absolute right-0 bottom-0 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#35ADD5] text-white shadow-sm">
                    <Pencil className="h-4 w-4" />
                </span>
            </button>

            <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-[#35ADD5]">
                    {adminProfile.displayName}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{adminProfile.email}</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-[#35ADD5]">
                        <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                        Full Super Admin Access
                    </span>
                    <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        2FA Enabled
                    </span>
                </div>
            </div>
        </section>
    );
}

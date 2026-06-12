import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Spinner } from '@/components/ui/spinner';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    const passwordChecks = useMemo(() => {
        return [
            {
                label: 'Minimum 8 characters',
                matched: data.password.length >= 8,
            },
            {
                label: 'At least one uppercase letter',
                matched: /[A-Z]/.test(data.password),
            },
            {
                label: 'At least one lowercase letter',
                matched: /[a-z]/.test(data.password),
            },
            { label: 'At least one number', matched: /\d/.test(data.password) },
        ];
    }, [data.password]);

    const passwordsMatch =
        data.password_confirmation.length > 0 &&
        data.password === data.password_confirmation;

    const passwordsMismatch =
        data.password_confirmation.length > 0 &&
        data.password !== data.password_confirmation;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (data.password !== data.password_confirmation) {
            return;
        }

        post('/user/confirm-password', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    return (
        <>
            <Head title="Confirm Password - CaptMatch" />

            <div className="captmatch-home flex h-screen overflow-hidden bg-white text-gray-800">
                <div className="relative hidden flex-col justify-between bg-[#35ADD5] p-10 md:flex md:w-5/12 lg:w-1/2 lg:p-14">
                    <img
                        src="/images/home/cta.jpg"
                        alt=""
                        className="absolute inset-0 h-full w-full -scale-x-100 object-cover opacity-40 mix-blend-overlay"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#015291E6] to-[#041728F2]" />

                    <div className="relative z-20">
                        <Link href="/">
                            <img
                                src="/images/logo2.svg"
                                alt="CaptMatch"
                                className="h-auto w-36"
                            />
                        </Link>
                    </div>

                    <div className="relative z-20 my-auto max-w-lg pt-12">
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                            <ShieldCheck className="h-8 w-8 text-[#3DB3DE]" />
                        </div>
                        <h1 className="mb-6 text-[42px] leading-tight font-bold text-white lg:text-[52px]">
                            Secure Area
                            <span className="captmatch-playfair font-bold text-[#3DB3DE] italic">
                                {' '}
                                Verification
                            </span>
                        </h1>
                        <p className="text-[18px] leading-relaxed text-[#F9FCFFCC]">
                            For your protection, please confirm your password
                            before accessing this secure section of your
                            account.
                        </p>

                        <div className="mt-10 space-y-3">
                            {[
                                'Your data is encrypted and protected',
                                'Session secured with industry standards',
                                'Password never stored in plain text',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3DB3DE]/20">
                                        <div className="h-2 w-2 rounded-full bg-[#3DB3DE]" />
                                    </div>
                                    <span className="text-[14px] text-[#F9FCFFCC]">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-20 text-[13px] text-[#F9FCFF80]">
                        © {new Date().getFullYear()} CaptMatch. All rights
                        reserved.
                    </div>
                </div>

                <div className="relative flex w-full flex-col overflow-y-auto bg-white md:w-7/12 lg:w-1/2">
                    <Link
                        href="/dashboard"
                        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#35ADD5] sm:top-8 sm:left-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>

                    <div className="m-auto w-full max-w-120 px-6 py-20 sm:px-10 lg:px-12">
                        <div className="mb-10 flex justify-center md:hidden">
                            <Link href="/">
                                <img
                                    src="/images/logo1.svg"
                                    alt="CaptMatch"
                                    className="h-auto w-36"
                                />
                            </Link>
                        </div>

                        <div className="mb-8">
                            <h1 className="mb-2 text-[32px] font-bold text-[#35ADD5]">
                                Confirm Password
                            </h1>
                            <p className="text-[15px] text-gray-500">
                                This is a secure area. Please confirm your
                                password before continuing.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    autoFocus
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="h-auto rounded-lg border-gray-300 bg-gray-50/50 py-3 pr-10 focus-visible:border-[#3DB3DE] focus-visible:ring-2 focus-visible:ring-[#3DB3DE40]"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />

                                {data.password.length > 0 && (
                                    <div className="mt-3 rounded-lg border border-[#3DB3DE26] bg-[#F4FAFE] p-3">
                                        <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-[#35ADD5] uppercase">
                                            <ShieldCheck className="h-4 w-4 text-[#015291]" />
                                            Password requirements
                                        </p>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            {passwordChecks.map((check) => (
                                                <li
                                                    key={check.label}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span
                                                        className={`block h-1.5 w-1.5 rounded-full ${
                                                            check.matched
                                                                ? 'bg-emerald-500'
                                                                : 'bg-[#3DB3DE]'
                                                        }`}
                                                    />
                                                    <span
                                                        className={
                                                            check.matched
                                                                ? 'font-bold text-emerald-700'
                                                                : ''
                                                        }
                                                    >
                                                        {check.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    className={`h-auto rounded-lg bg-gray-50/50 py-3 pr-10 focus-visible:ring-2 ${
                                        passwordsMatch
                                            ? 'border-emerald-400 focus-visible:border-emerald-400 focus-visible:ring-emerald-100'
                                            : passwordsMismatch
                                              ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100'
                                              : 'border-gray-300 focus-visible:border-[#3DB3DE] focus-visible:ring-[#3DB3DE40]'
                                    }`}
                                />

                                {passwordsMatch && (
                                    <p className="mt-1.5 text-[13px] font-medium text-emerald-600">
                                        ✓ Passwords match
                                    </p>
                                )}
                                {passwordsMismatch && (
                                    <p className="mt-1.5 text-[13px] font-medium text-red-500">
                                        ✗ Passwords do not match
                                    </p>
                                )}

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={
                                    processing ||
                                    passwordsMismatch ||
                                    data.password.length === 0
                                }
                                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#3DB3DE] px-4 py-3.5 font-semibold text-white shadow-lg shadow-[#3DB3DE33] transition-colors hover:bg-[#2A9BCA] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing ? (
                                    <Spinner />
                                ) : (
                                    <ShieldCheck className="h-5 w-5" />
                                )}
                                Confirm & Continue
                            </button>
                        </form>

                        <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#E0F3FB] bg-[#F0FAFF] p-4">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3DB3DE]" />
                            <p className="text-[13px] leading-relaxed text-[#4B7A8F]">
                                You won't need to confirm again for a few hours
                                unless you log out or your session expires.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

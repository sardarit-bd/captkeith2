import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { LogIn } from 'lucide-react';
import { FormEvent, useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Spinner } from '@/components/ui/spinner';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

interface ValidationErrors {
    email?: string;
    password?: string;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [clientErrors, setClientErrors] = useState<ValidationErrors>({});

    function validate(): boolean {
        const errs: ValidationErrors = {};

        if (!data.email.trim()) {
            errs.email = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errs.email = 'Please enter a valid email address.';
        }

        if (!data.password) {
            errs.password = 'Password is required.';
        } else if (data.password.length < 8) {
            errs.password = 'Password must be at least 8 characters.';
        }

        setClientErrors(errs);

        return Object.keys(errs).length === 0;
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!validate()) return;

        post('/login', {
            onFinish: () => reset('password'),
        });
    }

    const emailError = clientErrors.email || errors.email;
    const passwordError = clientErrors.password || errors.password;

    return (
        <>
            <Head title="Login - CaptMatch" />

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
                        <h1 className="mb-6 text-[42px] leading-tight font-bold text-white lg:text-[52px]">
                            Welcome Back to
                            <span className="captmatch-playfair font-bold text-[#3DB3DE] italic">
                                CaptMatch
                            </span>
                        </h1>
                        <p className="text-[18px] leading-relaxed text-[#F9FCFFCC]">
                            Connect with verified captains and yacht owners.
                            Sign in to manage your profile and matches.
                        </p>
                    </div>

                    <div className="relative z-20">
                        <p className="text-sm text-[#F9FCFF99]">
                            Don't have an account?
                            <Link
                                href="/register"
                                className="font-semibold text-[#3DB3DE] underline-offset-2 hover:underline"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="relative flex w-full flex-col overflow-y-auto bg-white md:w-7/12 lg:w-1/2">
                    <div className="m-auto w-full max-w-125 px-6 py-20 sm:px-10 lg:px-12">
                        <div className="mb-10 flex justify-center md:hidden">
                            <Link href="/">
                                <img
                                    src="/images/logo1.svg"
                                    alt="CaptMatch"
                                    className="h-auto w-36"
                                />
                            </Link>
                        </div>

                        <div className="mb-10">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF8FD]">
                                <LogIn className="h-5 w-5 text-[#3DB3DE]" />
                            </div>
                            <h1 className="mb-2 text-[32px] font-bold text-[#35ADD5]">
                                Sign In
                            </h1>
                            <p className="text-[15px] text-gray-500">
                                Enter your credentials to access your account.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {status}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            noValidate
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData('email', e.target.value);

                                        if (clientErrors.email) {
                                            setClientErrors((prev) => ({
                                                ...prev,
                                                email: undefined,
                                            }));
                                        }
                                    }}
                                    className={`h-auto w-full rounded-lg border bg-gray-50/50 px-4 py-3 text-sm text-gray-800 transition-all outline-none placeholder:text-gray-400 focus:border-[#3DB3DE] focus:ring-2 focus:ring-[#3DB3DE80] ${
                                        emailError
                                            ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                                            : 'border-gray-300'
                                    }`}
                                />
                                <InputError
                                    message={emailError}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-[#3DB3DE] hover:text-[#2A9BCA]"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => {
                                        setData('password', e.target.value);

                                        if (clientErrors.password) {
                                            setClientErrors((prev) => ({
                                                ...prev,
                                                password: undefined,
                                            }));
                                        }
                                    }}
                                    className={`h-auto rounded-lg border bg-gray-50/50 py-3 pr-10 focus-visible:border-[#3DB3DE] focus-visible:ring-2 focus-visible:ring-[#3DB3DE80] ${
                                        passwordError
                                            ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-200'
                                            : 'border-gray-300'
                                    }`}
                                />
                                <InputError
                                    message={passwordError}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#3DB3DE]"
                                />
                                <label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm text-gray-600 select-none"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3DB3DE] px-4 py-3.5 font-semibold text-white shadow-lg shadow-[#3DB3DE33] transition-colors hover:bg-[#2A9BCA] disabled:cursor-not-allowed disabled:opacity-70"
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Sign In
                            </button>

                            <p className="text-center text-sm text-gray-500 md:hidden">
                                Don't have an account?{' '}
                                <Link
                                    href="/register"
                                    className="font-semibold text-[#3DB3DE] hover:text-[#2A9BCA]"
                                >
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

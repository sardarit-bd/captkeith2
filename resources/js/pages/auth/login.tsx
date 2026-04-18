import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, LogIn } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { home, register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title="Sign In - CaptMatch" />

            <div className="captmatch-home flex h-screen overflow-hidden bg-white text-gray-800">
                <div className="relative hidden flex-col justify-between bg-[#0D314D] p-10 md:flex md:w-5/12 lg:w-1/2 lg:p-14">
                    <img src="/images/home/cta.jpg" alt="" className="absolute inset-0 h-full w-full -scale-x-100 object-cover opacity-40 mix-blend-overlay" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#015291E6] to-[#041728F2]" />

                    <div className="relative z-20">
                        <Link href={home()}>
                            <img src="/images/logo2.svg" alt="CaptMatch" className="h-auto w-36" />
                        </Link>
                    </div>

                    <div className="relative z-20 my-auto max-w-lg pt-12">
                        <h1 className="mb-6 text-[42px] leading-tight font-bold text-white lg:text-[52px]">
                            Welcome Back to Your 
                            <span className="captmatch-playfair font-bold italic text-[#3DB3DE]"> Next Adventure</span>
                        </h1>
                        <p className="text-[18px] leading-relaxed text-[#F9FCFFCC]">
                            Sign in as an owner, captain, deckhand, or charterer to access your account, manage your activity, and keep every maritime journey compliant.
                        </p>
                    </div>

                </div>

                <div className="relative flex w-full flex-col overflow-y-auto bg-white md:w-7/12 lg:w-1/2">
                    <Link href={home()} className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#0D314D] sm:top-8 sm:left-10">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <div className="m-auto w-full max-w-[500px] px-6 py-20 sm:px-10 lg:px-12">
                        <div className="mb-10 flex justify-center md:hidden">
                            <Link href={home()}>
                                <img src="/images/logo1.svg" alt="CaptMatch" className="h-auto w-36" />
                            </Link>
                        </div>

                        <div className="mb-10">
                            <h1 className="mb-2 text-[32px] font-bold text-[#0D314D]">Sign In</h1>
                            <p className="text-[15px] text-gray-500">Welcome back! Please enter your details to login.</p>
                        </div>

                        <Form {...store.form()} resetOnSuccess={['password']} className="space-y-6">
                            {({ processing, errors }) => (
                                <>
                                    <div>
                                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            placeholder="john@example.com"
                                            className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 outline-none transition-colors focus:border-[#3DB3DE] focus:ring-2 focus:ring-[#3DB3DE80]"
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="h-auto rounded-lg border-gray-300 bg-gray-50/50 py-3 pr-10 focus-visible:border-[#3DB3DE] focus-visible:ring-2 focus-visible:ring-[#3DB3DE80]"
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="remember" name="remember" type="checkbox" className="h-4 w-4 cursor-pointer rounded border border-gray-300 bg-white accent-[#3DB3DE]" />
                                            </div>
                                            <label htmlFor="remember" className="ml-3 cursor-pointer text-sm text-gray-500">
                                                Remember me
                                            </label>
                                        </div>

                                        {canResetPassword && (
                                            <Link href={request()} className="text-sm font-medium text-[#3DB3DE] transition-colors hover:text-[#2A9BCA]">
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3DB3DE] px-4 py-3.5 font-semibold text-white shadow-lg shadow-[#3DB3DE33] transition-colors hover:bg-[#2A9BCA] disabled:cursor-not-allowed disabled:opacity-70"
                                        data-test="login-button"
                                    >
                                        Sign In
                                        <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </>
                            )}
                        </Form>

                        {status && <p className="mt-4 text-center text-sm font-medium text-green-600">{status}</p>}

                        {canRegister && (
                            <p className="mt-8 text-center text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link href={register()} className="font-semibold text-[#0D314D] transition-colors hover:text-[#3DB3DE]">
                                    Create one here
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

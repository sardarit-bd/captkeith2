import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Lock } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Spinner } from '@/components/ui/spinner';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/user/confirm-password', {
            onFinish: () => reset('password'),
        });
    }

    return (
        <>
            <Head title="Confirm Password - CaptMatch" />

            <div className="captmatch-home flex h-screen overflow-hidden bg-white text-gray-800">
                {/* Left Panel */}
                <div className="relative hidden flex-col justify-between bg-[#0D314D] p-10 md:flex md:w-5/12 lg:w-1/2 lg:p-14">
                    <img
                        src="/images/home/cta.jpg"
                        alt=""
                        className="absolute inset-0 h-full w-full -scale-x-100 object-cover opacity-40 mix-blend-overlay"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#015291E6] to-[#041728F2]" />

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
                            Secure Area
                            <span className="captmatch-playfair font-bold text-[#3DB3DE] italic">
                                {' '}
                                Verification
                            </span>
                        </h1>
                        <p className="text-[18px] leading-relaxed text-[#F9FCFFCC]">
                            Please confirm your password before accessing this
                            secure section of your account.
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="relative flex w-full flex-col overflow-y-auto bg-white md:w-7/12 lg:w-1/2">
                    <Link
                        href="/dashboard"
                        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#0D314D] sm:top-8 sm:left-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <div className="m-auto w-full max-w-[500px] px-6 py-20 sm:px-10 lg:px-12">
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
                                <Lock className="h-5 w-5 text-[#3DB3DE]" />
                            </div>
                            <h1 className="mb-2 text-[32px] font-bold text-[#0D314D]">
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
                                    className="h-auto rounded-lg border-gray-300 bg-gray-50/50 py-3 pr-10 focus-visible:border-[#3DB3DE] focus-visible:ring-2 focus-visible:ring-[#3DB3DE80]"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3DB3DE] px-4 py-3.5 font-semibold text-white shadow-lg shadow-[#3DB3DE33] transition-colors hover:bg-[#2A9BCA] disabled:cursor-not-allowed disabled:opacity-70"
                                data-test="confirm-password-button"
                            >
                                {processing && <Spinner />}
                                Confirm Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

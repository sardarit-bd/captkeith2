import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Compass, Home, LifeBuoy, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { home, login } from '@/routes';
import { store } from '@/routes/register';

function RoleOption({
    id,
    value,
    label,
    icon,
    defaultChecked = false,
}: {
    id: string;
    value: string;
    label: string;
    icon: ReactNode;
    defaultChecked?: boolean;
}) {
    return (
        <label htmlFor={id} className="group relative cursor-pointer">
            <input id={id} type="radio" name="role" value={value} defaultChecked={defaultChecked} className="peer sr-only" />

            <div className="rounded-xl border-2 border-gray-100 bg-white p-4 text-center transition-all hover:border-gray-200 peer-checked:border-[#3DB3DE] peer-checked:bg-[#F9FCFF]">
                <div className="mb-2 flex justify-center text-gray-400 transition-colors group-hover:text-[#015291] peer-checked:text-[#3DB3DE]">
                    {icon}
                </div>
                <span className="block text-sm font-medium text-gray-600 peer-checked:text-[#0D314D]">{label}</span>
            </div>

            <CheckCircle2 className="absolute top-2 right-2 hidden h-4 w-4 text-[#3DB3DE] peer-checked:block" />
        </label>
    );
}

export default function Register() {
    return (
        <>
            <Head title="Create Account - CaptMatch" />

            <div className="captmatch-home flex h-screen overflow-hidden bg-white text-gray-800">
                <div className="relative hidden flex-col justify-between bg-[#0D314D] p-10 md:flex md:w-5/12 lg:w-1/2 lg:p-14">
                    <img src="/images/home/cta.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#015291E6] to-[#041728F2]" />

                    <div className="relative z-20">
                        <Link href={home()} className="inline-flex items-center">
                            <img src="/images/logo2.svg" alt="CaptMatch" className="h-auto w-36" />
                        </Link>
                    </div>

                    <div className="relative z-20 my-auto max-w-lg pt-12">
                        <h1 className="mb-6 text-[42px] leading-tight font-bold text-white lg:text-[52px]">
                            Embark on Your Next 
                            <span className="captmatch-playfair font-bold italic text-[#3DB3DE]"> Great Journey</span>
                        </h1>
                        <p className="text-[18px] leading-relaxed text-[#F9FCFFCC]">
                            Join the most trusted platform connecting boat owners, charterers, and licensed maritime professionals for safe and legal yacht charters.
                        </p>
                    </div>

                </div>

                <div className="relative flex w-full flex-col overflow-y-auto bg-white md:w-7/12 lg:w-1/2">
                    <Link href={home()} className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#0D314D] sm:top-8 sm:left-10">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <div className="m-auto w-full max-w-[560px] px-6 py-20 sm:px-10 lg:px-12">
                        <div className="mb-8 flex justify-center md:hidden">
                            <Link href={home()}>
                                <img src="/images/logo1.svg" alt="CaptMatch" className="h-auto w-36" />
                            </Link>
                        </div>

                        <div className="mb-8">
                            <h1 className="mb-2 text-[32px] font-bold text-[#0D314D]">Create an Account</h1>
                            <p className="text-[15px] text-gray-500">Join CaptMatch today to start your maritime journey.</p>
                        </div>

                        <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} disableWhileProcessing className="space-y-6">
                            {({ processing, errors }) => (
                                <>
                                    <div>
                                        <p className="mb-3 block text-sm font-semibold text-[#0D314D]">I am registering as a:</p>
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            <RoleOption id="role-owner" value="owner" label="Owner" icon={<Home className="h-7 w-7" strokeWidth={1.5} />} defaultChecked />
                                            <RoleOption id="role-captain" value="captain" label="Captain" icon={<Compass className="h-7 w-7" strokeWidth={1.5} />} />
                                            <RoleOption id="role-deckhand" value="deckhand" label="Deckhand" icon={<LifeBuoy className="h-7 w-7" strokeWidth={1.5} />} />
                                            <RoleOption id="role-charterer" value="charterer" label="Charterer" icon={<Users className="h-7 w-7" strokeWidth={1.5} />} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="first_name" className="mb-1.5 block text-sm font-medium text-gray-700">First Name</label>
                                            <input id="first_name" name="first_name" type="text" placeholder="John" className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 outline-none transition-colors focus:border-[#3DB3DE] focus:ring-2 focus:ring-[#3DB3DE80]" />
                                        </div>
                                        <div>
                                            <label htmlFor="last_name" className="mb-1.5 block text-sm font-medium text-gray-700">Last Name</label>
                                            <input id="last_name" name="last_name" type="text" placeholder="Doe" className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 outline-none transition-colors focus:border-[#3DB3DE] focus:ring-2 focus:ring-[#3DB3DE80]" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
                                        <input id="email" name="email" type="email" required autoFocus autoComplete="email" placeholder="john@example.com" className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 outline-none transition-colors focus:border-[#3DB3DE] focus:ring-2 focus:ring-[#3DB3DE80]" />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
                                        <PasswordInput id="password" name="password" required autoComplete="new-password" placeholder="••••••••" className="h-auto rounded-lg border-gray-300 bg-gray-50/50 py-3 pr-10 focus-visible:border-[#3DB3DE] focus-visible:ring-2 focus-visible:ring-[#3DB3DE80]" />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="password_confirmation" className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password</label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            required
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            className="h-auto rounded-lg border-gray-300 bg-gray-50/50 py-3 pr-10 focus-visible:border-[#3DB3DE] focus-visible:ring-2 focus-visible:ring-[#3DB3DE80]"
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="terms" type="checkbox" required className="h-4 w-4 cursor-pointer rounded border border-gray-300 bg-white accent-[#3DB3DE]" />
                                        </div>
                                        <label htmlFor="terms" className="ml-3 cursor-pointer text-sm text-gray-500">
                                            I agree to the{' '}
                                            <a href="#" className="font-medium text-[#3DB3DE] hover:underline">
                                                Terms of Service
                                            </a>{' '}
                                            and{' '}
                                            <a href="#" className="font-medium text-[#3DB3DE] hover:underline">
                                                Privacy Policy
                                            </a>
                                            .
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#3DB3DE] px-4 py-3.5 font-semibold text-white shadow-lg shadow-[#3DB3DE33] transition-colors hover:bg-[#2A9BCA] disabled:cursor-not-allowed disabled:opacity-70"
                                        data-test="register-user-button"
                                    >
                                        Create Account
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </button>

                                    <p className="pt-2 text-center text-sm text-gray-500">
                                        Already have an account?{' '}
                                        <Link href={login()} className="font-semibold text-[#0D314D] transition-colors hover:text-[#3DB3DE]">
                                            Sign in here
                                        </Link>
                                    </p>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

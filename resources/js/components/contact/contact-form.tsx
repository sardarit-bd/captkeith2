import { contactSubjects } from '@/components/contact/contact-data';
import { homeTheme } from '@/components/home/home-data';

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-semibold" style={{ color: homeTheme.primary }}>
            {children}
        </label>
    );
}

const baseInputClassName =
    'h-[42px] w-full rounded-[8px] border-none bg-[#F3F4F6] px-4 outline-none ring-2 ring-transparent transition focus:ring-[#35ADD5]/20';

export function ContactForm() {
    return (
        <div className="rounded-[20px] border border-slate-100 bg-white p-8 shadow-sm md:p-12">
            <h2 className="mb-4 text-3xl font-bold" style={{ color: homeTheme.primary }}>
                Send Us a Message
            </h2>
            <p className="mb-10" style={{ color: homeTheme.secondaryText }}>
                Fill out the form below and we&apos;ll get back to you as soon as possible
            </p>

            <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <FieldLabel htmlFor="first_name">First Name *</FieldLabel>
                        <input id="first_name" name="first_name" type="text" className={baseInputClassName} required autoComplete="given-name" />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel htmlFor="last_name">Last Name *</FieldLabel>
                        <input id="last_name" name="last_name" type="text" className={baseInputClassName} required autoComplete="family-name" />
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel htmlFor="email">Email *</FieldLabel>
                    <input id="email" name="email" type="email" className={baseInputClassName} required autoComplete="email" />
                </div>

                <div className="space-y-2">
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <input id="phone" name="phone" type="tel" className={baseInputClassName} autoComplete="tel" />
                </div>

                <div className="space-y-2">
                    <FieldLabel htmlFor="subject">Subject *</FieldLabel>
                    <div className="relative">
                        <select id="subject" name="subject" className={`${baseInputClassName} appearance-none pr-10`} required defaultValue="">
                            <option value="" disabled>
                                Select a subject
                            </option>
                            {contactSubjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" style={{ color: homeTheme.secondary }}>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <FieldLabel htmlFor="message">Message *</FieldLabel>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full resize-none rounded-[8px] border-none bg-[#F3F4F6] p-4 outline-none ring-2 ring-transparent transition focus:ring-[#35ADD5]/20"
                        required
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="h-[48px] w-full rounded-[8px] text-[16px] font-medium text-white transition hover:opacity-90"
                        style={{ backgroundColor: homeTheme.primary }}
                    >
                        Send Message
                    </button>
                </div>

                <p className="mt-6 text-center text-sm" style={{ color: homeTheme.secondaryText }}>
                    By submitting this form, you agree to our privacy policy and terms of service.
                </p>
            </form>
        </div>
    );
}

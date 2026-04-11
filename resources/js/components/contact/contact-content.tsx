import { ContactForm } from '@/components/contact/contact-form';
import { ContactSidebar } from '@/components/contact/contact-sidebar';

export function ContactContent() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_2.2fr]">
                    <ContactSidebar />
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}


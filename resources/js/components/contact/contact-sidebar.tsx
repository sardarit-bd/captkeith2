import { contactInfoList } from '@/components/contact/contact-data';
import { ContactInfoItem } from '@/components/contact/contact-info-item';
import { homeTheme } from '@/components/home/home-data';

export function ContactSidebar() {
    return (
        <div className="space-y-6">
            <div className="space-y-10 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                <h2
                    className="text-2xl font-semibold"
                    style={{ color: homeTheme.primary }}
                >
                    Get in Touch
                </h2>

                {contactInfoList.map((item) => (
                    <ContactInfoItem key={item.title} {...item} />
                ))}
            </div>

            <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-8">
                <h4
                    className="mb-4 text-lg font-bold"
                    style={{ color: homeTheme.primary }}
                >
                    Emergency Support
                </h4>
                <p
                    className="mb-6 text-sm leading-relaxed"
                    style={{ color: homeTheme.secondaryText }}
                >
                    For urgent matters during an active charter, call our 24/7
                    emergency line:
                </p>
                <a
                    href="tel:+15559876543"
                    className="text-xl font-bold"
                    style={{ color: homeTheme.secondary }}
                >
                    +1 (555) 987-6543
                </a>
            </div>
        </div>
    );
}

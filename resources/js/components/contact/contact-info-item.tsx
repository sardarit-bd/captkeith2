import type { ContactInfo } from '@/components/contact/contact-data';
import { homeTheme } from '@/components/home/home-data';

export function ContactInfoItem({ title, value, href, note, icon: Icon }: ContactInfo) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#E0F2FE]">
                <Icon className="h-6 w-6" style={{ color: homeTheme.secondary }} aria-hidden="true" />
            </div>
            <div>
                <h4 className="text-lg font-bold" style={{ color: homeTheme.primary }}>
                    {title}
                </h4>
                {href ? (
                    <a href={href} className="block font-medium" style={{ color: homeTheme.secondary }}>
                        {value}
                    </a>
                ) : (
                    <p className="whitespace-pre-line leading-relaxed" style={{ color: homeTheme.secondaryText }}>
                        {value}
                    </p>
                )}
                {note ? (
                    <p className="mt-1 text-sm" style={{ color: homeTheme.secondaryText }}>
                        {note}
                    </p>
                ) : null}
            </div>
        </div>
    );
}


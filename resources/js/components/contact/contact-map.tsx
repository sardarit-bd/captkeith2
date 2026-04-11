export function ContactMap() {
    return (
        <section className="w-full overflow-hidden bg-white">
            <div className="h-[350px] w-full md:h-[450px] lg:h-[550px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.5392591666!2d-80.31185900599026!3d25.782390733568212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a39276038f%3A0x7c34b6555555555!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    className="h-full w-full border-0 grayscale-[10%] contrast-105"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CaptMatch office location in Miami"
                />
            </div>
        </section>
    );
}


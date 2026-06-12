export function HomeLogo({ white = false }: { white?: boolean }) {
    return (
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-32 md:w-40" aria-label="CaptMatch logo" role="img">
            <path d="M20 40L40 45H160L180 40V35L140 25H60L20 35V40Z" fill={white ? '#FFFFFF' : '#35ADD5'} />
            <rect x="70" y="15" width="40" height="10" fill="#35ADD5" />
            <text x="10" y="58" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="28" fill={white ? '#FFFFFF' : '#35ADD5'}>
                CAPTMATCH
            </text>
        </svg>
    );
}

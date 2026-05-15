import { RequestCard } from './request-card';
import type { CaptainRequestRecord } from './requests-data';

interface RequestsListProps {
    requests: CaptainRequestRecord[];
}

export function RequestsList({ requests }: RequestsListProps) {
    if (requests.length === 0) {
        return (
            <p className="py-12 text-center text-[14px] text-[#6b7280]">
                No requests found.
            </p>
        );
    }

    return (
        <section className="space-y-6">
            {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
            ))}
        </section>
    );
}

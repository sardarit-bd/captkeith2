import { RequestCard } from './request-card';
import { captainRequestRecords } from './requests-data';

export function RequestsList() {
    return (
        <section className="space-y-6">
            {captainRequestRecords.map((request) => (
                <RequestCard key={request.id} request={request} />
            ))}
        </section>
    );
}

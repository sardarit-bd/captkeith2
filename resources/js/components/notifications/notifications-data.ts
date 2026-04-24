export type NotificationRole =
    | 'owner'
    | 'captain'
    | 'deckhand'
    | 'charterer'
    | 'admin'
    | 'unknown';

export type NotificationAction = {
    id: string;
    label: string;
};

export type NotificationRecord = {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    unread: boolean;
    tone: 'success' | 'info' | 'warning' | 'accent' | 'neutral';
    icon:
        | 'check-circle-2'
        | 'file-text'
        | 'dollar-sign'
        | 'user'
        | 'calendar'
        | 'user-plus'
        | 'ship'
        | 'alert-circle'
        | 'message-square'
        | 'users';
    action?: NotificationAction;
};

export type NotificationFeed = {
    helperText: string;
    records: NotificationRecord[];
};

const feedsByRole: Record<Exclude<NotificationRole, 'unknown'>, NotificationFeed> = {
    owner: {
        helperText: 'Stay updated with your fleet activities and pending approvals.',
        records: [
            {
                id: 'owner-new-captain-request',
                title: 'New Captain Request',
                message:
                    'Captain Robert Anderson requested approval for your vessels.',
                timestamp: '2 hours ago',
                unread: true,
                tone: 'info',
                icon: 'user-plus',
            },
            {
                id: 'owner-charter-scheduled',
                title: 'Charter Scheduled',
                message: 'New charter booking for Ocean Star on April 2, 2026.',
                timestamp: '5 hours ago',
                unread: true,
                tone: 'accent',
                icon: 'calendar',
            },
            {
                id: 'owner-captain-accepted',
                title: 'Captain Accepted',
                message:
                    'Captain Sarah accepted your charter request for Sea Breeze.',
                timestamp: '1 day ago',
                unread: false,
                tone: 'success',
                icon: 'check-circle-2',
            },
            {
                id: 'owner-vessel-status-updated',
                title: 'Vessel Status Updated',
                message: 'Wave Rider status changed to Active.',
                timestamp: '2 days ago',
                unread: false,
                tone: 'warning',
                icon: 'alert-circle',
            },
        ],
    },
    captain: {
        helperText: 'Track new matches, charter updates, and owner responses.',
        records: [
            {
                id: 'captain-new-yacht-match',
                title: 'New Yacht Match',
                message: 'A new yacht profile matches your qualifications.',
                timestamp: '45 minutes ago',
                unread: true,
                tone: 'info',
                icon: 'ship',
                action: { id: 'captain-view-match', label: 'View Match' },
            },
            {
                id: 'captain-owner-message',
                title: 'Message from Owner',
                message: 'You received a new message regarding charter terms.',
                timestamp: '3 hours ago',
                unread: true,
                tone: 'accent',
                icon: 'message-square',
            },
            {
                id: 'captain-payment-processed',
                title: 'Payout Processed',
                message: 'Your recent charter payout has been processed.',
                timestamp: '1 day ago',
                unread: false,
                tone: 'success',
                icon: 'dollar-sign',
            },
            {
                id: 'captain-license-reminder',
                title: 'License Reminder',
                message: 'Your license document needs renewal next month.',
                timestamp: '2 days ago',
                unread: false,
                tone: 'warning',
                icon: 'file-text',
            },
        ],
    },
    deckhand: {
        helperText: 'Review crew invitations, responses, and schedule reminders.',
        records: [
            {
                id: 'deckhand-crew-request',
                title: 'New Crew Request',
                message:
                    'An owner invited you to join a new charter crew assignment.',
                timestamp: '1 hour ago',
                unread: true,
                tone: 'info',
                icon: 'user-plus',
                action: { id: 'deckhand-open-request', label: 'Open Request' },
            },
            {
                id: 'deckhand-interview-scheduled',
                title: 'Interview Scheduled',
                message:
                    'A quick interview is scheduled for Friday at 4:00 PM.',
                timestamp: '4 hours ago',
                unread: true,
                tone: 'accent',
                icon: 'calendar',
            },
            {
                id: 'deckhand-profile-approved',
                title: 'Profile Approved',
                message:
                    'Your updated profile was approved and is visible to owners.',
                timestamp: '1 day ago',
                unread: false,
                tone: 'success',
                icon: 'check-circle-2',
            },
            {
                id: 'deckhand-documents-needed',
                title: 'Document Update Needed',
                message: 'Please upload your latest safety training certificate.',
                timestamp: '2 days ago',
                unread: false,
                tone: 'warning',
                icon: 'file-text',
            },
        ],
    },
    charterer: {
        helperText: 'Check your latest charter updates and booking milestones.',
        records: [
            {
                id: 'charterer-booking-confirmed',
                title: 'Booking Confirmed',
                message:
                    'Your booking for Ocean Star has been confirmed by Captain Michael Thompson.',
                timestamp: '2 hours ago',
                unread: true,
                tone: 'success',
                icon: 'check-circle-2',
                action: {
                    id: 'charterer-view-booking',
                    label: 'View Booking',
                },
            },
            {
                id: 'charterer-contract-ready',
                title: 'Contract Ready for Download',
                message:
                    'Your charter contract for Ocean Star is now available.',
                timestamp: '3 hours ago',
                unread: true,
                tone: 'info',
                icon: 'file-text',
                action: {
                    id: 'charterer-download-contract',
                    label: 'Download Contract',
                },
            },
            {
                id: 'charterer-payment-success',
                title: 'Payment Successful',
                message: 'Your payment of $2,295 has been processed successfully.',
                timestamp: '5 hours ago',
                unread: false,
                tone: 'success',
                icon: 'dollar-sign',
            },
            {
                id: 'charterer-captain-acceptance',
                title: 'Waiting for Captain Acceptance',
                message:
                    'Captain Michael Thompson is reviewing your charter request.',
                timestamp: '6 hours ago',
                unread: false,
                tone: 'warning',
                icon: 'user',
            },
        ],
    },
    admin: {
        helperText: 'Monitor platform activity, approvals, and compliance events.',
        records: [
            {
                id: 'admin-owner-signup',
                title: 'New Owner Signup',
                message: 'A new owner account requires profile verification.',
                timestamp: '30 minutes ago',
                unread: true,
                tone: 'info',
                icon: 'user-plus',
            },
            {
                id: 'admin-review-queue',
                title: 'Verification Queue Updated',
                message: '5 new accounts are waiting for manual review.',
                timestamp: '2 hours ago',
                unread: true,
                tone: 'warning',
                icon: 'users',
            },
            {
                id: 'admin-dispute-reported',
                title: 'Charter Dispute Reported',
                message: 'A dispute was opened for charter #CM-4821.',
                timestamp: '8 hours ago',
                unread: true,
                tone: 'accent',
                icon: 'message-square',
                action: { id: 'admin-review-dispute', label: 'Review' },
            },
            {
                id: 'admin-compliance-passed',
                title: 'Compliance Check Passed',
                message:
                    'Weekly safety compliance checks completed successfully.',
                timestamp: '1 day ago',
                unread: false,
                tone: 'success',
                icon: 'check-circle-2',
            },
        ],
    },
};

export function normalizeNotificationRole(role?: string | null): NotificationRole {
    if (
        role === 'owner' ||
        role === 'captain' ||
        role === 'deckhand' ||
        role === 'charterer' ||
        role === 'admin'
    ) {
        return role;
    }

    return 'unknown';
}

export function getNotificationFeed(role?: string | null): NotificationFeed {
    const normalizedRole = normalizeNotificationRole(role);

    if (normalizedRole === 'unknown') {
        return {
            helperText: 'Review your latest account activity and updates.',
            records: feedsByRole.charterer.records,
        };
    }

    return feedsByRole[normalizedRole];
}

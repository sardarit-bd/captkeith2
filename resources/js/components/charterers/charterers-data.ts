export type CharterYachtOption = {
    value: string;
    label: string;
};

export type DraftCharter = {
    id: string;
    yachtName: string;
    yachtType: string;
    yachtLength: string;
    date: string;
    startTime: string;
    duration: string;
    yachtImage: string | null;
    inviteLink: string | null;
    inviteExpires: string | null;
    specialNotes: string | null;
};

export type ActiveBooking = {
    id: string;
    yachtName: string;
    yachtType: string;
    yachtLength: string;
    date: string;
    yachtImage: string | null;
    chartererName: string;
    chartererAvatar: string | null;
    status: string;
};

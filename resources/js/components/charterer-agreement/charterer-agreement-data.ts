export type AgreementDocument = {
    id: string;
    title: string;
    heading: string;
    buttonLabel: string;
    clauses: Array<{
        id: string;
        title?: string;
        body: string;
    }>;
};

export const agreementDocuments: AgreementDocument[] = [
    {
        id: 'vessel-charter-agreement',
        title: 'Vessel Charter Agreement',
        heading: 'BAREBOAT CHARTER AGREEMENT',
        buttonLabel: 'Sign Charter Agreement',
        clauses: [
            {
                id: 'intro',
                body: 'This Bareboat Charter Agreement ("Agreement") is entered into on 4/15/2026 between:',
            },
            {
                id: 'parties',
                body: 'VESSEL OWNER ("Owner")\nAnd\nCHARTERER ("Charterer")',
            },
            {
                id: 'vessel-details',
                title: '1. VESSEL DETAILS',
                body: 'The Owner agrees to charter to the Charterer the vessel known as [VESSEL NAME], Official Number [NUMBER], for the period specified.',
            },
            {
                id: 'charter-period',
                title: '2. CHARTER PERIOD AND DELIVERY',
                body: 'The Owner agrees to deliver the vessel to the Charterer at the designated port on the agreed-upon commencement date. The Charterer agrees to redeliver the vessel to the Owner at the designated return port at the expiration of the charter period, in the same condition as when delivered, excepting normal wear and tear.',
            },
            {
                id: 'payments',
                title: '3. CHARTER HIRE AND PAYMENTS',
                body: 'The Charterer agrees to pay the Owner the charter hire sum as specified in the booking details. Payment shall be made in full prior to the commencement of the charter. A security deposit may be required to cover any potential damages or outstanding expenses.',
            },
            {
                id: 'use-of-vessel',
                title: '4. USE OF THE VESSEL',
                body: 'The Charterer agrees that the vessel shall be used exclusively for pleasure and recreational purposes. The vessel shall not be used to transport merchandise or carry passengers for pay, or engage in any trade, nor in any way violate the laws of any government within the jurisdiction of which the vessel may be at any time.',
            },
            {
                id: 'insurance-liability',
                title: '5. INSURANCE AND LIABILITY',
                body: "The Owner represents that the vessel is fully insured against fire, marine, and collision risks. The Charterer shall be responsible for any loss or damage to the vessel not covered by the Owner's insurance, up to the amount of the deductible, or the total cost of damage if caused by the Charterer's gross negligence or willful misconduct.",
            },
            {
                id: 'indemnification',
                title: '6. INDEMNIFICATION',
                body: "The Charterer agrees to indemnify and hold harmless the Owner against any and all claims, demands, or liabilities for loss, damage, or injury to persons or property arising out of or in connection with the Charterer's use and operation of the vessel.",
            },
        ],
    },
    {
        id: 'captain-hire-agreement',
        title: 'Captain Hire Agreement',
        heading: 'CAPTAIN HIRE AGREEMENT',
        buttonLabel: 'Sign Captain Hire Agreement',
        clauses: [
            {
                id: 'intro',
                body: 'This Captain Hire Agreement ("Agreement") is entered into on 4/15/2026 between:',
            },
            {
                id: 'parties',
                body: 'CHARTERER ("Hirer")\nAnd\nCAPTAIN ("Captain")',
            },
            {
                id: 'services',
                title: '1. SERVICES',
                body: 'The Captain agrees to provide professional captain services for the vessel during the charter period. The Captain shall have sole responsibility for the safe navigation and operation of the vessel.',
            },
            {
                id: 'contractor',
                title: '2. INDEPENDENT CONTRACTOR',
                body: 'The Captain is engaged as an independent contractor and not as an employee of the Hirer or the Vessel Owner. The Captain shall have exclusive control over the details of performing the services.',
            },
            {
                id: 'authority',
                title: "3. CAPTAIN'S AUTHORITY",
                body: 'The Captain shall have full and absolute authority over the vessel, its crew, and passengers regarding matters of safety, navigation, and seamanship. The Hirer agrees to abide by all lawful orders and directives of the Captain.',
            },
            {
                id: 'compensation',
                title: '4. COMPENSATION',
                body: 'The Hirer agrees to pay the Captain the agreed-upon hourly or daily rate for the duration of the services provided. Payment terms shall be strictly adhered to as specified in the booking arrangement.',
            },
            {
                id: 'qualifications',
                title: '5. QUALIFICATIONS',
                body: 'The Captain represents and warrants that they hold all necessary and valid licenses, endorsements, and medical certificates required to operate the vessel in the specified operating area.',
            },
            {
                id: 'termination',
                title: '6. TERMINATION',
                body: 'Either party may terminate this Agreement prior to the commencement of services subject to the agreed cancellation policy. The Captain may terminate the charter immediately if the Hirer or guests engage in illegal activities or jeopardize the safety of the vessel.',
            },
        ],
    },
];

export const acknowledgementText =
    'I have read, understood, and agree to the terms of both agreements. I understand that I am directly hiring the captain as an independent contractor and that the captain is not an employee or agent of the vessel owner.';

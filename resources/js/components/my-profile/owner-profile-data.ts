export const ownerProfileDefaultValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (305) 555-0198',
    streetAddress: '1000 Biscayne Blvd',
    city: 'Miami',
    state: 'FL',
    zipCode: '33132',
};

export const ownerStateOptions = [
    { value: 'FL', label: 'Florida' },
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'WA', label: 'Washington' },
] as const;

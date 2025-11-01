export async function submitRegistration(formData) {
    const endpoint = formData.get('apiEndpoint') || 'http://localhost:4000/api/registrations';

    const payload = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        eventType: formData.get('eventType') || 'Other',
        details: formData.get('details') || '',
        termsAccepted: formData.get('terms') === 'on'
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorPayload.message || 'Failed to submit registration');
    }

    return response.json();
}

export async function loadRecentRegistrations(endpoint) {
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Unable to load recent registrations');
    }

    return response.json();
}

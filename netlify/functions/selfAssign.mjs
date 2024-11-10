// netlify/functions/selfAssign.mjs
export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { userName } = JSON.parse(event.body);
        if (!userName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing userName' }),
            };
        }

        // Call Google Apps Script API for self-assignment
        const response = await fetch(process.env.GOOGLE_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'selfAssign', userName }),
        });

        // Check if the API request was successful
        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Discord ID self-assigned successfully' }),
            };
        } else {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: 'Failed to self-assign Discord ID' }),
            };
        }
    } catch (error) {
        console.error('Error in selfAssign:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' }),
        };
    }
}
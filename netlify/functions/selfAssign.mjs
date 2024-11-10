// netlify/functions/selfAssign.mjs
export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { discordId } = JSON.parse(event.body);
        if (!discordId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing discordId' }),
            };
        }

        // Call Google Apps Script API for self-assignment
        const response = await fetch(process.env.GOOGLE_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'selfAssign', discordId }),
        });

        const result = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error('Error in selfAssign:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' }),
        };
    }
}
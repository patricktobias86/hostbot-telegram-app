// netlify/functions/createUser.mjs
export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { telegramUser, discordId, telegramId } = JSON.parse(event.body);
        if (!telegramUser || !discordId || !telegramId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing user data' }),
            };
        }

        // Call Google Apps Script API for user creation
        const response = await fetch(process.env.GOOGLE_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'create',
                telegramUser,
                discordId,
                telegramId,
            }),
        });

        const result = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error('Error in createUser:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' }),
        };
    }
}
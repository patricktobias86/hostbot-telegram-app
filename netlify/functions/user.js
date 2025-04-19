// netlify/functions/user.js
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

        const response = await fetch('http://149.56.46.228:1880/hostbot/link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telegramUser,
                discordId,
                telegramId,
            }),
        });

        // Check if the API request was successful
        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'ok' }),
            };
        } else {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: 'failed' }),
            };
        }
    } catch (error) {
        console.error('Error in user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' }),
        };
    }
}
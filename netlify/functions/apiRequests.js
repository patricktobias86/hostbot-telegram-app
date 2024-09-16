exports.handler = async (event) => {
    try {
        // Parse request body
        const { action, userName, userId, discordId } = JSON.parse(event.body);

        // Select the appropriate API endpoint and body
        let url = '';
        let body = {};
        let successMessage = '';
        let errorMessages = {};

        if (action === 'firstButton') {
            url = process.env.RETOOL_API_URL_1;
            body = { user: userName };
            successMessage = 'Thank you for helping out!';
            errorMessages = {
                500: 'Error: Please try again.',
                400: 'This user is not linked to the hostbot.'
            };
        } else if (action === 'linkDiscord') {
            url = process.env.RETOOL_API_URL_2;
            body = { telegramUser: userName, discordId: discordId, telegramId: userId };
            successMessage = 'Your accounts have been linked!';
        }

        // Send API request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Handle response
        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: successMessage })
            };
        } else {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: errorMessages[response.status] || `Unexpected status code: ${response.status}` })
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send request.' })
        };
    }
};
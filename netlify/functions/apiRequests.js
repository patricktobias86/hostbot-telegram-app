exports.handler = async (event) => {
    try {
        // Parse request body
        const { action, userName, userId, discordId } = JSON.parse(event.body);

        // Initialize variables
        let url = '';
        let options = {};
        let successMessage = '';
        let errorMessages = {};

        // Handle different actions
        if (action === 'firstButton') {
            // Updated API endpoint for 'firstButton' action (GET request)
            url = `https://script.google.com/macros/s/AKfycbyU-LmqCxdMcXD_di6hxtm__9KgdZLHIjN49804jPLDfm8e4JOOFk8CyRYwUgIJyKJRiQ/exec?telegramUser=${userName}`;
            successMessage = 'You will be assigned co-host soon, try again in 1 min if you still haven’t been assigned co-host.';
            errorMessages = {
                500: 'Error: Please try again.',
                400: 'Your Telegram user has no link to any Discord user.'
            };
            
            // Configure GET request options
            options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        } else if (action === 'linkDiscord') {
            // Keep the original API endpoint for linking Discord (POST request)
            url = 'https://primepnp.retool.com/url/telegram/link';
            const body = {
                telegramUser: userName,
                discordId: discordId,
                telegramId: userId
            };
            successMessage = 'Your accounts have been linked!';
            
            // Configure POST request options
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            };
        }

        // Send the API request
        const response = await fetch(url, options);

        // Handle the response
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
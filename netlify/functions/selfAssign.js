const fetch = require('node-fetch');

// Function to handle the 'firstButton' action
async function selfAssign(userName) {
    const url = `https://script.google.com/macros/s/AKfycbyU-LmqCxdMcXD_di6hxtm__9KgdZLHIjN49804jPLDfm8e4JOOFk8CyRYwUgIJyKJRiQ/exec?telegramUser=${userName}`;
    const successMessage = 'You will be assigned co-host soon, try again in 1 min if you still haven’t been assigned co-host.';
    const errorMessages = {
        500: 'Error: Please try again.',
        400: 'Your Telegram user has no link to any Discord user.'
    };

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return { statusCode: 200, body: JSON.stringify({ message: successMessage }) };
        } else {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: errorMessages[response.status] || `Unexpected status code: ${response.status}` })
            };
        }
    } catch (error) {
        console.error('Error in selfAssignButton:', error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed to send request.' }) };
    }
}

module.exports = { selfAssign };
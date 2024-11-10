// Extracting user data from the Telegram WebApp
const { username, id } = window.Telegram.WebApp.initDataUnsafe.user;
const userName = username ? username.toLowerCase() : '';
const userId = id;
const discordId = window.Telegram.WebApp.initDataUnsafe.start_param;

// Google Apps Script API URL
const googleApiUrl = 'https://script.google.com/macros/s/AKfycbwiOGrtL0UkHFDToUOcz3GEFkvY89wT53vasHO227xco4W-i8HbBNQYKFUInFFe-cqqHQ/exec';

// Utility function to display messages
const showMessage = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) element.textContent = message;
};

// Generalized function to handle API requests directly to Google Apps Script
async function callGoogleApi(action, data = {}) {
    try {
        const response = await fetch(googleApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, ...data })
        });

        if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showMessage('errorMsg', 'Failed to process request.');
        return null;
    }
}

// Function to send Discord ID to the self-assign API
async function selfAssignDiscordId(discordId) {
    return await callGoogleApi('selfAssign', { discordId });
}

// Event listener for the search button (Search by Telegram username)
document.getElementById('apiRequestBtn')?.addEventListener('click', async () => {
    if (!userName) {
        showMessage('errorMsg', 'Telegram username not found');
        return;
    }

    const searchResponse = await callGoogleApi('search', { identifier: 'telegramUser', value: userName });

    if (searchResponse?.status === 200) {
        const foundDiscordId = searchResponse.discordId;

        if (foundDiscordId) {
            const selfAssignResponse = await selfAssignDiscordId(foundDiscordId);
            if (selfAssignResponse?.status === 200) {
                showMessage('responseMsg', 'Discord ID sent successfully');
            } else {
                showMessage('errorMsg', 'Failed to self-assign Discord ID.');
            }
        } else {
            showMessage('responseMsg', 'No Discord ID found');
        }
    } else {
        showMessage('responseMsg', 'User not found');
    }
});

// Event listener for the create button (Create new user)
document.getElementById('apiLinkDiscord')?.addEventListener('click', async () => {
    if (!(userName && userId && discordId)) {
        showMessage('errorMsg', 'Missing user data for creating an account');
        return;
    }

    const createResponse = await callGoogleApi('create', {
        telegramUser: userName,
        discordId,
        telegramId: userId
    });

    if (createResponse?.status === 201) {
        showMessage('responseMsg', 'User created successfully');
    } else {
        showMessage('errorMsg', createResponse?.message || 'Failed to create user');
    }
});
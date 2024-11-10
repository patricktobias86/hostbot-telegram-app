// Utility function to display messages
const showMessage = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) element.textContent = message;
};

// Extracting user data from the Telegram WebApp
const { username, id } = window.Telegram.WebApp.initDataUnsafe.user;
const userName = username ? username.toLowerCase() : '';
const userId = id;
const discordId = window.Telegram.WebApp.initDataUnsafe.start_param;

// Function to send API requests to Netlify functions
async function callNetlifyFunction(endpoint, data = {}) {
    try {
        const response = await fetch(`/.netlify/functions/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showMessage('errorMsg', 'Failed to process request.');
        return null;
    }
}

// Function to handle Discord ID self-assignment
async function selfAssignDiscordId(discordId) {
    return await callNetlifyFunction('selfAssign', { discordId });
}

// Event listener for the search button (Search by Telegram username)
document.getElementById('apiRequestBtn')?.addEventListener('click', async () => {
    if (!userName) {
        showMessage('errorMsg', 'Telegram username not found');
        return;
    }

    const searchResponse = await callNetlifyFunction('search', { identifier: 'telegramUser', value: userName });

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

    const createResponse = await callNetlifyFunction('createUser', {
        telegramUser: userName,
        discordId,
        telegramId: userId,
    });

    if (createResponse?.status === 201) {
        showMessage('responseMsg', 'User created successfully');
    } else {
        showMessage('errorMsg', createResponse?.message || 'Failed to create user');
    }
});
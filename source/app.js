// Utility function to display messages
const showMessage = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) element.textContent = message;
};

// Extracting user data from the Telegram WebApp
const { username } = window.Telegram.WebApp.initDataUnsafe.user;
const userName = username ? username.toLowerCase() : '';

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
async function selfAssignDiscordId(userName) {
    const response = await callNetlifyFunction('selfAssign', { userName });
    return response;
}

// Event listener for the search button
document.getElementById('apiRequestBtn')?.addEventListener('click', async () => {
    if (!userName) {
        showMessage('errorMsg', 'Telegram username not found');
        return;
    }

    const response = await selfAssignDiscordId(userName);
    if (response?.message) {
        showMessage('responseMsg', response.message);
    } else {
        showMessage('errorMsg', 'Failed to self-assign Discord ID.');
    }
});
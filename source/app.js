// Utility function to display messages
const showMessage = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) element.textContent = message;
};

const tg = window.Telegram.WebApp.initDataUnsafe;

// Extracting user data from the Telegram WebApp
const { username } = tg.user;
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

// Disable button for 15 seconds after being clicked
const disableButton = (button, duration = 15000) => {
    button.disabled = true; // Disable the button
    const originalText = button.textContent; // Save the original button text
    button.textContent = 'Please wait...'; // Change the button text

    // Re-enable the button after the specified duration
    setTimeout(() => {
        button.disabled = false; // Re-enable the button
        button.textContent = originalText; // Restore the original button text
    }, duration);
};

// Event listener for the self-assign button
document.getElementById('apiRequestBtn')?.addEventListener('click', async () => {
    const button = document.getElementById('apiRequestBtn');
    if (!userName) {
        showMessage('errorMsg', 'Telegram username not found');
        return;
    }

    // Show confirmation popup before proceeding
    Telegram.WebApp.showConfirm(
        "You need to help out with promo when you co-host every now and then. If you don't want to promo, there is no need to co-host.",
        async (confirmed) => {
            if (!confirmed) return; // Stop if the user cancels

            // Disable the button for 10 seconds
            disableButton(button);

            // Send API request
            const response = await selfAssignDiscordId(userName);
            if (response?.message) {
                showMessage('responseMsg', response.message);
            } else {
                showMessage('errorMsg', 'Failed to self-assign Discord ID.');
            }
        }
    );
});

document.getElementById('apiLinkDiscord')?.addEventListener('click', async () => {
    const button = document.getElementById('apiLinkDiscord');
    if (!userName) {
        showMessage('errorMsg', 'Telegram username not found');
        return;
    }

    // Extract discordId from the query string if available
    // Get the start_param from Telegram WebApp
    const startParam = tg.start_param || "No start_param available";
    let discordId = startParam;

    if (!discordId) {
        discordId = prompt('Enter your Discord ID:'); // Fallback if not in query string
    }

    const telegramId = tg.user?.id;

    if (!discordId || !telegramId) {
        showMessage('errorMsg', 'Missing Discord ID or Telegram ID.');
        return;
    }

    const response = await callNetlifyFunction('user', {
        telegramUser: userName,
        discordId,
        telegramId,
    });

    if (response?.status === 200) {
        showMessage('responseMsg', 'Discord successfully linked.');
    } else {
        showMessage('errorMsg', 'Failed to link Discord account.');
    }
});
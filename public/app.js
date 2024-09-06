// Modified frontend JS

// Extracting user data
const { username, id } = window.Telegram.WebApp.initDataUnsafe.user;
const userName = username.toLowerCase();
const userId = id;
const discordId = window.Telegram.WebApp.initDataUnsafe.start_param;

// Function to handle API requests
function callNetlifyFunction(action, data) {
    fetch('/.netlify/functions/apiRequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data })
    })
    .then(response => response.json())
    .then(data => {
        const responseMsg = document.getElementById('responseMsg');
        responseMsg.textContent = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMsg').textContent = 'Failed to send request.';
    });
}

// Event listener for the first button
document.getElementById('apiRequestBtn').addEventListener('click', () => {
    callNetlifyFunction('firstButton', { userName });
});

// Event listener for the second button
document.getElementById('apiLinkDiscord').addEventListener('click', () => {
    callNetlifyFunction('linkDiscord', { userName, userId, discordId });
});
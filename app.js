    const HostBot = {
        initData      : Telegram.WebApp.initData || '',
        initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},
        MainButton    : Telegram.WebApp.MainButton,

        init(options) {
            document.body.style.visibility = '';
            Telegram.WebApp.ready();
            Telegram.WebApp.MainButton.setParams({
                text      : 'CLOSE HOSTBOT',
                is_visible: true
            }).onClick(HostBot.close);
        },
        expand() {
            Telegram.WebApp.expand();
        },
        close() {
            Telegram.WebApp.close();
        },
        // Alerts
        showAlert(message) {
            Telegram.WebApp.showAlert(message);
        },
        showConfirm(message) {
            Telegram.WebApp.showConfirm(message);
        },
    }

// Extracting user data
const { username, id } = window.Telegram.WebApp.initDataUnsafe.user;
const userName = username.toLowerCase();
const userId = id;
const discordId = window.Telegram.WebApp.initDataUnsafe.start_param;

// Function to handle API requests
function sendApiRequest(url, body, successMessage, errorMessages) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        redirect: 'follow'
    })
    .then(response => {
        const responseMsg = document.getElementById('responseMsg');
        const errorMsg = document.getElementById('errorMsg');
        if (response.ok) {
            responseMsg.textContent = successMessage;
        } else {
            errorMsg.textContent = errorMessages[response.status] || `Unexpected status code: ${response.status}`;
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error);
        document.getElementById('errorMsg').textContent = 'Failed to send request.';
    });
}

// Event listener for the first button
document.getElementById('apiRequestBtn').addEventListener('click', () => {
    const url = "https://api.retool.com/v1/workflows/383e6e73-f240-4a66-b851-f96dc51918c3/startTrigger/?workflowApiKey=retool_wk_85c0de03ea5840a190dba376d1721b57";
    const body = { user: userName };
    const successMessage = 'Thank you for helping out!';
    const errorMessages = {
        500: 'The API returned a 500 status.',
        400: 'You need to link your Telegram & Discord account, go to Discord to link your accounts.'
    };
    sendApiRequest(url, body, successMessage, errorMessages);
});

// Event listener for the second button
document.getElementById('apiLinkDiscord').addEventListener('click', () => {
    const url = "https://api.retool.com/v1/workflows/52501fa7-dec0-418c-8dff-0100842b1f95/startTrigger/?workflowApiKey=retool_wk_497caf6d3c514bd2812036b8f65da46d";
    const body = {
        telegramUser: userName,
        discordId: discordId,
        telegramId: userId
    };
    const successMessage = 'Your accounts have been linked!';
    const errorMessages = {
        500: 'The API returned a 500 status.',
        400: 'The API returned a 400 status.'
    };
    sendApiRequest(url, body, successMessage, errorMessages);
});
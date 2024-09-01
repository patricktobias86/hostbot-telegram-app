document.getElementById('apiRequestBtn').addEventListener('click', function() {
    const discordId = window.Telegram.WebApp.initDataUnsafe.start_param;
    const url = "https://api.retool.com/v1/workflows/52501fa7-dec0-418c-8dff-0100842b1f95/startTrigger/?workflowApiKey=retool_wk_497caf6d3c514bd2812036b8f65da46d";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const userName = window.Telegram.WebApp.initDataUnsafe.user.username.toLowerCase();
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const raw = '{"telegramUser":"' + userName + '","discordId":"' + discordId + '", "telegramId": "' + userId + '"}';
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url, options)
    .then(response => {
        if (response.status === 200) {
            document.getElementById('responseMsg').textContent = 'Your accounts have been linked!';
        } else if (response.status === 500) {
            document.getElementById('errorMsg').textContent = 'The API returned a 500 status.';
        } else if (response.status === 400) {
            document.getElementById('errorMsg').textContent = 'The API returned a 400 status.';
        } else {
            document.getElementById('errorMsg').textContent = 'Unexpected status code: ' + response.status;
        }
    })
    .catch(error => {
        console.error('Error during fetch: ', error);
        document.getElementById('errorMsg').textContent = 'Failed to send request.';
    });
});
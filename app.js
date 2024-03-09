document.getElementById('apiRequestBtn').addEventListener('click', function() {
    const url = "https://api.retool.com/v1/workflows/383e6e73-f240-4a66-b851-f96dc51918c3/startTrigger/?workflowApiKey=retool_wk_85c0de03ea5840a190dba376d1721b57";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const userName = window.Telegram.WebApp.initDataUnsafe.user.username;
    const raw = '{"variables":[{"name":"telegram_user","variable":"{telegram_user}","value":"' + userName + '"}]}';
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url, options)
    .then(response => {
        if (response.status === 200) {
            document.getElementById('responseMsg').textContent = 'The API returned a 200 status.';
        } else if (response.status === 500) {
            document.getElementById('errorMsg').textContent = 'The API returned a 500 status.';
        } else {
            document.getElementById('errorMsg').textContent = 'Unexpected status code: ' + response.status;
        }
    })
    .catch(error => {
        console.error('Error during fetch: ', error);
        document.getElementById('errorMsg').textContent = 'Failed to send request.';
    });
});

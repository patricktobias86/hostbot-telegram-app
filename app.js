document.getElementById('apiRequestBtn').addEventListener('click', function() {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(window.Telegram.WebApp);
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/api/startTrigger?workflowApiKey=retool_wk_85c0de03ea5840a190dba376d1721b57", options)
    .then(response => {
        if (response.status === 200) {
            document.getElementById('responseMsg').textContent = 'Success! The API returned a 200 status.';
        } else if (response.status === 500) {
            document.getElementById('responseMsg').textContent = 'Server error! The API returned a 500 status.';
        } else {
            document.getElementById('responseMsg').textContent = 'Unexpected status code: ' + response.status;
        }
    })
    .catch(error => {
        console.error('Error during fetch: ', error);
        document.getElementById('responseMsg').textContent = 'Failed to send request.';
    });
});

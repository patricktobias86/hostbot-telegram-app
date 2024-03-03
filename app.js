document.getElementById('apiRequestBtn').addEventListener('click', function() {

    const url = "https://api.retool.com/v1/workflows/383e6e73-f240-4a66-b851-f96dc51918c3/startTrigger?workflowApiKey=retool_wk_85c0de03ea5840a190dba376d1721b57";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: window.Telegram.WebApp
    };

    fetch(url, options)
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

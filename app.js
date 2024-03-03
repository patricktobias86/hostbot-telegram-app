document.getElementById('apiRequestBtn').addEventListener('click', function() {
    const url = "/request";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify(Telegram.WebApp.initData)
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

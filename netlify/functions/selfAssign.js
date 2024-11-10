import fetch from 'node-fetch';

exports.handler = async (event) => {
  try {
    // Parse the Discord ID from the request body
    const { discordId } = JSON.parse(event.body);

    if (!discordId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Discord ID is required' }),
      };
    }

    // Prepare the payload
    const payload = {
      variables: [
        {
          name: 'message',
          variable: '{event_message}',
          value: discordId,
        },
      ],
    };

    // Make the API request using fetch
    const response = await fetch('https://api.botghost.com/webhook/1225248009458155560/b0i1jgyjo2v9vqc6va10q', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '58cd5fbd95527583d576832e04c6852e914e405421cdb199abc72741e7667caa',
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to send request', details: await response.text() }),
      };
    }

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Discord ID sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: error.message }),
    };
  }
};
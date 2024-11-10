exports.handler = async (event) => {
  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON format' }),
    };
  }

  const { discordId } = requestBody;
  if (!discordId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Discord ID is required' })
    };
  }

  const payload = {
    variables: [
      {
        name: 'message',
        variable: '{event_message}',
        value: discordId,
      }
    ]
  };

  const apiUrl = process.env.GOOGLE_API_URL;
  if (!apiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'API URL not configured' })
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send request', details: error.message })
    };
  }
};

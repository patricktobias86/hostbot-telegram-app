
import fetch from 'node-fetch';

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

  const { action, identifier, value, telegramUser, discordId, telegramId, newTelegramUser, newDiscordId, newTelegramId } = requestBody;
  const googleApiUrl = process.env.GOOGLE_API_URL;

  if (!googleApiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Google API URL is not set' })
    };
  }

  if (!action) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing action parameter' })
    };
  }

  // Add your logic for handling different actions here
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Action processed successfully' })
  };
};

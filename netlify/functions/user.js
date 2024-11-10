import fetch from 'node-fetch';

exports.handler = async (event) => {
  const { action, identifier, value, telegramUser, discordId, telegramId, newTelegramUser, newDiscordId, newTelegramId } = JSON.parse(event.body);

  const googleApiUrl = process.env.GOOGLE_API_URL;

  if (!googleApiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Google API URL is not set' })
    };
  }

  // Validate required parameters
  if (!action) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing action parameter' })
    };
  }

  // Prepare the query string based on action
  let query = `${googleApiUrl}?action=${action}`;

  if (identifier) query += `&identifier=${encodeURIComponent(identifier)}`;
  if (value) query += `&value=${encodeURIComponent(value)}`;
  if (telegramUser) query += `&telegramUser=${encodeURIComponent(telegramUser)}`;
  if (discordId) query += `&discordId=${encodeURIComponent(discordId)}`;
  if (telegramId) query += `&telegramId=${encodeURIComponent(telegramId)}`;
  if (newTelegramUser) query += `&newTelegramUser=${encodeURIComponent(newTelegramUser)}`;
  if (newDiscordId) query += `&newDiscordId=${encodeURIComponent(newDiscordId)}`;
  if (newTelegramId) query += `&newTelegramId=${encodeURIComponent(newTelegramId)}`;

  try {
    // Make the request to the Google Apps Script API
    const response = await fetch(query);
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error', error: error.message })
    };
  }
};
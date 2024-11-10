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

  const { action } = requestBody;
  const googleApiUrl = 'https://script.google.com/macros/s/AKfycbwiOGrtL0UkHFDToUOcz3GEFkvY89wT53vasHO227xco4W-i8HbBNQYKFUInFFe-cqqHQ/exec';

  if (!action) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing action parameter' })
    };
  }

  const response = await fetch(googleApiUrl);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Action processed successfully', data })
  };
};
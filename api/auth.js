const axios = require('axios').create({
  baseURL: 'https://accounts.zoho.com/oauth/v2',
});

/**
 * Refreshes the OAuth2 access token
 * @param {String} clientId
 * @param {String} clientSecret
 * @param {String} refreshToken
 */
async function refreshAccessToken(clientId, clientSecret, refreshToken) {
  const response = await axios.post('/token', null, {
    params: {
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
    },
  });
  return response.data;
}

module.exports = { refreshAccessToken };

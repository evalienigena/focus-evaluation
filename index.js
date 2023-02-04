require('dotenv').config();
const config = require('./config');

const { refreshAccessToken } = require('./api/auth');
const Contact = require('./api/contact');

// Execute the app:
run();

/**
 * Runs the application
 */
async function run() {
  console.log('+++ Cloud Integration Test +++\nName: Eva Arias\n');
  try {
    if (!isConfigValid(config))
      throw new Error(
        'We cannot continue because the credentials have not been established. ' +
          'Please, read the README.md for further instruction.'
      );

    // Validate that the access token is valid before we make any calls to the API
    const { access_token: accessToken } = await refreshAccessToken(
      config.ZOHO_CLIENT_ID,
      config.ZOHO_CLIENT_SECRET,
      config.ZOHO_REFRESH_TOKEN
    );

    // Record the Contact to the CRM
    const contact = new Contact(accessToken, 'Eva', 'Arias');
    const apiResponse = await contact.register();

    // Log the API Response
    console.log(`Zoho API response: \n${JSON.stringify(apiResponse.data, null, 2)}`);
  } catch (e) {
    console.error(`An error has occured.\n${e.message}`);
  }
  console.log('\n+++ End +++\n');
}

/**
 * Checks that the configuration object is valid
 * @param {Object} config Configuration object
 * @return {Boolean}
 */
function isConfigValid(config) {
  return [
    config.ZOHO_CLIENT_ID,
    config.ZOHO_CLIENT_SECRET,
    config.ZOHO_REFRESH_TOKEN,
  ].every(value => typeof value === 'string');
}

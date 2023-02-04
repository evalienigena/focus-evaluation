/** Represents a Contact */
class Contact {
  /**
   * Class constructor
   * @param {String} token
   * @param {String} name
   * @param {String} lastname
   */
  constructor(token, name, lastname) {
    // Create an instance of axios to interact with ZohoCRM with the new access token as authentication
    this.httpClient = require('axios').create({
      baseURL: 'https://www.zohoapis.com/crm/v3/Contacts',
      headers: { Authorization: 'Zoho-oauthtoken ' + token },
    });
    this.name = name;
    this.lastname = lastname;
  }

  /**
   * Registers the contact to Zoho CRM
   * @return {Promise<Object>}
   */
  async register() {
    const response = this.httpClient.post('', {
      data: [
        {
          First_Name: this.name,
          Last_Name: this.lastname,
        },
      ],
    });
    return response;
  }
}

module.exports = Contact;

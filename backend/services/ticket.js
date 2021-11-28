const axios = require('axios');
const getAllTickets = async() => {
    var OAuthToken = "ff1ed2f056d958d6a8d494baf7e17fc2ef5066c2c274bf82933a643480c041f7"
      var url = `https://zendeskcodingchallenge8775.zendesk.com/api/v2/tickets.json`;
  
      var authorization = "Bearer " + OAuthToken;
      console.log(url);
      console.log(authorization);
      const headers = {
        Authorization: authorization,
        'Content-Type': 'application/json'
      };
      try {
        const response = await axios.get(url, {headers: headers});
        return response.data.tickets;
      } catch(error) {
        console.log(error);
        return []
      }
  }

module.exports = {
    getAllTickets
}
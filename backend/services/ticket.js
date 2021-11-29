const axios = require('axios');
const getAllTickets = async(OAuthToken) => {
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

const getAllUserIds = (tickets) => {
  var userIds = new Set();
  for(var i = 0; i < tickets.length; i ++) {
    userIds.add(tickets[i].submitter_id);
    userIds.add(tickets[i].assignee_id);
    userIds.add(tickets[i].requester_id);
  }
  return userIds;
}

module.exports = {
    getAllTickets,
    getAllUserIds
}
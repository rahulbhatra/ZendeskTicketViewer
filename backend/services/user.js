const axios = require('axios');
const qs = require('qs');

const getTicketUserDetails = async (tickets) => {
    var userIds = new Set();
    for(var i = 0; i < tickets.length; i ++) {
      userIds.add(tickets[i].submitter_id);
      userIds.add(tickets[i].assignee_id);
      userIds.add(tickets[i].requester_id);
    }
  
    var OAuthToken = "ff1ed2f056d958d6a8d494baf7e17fc2ef5066c2c274bf82933a643480c041f7"
    var authorization = "Bearer " + OAuthToken;
    var url = `https://zendeskcodingchallenge8775.zendesk.com/api/v2/users/show_many`;
    const params = {
        ids: Array.from(userIds)
    }
    const headers = {
        Authorization: authorization,
        'Content-Type': 'application/json'
      };
  
    try {
      const response = await axios.get(url, {params: params, headers: headers,
        paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'repeat'})
        }
      });
      return response.data.users;
    } catch(error) {
      console.log(error);
      return [];
    }
}

const createUserIdUserMap = (users) => {
  var userIdUserMap = {};
  for (var i = 0; i < users.length; i++) {
    var userId = users[i].id;
    userIdUserMap[userId] = users[i];
  }
  return userIdUserMap;
}

const insertUserDetailsInTickets = (userIdUserMap, tickets) => {
  for(var i = 0; i < tickets.length; i++) {
    const assigneeId = tickets[i].assignee_id;
    tickets[i].assignee = userIdUserMap[assigneeId].name;
    const requesterId = tickets[i].requester_id;
    tickets[i].requester = userIdUserMap[requesterId].name;
    tickets[i].requester_updated = userIdUserMap[requesterId].updated_at;
  }
  return tickets;
}

module.exports = {
    getTicketUserDetails,
    createUserIdUserMap,
    insertUserDetailsInTickets
}
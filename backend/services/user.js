const axios = require('axios');
const qs = require('qs');

const getUserDetails = async (userIds, OAuthToken) => {
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
    getUserDetails,
    createUserIdUserMap,
    insertUserDetailsInTickets
}
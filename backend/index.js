const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const qs = require('qs');
const { response } = require('express');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// apiToken = "7oXxihqNqTEoXIXkGK2wcCzOj5gflc8HcgJWs1Ce";
// curl https://zendeskcodingchallenge8775.zendesk.com/api/v2/tickets.json?per_page=25 \
//   -H "Authorization: Bearer ff1ed2f056d958d6a8d494baf7e17fc2ef5066c2c274bf82933a643480c041f7"


app.post('/api/tickets', async function(req, res){
    

    try {
      var tickets = await getAllTickets();
      console.log("tickets got before all pre processing", tickets);
      const users = await getTicketUserDetails(tickets);
      console.log("after getting the users", users);
      const userIdUserMap = createUserIdUserMap(users);
      tickets = insertUserDetailsInTickets(userIdUserMap, tickets);
      console.log("tickets got after all pre processing", tickets);
      // tickets = await updateGroupDetails(tickets);
      // console.log("tickets got after all pre groups updation", tickets);

      res.status(200).json({
        rows: tickets
      });
    } catch(error) {
      console.log(error);
    }
    
 });

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

const updateGroupDetails = async (tickets) => {
  var groupIdDataMap = new Map();
  for(var i = 0; i < tickets.length; i ++) {
    
    const groupId = tickets[i].group_id;
    if(groupId in groupIdDataMap.keys()) {
      const group = groupIdDataMap.get(groupId);
      tickets[i].group = group.name;
    } else {
      const group = await getGroupDetails(groupId);
      tickets[i].group = group.name;
      groupIdDataMap.set(groupId, group);
    }
    
  }
  return tickets;

}

const getGroupDetails = async (groupId) => {
  const OAuthToken = "ff1ed2f056d958d6a8d494baf7e17fc2ef5066c2c274bf82933a643480c041f7"
  const authorization = "Bearer " + OAuthToken;
  const url = `https://zendeskcodingchallenge8775.zendesk.com/api/v2/groups/${groupId}.json`;
  
  const headers = {
      Authorization: authorization,
      'Content-Type': 'application/json'
    };

  try {
    const response = await axios.get(url, {headers: headers});
    return response.data.group;
  } catch(error) {
    console.log(error);
    return {};
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
    // const submitterId = tickets[i].submitter_id;
    // tickets[i].submitter = userIdUserMap[submitterId];
    const assigneeId = tickets[i].assignee_id;
    tickets[i].assignee = userIdUserMap[assigneeId].name;
    const requesterId = tickets[i].requester_id;
    tickets[i].requester = userIdUserMap[requesterId].name;
    tickets[i].requester_updated = userIdUserMap[requesterId].updated_at;
    // console.log(userIdUserMap);
    // console.log(requesterId, tickets[i].requester);
  }
  return tickets;
}

 app.listen(4000, async () => {
    console.log('server is running on port', 4000);
});

module.exports = app;
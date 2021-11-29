const { getAllTickets, getAllUserIds } = require('./services/ticket');
const { getUserDetails, createUserIdUserMap, insertUserDetailsInTickets } = require('./services/user');
const OAuthToken = "ff1ed2f056d958d6a8d494baf7e17fc2ef5066c2c274bf82933a643480c041f7";

test('test-zendesk-api/v2/tickets.json', async() => {
  var response = await getAllTickets(OAuthToken);
  expect(response.length).toBe(100);
});

test('test-get-user-details', async() => {
  userIds = [1267071613089]
  const users = await getUserDetails(userIds, OAuthToken);
  console.log("users", users);
  expect(users.length).toBe(1);
  expect(users[0].name).toBe('Rahul Sharma');

  var userIdUserMap = createUserIdUserMap(users);
  expect(userIdUserMap[1267071613089].name).toBe('Rahul Sharma');
});

test('test-get-user-details-without-userids', async() => {
  userIds = []
  const users = await getUserDetails(userIds, OAuthToken);
  console.log("users", users);
  expect(users.length).toBe(0);
});

test('inser-user-details-in-tickets', async () =>  {
  var tickets = await getAllTickets(OAuthToken);
      var userIds = getAllUserIds(tickets);
      const users = await getUserDetails(userIds, OAuthToken);
      const userIdUserMap = createUserIdUserMap(users);
      tickets = insertUserDetailsInTickets(userIdUserMap, tickets);
      expect(tickets[0].assignee).not.toBe(undefined);
})


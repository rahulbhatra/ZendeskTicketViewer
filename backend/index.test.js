const { getAllTickets, getAllUserIds } = require('./services/ticket');
const { getUserDetails, createUserIdUserMap, insertUserDetailsInTickets } = require('./services/user');

test('test-zendesk-api/v2/tickets.json', async() => {
  var response = await getAllTickets();
  expect(response.length).toBe(100);
});

test('test-get-user-details', async() => {
  userIds = [1267071613089]
  const users = await getUserDetails(userIds);
  console.log("users", users);
  expect(users.length).toBe(1);
  expect(users[0].name).toBe('Rahul Sharma');

  var userIdUserMap = createUserIdUserMap(users);
  expect(userIdUserMap[1267071613089].name).toBe('Rahul Sharma');
});


const { getAllTickets } = require('./ticket');

test('check-zendesk-api/v2/tickets.json', async() => {
  var response = await getAllTickets();
  expect(response.length).toBe(100);
});
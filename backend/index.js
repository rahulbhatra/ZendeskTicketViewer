const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const { getAllTickets } = require('./services/ticket');
const { getTicketUserDetails, createUserIdUserMap, insertUserDetailsInTickets } = require('./services/user');

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

      res.status(200).json({
        rows: tickets
      });
    } catch(error) {
      console.log(error);
    }
    
 });

 app.listen(4000, async () => {
    console.log('server is running on port', 4000);
});

module.exports = {
  app
};
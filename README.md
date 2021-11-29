# ZendeskTicketViewer

Inserting Tickets into the zendesk system:
run command:
curl https://{subdomain}.zendesk.com/api/v2/imports/tickets/create_many.json -v -u {email_address}:{password} -X POST -d @tickets.json -H "Content-Type: application/json"

example:
subdomain = zendeskcodingchallenge8775
email_address = rsharma11@hawk.iit.edu
password = ************

Getting OAuth Token:
1 Get the client Id:
    curl https://zendeskcodingchallenge8775.zendesk.com/api/v2/oauth/clients.json \
  -v -u rsharma11@hawk.iit.edu:{password}

2 copy the client id.
    clientId = 1260801818389

4 get Oauth token

curl https://{subdomain}.zendesk.com/api/v2/oauth/tokens.json \
-d '{"token": {"client_id": "50328", "scopes": ["read", "write"]}}' \
-H "Content-Type: application/json" \
-X POST -v -u {email_address}:{password}


Example:-
curl https://zendeskcodingchallenge8775.zendesk.com/api/v2/oauth/tokens.json \
-d '{"token": {"client_id": "1260801818389", "scopes": ["read", "write"]}}' \
-H "Content-Type: application/json" \
-X POST -v -u rsharma11@hawk.iit.edu:{password}

Frontend:
1. To start front end server which is react go to zendesk-ticket-viewer.
2. run command: npm install (it will install all the dependencies needed for the frontend)
3. run command: npm start (it will run frontend on localhost:3000)

Backend:
1. Go to backend folder
2. run command: npm install (it will install all the dependencies needed for the backend)
3. run command: npm start (it will run backend on localhost:4000)

Testing:
Frontend:
1. go to zendesk-ticker-viewer
2. run command: npm test

Backend:
1. go to backend folder
2. run command: npm test
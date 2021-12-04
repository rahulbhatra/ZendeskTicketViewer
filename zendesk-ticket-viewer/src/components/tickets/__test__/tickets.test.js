import { render } from "@testing-library/react";
import Tickets from "../tickets";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

test('test-ticket-fetch-api', async()=> {
    const response = await axios.post('http://localhost:4000/api/tickets');
    expect(response.status).toBe(200);
    // As there are 100 tickets inserted in the zendesk system
    expect(response.data.rows.length).toBe(100);
});

test('load-tickets', () => {
    render(
        <BrowserRouter>
            <Tickets />
        </BrowserRouter>
    )
});
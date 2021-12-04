import './App.css';
import Tickets from './components/tickets/tickets';
import TicketDetails from './components/ticket-details/ticket-details';
import Header from './components/app-bar/app-bar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Tickets />} />
          <Route exact path="/ticket-details" element={<TicketDetails />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

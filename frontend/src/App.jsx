import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Dashboard/>}
/>

<Route
path="/create"
element={<CreateTicket/>}
/>

<Route
path="/ticket/:id"
element={<TicketDetails/>}
/>

</Routes>

</BrowserRouter>

);

}

export default App;
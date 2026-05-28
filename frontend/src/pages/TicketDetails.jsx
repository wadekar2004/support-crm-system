import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/tickets/${id}`
    );
    setTicket(res.data);
    setStatus(res.data.status);
  };

  const updateStatus = async () => {
    await axios.put(
      `http://127.0.0.1:8000/api/tickets/${id}`,
      {},
      { params: { status } }
    );
    loadTicket();
  };

  const deleteTicket = async () => {
    await axios.delete(
      `http://127.0.0.1:8000/api/tickets/${id}`
    );
    navigate("/");
  };

  if (!ticket)
    return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="bg-white max-w-3xl mx-auto p-8 rounded-xl shadow">

        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Ticket Details</h1>

          <Link to="/">
            <button className="bg-gray-500 text-white px-3 py-1 rounded">
              Back
            </button>
          </Link>
        </div>

        <div className="space-y-2">
          <p><b>ID:</b> {ticket.ticket_id}</p>
          <p><b>Name:</b> {ticket.customer_name}</p>
          <p><b>Email:</b> {ticket.customer_email}</p>
          <p><b>Subject:</b> {ticket.subject}</p>
          <p><b>Description:</b> {ticket.description}</p>
        </div>

        <div className="mt-5 flex gap-3">

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <button
            onClick={updateStatus}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>

          <button
            onClick={deleteTicket}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default TicketDetails;
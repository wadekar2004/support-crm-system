import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/tickets?search=${search}&status=${status}`
      );
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  const deleteTicket = async (ticket_id) => {
    await axios.delete(`http://127.0.0.1:8000/api/tickets/${ticket_id}`);
    fetchTickets();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Support CRM Dashboard
        </h1>

        <Link to="/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Create Ticket
          </button>
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3 mb-5">

        <input
          className="border p-2 rounded w-1/2"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">

          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t.ticket_id} className="border-b">

                <td className="p-3 font-semibold">{t.ticket_id}</td>
                <td className="p-3">{t.customer_name}</td>
                <td className="p-3">{t.subject}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      t.status === "Open"
                        ? "bg-green-500"
                        : t.status === "In Progress"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">

                  <Link to={`/ticket/${t.ticket_id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteTicket(t.ticket_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Dashboard;
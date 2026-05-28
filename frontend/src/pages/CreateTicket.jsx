import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: ""
  });

  const submit = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/tickets", form);
      alert("Ticket Created Successfully");
      navigate("/");
    } catch (err) {
      alert("Error creating ticket");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h2 className="text-2xl font-bold mb-5">Create New Ticket</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Customer Name"
          onChange={(e) =>
            setForm({ ...form, customer_name: e.target.value })
          }
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, customer_email: e.target.value })
          }
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Subject"
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 mb-3 rounded"
          placeholder="Description"
          rows="5"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Ticket
        </button>

      </div>
    </div>
  );
}

export default CreateTicket;
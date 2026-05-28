import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://support-crm-system-production-9078.up.railway.app";

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

      await axios.post(`${API}/api/tickets`, form);

      alert("Ticket Created Successfully");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Error creating ticket");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Create New Ticket
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Customer Name"
          onChange={(e) =>
            setForm({ ...form, customer_name: e.target.value })
          }
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Customer Email"
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
          rows="5"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Submit Ticket
        </button>

      </div>
    </div>
  );
}

export default CreateTicket;
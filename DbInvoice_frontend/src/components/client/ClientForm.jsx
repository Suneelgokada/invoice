import React, { useState } from "react";
import { createClient } from "../services/clientService";

export default function ClientForm({ reload }) {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    joinDate: "",
    renewalDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // POST API call
      const response = await createClient(form);

      console.log("Create Client Response:", response);

      if (response.success) {

        alert("Client created successfully");

        reload(); // refresh client list

        setForm({
          name: "",
          phone: "",
          address: "",
          joinDate: "",
          renewalDate: ""
        });

      } else {
        alert(response.message);
      }

    } catch (error) {

      console.error("Create client error:", error);

      alert("Failed to create client");

    }

  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">

      <h2 className="text-lg font-semibold mb-4">
        Add Client
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-5 gap-4"
      >

        <input
          required
          placeholder="Client Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          required
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          required
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          required
          type="date"
          value={form.joinDate}
          onChange={(e) =>
            setForm({ ...form, joinDate: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          required
          type="date"
          value={form.renewalDate}
          onChange={(e) =>
            setForm({ ...form, renewalDate: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded col-span-5 md:col-span-1"
        >
          Add Client
        </button>

      </form>

    </div>
  );
}
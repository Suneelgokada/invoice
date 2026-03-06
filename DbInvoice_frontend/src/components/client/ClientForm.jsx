import React, { useState } from "react";
import { createClient } from "..//services/clientService"

export default function ClientForm({ reload }) {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    joinDate: "",
    endDate: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await createClient(form);

    if (res.success) {

      reload();

      setForm({
        name: "",
        phone: "",
        address: "",
        joinDate: "",
        endDate: ""
      });

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
          placeholder="Client Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={form.joinDate}
          onChange={(e) =>
            setForm({ ...form, joinDate: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded col-span-5 md:col-span-1"
        >
          Add Client
        </button>

      </form>

    </div>
  );
}
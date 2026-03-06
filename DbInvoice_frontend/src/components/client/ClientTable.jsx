import React from "react";
import { deleteClient } from "../services/clientService";
import {downloadClientExcel} from "../services/clientService"

export default function ClientTable({ clients, reload }) {

  const handleDelete = async (id) => {

    if (!window.confirm("Delete client?")) return;

    await deleteClient(id);

    reload();
  };

  return (

    <div className="bg-white shadow-lg rounded-xl p-6">

      <div className="flex justify-between mb-4">

        <h2 className="text-lg font-semibold">
          Clients List
        </h2>

        <button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>

      </div>

      <table className="w-full text-sm">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Address</th>
            <th className="p-2">Join Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Action</th>

          </tr>

        </thead>

        <tbody>

          {clients.map((c) => (

            <tr key={c._id} className="border-t">

              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2">{c.address}</td>
              <td className="p-2">{c.joinDate}</td>
              <td className="p-2">{c.endDate}</td>

              <td className="p-2">

                <button
                  onClick={() => handleDelete(c._id)}
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
  );
}
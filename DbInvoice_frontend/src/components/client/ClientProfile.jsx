import React, { useState, useEffect } from "react";
import { updateClient } from "../services/clientService";

export default function ClientProfile({ client, onClose, reload }) {

  const [form, setForm] = useState({
    projectName: "",
    workType: "",
    domainDetails: "",
    comment: "",
    referredBy: ""
  });

  // Load client data into form
  useEffect(() => {

    if (client) {

      setForm({
        projectName: client.projectName || "",
        workType: client.workType || "",
        domainDetails: client.domainDetails || "",
        comment: client.comment || "",
        referredBy: client.referredBy || ""
      });

    }

  }, [client]);



  // Handle input change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

  };



  // Save update
  const handleSave = async () => {

    try {

      const res = await updateClient(client._id, form);

      if (res && res.success) {

        alert("Client updated successfully");

        if (reload) reload();

        onClose();

      }

    } catch (error) {

      console.error(error);

      alert("Update failed");

    }

  };



  return (

    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

      <div className="flex min-h-full items-start sm:items-center justify-center p-3 sm:p-6">

        <div className="bg-white w-full max-w-md sm:max-w-xl lg:max-w-2xl rounded-xl shadow-xl flex flex-col max-h-[90vh]">

          {/* Header */}

          <div className="flex justify-between items-center p-4 border-b">

            <h2 className="text-lg sm:text-xl font-semibold">
              Client Profile
            </h2>

            <button
              onClick={onClose}
              className="text-red-500 font-semibold"
            >
              Close
            </button>

          </div>



          {/* Body */}

          <div className="overflow-y-auto p-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Client Name */}

              <div>
                <label className="text-sm">Client Name</label>

                <input
                  value={client?.name || ""}
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>



              {/* Phone */}

              <div>
                <label className="text-sm">Phone</label>

                <input
                  value={client?.phone || ""}
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>



              {/* Project Name */}

              <div>
                <label className="text-sm">Project Name</label>

                <input
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>



              {/* Work Type */}

              <div>
                <label className="text-sm">Type of Work</label>

                <input
                  name="workType"
                  value={form.workType}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>



              {/* Domain Details */}

              <div>
                <label className="text-sm">Domain Details</label>

                <input
                  name="domainDetails"
                  value={form.domainDetails}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>



              {/* Referred By */}

              <div>
                <label className="text-sm">Referred By</label>

                <input
                  name="referredBy"
                  value={form.referredBy}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>

            </div>



            {/* Comment */}

            <div className="mt-4">

              <label className="text-sm">Comments</label>

              <textarea
                rows="3"
                name="comment"
                value={form.comment}
                onChange={handleChange}
                className="w-full border rounded p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

            </div>

          </div>



          {/* Footer */}

          <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 border-t">

            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Save
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}
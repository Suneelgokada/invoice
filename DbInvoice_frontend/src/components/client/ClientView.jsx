import React from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  MessageSquare,
  Users
} from "lucide-react";

export default function ClientView({ client, onClose }) {

  return (

    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

      <div className="flex min-h-full items-start sm:items-center justify-center p-3 sm:p-6">

        <div className="bg-white w-full max-w-lg sm:max-w-2xl lg:max-w-4xl rounded-xl shadow-2xl flex flex-col max-h-[90vh]">

          {/* Header */}

          <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-indigo-50">

            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-indigo-700">
              <User size={20} />
              Client Profile
            </h2>

            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-500"
            >
              <X size={22} />
            </button>

          </div>

          {/* Scrollable Body */}

          <div className="overflow-y-auto p-4 sm:p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* Name */}

              <div className="flex items-start gap-3">
                <User className="text-indigo-600 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Client Name</p>
                  <p className="font-semibold text-gray-800">{client.name}</p>
                </div>
              </div>

              {/* Phone */}

              <div className="flex items-start gap-3">
                <Phone className="text-green-600 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="font-semibold text-gray-800">{client.phone}</p>
                </div>
              </div>

              {/* Address */}

              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Address</p>
                  <p className="font-semibold text-gray-800 break-words">
                    {client.address}
                  </p>
                </div>
              </div>

              {/* Join Date */}

              <div className="flex items-start gap-3">
                <Calendar className="text-blue-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Join Date</p>
                  <p className="font-semibold text-gray-800">
                    {client.joinDate
                      ? new Date(client.joinDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Renewal Date */}

              <div className="flex items-start gap-3">
                <Calendar className="text-purple-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Renewal Date</p>
                  <p className="font-semibold text-gray-800">
                    {client.renewalDate
                      ? new Date(client.renewalDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Project Name */}

              <div className="flex items-start gap-3">
                <Briefcase className="text-orange-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Project Name</p>
                  <p className="font-semibold text-gray-800">
                    {client.projectName || "Not Added"}
                  </p>
                </div>
              </div>

              {/* Work Type */}

              <div className="flex items-start gap-3">
                <Briefcase className="text-yellow-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Type of Work</p>
                  <p className="font-semibold text-gray-800">
                    {client.workType || "Not Added"}
                  </p>
                </div>
              </div>

              {/* Domain */}

              <div className="flex items-start gap-3">
                <Globe className="text-cyan-600 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Domain Details</p>
                  <p className="font-semibold text-gray-800 break-words">
                    {client.domainDetails || "Not Added"}
                  </p>
                </div>
              </div>

              {/* Referred */}

              <div className="flex items-start gap-3">
                <Users className="text-pink-600 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Referred By</p>
                  <p className="font-semibold text-gray-800">
                    {client.referredBy || "Not Added"}
                  </p>
                </div>
              </div>

            </div>

            {/* Comments */}

            <div className="mt-6 flex items-start gap-3">

              <MessageSquare className="text-gray-600 mt-1" />

              <div>
                <p className="text-gray-500 text-sm">Comments</p>
                <p className="font-semibold text-gray-800">
                  {client.comment || "No comments added"}
                </p>
              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="border-t p-4 flex justify-end">

            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}
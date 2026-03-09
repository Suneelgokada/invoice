import React, { useEffect, useState } from "react";
import ClientTable from "./ClientTable";
import ClientProfile from "./ClientProfile";
import ClientView from "./ClientView";
import { getClients } from "../services/clientService";

export default function ClientManager() {

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewClient, setViewClient] = useState(null);

  const loadClients = async () => {

    try {

      const data = await getClients();

      if (data.success) {
        setClients(data.data);
      }

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    loadClients();
  }, []);

  return (

    <div className="p-3 sm:p-6">

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Clients
      </h1>

      <ClientTable
        clients={clients || []}
        reload={loadClients}
        onEdit={(client) => setSelectedClient(client)}
        onView={(client) => setViewClient(client)}
      />

      {selectedClient && (
      <ClientProfile
  client={selectedClient}
  reload={loadClients}
  onClose={() => setSelectedClient(null)}
/>
      )}

      {viewClient && (
        <ClientView
          client={viewClient}
          onClose={() => setViewClient(null)}
        />
      )}

    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import ClientForm from "./ClientForm";
// import ClientTable from "./ClientTable";
// import { getClients } from "../services/clientService";

// export default function ClientManager() {

//   const [clients, setClients] = useState([]);

//   const loadClients = async () => {
//     const data = await getClients();

//     if (data.success) {
//       setClients(data.clients);
//     }
//   };

//   useEffect(() => {
//     loadClients();
//   }, []);

//   return (

//     <div className="p-6">

//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Client Management
//       </h1>

//       <ClientForm reload={loadClients} />

//       <ClientTable clients={clients} reload={loadClients} />

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import ClientTable from "./ClientTable";
import { getClients } from "../services/clientService";

export default function ClientManager() {

  const [clients, setClients] = useState([]);

  const loadClients = async () => {

    try {

      const data = await getClients();

      if (data.success) {
        setClients(data.data);
      }

    } catch (error) {
      console.error("Failed to load clients:", error);
    }

  };

  useEffect(() => {
    loadClients();
  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Clients
      </h1>

      <ClientTable clients={clients} reload={loadClients} />

    </div>

  );
}
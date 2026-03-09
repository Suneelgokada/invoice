import api from "../../api/axiosClient";


export const getClients = async () => {
 const res = await api.get("/api/clients/create");
 return res.data;
};

export const createClient = async (data) => {
 const res = await api.post("/api/clients/list", data);
 return res.data;
};

export const deleteClient = async (id) => {
 const res = await api.delete(`/api/clients/delete/${id}`);
 return res.data;
};

export const downloadClientExcel = (clients) => {

  const worksheet = XLSX.utils.json_to_sheet(clients);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

  XLSX.writeFile(workbook, "clients.xlsx");

};
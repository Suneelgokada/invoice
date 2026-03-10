import api from "../../api/axiosClient";
import * as XLSX from "xlsx";


// GET CLIENTS
export const getClients = async () => {

  const res = await api.get("/api/admin/list");

  return res.data;

};


// CREATE CLIENT
export const createClient = async (data) => {

  const res = await api.post("/api/admin/create", data);

  return res.data;

};

export const updateClient = async (id, data) => {

  const res = await api.put(`/api/admin/update/${id}`, data);

  return res.data;

};

// // DELETE CLIENT
// export const deleteClient = async (id) => {

//   const res = await api.delete(`/api/admin/delete/${id}`);

//   return res.data;

// };


export const downloadClientExcel = (clients) => {

  const formattedData = clients.map((c) => ({
    Name: c.name,
    Phone: c.phone,
    Address: c.address,
    JoinDate: c.joinDate 
      ? new Date(c.joinDate).toLocaleDateString()
      : "",
    RenewalDate: c.renewalDate 
      ? new Date(c.renewalDate).toLocaleDateString()
      : "",
    ProjectName: c.projectName || "",
    WorkType: c.workType || "",
    Domain: c.domain || "",
    ReferredBy: c.referredBy || "",
    Comment: c.comment || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

  XLSX.writeFile(workbook, "clients.xlsx");

};
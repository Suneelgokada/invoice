import api from "../../api/axiosClient";

export const getClients = async () => {
 const res = await api.get("/api/client/all");
 return res.data;
};

export const createClient = async (data) => {
 const res = await api.post("/api/client/create", data);
 return res.data;
};

export const deleteClient = async (id) => {
 const res = await api.delete(`/api/client/delete/${id}`);
 return res.data;
};

export const downloadClientExcel = async () => {

 const res = await api.get("/api/client/export",{
  responseType:"blob"
 });

 const url = window.URL.createObjectURL(new Blob([res.data]));

 const link = document.createElement("a");
 link.href = url;
 link.setAttribute("download","clients.xlsx");

 document.body.appendChild(link);
 link.click();
 link.remove();
};
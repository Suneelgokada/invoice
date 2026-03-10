import api from "../../api/axiosClient";

export const generateQuotationPDF = async (content) => {

  const res = await api.post(
    "/api/admin/generate-document",
    { content },
    { responseType: "blob" }
  );

  const url = window.URL.createObjectURL(new Blob([res.data]));

  const link = document.createElement("a");

  link.href = url;

  link.setAttribute("download", "quotation.pdf");

  document.body.appendChild(link);

  link.click();
};
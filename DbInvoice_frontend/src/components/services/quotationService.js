import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const generateQuotationPDF = async (content) => {

  const token = localStorage.getItem("authToken");
console.log("TOKEN:", token);

  const res = await axios.post(
    `${BASE_URL}/api/admin/generate-document`,
    { content:content},
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([res.data], { type: "application/pdf" })
  );

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotation.pdf";
  document.body.appendChild(link);
  link.click();
};
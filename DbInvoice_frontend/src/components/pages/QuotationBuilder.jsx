import React from "react";
import QuotationEditor from "../QuotationEditor";
import { generateQuotationPDF } from "../services/quotationService";

export default function QuotationBuilder() {

  const handleExport = async (content) => {

    await generateQuotationPDF(content);

  };

  return (

    <div className="p-6">

      <QuotationEditor onExport={handleExport} />

    </div>

  );
}
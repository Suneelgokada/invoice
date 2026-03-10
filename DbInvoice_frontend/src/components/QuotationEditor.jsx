import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuotationEditor({ onExport }) {

  const [content, setContent] = useState("");

  const handleExport = () => {
    onExport(content);
  };

  return (

    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-xl font-semibold mb-4">
        Quotation Editor
      </h2>

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="h-80 mb-6"
      />

      <button
        onClick={handleExport}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Export PDF
      </button>

    </div>
  );
}
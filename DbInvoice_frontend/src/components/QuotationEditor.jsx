import React, { useState } from "react";
import { Rnd } from "react-rnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuotationEditor({ onExport }) {
  const [pages, setPages] = useState([
    {
      id: 1,
      blocks: [{ id: 1, content: "<h2>Quotation</h2>", x: 70, y: 180, width: 650, height: 80 }]
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const addPage = () => {
    const newPage = { id: Date.now(), blocks: [] };
    setPages(prev => [...prev, newPage]);
    setCurrentPage(newPage.id);
  };

  const deletePage = (pageId) => {
    if (pages.length === 1) return;
    setPages(prev => prev.filter(p => p.id !== pageId));
  };

  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
      content: "<p>New Text...</p>",
      x: 70, width: 650, y: 280, height: 100
    };
    setPages(prev => prev.map(p => p.id === currentPage ? { ...p, blocks: [...p.blocks, newBlock] } : p));
  };

  // Common update function for Position, Size, and Content
  const updateBlock = (pageId, blockId, newData) => {
    setPages(prev => prev.map(p => p.id === pageId ? {
      ...p, blocks: p.blocks.map(b => b.id === blockId ? { ...b, ...newData } : b)
    } : p));
  };

  const handleExport = () => {
    const finalHTML = pages.map(page => {
      const blocksHTML = page.blocks.map(b => `
        <div style="position:absolute; left:${b.x}px; top:${b.y}px; width:${b.width}px; min-height:${b.height}px; word-wrap:break-word;">
          ${b.content}
        </div>
      `).join("");

      return `
        <div class="page-wrapper">
          <img src="http://localhost:5000/templates/letterhead.png" class="letterhead-bg" />
          <div class="content-layer">${blocksHTML}</div>
        </div>
      `;
    }).join("");
    onExport(finalHTML);
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-200 min-h-screen">
      <div className="flex gap-4 mb-6 sticky top-0 z-50 bg-white p-4 shadow-lg rounded">
        <button onClick={addBlock} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Block</button>
        <button onClick={addPage} className="bg-blue-600 text-white px-4 py-2 rounded">Add Page</button>
      </div>

      {pages.map((page, idx) => (
        <div key={page.id} className="mb-10 bg-white shadow-2xl relative" 
             style={{ width: "794px", height: "1123px" }}
             onClick={() => setCurrentPage(page.id)}>
          
          <img src="http://localhost:5000/templates/letterhead.png" className="absolute inset-0 w-full h-full pointer-events-none" />
          
          {page.blocks.map(block => (
            <Rnd
              key={block.id}
              size={{ width: block.width, height: block.height }}
              position={{ x: block.x, y: block.y }}
              bounds="parent"
              onDragStop={(e, d) => updateBlock(page.id, block.id, { x: d.x, y: d.y })}
              onResizeStop={(e, dir, ref, delta, pos) => {
                updateBlock(page.id, block.id, {
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  ...pos
                });
              }}
            >
              <div className="border border-transparent hover:border-blue-400 h-full">
                <ReactQuill theme="snow" value={block.content} 
                            onChange={(val) => updateBlock(page.id, block.id, { content: val })}
                            className="h-full" />
              </div>
            </Rnd>
          ))}
          <div className="absolute -left-20 top-0 text-gray-400 font-bold">PAGE {idx + 1}</div>
        </div>
      ))}
      <button onClick={handleExport} className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-xl">
        Export PDF
      </button>
    </div>
  );
}
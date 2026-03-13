import React, { useState } from "react";
import { Rnd } from "react-rnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CLOUDINARY_URL = "https://res.cloudinary.com/dp5ttq85f/image/upload/v1773418626/Designblocks-letterhead_dl9jgc.jpg";

export default function QuotationEditor({ onExport }) {
  const [pages, setPages] = useState([
    {
      id: Date.now(),
      blocks: [{ id: 1, content: "<h2>Quotation</h2>", x: 70, y: 180, width: 650, height: 80 }]
    }
  ]);
  const [currentPage, setCurrentPage] = useState(pages[0].id);

  // ADD PAGE
  const addPage = () => {
    const newPage = { id: Date.now(), blocks: [] };
    setPages(prev => [...prev, newPage]);
    setCurrentPage(newPage.id);
  };

  // DELETE PAGE (Nuvvu adigina Delete Logic)
  const deletePage = (pageId) => {
    if (pages.length === 1) {
      alert("At least one page is required!");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to delete this page?");
    if (confirmed) {
      const filtered = pages.filter(p => p.id !== pageId);
      setPages(filtered);
      setCurrentPage(filtered[0].id);
    }
  };

  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
      content: "<p>New Text...</p>",
      x: 70, width: 650, y: 280, height: 100
    };
    setPages(prev => prev.map(p => p.id === currentPage ? { ...p, blocks: [...p.blocks, newBlock] } : p));
  };

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
          <img src="${CLOUDINARY_URL}" class="letterhead-bg" />
          <div class="content-layer">${blocksHTML}</div>
        </div>
      `;
    }).join("");
    onExport(finalHTML);
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-10 bg-gray-100 min-h-screen font-sans">
      
      {/* RESPONSIVE TOOLBAR */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 sticky top-4 z-50 bg-white/80 backdrop-blur-md p-4 shadow-xl rounded-2xl border border-white">
        <button onClick={addBlock} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all">
          + Add Block
        </button>
        <button onClick={addPage} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all">
          + Add New Page
        </button>
        <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all">
          Export PDF
        </button>
      </div>

      {/* PAGE SCALING CONTAINER (Mobile/Tablet responsiveness kosam) */}
      <div className="w-full flex flex-col items-center overflow-x-hidden md:overflow-visible">
        {pages.map((page, idx) => (
          <div key={page.id} className="relative mb-16 flex flex-col items-center">
            
            {/* PAGE ACTIONS HEADER */}
            <div className="flex justify-between items-center w-full max-w-[794px] px-4 mb-3">
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest">
                PAGE {idx + 1}
              </span>
              <button 
                onClick={() => deletePage(page.id)}
                className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all border border-red-200"
              >
                Delete Page
              </button>
            </div>

            {/* A4 CANVAS WITH CSS SCALING */}
            <div className="canvas-container relative shadow-2xl transition-all duration-300"
                 style={{
                   width: "794px",
                   height: "1123px",
                   backgroundColor: "white",
                   transformOrigin: "top center",
                   // Mobile responsive scale logic
                   transform: window.innerWidth < 850 ? `scale(${ (window.innerWidth - 40) / 794 })` : 'scale(1)',
                   marginBottom: window.innerWidth < 850 ? `-${1123 * (1 - (window.innerWidth - 40) / 794)}px` : '0px'
                 }}
                 onClick={() => setCurrentPage(page.id)}>
              
              <img src={CLOUDINARY_URL} className="absolute inset-0 w-full h-full pointer-events-none select-none" alt="letterhead" />
              
              <div className={`absolute inset-0 border-4 transition-all pointer-events-none z-10 ${currentPage === page.id ? 'border-indigo-500/50' : 'border-transparent'}`}></div>

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
                  <div className="group border border-transparent hover:border-blue-400/50 h-full rounded transition-all">
                    <ReactQuill 
                        theme="snow" 
                        value={block.content} 
                        onChange={(val) => updateBlock(page.id, block.id, { content: val })}
                        className="h-full quill-professional-mode" 
                    />
                  </div>
                </Rnd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
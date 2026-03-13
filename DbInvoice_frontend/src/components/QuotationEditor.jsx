import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// External Cloudinary Letterhead URL
const CLOUDINARY_URL = "https://res.cloudinary.com/dp5ttq85f/image/upload/v1773418626/Designblocks-letterhead_dl9jgc.jpg";

export default function QuotationEditor({ onExport }) {
  const [pages, setPages] = useState([
    {
      id: Date.now(),
      blocks: [{ id: 1, content: "<h2>Quotation Title</h2>", x: 70, y: 180, width: 650, height: 80 }]
    }
  ]);
  const [currentPage, setCurrentPage] = useState(pages[0].id);
  const [scale, setScale] = useState(1);

  // 1. Dynamic Scaling Logic for All Devices
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 850) {
        // Mobile & Tablet: Scale down to fit screen width
        setScale((width - 40) / 794);
      } else {
        // Desktop: Normal scale
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Page Management
  const addPage = () => {
    const newPage = { id: Date.now(), blocks: [] };
    setPages(prev => [...prev, newPage]);
    setCurrentPage(newPage.id);
  };

  const deletePage = (pageId) => {
    if (pages.length === 1) {
      alert("Professional documents need at least one page!");
      return;
    }
    if (window.confirm("Are you sure you want to delete this page?")) {
      const filtered = pages.filter(p => p.id !== pageId);
      setPages(filtered);
      setCurrentPage(filtered[0].id);
    }
  };

  // 3. Block Management
  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
      content: "<p>New Text Block...</p>",
      x: 70, width: 650, y: 280, height: 100
    };
    setPages(prev => prev.map(p => p.id === currentPage ? { ...p, blocks: [...p.blocks, newBlock] } : p));
  };

  const updateBlock = (pageId, blockId, newData) => {
    setPages(prev => prev.map(p => p.id === pageId ? {
      ...p, blocks: p.blocks.map(b => b.id === blockId ? { ...b, ...newData } : b)
    } : p));
  };

  // 4. Export Logic
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
    <div className="flex flex-col items-center p-2 md:p-10 bg-slate-100 min-h-screen font-sans selection:bg-indigo-100">
      
      {/* 5. TOOLBAR - Fixed Z-Index issue (z-40 so Sidebar z-999 will cover it) */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 sticky top-4 z-40 bg-white/70 backdrop-blur-xl p-3 md:p-4 shadow-2xl rounded-2xl border border-white/50 w-[92%] md:w-auto">
        <button onClick={addBlock} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-indigo-200 shadow-lg active:scale-95 transition-all">
          + Add Text
        </button>
        <button onClick={addPage} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-blue-200 shadow-lg active:scale-95 transition-all">
          + New Page
        </button>
        <button onClick={handleExport} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-emerald-200 shadow-lg active:scale-95 transition-all">
          Export PDF
        </button>
      </div>

      {/* 6. RESPONSIVE PAGE RENDERER */}
      <div className="w-full flex flex-col items-center">
        {pages.map((page, idx) => (
          <div key={page.id} className="flex flex-col items-center mb-10 md:mb-20">
            
            {/* Page Header with Responsive Width */}
            <div 
              className="flex justify-between items-center px-2 mb-3"
              style={{ width: scale === 1 ? "794px" : `${794 * scale}px` }}
            >
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                 <span className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                   Document Page {idx + 1}
                 </span>
              </div>
              <button 
                onClick={() => deletePage(page.id)}
                className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold transition-colors border border-transparent hover:border-red-100"
              >
                REMOVE PAGE
              </button>
            </div>

            {/* A4 CANVAS CONTAINER */}
            <div 
              className="relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] origin-top transition-all duration-500 ease-out rounded-sm overflow-hidden"
              style={{
                width: "794px",
                height: "1123px",
                backgroundColor: "white",
                transform: `scale(${scale})`,
                marginBottom: scale === 1 ? "0px" : `-${1123 * (1 - scale)}px`
              }}
              onClick={() => setCurrentPage(page.id)}
            >
              {/* Letterhead Background */}
              <img src={CLOUDINARY_URL} className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" alt="bg" />
              
              {/* Active Page Indicator Overlay */}
              <div className={`absolute inset-0 border-[6px] pointer-events-none z-50 transition-opacity duration-300 ${currentPage === page.id ? 'border-indigo-500/20 opacity-100' : 'border-transparent opacity-0'}`}></div>

              {/* Editable Blocks */}
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
                  dragHandleClassName="drag-handle"
                >
                  <div className="group h-full relative border border-transparent hover:border-indigo-400/40 transition-all rounded-md overflow-hidden bg-white/5 backdrop-blur-[1px]">
                    {/* Drag Handle Indicator */}
                    <div className="drag-handle absolute top-0 left-0 right-0 h-4 bg-indigo-500/0 group-hover:bg-indigo-500/10 cursor-move transition-colors z-[60]"></div>
                    
                    <ReactQuill 
                        theme="snow" 
                        value={block.content} 
                        onChange={(val) => updateBlock(page.id, block.id, { content: val })}
                        className="h-full quill-editor-polished" 
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
import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// --- 1. INDUSTRIAL TYPOGRAPHY REGISTRATION ---
const Size = ReactQuill.Quill.import('attributors/style/size');
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];
ReactQuill.Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ 'size': ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'] }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }], // Alignment (Left, Center, Right, Justify)
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ],
};

const CLOUDINARY_URL = "https://res.cloudinary.com/dp5ttq85f/image/upload/v1773465369/Design_Blocks_Lette_head_3__page-0001_tcbgu7.jpg";

export default function QuotationEditor({ onExport }) {
  const [pages, setPages] = useState([
    {
      id: Date.now(),
      blocks: [{ id: 1, type: "text", content: "<h2 style='font-size: 24px;'>Quotation Title</h2>", x: 70, y: 180, width: 650, height: 80 }]
    }
  ]);
  const [currentPage, setCurrentPage] = useState(pages[0].id);
  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 850) {
        setScale((width - 40) / 794);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addTextBlock = () => {
    const newBlock = {
      id: Date.now(),
      type: "text",
      content: "<p style='font-size: 14px;'>New Text Block...</p>",
      x: 70, y: 280, width: 400, height: 120 // Increased default size
    };
    setPages(prev => prev.map(p => p.id === currentPage ? { ...p, blocks: [...p.blocks, newBlock] } : p));
  };

  const addImageBlock = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 1000;
          const scaleVal = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleVal;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);
          const newImageBlock = {
            id: Date.now(),
            type: "image",
            content: compressedBase64,
            x: 100, y: 350, width: 250, height: 250
          };
          setPages(prev => prev.map(p => p.id === currentPage ? { ...p, blocks: [...p.blocks, newImageBlock] } : p));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteBlock = (pageId, blockId) => {
    setPages(prev => prev.map(p => p.id === pageId ? { ...p, blocks: p.blocks.filter(b => b.id !== blockId) } : p));
  };

  const updateBlock = (pageId, blockId, newData) => {
    setPages(prev => prev.map(p => p.id === pageId ? {
      ...p, blocks: p.blocks.map(b => b.id === blockId ? { ...b, ...newData } : b)
    } : p));
  };

  const addPage = () => {
    const newPage = { id: Date.now(), blocks: [] };
    setPages(prev => [...prev, newPage]);
    setCurrentPage(newPage.id);
  };

  const deletePage = (pageId) => {
    if (pages.length === 1) return alert("Min. 1 page required!");
    if (window.confirm("Delete this page?")) {
      const filtered = pages.filter(p => p.id !== pageId);
      setPages(filtered);
      setCurrentPage(filtered[0].id);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    const finalHTML = pages.map(page => {
      const blocksHTML = page.blocks.map(b => {
        const innerHTML = b.type === "image" 
          ? `<img src="${b.content}" style="width:100%; height:100%; object-fit:contain; display:block;" />` 
          : `<div style="font-family: sans-serif;">${b.content}</div>`;

        return `<div style="position:absolute; left:${b.x}px; top:${b.y}px; width:${b.width}px; height:${b.height}px; overflow:hidden; z-index:${b.type === 'image' ? 1 : 2};">${innerHTML}</div>`;
      }).join("");

      return `
        <div class="page-wrapper" style="position:relative; width:210mm; height:297mm; overflow:hidden; background:white; page-break-after:always;">
          <img src="${CLOUDINARY_URL}" style="position:absolute; width:100%; height:100%; top:0; left:0; z-index:0; object-fit:fill;" />
          <div style="position:relative; width:100%; height:100%; z-index:1;">${blocksHTML}</div>
        </div>
      `;
    }).join("");

    await onExport(finalHTML);
    setIsExporting(false);
  };

  return (
    <div className="flex flex-col items-center p-2 md:p-10 bg-slate-100 min-h-screen font-sans">
      
      {/* --- 2. ADVANCED CSS FIXES --- */}
      <style>{`
        /* 1. Alignment & Font Buttons Visible cheyadam */
        .ql-toolbar.ql-snow {
          border: none !important;
          background: #f8fafc !important;
          display: flex;
          flex-wrap: nowrap !important; /* Force single line */
          overflow-x: auto;
          min-width: 320px !important; /* Block entha chinnadaina toolbar peddaga untundi */
          padding: 8px !important;
          border-radius: 8px 8px 0 0;
          border-bottom: 1px solid #e2e8f0 !important;
        }

        /* 2. Dropdown Values (10px, 12px...) sariga kanipinchadaniki */
        .ql-snow .ql-picker.ql-size .ql-picker-label::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item::before {
          content: attr(data-value) !important;
        }

        .ql-snow .ql-picker-options {
          background-color: white !important;
          border: 1px solid #ddd !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          z-index: 1000 !important;
          position: fixed !important; /* Use fixed so it's never cut by canvas */
          max-height: 300px !important;
          overflow-y: auto !important;
        }

        /* 3. Quill container behavior */
        .ql-container.ql-snow {
          border: none !important;
          background: rgba(255,255,255,0.4);
          height: calc(100% - 42px) !important; /* Adjust for toolbar height */
        }

        /* 4. Scrollbar hide cheyadam for clean UI */
        .ql-toolbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* TOP ACTION BAR */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 sticky top-4 z-[200] bg-white/90 backdrop-blur-xl p-3 md:p-4 shadow-2xl rounded-2xl border border-white/50 w-[95%] md:w-auto">
        <button onClick={addTextBlock} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-200">+ Text</button>
        <button onClick={() => fileInputRef.current.click()} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-orange-200">+ Image</button>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={addImageBlock} />
        <button onClick={addPage} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-200">+ New Page</button>
        <button onClick={handleExport} disabled={isExporting} className={`${isExporting ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-200`}>
          {isExporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>

      <div className="w-full flex flex-col items-center">
        {pages.map((page, idx) => (
          <div key={page.id} className="flex flex-col items-center mb-10 md:mb-20">
            <div className="flex justify-between items-center mb-3 transition-all" style={{ width: scale === 1 ? "794px" : `${794 * scale}px` }}>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Page {idx + 1}</span>
              <button onClick={() => deletePage(page.id)} className="text-red-500 text-[10px] font-bold">REMOVE PAGE</button>
            </div>

            <div 
              className="relative shadow-2xl origin-top transition-all duration-300 bg-white"
              style={{ width: "794px", height: "1123px", transform: `scale(${scale})`, marginBottom: scale === 1 ? "0px" : `-${1123 * (1 - scale)}px` }}
              onClick={() => setCurrentPage(page.id)}
            >
              <img src={CLOUDINARY_URL} className="absolute inset-0 w-full h-full pointer-events-none z-0" alt="bg" />
              
              <div className={`absolute inset-0 border-4 pointer-events-none z-50 ${currentPage === page.id ? 'border-indigo-500/10' : 'border-transparent'}`}></div>

              {page.blocks.map(block => (
                <Rnd
                  key={block.id}
                  size={{ width: block.width, height: block.height }}
                  position={{ x: block.x, y: block.y }}
                  bounds="parent"
                  dragHandleClassName="drag-handle"
                  onDragStop={(e, d) => updateBlock(page.id, block.id, { x: d.x, y: d.y })}
                  onResizeStop={(e, dir, ref, d, pos) => updateBlock(page.id, block.id, { width: parseInt(ref.style.width), height: parseInt(ref.style.height), ...pos })}
                >
                  <div className="group h-full relative border border-transparent hover:border-indigo-400 rounded-sm bg-white/10 shadow-sm transition-all">
                    
                    {/* CONTEXTUAL TOOLBAR */}
                    <div className="absolute -top-10 left-0 flex items-center gap-1 bg-white shadow-xl border border-slate-200 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-[150]">
                      <div className="drag-handle p-1 hover:bg-slate-100 rounded cursor-move text-slate-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); deleteBlock(page.id, block.id); }} className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>

                    <div className="h-full w-full overflow-hidden">
                      {block.type === "image" ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50/20 backdrop-blur-[1px]">
                          <img src={block.content} className="max-w-full max-h-full object-contain pointer-events-none" alt="block" />
                        </div>
                      ) : (
                        <ReactQuill 
                          theme="snow" 
                          value={block.content} 
                          onChange={(val) => updateBlock(page.id, block.id, { content: val })}
                          modules={modules}
                          className="h-full proffessional-editor" 
                        />
                      )}
                    </div>
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
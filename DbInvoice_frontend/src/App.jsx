
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import AdminPanel from "./AdminPanel";
// import {
//     User,
//     Lock,
//     LogOut,
//     AlertTriangle,
//     CheckCircle,
//     X,
//     Loader,
// } from 'lucide-react';

// const BASE_URL = `https://invoice-dbinvoice-backend.onrender.com`;

// // --- Utility: Number to Words Converter ---
// const numberToWords = (num) => {
//     if (num === 0) return 'Zero';
//     const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const scales = ['', 'Thousand', 'Million'];

//     const convertChunk = (n) => {
//         if (n === 0) return '';
//         if (n < 10) return units[n];
//         if (n < 20) return teens[n - 10];
//         if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
//         return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertChunk(n % 100) : '');
//     };

//     let words = '';
//     let i = 0;
//     const roundedNum = parseFloat(num.toFixed(2));
//     const [intPart, fracPart] = roundedNum.toString().split('.');
//     let integer = parseInt(intPart);
//     const fractional = fracPart ? parseInt(fracPart) : 0;

//     while (integer > 0) {
//         const chunk = integer % 1000;
//         if (chunk !== 0) {
//             let chunkWords = convertChunk(chunk);
//             words = chunkWords + (scales[i] ? ' ' + scales[i] : '') + ' ' + words;
//         }
//         integer = Math.floor(integer / 1000);
//         i++;
//     }
//     words = words.trim();
//     if (fractional > 0) {
//         let fractionalWords = convertChunk(fractional);
//         words += (words ? ' and ' : '') + fractionalWords + ' Paisa';
//     }
//     return words.trim();
// };


// // --- Modal Component ---
// const Modal = ({ state, onClose, onConfirm }) => {
//     if (!state.isVisible) return null;

//     const isConfirm = state.type === 'CONFIRM';

//     return (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 font-sans hide-on-print">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
//                 <div className={`flex items-center p-4 ${isConfirm ? 'bg-red-500' : 'bg-indigo-600'} text-white`}>
//                     {isConfirm ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
//                     <h3 className="ml-3 text-lg font-semibold">
//                         {isConfirm ? 'Confirm Action' : 'Notification'}
//                     </h3>
//                     <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 <div className="p-6 text-gray-700">
//                     <p>{state.message}</p>
//                 </div>

//                 <div className={`p-4 border-t flex ${isConfirm ? 'justify-between' : 'justify-end'}`}>
//                     {isConfirm && (
//                         <button
//                             onClick={onClose}
//                             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//                         >
//                             Cancel
//                         </button>
//                     )}
//                     <button
//                         onClick={() => {
//                             if (isConfirm && onConfirm) onConfirm();
//                             onClose();
//                         }}
//                         className={`px-4 py-2 rounded-lg transition font-medium ${isConfirm ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
//                     >
//                         {isConfirm ? 'Confirm' : 'OK'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // --- Main Component ---
// function App() {

//     // ---------- AUTH STATES ----------
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [userRole, setUserRole] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [authLoading, setAuthLoading] = useState(false);

//     // ---------- MODAL ----------
//     const [modalState, setModalState] = useState({
//         isVisible: false,
//         message: '',
//         type: 'ALERT',
//         onConfirm: null,
//     });

//     const showModal = (msg, type = 'ALERT', callback = null) => {
//         setModalState({ isVisible: true, message: msg, type, onConfirm: callback });
//     };

//     const closeModal = () => {
//         setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
//     };

//     // ------ INVOICE STATES ------
//     const date = new Date();
//     const printRef = useRef(null);
//     const [quotation, setQuotation] = useState(true);
//     const [invoice, setInvoice] = useState(false);
//     const [sgst, setSGST] = useState(false);
//     const [cgst, setCGST] = useState(false);
//     const [taxableValue, setTaxableValue] = useState(0);
//     const [invoiceValue, setInvoiceValue] = useState(0);
//     const [SGST, setSGSTValue] = useState(0);
//     const [CGST, setCGSTValue] = useState(0);
//     const [searchNumber, setSearchNumber] = useState("");

//     // ⭐ NEW STATES FOR SEPARATE BUTTON LOADING
//     const [saveLoading, setSaveLoading] = useState(false);
//     const [deleteLoading, setDeleteLoading] = useState(false);

//     const [isEditing, setIsEditing] = useState(false);
//     const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);
//     const [isItemEditing, setIsItemEditing] = useState(false);
//     const [editingItemOriginal, setEditingItemOriginal] = useState(null);

//     const [billDetails, setBillDetails] = useState({
//         billTO: "",
//         customerAddress: "",
//         customerGSTIN: "",
//         quotationNumber: "",
//         associatedQuotationNumber: "",
//         documentDate: new Date().toISOString().split("T")[0],
//         items: [],
//     });

//     const [tableItems, setTableItems] = useState({
//         description: "",
//         quantity: "",
//         unitPrice: "",
//     });
//     // --- Generate Unique Number ---
//     const generateUniqueNumber = useCallback(async () => {
//         const token = localStorage.getItem('authToken');
//         if (!token) return;

//         try {
//             const url = quotation
//                 ? `${BASE_URL}/api/quotation/generate`
//                 : `${BASE_URL}/api/invoice/generate`;

//             const response = await fetch(url, {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json"
//                 }
//             });

//             const data = await response.json();

//             if (data.success) {
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
//                 }));
//             }
//         } catch (error) {
//             console.error("Number generation failed", error);
//         }
//     }, [quotation]);


//     // --- Item Handling ---
//     const handleAddItem = (e) => {
//         e.preventDefault();
//         setIsItemEditing(false);
//         setEditingItemOriginal(null);
//         setBillDetails({
//             ...billDetails,
//             items: [
//                 ...billDetails.items,
//                 {
//                     ...tableItems,
//                     quantity: Number(tableItems.quantity),
//                     unitPrice: Number(tableItems.unitPrice),
//                     id: Date.now()
//                 }
//             ],
//         });
//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//     };

//     const handleEditItem = (item) => {
//         setTableItems({
//             description: item.description,
//             quantity: item.quantity,
//             unitPrice: item.unitPrice
//         });
//         setIsItemEditing(true);
//         setEditingItemOriginal(item);
//     };

//     const handleUpdateItem = (e) => {
//         e.preventDefault();
//         if (!editingItemOriginal) return;

//         const index = billDetails.items.findIndex(item => item === editingItemOriginal);
//         if (index > -1) {
//             const updated = [...billDetails.items];
//             updated[index] = {
//                 ...updated[index],
//                 description: tableItems.description,
//                 quantity: Number(tableItems.quantity),
//                 unitPrice: Number(tableItems.unitPrice),
//             };

//             setBillDetails({ ...billDetails, items: updated });
//         }

//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//         setIsItemEditing(false);
//         setEditingItemOriginal(null);
//     };

//     const handleItem = (itemToDelete) => {
//         let removed = billDetails.items.filter(e => e !== itemToDelete);
//         setBillDetails({ ...billDetails, items: removed });
//     };


//     // --- SAVE or UPDATE handler ---
//     const handleSaveOrUpdate = () => {
//         if (isEditing) handleUpdate();
//         else handleSave();
//     };


//     // --- SAVE (Updated for new loader state saveLoading) ---
//     const handleSave = async () => {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//             showModal("Authentication missing.", "ALERT");
//             return;
//         }

//         try {
//             setSaveLoading(true);   // ⭐ ONLY Save button loads

//             const docKey = quotation ? "quotationNumber" : "invoiceNumber";
//             const valueKey = quotation ? "quotationValue" : "invoiceValue";

//             const safeDate =
//                 billDetails.documentDate || new Date().toISOString().split("T")[0];

//             const body = {
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst,
//                 cgst,
//                 taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 [valueKey]: invoiceValue,
//                 [docKey]: billDetails.quotationNumber,
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//                 documentDate: safeDate,
//             };

//             const url = quotation
//                 ? `${BASE_URL}/api/quotation/save`
//                 : `${BASE_URL}/api/invoice/save`;

//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(body)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 const savedNumber =
//                     data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//                 showModal(`${quotation ? "Quotation" : "Invoice"} saved → ${savedNumber}`);

//                 setIsEditing(true);
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: savedNumber,
//                     documentDate: safeDate
//                 }));
//             } else {
//                 showModal(`Save Error: ${data.error}`);
//             }
//         } catch (error) {
//             console.error(error);
//             showModal("Save failed.");
//         } finally {
//             setSaveLoading(false);  // ⭐ END Save loader
//         }
//     };



//     // --- UPDATE (Updated for saveLoading not global loading) ---
//     const handleUpdate = async () => {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//             showModal("Authentication missing.", "ALERT");
//             return;
//         }

//         try {
//             setSaveLoading(true);  // ⭐ Only Save/Update button loads

//             const documentNumber = billDetails.quotationNumber;
//             const docKey = invoice ? "invoiceNumber" : "quotationNumber";
//             const valueKey = invoice ? "invoiceValue" : "quotationValue";
//             const url = `${BASE_URL}/api/${invoice ? "invoice/update" : "quotation/update"}`;

//             const body = {
//                 [docKey]: documentNumber,
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst,
//                 cgst,
//                 taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 [valueKey]: invoiceValue,
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//                 documentDate: billDetails.documentDate,
//             };

//             const res = await fetch(url, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(body)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 showModal(`${invoice ? "Invoice" : "Quotation"} Updated Successfully`);
//             } else {
//                 showModal(`Update Error: ${data.error}`);
//             }
//         } catch (error) {
//             console.error(error);
//             showModal("Update failed.");
//         } finally {
//             setSaveLoading(false);  // ⭐ END update loader
//         }
//     };


//     // --- DELETE (Updated for deleteLoading) ---
//     const performActualDelete = async () => {
//         const docType = invoice ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;
//         const token = localStorage.getItem('authToken');

//         try {
//             setDeleteLoading(true);   // ⭐ Only Delete button loads

//             const url = `${BASE_URL}/api/${invoice ? "invoice/delete" : "quotation/delete"}/${documentNumber}`;

//             const response = await fetch(url, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//             });

//             const data = await response.json();

//             if (response.ok && data.success) {
//                 showModal(`${docType} #${documentNumber} deleted successfully!`);

//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: "",
//                     customerAddress: "",
//                     customerGSTIN: "",
//                     items: [],
//                     associatedQuotationNumber: "",
//                     documentDate: new Date().toISOString().split("T")[0],
//                 }));

//                 setSGST(false);
//                 setCGST(false);
//                 setIsEditing(false);
//                 generateUniqueNumber();
//             } else {
//                 showModal(`Delete Error: ${data.error}`);
//             }
//         } catch (err) {
//             console.error('Error deleting data:', err);
//             showModal('Delete failed.');
//         } finally {
//             setDeleteLoading(false);  // ⭐ END Delete loader
//         }
//     };

//     // ⭐ NEW FUNCTION: Load Quotation details specifically into Invoice Form
//     const loadQuotationForInvoice = async (docNumber) => {
//         if (!docNumber) {
//             showModal("Please enter a Quotation Ref number.", "ALERT");
//             return;
//         }

//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             showModal("Authentication token missing.", "ALERT");
//             return;
//         }

//         try {
//             setSaveLoading(true); // Temporary loading indicator for the action

//             const quoteURL = `${BASE_URL}/api/quotation/fetch/${docNumber}`;

//             const response = await fetch(quoteURL, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             const result = await response.json();

//             if (response.ok && result.quotation) {
//                 const q = result.quotation;

//                 // ⚠️ IMPORTANT: Get the current INVOICE NUMBER before overwriting other fields
//                 const currentInvoiceNumber = billDetails.quotationNumber;

//                 // Normalize items
//                 const normalizedItems = q.items.map(i => ({
//                     description: i.description,
//                     quantity: Number(i.quantity),
//                     unitPrice: Number(i.unitPrice),
//                     id: i._id || Date.now() + Math.random() // Ensure each item has a unique ID
//                 }));

//                 // Update form states with Quotation details
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: q.billTO || "",
//                     customerAddress: q.customerAddress || "",
//                     customerGSTIN: q.customerGSTIN || "",
//                     items: normalizedItems,
//                     // DO NOT overwrite the existing Invoice Number! Re-assign it.
//                     quotationNumber: currentInvoiceNumber,
//                     // Set the associated Quotation Number
//                     associatedQuotationNumber: q.quotationNumber,
//                     documentDate: (q.documentDate && q.documentDate.split("T")[0]) || new Date().toISOString().split("T")[0]
//                 }));

//                 // Update GST states based on Quotation
//                 setSGST(q.sgst || false);
//                 setCGST(q.cgst || false);
//                 setIsEditing(false); // Since we are creating a new invoice, set editing to false (for Save action)

//                 showModal(`Quotation #${docNumber} details successfully loaded into Invoice.`, "ALERT");

//             } else {
//                 showModal(`Quotation #${docNumber} not found.`, "ALERT");
//             }
//         } catch (error) {
//             console.error(error);
//             showModal("Error loading quotation for invoice.", "ALERT");
//         } finally {
//             setSaveLoading(false);
//         }
//     };
//     // ----------------- END loadQuotationForInvoice -----------------


//     // const handleDelete = () => {
//     //     const docType = invoice ? "Invoice" : "Quotation";
//     //     const documentNumber = billDetails.quotationNumber;

//     //     if (!documentNumber || !isEditing) {
//     //         showModal(`Cannot delete. No existing ${docType}.`);
//     //         return;
//     //     }

//     //     showModal(
//     //         `Are you sure you want to delete ${docType} #${documentNumber}?`,
//     //         "CONFIRM",
//     //         performActualDelete
//     //     );
//     // };
//     // ----------------- SEARCH -----------------
//     const handleSearch = async (docNumber) => {
//         if (!docNumber) docNumber = searchNumber;
//         if (!docNumber) {
//             showModal("Please enter a document number.", "ALERT");
//             return;
//         }

//         try {
//             const token = localStorage.getItem("authToken");
//             if (!token) {
//                 showModal("Authentication token missing.");
//                 return;
//             }

//             // Search Quotation First
//             const quoteRes = await fetch(
//                 `${BASE_URL}/api/quotation/fetch/${docNumber}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const quoteJson = await quoteRes.json();

//             if (quoteRes.ok && quoteJson.quotation) {
//                 const q = quoteJson.quotation;

//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: q.billTO,
//                     customerAddress: q.customerAddress,
//                     customerGSTIN: q.customerGSTIN,
//                     items: q.items || [],
//                     quotationNumber: q.quotationNumber,
//                     associatedQuotationNumber: "",
//                     documentDate: q.documentDate || new Date().toISOString().split("T")[0]
//                 }));

//                 setSGST(q.sgst);
//                 setCGST(q.cgst);

//                 setIsEditing(true);
//                 showModal(`Quotation #${docNumber} loaded successfully.`);
//                 return;
//             }

//             // If not quotation, search invoice
//             const invRes = await fetch(
//                 `${BASE_URL}/api/invoice/fetch/${docNumber}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const invJson = await invRes.json();

//             if (invRes.ok && invJson.invoice) {
//                 const inv = invJson.invoice;

//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: inv.billTO,
//                     customerAddress: inv.customerAddress,
//                     customerGSTIN: inv.customerGSTIN,
//                     quotationNumber: inv.invoiceNumber,
//                     items: inv.items || [],
//                     documentDate: inv.documentDate || new Date().toISOString().split("T")[0],
//                     associatedQuotationNumber: inv.originalQuotationNumber || "",
//                 }));

//                 setSGST(inv.sgst);
//                 setCGST(inv.cgst);

//                 setIsEditing(true);
//                 showModal(`Invoice #${docNumber} loaded successfully.`);
//                 return;
//             }

//             // Not found
//             showModal("Document not found.");
//             setIsEditing(false);

//         } catch (err) {
//             console.error(err);
//             showModal("Search failed.");
//         }
//     };


//     // ---------------- AUTH HANDLERS ----------------
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setAuthLoading(true);

//         try {
//             const res = await fetch(`${BASE_URL}/api/admin/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password })
//             });

//             const data = await res.json();

//             if (data.success) {
//                 localStorage.setItem("authToken", data.token);
//                 localStorage.setItem("userRole", data.role);
//                 setIsAuthenticated(true);
//                 setUserRole(data.role);
//             } else {
//                 showModal(data.error || "Invalid credentials");
//             }
//         } catch (err) {
//             console.error(err);
//             showModal("Login failed.");
//         } finally {
//             setAuthLoading(false);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userRole");
//         setIsAuthenticated(false);
//         setUsername("");
//         setPassword("");
//     };


//     // ---------------- EFFECTS ----------------
//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         const role = localStorage.getItem("userRole");
//         if (token) {
//             setIsAuthenticated(true);
//             setUserRole(role || "user");
//         }
//     }, []);

//     useEffect(() => {
//         if (isAuthenticated && userRole === "user") {
//             const newTax = billDetails.items.reduce((acc, it) =>
//                 acc + (Number(it.quantity) * Number(it.unitPrice)), 0
//             );

//             const gst = 0.09;
//             const sgstAmt = sgst ? newTax * gst : 0;
//             const cgstAmt = cgst ? newTax * gst : 0;

//             setTaxableValue(newTax);
//             setSGSTValue(sgstAmt.toFixed(2));
//             setCGSTValue(cgstAmt.toFixed(2));
//             setInvoiceValue(newTax + sgstAmt + cgstAmt);
//         }
//     }, [billDetails.items, sgst, cgst, isAuthenticated, userRole]);


//     useEffect(() => {
//         if (isAuthenticated && userRole === "user") {
//             setBillDetails(prev => ({
//                 ...prev,
//                 billTO: "",
//                 customerAddress: "",
//                 customerGSTIN: "",
//                 items: [],
//                 associatedQuotationNumber: "",
//                 documentDate: new Date().toISOString().split("T")[0],
//             }));

//             setSGST(false);
//             setCGST(false);
//             setTaxableValue(0);
//             setInvoiceValue(0);
//             setOriginalQuotationNumber(null);
//             setSearchNumber("");
//             setIsEditing(false);

//             generateUniqueNumber();
//         }
//     }, [invoice, quotation, isAuthenticated, userRole, generateUniqueNumber]);


//     // ----------------- LOGIN SCREEN -----------------
//     if (!isAuthenticated) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 font-sans">
//                 <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
//                 <script src="https://cdn.tailwindcss.com"></script>

//                 <div className="w-full max-w-md">
//                     {/* Main Card */}
//                     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                         {/* Header Section with Logo */}
//                         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center">
//                             <div className="flex justify-center mb-4">
//                                 <div className="bg-white p-4 rounded-xl shadow-lg">
//                                     <img
//                                         src="https://designblocks.in/img/DB.png"
//                                         alt="Design Blocks Logo"
//                                         className="w-20 h-20 object-contain"
//                                     />
//                                 </div>
//                             </div>

//                             <h1 className="text-3xl font-bold text-white mb-2">Design Blocks</h1>
//                             <p className="text-blue-100 text-sm">Welcome back! Please sign in to continue</p>
//                         </div>

//                         {/* Form Section */}
//                         <div className="px-8 py-10">
//                             <div className="space-y-6">
//                                 {/* Username Input */}
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Username
//                                     </label>
//                                     <div className="relative">
//                                         <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                                             <User className="text-gray-400" size={20} />
//                                         </div>
//                                         <input
//                                             type="text"
//                                             required
//                                             value={username}
//                                             onChange={(e) => setUsername(e.target.value)}
//                                             className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
//                                             placeholder="Enter your username"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Password Input */}
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Password
//                                     </label>
//                                     <div className="relative">
//                                         <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                                             <Lock className="text-gray-400" size={20} />
//                                         </div>
//                                         <input
//                                             type="password"
//                                             required
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
//                                             placeholder="Enter your password"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Remember Me */}
//                                 <div className="flex items-center justify-between text-sm">
//                                     <label className="flex items-center gap-2 cursor-pointer group">
//                                         <input
//                                             type="checkbox"
//                                             className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
//                                         />
//                                         <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
//                                     </label>
//                                 </div>

//                                 {/* Submit Button */}
//                                 <button
//                                     onClick={handleLogin}
//                                     disabled={authLoading}
//                                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
//                                 >
//                                     {authLoading ? (
//                                         <>
//                                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                                             <span>Signing in...</span>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Lock size={18} />
//                                             <span>Sign In</span>
//                                         </>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Security Badge */}
//                     <div className="mt-6 text-center">
//                         <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
//                             <Lock size={14} />
//                             Secured by 256-bit encryption
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // ----------------- ADMIN PANEL -----------------
//     if (userRole === "admin") {
//         return (
//             <div className="min-h-screen w-full">
//                 <script src="https://cdn.tailwindcss.com"></script>
//                 <AdminPanel onLogout={handleLogout} />
//             </div>
//         );
//     }
//     // ---------------- EMPLOYEE UI (INVOICE GENERATOR) ----------------
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
//             <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />

//             <script src="https://cdn.tailwindcss.com"></script>

//             <style>
//                 {`
//                     @media print {
//                         .hide-on-print { display: none !important; }
//                         .printable-content {
//                             width: 100% !important;
//                             margin: 0 !important;
//                             box-shadow: none !important;
//                             border: none !important;
//                             font-size: 10pt;
//                         }
//                         .w-\\[60rem\\] {
//                             width: 100% !important;
//                         }
//                     }
//                 `}
//             </style>

//             <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 w-full relative">

//                 {/* Logout */}
//                 <div className="absolute top-5 right-5 hide-on-print">
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow-md"
//                     >
//                         <LogOut size={18} /> Logout
//                     </button>
//                 </div>

//                 {/* INVOICE UI */}
//                 <div className="w-full flex items-center justify-center hide-on-print">
//                     <div className="font-sans w-full lg:w-[50rem]">

//                         <div className="pb-5 text-3xl">
//                             <p className="font-bold text-blue-500">
//                                 Design <span className="text-green-400">Blocks</span>
//                             </p>
//                             <p className="text-gray-500 text-sm">Employee Billing Portal</p>
//                         </div>

//                         {/* Search */}
//                         <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//                             <p className="pb-3 text-xl font-semibold uppercase text-purple-600">Search</p>

//                             <div className="flex flex-col sm:flex-row gap-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Invoice/Quotation Number"
//                                     className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full"
//                                     value={searchNumber}
//                                     onChange={(e) => setSearchNumber(e.target.value)}
//                                 />
//                                 <button
//                                     onClick={() => handleSearch(searchNumber)}
//                                     className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md shadow-md"
//                                 >
//                                     Search
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Mode Switch */}
//                         <div className="flex items-center justify-start gap-5 mb-5">
//                             <div
//                                 className={`cursor-pointer px-4 py-1 font-semibold border-2 border-green-400 rounded-lg 
//                                 ${quotation ? "bg-green-400 text-green-900 shadow-md" : "text-gray-700"}`}
//                                 onClick={() => { setQuotation(true); setInvoice(false); }}
//                             >
//                                 Quotation
//                             </div>

//                             <div
//                                 className={`cursor-pointer px-4 py-1 font-semibold border-2 border-green-400 rounded-lg 
//                                 ${invoice ? "bg-green-400 text-green-900 shadow-md" : "text-gray-700"}`}
//                                 onClick={() => { setQuotation(false); setInvoice(true); }}
//                             >
//                                 Invoice
//                             </div>
//                         </div>

//                         {/* Document Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 1. {invoice ? "Invoice" : "Quotation"} Details
//                             </p>

//                             <div className="flex flex-wrap gap-3">
//                                 <h1 className="font-medium">Number</h1>
//                                 <input
//                                     type="text"
//                                     value={billDetails.quotationNumber}
//                                     readOnly
//                                     className="outline-none rounded px-2 py-1 border border-blue-500 bg-gray-100"
//                                 />

//                                 {/* Date */}
//                                 <div className="flex items-center gap-3">
//                                     <h1 className="font-medium">Date</h1>
//                                     <input
//                                         type="date"
//                                         value={billDetails.documentDate}
//                                         onChange={(e) =>
//                                             setBillDetails({ ...billDetails, documentDate: e.target.value })
//                                         }
//                                         className="outline-none rounded px-2 py-1 border border-blue-500"
//                                     />
//                                 </div>



//                                 {invoice && (
//                                     <div className="flex items-center gap-3">
//                                         {/* ⭐ FIX: Use flex-shrink and responsive text size for small screens (sm: text-sm) 
//             We apply text-xs (extra small) and flex-shrink-0 to prevent label overflow 
//             while keeping the main input flexible.
//         */}
//                                         <h1 className="font-medium text-xs sm:text-base whitespace-nowrap flex-shrink-0">
//                                             Quotation Ref:
//                                         </h1>

//                                         <div className="flex border border-blue-500 rounded-lg shadow-md w-full"> {/* Added w-full for better layout */}
//                                             <input
//                                                 type="text"
//                                                 value={billDetails.associatedQuotationNumber}
//                                                 placeholder="Enter Q-No"
//                                                 onChange={(e) =>
//                                                     setBillDetails({
//                                                         ...billDetails,
//                                                         associatedQuotationNumber: e.target.value
//                                                     })
//                                                 }
//                                                 // ⭐ UI FIX: Decreased padding to fit better on small screens
//                                                 className="outline-none rounded-l-lg px-2 py-1 text-sm w-full min-w-0"
//                                             />
//                                             <button
//                                                 onClick={() => loadQuotationForInvoice(billDetails.associatedQuotationNumber)}
//                                                 disabled={saveLoading}
//                                                 // ⭐ UI FIX: Ensure button is compact
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-r-lg hover:bg-blue-600 disabled:opacity-50 text-sm flex-shrink-0"
//                                             >
//                                                 Load
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}


//                             </div>
//                         </div>

//                         {/* Recipient Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">2. Recipient Details</p>

//                             <div className="flex flex-wrap gap-5">
//                                 <div className="flex flex-col gap-2">
//                                     <h1 className="font-medium">Bill TO</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter name"
//                                         value={billDetails.billTO}
//                                         onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })}
//                                         className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
//                                     />
//                                 </div>

//                                 <div className="flex flex-col gap-2">
//                                     <h1 className="font-medium">Address</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter address"
//                                         value={billDetails.customerAddress}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })}
//                                         className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
//                                     />
//                                 </div>

//                                 <div className="flex flex-col gap-2">
//                                     <h1 className="font-medium">Customer GSTIN</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter GSTIN"
//                                         value={billDetails.customerGSTIN}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })}
//                                         className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Items */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                             <form
//                                 className="flex flex-col"
//                                 onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}
//                             >
//                                 <div className="flex justify-between pb-3">
//                                     <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>

//                                     <div className="flex gap-3">
//                                         {isItemEditing && (
//                                             <button
//                                                 type="button"
//                                                 onClick={() => {
//                                                     setIsItemEditing(false);
//                                                     setEditingItemOriginal(null);
//                                                     setTableItems({ description: "", quantity: "", unitPrice: "" });
//                                                 }}
//                                                 className="bg-yellow-500 px-3 py-2 rounded text-white shadow-md"
//                                             >
//                                                 Cancel Edit
//                                             </button>
//                                         )}

//                                         <button
//                                             type="submit"
//                                             className={`px-3 py-2 rounded text-white shadow-md ${isItemEditing
//                                                     ? "bg-orange-500"
//                                                     : "bg-green-500"
//                                                 }`}
//                                         >
//                                             {isItemEditing ? "Update Item" : "Add"}
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-wrap gap-5">
//                                     <div className="flex flex-col gap-2">
//                                         <h1 className="font-medium">Description</h1>
//                                         <input
//                                             type="text"
//                                             required
//                                             value={tableItems.description}
//                                             onChange={(e) =>
//                                                 setTableItems({ ...tableItems, description: e.target.value })
//                                             }
//                                             className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
//                                             placeholder="Enter Description"
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-2">
//                                         <h1 className="font-medium">Quantity</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.quantity}
//                                             onChange={(e) =>
//                                                 setTableItems({ ...tableItems, quantity: e.target.value })
//                                             }
//                                             className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
//                                             placeholder="Enter Quantity"
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-2">
//                                         <h1 className="font-medium">Unit Price</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.unitPrice}
//                                             onChange={(e) =>
//                                                 setTableItems({ ...tableItems, unitPrice: e.target.value })
//                                             }
//                                             className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
//                                             placeholder="Enter Unit Price"
//                                         />
//                                     </div>
//                                 </div>
//                             </form>

//                             {/* ITEMS TABLE LIST */}
//                             {billDetails.items.length > 0 && (
//                                 <div className="overflow-x-scroll w-full py-5">
//                                     <div className="w-full min-w-[50rem]">
//                                         <table className="w-full">
//                                             <tbody>
//                                                 <tr className="bg-gray-200 font-bold">
//                                                     <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price (Rs.)</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price (Rs.)</td>
//                                                     <td className="px-3 w-[5%] text-center">Action</td>
//                                                 </tr>

//                                                 {billDetails.items.map((item, index) => (
//                                                     <tr
//                                                         key={item.id}
//                                                         className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition"
//                                                         onClick={() => handleEditItem(item)}
//                                                     >
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
//                                                         <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">
//                                                             {Number(item.unitPrice).toFixed(2)}
//                                                         </td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">
//                                                             {(item.quantity * item.unitPrice).toFixed(2)}
//                                                         </td>
//                                                         <td className="px-3">
//                                                             <p
//                                                                 className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs hover:bg-red-600"
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     handleItem(item);
//                                                                 }}
//                                                             >
//                                                                 Delete
//                                                             </p>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* GST */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>

//                             <div className="flex gap-5 mt-3">
//                                 <label
//                                     onClick={() => setSGST(!sgst)}
//                                     className={`${sgst ? "bg-red-500" : "bg-green-500"} text-white px-5 py-2 rounded-lg shadow-md cursor-pointer`}
//                                 >
//                                     SGST {sgst ? "ON" : "OFF"}
//                                 </label>

//                                 <label
//                                     onClick={() => setCGST(!cgst)}
//                                     className={`${cgst ? "bg-red-500" : "bg-green-500"} text-white px-5 py-2 rounded-lg shadow-md cursor-pointer`}
//                                 >
//                                     CGST {cgst ? "ON" : "OFF"}
//                                 </label>
//                             </div>
//                         </div>

//                         {/* ACTION BUTTONS */}
//                         <div className="flex gap-3">
//                             {/* SAVE / UPDATE BUTTON */}
//                             <button
//                                 onClick={handleSaveOrUpdate}
//                                 disabled={saveLoading || billDetails.items.length === 0}
//                                 className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50"
//                             >
//                                 {saveLoading ? (
//                                     <Loader size={20} className="animate-spin" />
//                                 ) : isEditing ? (
//                                     "Update"
//                                 ) : (
//                                     "Save"
//                                 )}
//                             </button>

//                             {/* DELETE BUTTON */}
//                             {/* {isEditing && (
//                                 <button
//                                     onClick={handleDelete}
//                                     disabled={deleteLoading}
//                                     className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 disabled:opacity-50"
//                                 >
//                                     {deleteLoading ? (
//                                         <Loader size={20} className="animate-spin" />
//                                     ) : (
//                                         "Delete"
//                                     )}
//                                 </button>
//                             )} */}
//                         </div>
//                     </div>
//                 </div>

//                 {/* PRINT BUTTON */}
//                 <button
//                     onClick={() => window.print()}
//                     className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 hide-on-print"
//                 >
//                     Print Receipt
//                 </button>

//                 {/* PRINT TEMPLATE */}
//                 <div className="w-full bg-white flex items-center justify-center">
//                     <div className="w-full xl:w-[60rem]">
//                         <div ref={printRef} className="flex flex-col w-[60rem] bg-white text-black printable-content">

//                             {/* HEADER */}
//                             <div className="flex flex-row h-[15rem]">
//                                 <div className="h-full w-[20rem] border border-black">
//                                     <div className="flex items-center justify-center h-[30%]">
//                                         <p className="text-center font-bold text-2xl">
//                                             {invoice ? "Invoice" : "Quotation"}
//                                         </p>
//                                     </div>

//                                     <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                                         <p className="font-semibold text-lg">Bill to:</p>

//                                         {billDetails.customerGSTIN && (
//                                             <p>
//                                                 <span className="font-semibold">GSTIN: </span>
//                                                 {billDetails.customerGSTIN}
//                                             </p>
//                                         )}

//                                         <p>{billDetails.billTO}</p>
//                                         <p>{billDetails.customerAddress}</p>

//                                         {invoice && billDetails.associatedQuotationNumber && (
//                                             <p className="mt-2 text-xs">
//                                                 Quotation Ref:{" "}
//                                                 <span className="font-semibold">{billDetails.associatedQuotationNumber}</span>
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* RIGHT HEADER */}
//                                 <div className="h-full w-[40rem] border border-black flex flex-col justify-between">
//                                     <div className="p-5 flex items-center justify-between">
//                                         <div className="w-[70%] text-sm">
//                                             <p className="font-semibold text-xl">
//                                                 GSTIN:{" "}
//                                                 <span className="font-medium text-base">37AKOPY6766H1Z4</span>
//                                             </p>
//                                             <p className="font-medium">DESIGN BLOCKS</p>

//                                             <p className="font-semibold text-lg pt-2">Address:</p>
//                                             <p>
//                                                 Flat No 406, 5th Floor, Botcha Square, Madhavadhara,
//                                                 VISAKHAPATNAM–530007
//                                             </p>
//                                         </div>

//                                         <div className="w-[100px] h-[100px] flex items-center justify-center">
//                                             <img
//                                                 src="https://designblocks.in/img/DB.png"
//                                                 alt="DB Logo"
//                                                 onError={(e) => {
//                                                     e.target.src = "https://placehold.co/100x100?text=DB";
//                                                 }}
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* PRINT DATE */}
//                                     <div className="flex flex-col px-5 mb-3">
//                                         <label className="font-semibold">Document Date</label>
//                                         <input
//                                             type="date"
//                                             value={billDetails.documentDate}
//                                             onChange={(e) =>
//                                                 setBillDetails({
//                                                     ...billDetails,
//                                                     documentDate: e.target.value,
//                                                 })
//                                             }
//                                             className="border px-2 py-1 rounded"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* ITEMS TABLE */}
//                             <table className="w-[60rem] text-sm table-fixed">
//                                 <thead>
//                                     <tr className="h-10 bg-gray-100 font-bold">
//                                         <td className="border border-black text-center w-[5%]">#</td>
//                                         <td className="border border-black text-center w-[45%]">Description</td>
//                                         <td className="border border-black text-center w-[10%]">Qty</td>
//                                         <td className="border border-black text-center w-[20%]">Unit Price</td>
//                                         <td className="border border-black text-center w-[20%]">Total</td>
//                                     </tr>
//                                 </thead>

//                                 <tbody className="border border-black">
//                                     {billDetails.items.length > 0 ? (
//                                         billDetails.items.map((item, key) => (
//                                             <tr key={item.id} className="h-10">
//                                                 <td className="text-center border border-black">{key + 1}</td>
//                                                 <td className="px-2 border border-black">{item.description}</td>
//                                                 <td className="px-2 border border-black text-center">{item.quantity}</td>
//                                                 <td className="px-2 border border-black text-right">
//                                                     {Number(item.unitPrice).toFixed(2)}
//                                                 </td>
//                                                 <td className="px-2 border border-black text-right">
//                                                     {(item.quantity * item.unitPrice).toFixed(2)}
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr className="h-20">
//                                             <td
//                                                 colSpan={5}
//                                                 className="text-center text-gray-500 border border-black"
//                                             >
//                                                 No items added.
//                                             </td>
//                                         </tr>
//                                     )}

//                                     {/* TAXABLE VALUE */}
//                                     <tr className="border border-black h-10 bg-yellow-50">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-right font-semibold">Taxable Value</td>
//                                         <td className="px-2 text-right">{taxableValue.toFixed(2)}</td>
//                                     </tr>

//                                     {/* SGST */}
//                                     {sgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3}></td>
//                                             <td className="px-2 text-right font-semibold">SGST @9%</td>
//                                             <td className="px-2 text-right">{SGST}</td>
//                                         </tr>
//                                     )}

//                                     {/* CGST */}
//                                     {cgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3}></td>
//                                             <td className="px-2 text-right font-semibold">CGST @9%</td>
//                                             <td className="px-2 text-right">{CGST}</td>
//                                         </tr>
//                                     )}

//                                     {/* GRAND TOTAL */}
//                                     <tr className="border border-black h-10 bg-blue-100">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-right font-bold">
//                                             {invoice ? "Invoice Value" : "Quotation Value"}
//                                         </td>
//                                         <td className="px-2 text-right font-bold">
//                                             {invoiceValue.toFixed(2)}
//                                         </td>
//                                     </tr>

//                                     {/* IN WORDS */}
//                                     <tr className="border border-black h-10">
//                                         <td colSpan={5} className="px-2">
//                                             <span className="font-semibold">In Words: </span>
//                                             {numberToWords(invoiceValue)} Only.
//                                         </td>
//                                     </tr>

//                                     {/* FOOTER */}
//                                     <tr>
//                                         <td colSpan={5} className="p-2 border-t border-black text-xs">
//                                             <div className="flex justify-between">
//                                                 {/* BANK DETAILS */}
//                                                 <div className="w-1/2">
//                                                     <p className="font-semibold text-sm">BANK DETAILS:</p>
//                                                     <p>
//                                                         UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM
//                                                     </p>
//                                                     <p>
//                                                         <span className="font-semibold">A/C: </span>
//                                                         753601010050187
//                                                     </p>
//                                                     <p>
//                                                         <span className="font-semibold">IFSC: </span> UBIN0810746
//                                                     </p>
//                                                     <p>
//                                                         <span className="font-semibold">UPI: </span>
//                                                         designblocks@ybl
//                                                     </p>
//                                                 </div>

//                                                 {/* SIGNATURE */}
//                                                 <div className="w-1/2 text-right pt-6">
//                                                     <p className="text-sm">
//                                                         For <span className="font-bold mr-10">DESIGN BLOCKS</span>
//                                                     </p>
//                                                     <p className="mt-6 text-gray-500">(Authorized Signatory)</p>
//                                                 </div>
//                                             </div>

//                                             <div className="text-center mt-3 font-semibold text-sm">Thank You</div>
//                                         </td>
//                                     </tr>

//                                     {/* QUOTATION TERMS */}
//                                     {quotation && (
//                                         <tr>
//                                             <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                                                 <p className="font-semibold">Terms & Conditions</p>
//                                                 <p>Quotation valid for 20 days from issue date.</p>
//                                                 <p>Increase in project scope will incur additional charges.</p>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>

//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default App;



import React, { useState, useRef, useEffect, useCallback } from "react";
import AdminPanel from "./AdminPanel";
import {
    User,
    Lock,
    LogOut,
    AlertTriangle,
    CheckCircle,
    X,
    Loader,
} from 'lucide-react';

const BASE_URL = `https://invoice-dbinvoice-backend.onrender.com`;

// --- Utility: Number to Words Converter ---
const numberToWords = (num) => {
    if (num === 0) return 'Zero';
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million'];

    const convertChunk = (n) => {
        if (n === 0) return '';
        if (n < 10) return units[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
        return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertChunk(n % 100) : '');
    };

    let words = '';
    let i = 0;
    const roundedNum = parseFloat(num.toFixed(2));
    const [intPart, fracPart] = roundedNum.toString().split('.');
    let integer = parseInt(intPart);
    const fractional = fracPart ? parseInt(fracPart) : 0;

    while (integer > 0) {
        const chunk = integer % 1000;
        if (chunk !== 0) {
            let chunkWords = convertChunk(chunk);
            words = chunkWords + (scales[i] ? ' ' + scales[i] : '') + ' ' + words;
        }
        integer = Math.floor(integer / 1000);
        i++;
    }
    words = words.trim();
    if (fractional > 0) {
        let fractionalWords = convertChunk(fractional);
        words += (words ? ' and ' : '') + fractionalWords + ' Paisa';
    }
    return words.trim();
};


// --- Modal Component ---
const Modal = ({ state, onClose, onConfirm }) => {
    if (!state.isVisible) return null;

    const isConfirm = state.type === 'CONFIRM';

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 font-sans hide-on-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                <div className={`flex items-center p-4 ${isConfirm ? 'bg-red-500' : 'bg-indigo-600'} text-white`}>
                    {isConfirm ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                    <h3 className="ml-3 text-lg font-semibold">
                        {isConfirm ? 'Confirm Action' : 'Notification'}
                    </h3>
                    <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 text-gray-700">
                    <p>{state.message}</p>
                </div>

                <div className={`p-4 border-t flex ${isConfirm ? 'justify-between' : 'justify-end'}`}>
                    {isConfirm && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (isConfirm && onConfirm) onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 rounded-lg transition font-medium ${isConfirm ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        {isConfirm ? 'Confirm' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Component ---
function App() {

    // ---------- AUTH STATES ----------
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authLoading, setAuthLoading] = useState(false);

    // ---------- MODAL ----------
    const [modalState, setModalState] = useState({
        isVisible: false,
        message: '',
        type: 'ALERT',
        onConfirm: null,
    });

    const showModal = (msg, type = 'ALERT', callback = null) => {
        setModalState({ isVisible: true, message: msg, type, onConfirm: callback });
    };

    const closeModal = () => {
        setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
    };

    // ------ INVOICE STATES ------
    const date = new Date();
    const printRef = useRef(null);
    const [quotation, setQuotation] = useState(true);
    const [invoice, setInvoice] = useState(false);
    const [sgst, setSGST] = useState(false);
    const [cgst, setCGST] = useState(false);
    const [taxableValue, setTaxableValue] = useState(0);
    const [invoiceValue, setInvoiceValue] = useState(0);
    const [SGST, setSGSTValue] = useState(0);
    const [CGST, setCGSTValue] = useState(0);
    const [searchNumber, setSearchNumber] = useState("");
    const [isEditingNumber, setIsEditingNumber] = useState(false);


    // ⭐ NEW STATES FOR SEPARATE BUTTON LOADING
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);
    const [isItemEditing, setIsItemEditing] = useState(false);
    const [editingItemOriginal, setEditingItemOriginal] = useState(null);

    const [billDetails, setBillDetails] = useState({
        billTO: "",
        customerAddress: "",
        customerGSTIN: "",
        quotationNumber: "",
        invoiceNumber: "",
        associatedQuotationNumber: "",
        documentDate: new Date().toISOString().split("T")[0],
        items: [],
    });

    const [tableItems, setTableItems] = useState({
        description: "",
        quantity: "",
        unitPrice: "",
    });

    // --- Generate Unique Number (ONLY if field is empty) ---
    const generateUniqueNumber = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        // ✅ Check the correct field depending on mode
        const currentNumber = quotation ? billDetails.quotationNumber : billDetails.invoiceNumber;
        if (currentNumber && currentNumber.trim() !== "") {
            return; // Don't overwrite existing custom number
        }

        try {
            const url = quotation
                ? `${BASE_URL}/api/quotation/generate`
                : `${BASE_URL}/api/invoice/generate`;

            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.success) {
                setBillDetails(prev => ({
                    ...prev,
                    [quotation ? "quotationNumber" : "invoiceNumber"]:
                        quotation ? data.quotationNumber : data.invoiceNumber
                }));
            }
        } catch (error) {
            console.error("Number generation failed", error);
        }
    }, [quotation, billDetails.quotationNumber, billDetails.invoiceNumber]);



    // --- Item Handling ---
    const handleAddItem = (e) => {
        e.preventDefault();
        setIsItemEditing(false);
        setEditingItemOriginal(null);
        setBillDetails({
            ...billDetails,
            items: [
                ...billDetails.items,
                {
                    ...tableItems,
                    quantity: Number(tableItems.quantity),
                    unitPrice: Number(tableItems.unitPrice),
                    id: Date.now()
                }
            ],
        });
        setTableItems({ description: "", quantity: "", unitPrice: "" });
    };

    const handleEditItem = (item) => {
        setTableItems({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        });
        setIsItemEditing(true);
        setEditingItemOriginal(item);
    };

    const handleUpdateItem = (e) => {
        e.preventDefault();
        if (!editingItemOriginal) return;

        const index = billDetails.items.findIndex(item => item === editingItemOriginal);
        if (index > -1) {
            const updated = [...billDetails.items];
            updated[index] = {
                ...updated[index],
                description: tableItems.description,
                quantity: Number(tableItems.quantity),
                unitPrice: Number(tableItems.unitPrice),
            };

            setBillDetails({ ...billDetails, items: updated });
        }

        setTableItems({ description: "", quantity: "", unitPrice: "" });
        setIsItemEditing(false);
        setEditingItemOriginal(null);
    };

    const handleItem = (itemToDelete) => {
        let removed = billDetails.items.filter(e => e !== itemToDelete);
        setBillDetails({ ...billDetails, items: removed });
    };


    // --- SAVE or UPDATE handler ---
    const handleSaveOrUpdate = () => {
        if (isEditing) handleUpdate();
        else handleSave();
    };


    // --- SAVE (Custom number support) ---
    // const handleSave = async () => {
    //     const token = localStorage.getItem('authToken');
    //     if (!token) {
    //         showModal("Authentication missing.", "ALERT");
    //         return;
    //     }

    //     // ✅ Validation: Check if quotation number exists
    //     if (!billDetails.quotationNumber || billDetails.quotationNumber.trim() === "") {
    //         showModal("Please provide a quotation/invoice number.", "ALERT");
    //         return;
    //     }

    //     try {
    //         setSaveLoading(true);

    //         const docKey = quotation ? "quotationNumber" : "invoiceNumber";
    //         const valueKey = quotation ? "quotationValue" : "invoiceValue";

    //         const safeDate =
    //             billDetails.documentDate || new Date().toISOString().split("T")[0];

    //         const body = {
    //             billTO: billDetails.billTO,
    //             customerAddress: billDetails.customerAddress,
    //             customerGSTIN: billDetails.customerGSTIN,
    //             items: billDetails.items,
    //             sgst,  // ✅ Optional - can be true or false
    //             cgst,  // ✅ Optional - can be true or false
    //             taxableValue,
    //             SGSTAmount: SGST,
    //             CGSTAmount: CGST,
    //             [valueKey]: invoiceValue,
    //             [docKey]: quotation
    //                 ? billDetails.quotationNumber.trim()
    //                 : billDetails.invoiceNumber.trim(),
    //             // ✅ Send custom or auto number
    //             originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
    //             documentDate: safeDate,
    //         };

    //         const url = quotation
    //             ? `${BASE_URL}/api/quotation/save`
    //             : `${BASE_URL}/api/invoice/save`;

    //         const res = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(body)
    //         });

    //         const data = await res.json();

    //         if (data.success) {
    //             const savedNumber =
    //                 data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
    //             showModal(`${quotation ? "Quotation" : "Invoice"} saved → ${savedNumber}`);

    //             setIsEditing(true);
    //             setIsEditingNumber(false); // ✅ Lock after save
    //             setOriginalQuotationNumber(savedNumber);
    //             setBillDetails(prev => ({
    //                 ...prev,
    //                 quotationNumber: savedNumber,
    //                 documentDate: safeDate
    //             }));
    //         } else {
    //             showModal(`Save Error: ${data.error}`);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         showModal("Save failed.");
    //     } finally {
    //         setSaveLoading(false);
    //     }
    // };


    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showModal("Authentication missing.", "ALERT");
            return;
        }

        const currentNumber = quotation ? billDetails.quotationNumber : billDetails.invoiceNumber;
        if (!currentNumber || currentNumber.trim() === "") {
            showModal("Please provide a quotation/invoice number.", "ALERT");
            return;
        }

        try {
            setSaveLoading(true);

            const docKey = quotation ? "quotationNumber" : "invoiceNumber";
            const valueKey = quotation ? "quotationValue" : "invoiceValue";
            const safeDate = billDetails.documentDate || new Date().toISOString().split("T")[0];

            const body = {
                billTO: billDetails.billTO,
                customerAddress: billDetails.customerAddress,
                customerGSTIN: billDetails.customerGSTIN,
                items: billDetails.items,
                sgst,
                cgst,
                taxableValue,
                SGSTAmount: SGST,
                CGSTAmount: CGST,
                [valueKey]: invoiceValue,
                [docKey]: currentNumber.trim(),
                originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
                documentDate: safeDate,
            };

            const url = quotation
                ? `${BASE_URL}/api/quotation/save`
                : `${BASE_URL}/api/invoice/save`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (data.success) {
                const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
                showModal(`${quotation ? "Quotation" : "Invoice"} saved → ${savedNumber}`);

                setIsEditing(true);
                setIsEditingNumber(false);
                setOriginalQuotationNumber(savedNumber);

                setBillDetails(prev => ({
                    ...prev,
                    [quotation ? "quotationNumber" : "invoiceNumber"]: savedNumber, // ✅ update correct field
                    documentDate: safeDate
                }));
            } else {
                showModal(`Save Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            showModal("Save failed.");
        } finally {
            setSaveLoading(false);
        }
    };



    // --- UPDATE (Modified to send originalQuotationNumber) ---
    const handleUpdate = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showModal("Authentication missing.", "ALERT");
            return;
        }

        try {
            setSaveLoading(true);

            const docKey = invoice ? "invoiceNumber" : "quotationNumber";
            const valueKey = invoice ? "invoiceValue" : "quotationValue";
            const url = `${BASE_URL}/api/${invoice ? "invoice/update" : "quotation/update"}`;

            const body = {
                [docKey]: invoice ? billDetails.invoiceNumber : billDetails.quotationNumber,
                originalQuotationNumber: originalQuotationNumber || (invoice ? billDetails.invoiceNumber : billDetails.quotationNumber),
                billTO: billDetails.billTO,
                customerAddress: billDetails.customerAddress,
                customerGSTIN: billDetails.customerGSTIN,
                items: billDetails.items,
                sgst,
                cgst,
                taxableValue,
                SGSTAmount: SGST,
                CGSTAmount: CGST,
                [valueKey]: invoiceValue,
                associatedQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
                documentDate: billDetails.documentDate,
            };

            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (data.success) {
                showModal(`${invoice ? "Invoice" : "Quotation"} Updated Successfully`);
                setOriginalQuotationNumber(invoice ? billDetails.invoiceNumber : billDetails.quotationNumber);
            } else {
                showModal(`Update Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            showModal("Update failed.");
        } finally {
            setSaveLoading(false);
        }
    };



    // --- DELETE (Updated for deleteLoading) ---
    const performActualDelete = async () => {
        const docType = invoice ? "Invoice" : "Quotation";
        const documentNumber = originalQuotationNumber || (invoice ? billDetails.invoiceNumber : billDetails.quotationNumber);
        const token = localStorage.getItem('authToken');

        try {
            setDeleteLoading(true);

            const url = `${BASE_URL}/api/${invoice ? "invoice/delete" : "quotation/delete"}/${documentNumber}`;

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showModal(`${docType} #${documentNumber} deleted successfully!`);

                setBillDetails(prev => ({
                    ...prev,
                    billTO: "",
                    customerAddress: "",
                    customerGSTIN: "",
                    items: [],
                    associatedQuotationNumber: "",
                    documentDate: new Date().toISOString().split("T")[0],
                    quotationNumber: "",
                    invoiceNumber: "", // ✅ reset after delete
                }));

                setSGST(false);
                setCGST(false);
                setIsEditing(false);
                setOriginalQuotationNumber(null);
                generateUniqueNumber();
            } else {
                showModal(`Delete Error: ${data.error}`);
            }
        } catch (err) {
            console.error('Error deleting data:', err);
            showModal('Delete failed.');
        } finally {
            setDeleteLoading(false);
        }
    };


    // Load Quotation details specifically into Invoice Form
    const loadQuotationForInvoice = async (docNumber) => {
        if (!docNumber) {
            showModal("Please enter a Quotation Ref number.", "ALERT");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            showModal("Authentication token missing.", "ALERT");
            return;
        }

        try {
            setSaveLoading(true);

            const quoteURL = `${BASE_URL}/api/quotation/fetch/${docNumber}`;

            const response = await fetch(quoteURL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();

            if (response.ok && result.quotation) {
                const q = result.quotation;

                const currentInvoiceNumber = billDetails.quotationNumber;

                const normalizedItems = q.items.map(i => ({
                    description: i.description,
                    quantity: Number(i.quantity),
                    unitPrice: Number(i.unitPrice),
                    id: i._id || Date.now() + Math.random()
                }));

                setBillDetails(prev => ({
                    ...prev,
                    billTO: q.billTO || "",
                    customerAddress: q.customerAddress || "",
                    customerGSTIN: q.customerGSTIN || "",
                    items: normalizedItems,
                    quotationNumber: currentInvoiceNumber,
                    associatedQuotationNumber: q.quotationNumber,
                    documentDate: (q.documentDate && q.documentDate.split("T")[0]) || new Date().toISOString().split("T")[0]
                }));

                setSGST(q.sgst || false);
                setCGST(q.cgst || false);
                setIsEditing(false);

                showModal(`Quotation #${docNumber} details successfully loaded into Invoice.`, "ALERT");

            } else {
                showModal(`Quotation #${docNumber} not found.`, "ALERT");
            }
        } catch (error) {
            console.error(error);
            showModal("Error loading quotation for invoice.", "ALERT");
        } finally {
            setSaveLoading(false);
        }
    };

    // ----------------- SEARCH -----------------
    const handleSearch = async (docNumber) => {
        if (!docNumber) docNumber = searchNumber;
        if (!docNumber) {
            showModal("Please enter a document number.", "ALERT");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                showModal("Authentication token missing.");
                return;
            }

            const quoteRes = await fetch(
                `${BASE_URL}/api/quotation/fetch/${docNumber}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const quoteJson = await quoteRes.json();

            if (quoteRes.ok && quoteJson.quotation) {
                const q = quoteJson.quotation;

                setBillDetails(prev => ({
                    ...prev,
                    billTO: q.billTO,
                    customerAddress: q.customerAddress,
                    customerGSTIN: q.customerGSTIN,
                    items: q.items || [],
                    quotationNumber: q.quotationNumber,
                    associatedQuotationNumber: "",
                    documentDate: q.documentDate || new Date().toISOString().split("T")[0]
                }));

                setSGST(q.sgst);
                setCGST(q.cgst);

                setIsEditing(true);
                setOriginalQuotationNumber(q.quotationNumber);
                showModal(`Quotation #${docNumber} loaded successfully.`);
                return;
            }

            const invRes = await fetch(
                `${BASE_URL}/api/invoice/fetch/${docNumber}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const invJson = await invRes.json();

            if (invRes.ok && invJson.invoice) {
                const inv = invJson.invoice;

                setBillDetails(prev => ({
                    ...prev,
                    billTO: inv.billTO,
                    customerAddress: inv.customerAddress,
                    customerGSTIN: inv.customerGSTIN,
                    invoiceNumber: inv.invoiceNumber,
                    items: inv.items || [],
                    documentDate: inv.documentDate || new Date().toISOString().split("T")[0],
                    associatedQuotationNumber: inv.originalQuotationNumber || "",
                }));

                setSGST(inv.sgst);
                setCGST(inv.cgst);

                setIsEditing(true);
                setOriginalQuotationNumber(inv.invoiceNumber);
                showModal(`Invoice #${docNumber} loaded successfully.`);
                return;
            }

            showModal("Document not found.");
            setIsEditing(false);

        } catch (err) {
            console.error(err);
            showModal("Search failed.");
        }
    };


    // ---------------- AUTH HANDLERS ----------------
    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userRole", data.role);
                setIsAuthenticated(true);
                setUserRole(data.role);
            } else {
                showModal(data.error || "Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            showModal("Login failed.");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        setIsAuthenticated(false);
        setUsername("");
        setPassword("");
    };


    // ---------------- EFFECTS ----------------
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const role = localStorage.getItem("userRole");
        if (token) {
            setIsAuthenticated(true);
            setUserRole(role || "user");
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && userRole === "user") {
            const newTax = billDetails.items.reduce((acc, it) =>
                acc + (Number(it.quantity) * Number(it.unitPrice)), 0
            );

            const gst = 0.09;
            const sgstAmt = sgst ? newTax * gst : 0;
            const cgstAmt = cgst ? newTax * gst : 0;

            setTaxableValue(newTax);
            setSGSTValue(Number(sgstAmt.toFixed(2)));
            (Number(cgstAmt.toFixed(2)));

            setInvoiceValue(newTax + sgstAmt + cgstAmt);
        }
    }, [billDetails.items, sgst, cgst, isAuthenticated, userRole]);


    useEffect(() => {
        if (isAuthenticated && userRole === "user") {
            setBillDetails(prev => ({
                ...prev,
                billTO: "",
                customerAddress: "",
                customerGSTIN: "",
                items: [],
                associatedQuotationNumber: "",
                documentDate: new Date().toISOString().split("T")[0],
                quotationNumber: "", // ✅ Reset to empty, will be filled by generateUniqueNumber
                invoiceNumber: "",
            }));

            setSGST(false);
            setCGST(false);
            setTaxableValue(0);
            setInvoiceValue(0);
            setOriginalQuotationNumber(null);
            setSearchNumber("");
            setIsEditing(false);
            setIsEditingNumber(false); // ✅ Reset edit state
        }
    }, [invoice, quotation, isAuthenticated, userRole]);

    useEffect(() => {
        if (isAuthenticated && userRole === "user") {
            generateUniqueNumber();
        }
    }, [invoice, quotation, isAuthenticated, userRole, generateUniqueNumber]);


    // ----------------- LOGIN SCREEN -----------------
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 font-sans">
                <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
                <script src="https://cdn.tailwindcss.com"></script>

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white p-4 rounded-xl shadow-lg">
                                    <img
                                        src="https://designblocks.in/img/DB.png"
                                        alt="Design Blocks Logo"
                                        className="w-20 h-20 object-contain"
                                    />
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-2">Design Blocks</h1>
                            <p className="text-blue-100 text-sm">Welcome back! Please sign in to continue</p>
                        </div>

                        <div className="px-8 py-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <User className="text-gray-400" size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Lock className="text-gray-400" size={20} />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                                    </label>
                                </div>

                                <button
                                    onClick={handleLogin}
                                    disabled={authLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                                >
                                    {authLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={18} />
                                            <span>Sign In</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                            <Lock size={14} />
                            Secured by 256-bit encryption
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ----------------- ADMIN PANEL -----------------
    if (userRole === "admin") {
        return (
            <div className="min-h-screen w-full">
                <script src="https://cdn.tailwindcss.com"></script>
                <AdminPanel onLogout={handleLogout} />
            </div>
        );
    }

    // ---------------- EMPLOYEE UI (INVOICE GENERATOR) ----------------
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
            <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />

            <script src="https://cdn.tailwindcss.com"></script>

            <style>
                {`
                    @media print {
                        .hide-on-print { display: none !important; }
                        .printable-content {
                            width: 100% !important;
                            margin: 0 !important;
                            box-shadow: none !important;
                            border: none !important;
                            font-size: 10pt;
                        }
                        .w-\\[60rem\\] {
                            width: 100% !important;
                        }
                    }
                `}
            </style>

            <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 w-full relative">

                {/* Logout */}
                <div className="absolute top-5 right-5 hide-on-print">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow-md"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* INVOICE UI */}
                <div className="w-full flex items-center justify-center hide-on-print">
                    <div className="font-sans w-full lg:w-[50rem]">

                        <div className="pb-5 text-3xl">
                            <p className="font-bold text-blue-500">
                                Design <span className="text-green-400">Blocks</span>
                            </p>
                            <p className="text-gray-500 text-sm">Employee Billing Portal</p>
                        </div>

                        {/* Search */}
                        <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
                            <p className="pb-3 text-xl font-semibold uppercase text-purple-600">Search</p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter Invoice/Quotation Number"
                                    className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full"
                                    value={searchNumber}
                                    onChange={(e) => setSearchNumber(e.target.value)}
                                />
                                <button
                                    onClick={() => handleSearch(searchNumber)}
                                    className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md shadow-md"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Mode Switch */}
                        <div className="flex items-center justify-start gap-5 mb-5">
                            <div
                                className={`cursor-pointer px-4 py-1 font-semibold border-2 border-green-400 rounded-lg 
                                ${quotation ? "bg-green-400 text-green-900 shadow-md" : "text-gray-700"}`}
                                onClick={() => { setQuotation(true); setInvoice(false); }}
                            >
                                Quotation
                            </div>

                            <div
                                className={`cursor-pointer px-4 py-1 font-semibold border-2 border-green-400 rounded-lg 
                                ${invoice ? "bg-green-400 text-green-900 shadow-md" : "text-gray-700"}`}
                                onClick={() => { setQuotation(false); setInvoice(true); }}
                            >
                                Invoice
                            </div>
                        </div>

                        {/* Document Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
                            <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                                1. {invoice ? "Invoice" : "Quotation"} Details
                            </p>

                            <div className="flex flex-wrap gap-3 items-center">
                                <h1 className="font-medium">Number</h1>

                                {/* Number Input with Edit Toggle */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={invoice ? billDetails.invoiceNumber : billDetails.quotationNumber}
                                        readOnly={!isEditingNumber}
                                        onChange={(e) =>
                                            setBillDetails({
                                                ...billDetails,
                                                [invoice ? "invoiceNumber" : "quotationNumber"]: e.target.value,
                                            })
                                        }
                                        className={`outline-none rounded px-2 py-1 border border-blue-500 
                                        ${isEditingNumber ? "bg-white" : "bg-gray-100"}`}
                                    />

                                    {/* Edit / Lock button */}
                                    <button
                                        onClick={() => setIsEditingNumber(!isEditingNumber)}
                                        className="px-3 py-1 text-sm rounded bg-indigo-500 text-white hover:bg-indigo-600"
                                    >
                                        {isEditingNumber ? "Lock" : "Edit"}
                                    </button>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-3">
                                    <h1 className="font-medium">Date</h1>
                                    <input
                                        type="date"
                                        value={billDetails.documentDate}
                                        onChange={(e) =>
                                            setBillDetails({ ...billDetails, documentDate: e.target.value })
                                        }
                                        className="outline-none rounded px-2 py-1 border border-blue-500"
                                    />
                                </div>

                                {invoice && (
                                    <div className="flex items-center gap-3">
                                        <h1 className="font-medium text-xs sm:text-base whitespace-nowrap flex-shrink-0">
                                            Quotation Ref:
                                        </h1>

                                        <div className="flex border border-blue-500 rounded-lg shadow-md w-full">
                                            <input
                                                type="text"
                                                value={billDetails.associatedQuotationNumber}
                                                placeholder="Enter Q-No"
                                                onChange={(e) =>
                                                    setBillDetails({
                                                        ...billDetails,
                                                        associatedQuotationNumber: e.target.value,
                                                    })
                                                }
                                                className="outline-none rounded-l-lg px-2 py-1 text-sm w-full min-w-0"
                                            />
                                            <button
                                                onClick={() =>
                                                    loadQuotationForInvoice(billDetails.associatedQuotationNumber)
                                                }
                                                disabled={saveLoading}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-r-lg hover:bg-blue-600 disabled:opacity-50 text-sm flex-shrink-0"
                                            >
                                                Load
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Recipient Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <p className="pb-3 text-xl font-semibold uppercase text-blue-600">2. Recipient Details</p>

                            <div className="flex flex-wrap gap-5">
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-medium">Bill TO</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        value={billDetails.billTO}
                                        onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })}
                                        className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h1 className="font-medium">Address</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter address"
                                        value={billDetails.customerAddress}
                                        onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })}
                                        className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h1 className="font-medium">Customer GSTIN</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter GSTIN"
                                        value={billDetails.customerGSTIN}
                                        onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })}
                                        className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
                            <form
                                className="flex flex-col"
                                onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}
                            >
                                <div className="flex justify-between pb-3">
                                    <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>

                                    <div className="flex gap-3">
                                        {isItemEditing && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsItemEditing(false);
                                                    setEditingItemOriginal(null);
                                                    setTableItems({ description: "", quantity: "", unitPrice: "" });
                                                }}
                                                className="bg-yellow-500 px-3 py-2 rounded text-white shadow-md"
                                            >
                                                Cancel Edit
                                            </button>
                                        )}

                                        <button
                                            type="submit"
                                            className={`px-3 py-2 rounded text-white shadow-md ${isItemEditing
                                                ? "bg-orange-500"
                                                : "bg-green-500"
                                                }`}
                                        >
                                            {isItemEditing ? "Update Item" : "Add"}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-5">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="font-medium">Description</h1>
                                        <input
                                            type="text"
                                            required
                                            value={tableItems.description}
                                            onChange={(e) =>
                                                setTableItems({ ...tableItems, description: e.target.value })
                                            }
                                            className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
                                            placeholder="Enter Description"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h1 className="font-medium">Quantity</h1>
                                        <input
                                            type="number"
                                            required
                                            value={tableItems.quantity}
                                            onChange={(e) =>
                                                setTableItems({ ...tableItems, quantity: e.target.value })
                                            }
                                            className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
                                            placeholder="Enter Quantity"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h1 className="font-medium">Unit Price</h1>
                                        <input
                                            type="number"
                                            required
                                            value={tableItems.unitPrice}
                                            onChange={(e) =>
                                                setTableItems({ ...tableItems, unitPrice: e.target.value })
                                            }
                                            className="outline-none px-2 py-1 border border-blue-500 rounded shadow-md"
                                            placeholder="Enter Unit Price"
                                        />
                                    </div>
                                </div>
                            </form>

                            {/* ITEMS TABLE LIST */}
                            {billDetails.items.length > 0 && (
                                <div className="overflow-x-scroll w-full py-5">
                                    <div className="w-full min-w-[50rem]">
                                        <table className="w-full">
                                            <tbody>
                                                <tr className="bg-gray-200 font-bold">
                                                    <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price (Rs.)</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price (Rs.)</td>
                                                    <td className="px-3 w-[5%] text-center">Action</td>
                                                </tr>

                                                {billDetails.items.map((item, index) => (
                                                    <tr
                                                        key={item.id}
                                                        className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition"
                                                        onClick={() => handleEditItem(item)}
                                                    >
                                                        <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
                                                        <td className="border border-blue-500 px-3 py-2">{item.description}</td>
                                                        <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
                                                        <td className="border border-blue-500 px-3 py-2 text-right">
                                                            {Number(item.unitPrice).toFixed(2)}
                                                        </td>
                                                        <td className="border border-blue-500 px-3 py-2 text-right">
                                                            {(item.quantity * item.unitPrice).toFixed(2)}
                                                        </td>
                                                        <td className="px-3">
                                                            <p
                                                                className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs hover:bg-red-600"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleItem(item);
                                                                }}
                                                            >
                                                                Delete
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* GST */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>

                            <div className="flex gap-5 mt-3">
                                <label
                                    onClick={() => setSGST(!sgst)}
                                    className={`${sgst ? "bg-red-500" : "bg-green-500"} text-white px-5 py-2 rounded-lg shadow-md cursor-pointer`}
                                >
                                    SGST {sgst ? "ON" : "OFF"}
                                </label>

                                <label
                                    onClick={() => setCGST(!cgst)}
                                    className={`${cgst ? "bg-red-500" : "bg-green-500"} text-white px-5 py-2 rounded-lg shadow-md cursor-pointer`}
                                >
                                    CGST {cgst ? "ON" : "OFF"}
                                </label>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-3">
                            {/* SAVE / UPDATE BUTTON */}
                            <button
                                onClick={handleSaveOrUpdate}
                                disabled={saveLoading || billDetails.items.length === 0}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {saveLoading ? (
                                    <Loader size={20} className="animate-spin" />
                                ) : isEditing ? (
                                    "Update"
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* PRINT BUTTON */}
                <button
                    onClick={() => window.print()}
                    className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 hide-on-print"
                >
                    Print Receipt
                </button>

                {/* PRINT TEMPLATE */}
                <div className="w-full bg-white flex items-center justify-center">
                    <div className="w-full xl:w-[60rem]">
                        <div ref={printRef} className="flex flex-col w-[60rem] bg-white text-black printable-content">

                            {/* HEADER */}
                            <div className="flex flex-row h-[15rem]">
                                <div className="h-full w-[20rem] border border-black">
                                    <div className="flex items-center justify-center h-[30%]">
                                        <p className="text-center font-bold text-2xl">
                                            {invoice ? `Invoice No: ${billDetails.invoiceNumber}`
                                                : `Quotation No: ${billDetails.quotationNumber}`}
                                        </p>

                                    </div>

                                    <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
                                        <p className="font-semibold text-lg">Bill to:</p>

                                        {billDetails.customerGSTIN && (
                                            <p>
                                                <span className="font-semibold">GSTIN: </span>
                                                {billDetails.customerGSTIN}
                                            </p>
                                        )}

                                        <p>{billDetails.billTO}</p>
                                        <p>{billDetails.customerAddress}</p>

                                        {invoice && billDetails.associatedQuotationNumber && (
                                            <p className="mt-2 text-xs">
                                                Quotation Ref:{" "}
                                                <span className="font-semibold">{billDetails.associatedQuotationNumber}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>



                                {/* RIGHT HEADER */}
                                <div className="h-full w-[40rem] border border-black flex flex-col justify-between">
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="w-[70%] text-sm">
                                            <p className="font-semibold text-xl">
                                                GSTIN:{" "}
                                                <span className="font-medium text-base">37AKOPY6766H1Z4</span>
                                            </p>
                                            <p className="font-medium">DESIGN BLOCKS</p>

                                            <p className="font-semibold text-lg pt-2">Address:</p>
                                            <p>
                                                Flat No 406, 5th Floor, Botcha Square, Madhavadhara,
                                                VISAKHAPATNAM–530007
                                            </p>
                                        </div>

                                        <div className="w-[100px] h-[100px] flex items-center justify-center">
                                            <img
                                                src="https://designblocks.in/img/DB.png"
                                                alt="DB Logo"
                                                onError={(e) => {
                                                    e.target.src = "https://placehold.co/100x100?text=DB";
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* PRINT DATE */}
                                    <div className="flex flex-col px-5 mb-3">
                                        <label className="font-semibold">Document Date</label>
                                        <input
                                            type="date"
                                            value={billDetails.documentDate}
                                            onChange={(e) =>
                                                setBillDetails({
                                                    ...billDetails,
                                                    documentDate: e.target.value,
                                                })
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ITEMS TABLE */}
                            <table className="w-[60rem] text-sm table-fixed">
                                <thead>
                                    <tr className="h-10 bg-gray-100 font-bold">
                                        <td className="border border-black text-center w-[5%]">#</td>
                                        <td className="border border-black text-center w-[45%]">Description</td>
                                        <td className="border border-black text-center w-[10%]">Qty</td>
                                        <td className="border border-black text-center w-[20%]">Unit Price</td>
                                        <td className="border border-black text-center w-[20%]">Total</td>
                                    </tr>
                                </thead>

                                <tbody className="border border-black">
                                    {billDetails.items.length > 0 ? (
                                        billDetails.items.map((item, key) => (
                                            <tr key={item.id} className="h-10">
                                                <td className="text-center border border-black">{key + 1}</td>
                                                <td className="px-2 border border-black">{item.description}</td>
                                                <td className="px-2 border border-black text-center">{item.quantity}</td>
                                                <td className="px-2 border border-black text-right">
                                                    {Number(item.unitPrice).toFixed(2)}
                                                </td>
                                                <td className="px-2 border border-black text-right">
                                                    {(item.quantity * item.unitPrice).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="h-20">
                                            <td
                                                colSpan={5}
                                                className="text-center text-gray-500 border border-black"
                                            >
                                                No items added.
                                            </td>
                                        </tr>
                                    )}

                                    {/* TAXABLE VALUE */}
                                    <tr className="border border-black h-10 bg-yellow-50">
                                        <td colSpan={3}></td>
                                        <td className="px-2 text-right font-semibold">Taxable Value</td>
                                        <td className="px-2 text-right">{taxableValue.toFixed(2)}</td>
                                    </tr>

                                    {/* SGST */}
                                    {sgst && (
                                        <tr className="h-8 border border-black">
                                            <td colSpan={3}></td>
                                            <td className="px-2 text-right font-semibold">SGST @9%</td>
                                            <td className="px-2 text-right">{SGST}</td>
                                        </tr>
                                    )}

                                    {/* CGST */}
                                    {cgst && (
                                        <tr className="h-8 border border-black">
                                            <td colSpan={3}></td>
                                            <td className="px-2 text-right font-semibold">CGST @9%</td>
                                            <td className="px-2 text-right">{CGST}</td>
                                        </tr>
                                    )}

                                    {/* GRAND TOTAL */}
                                    <tr className="border border-black h-10 bg-blue-100">
                                        <td colSpan={3}></td>
                                        <td className="px-2 text-right font-bold">
                                            {invoice ? "Invoice Value" : "Quotation Value"}
                                        </td>
                                        <td className="px-2 text-right font-bold">
                                            {invoiceValue.toFixed(2)}
                                        </td>
                                    </tr>

                                    {/* IN WORDS */}
                                    <tr className="border border-black h-10">
                                        <td colSpan={5} className="px-2">
                                            <span className="font-semibold">In Words: </span>
                                            {numberToWords(invoiceValue)} Only.
                                        </td>
                                    </tr>

                                    {/* FOOTER */}
                                    <tr>
                                        <td colSpan={5} className="p-2 border-t border-black text-xs">
                                            <div className="flex justify-between">
                                                {/* BANK DETAILS */}
                                                <div className="w-1/2">
                                                    <p className="font-semibold text-sm">BANK DETAILS:</p>
                                                    <p>
                                                        UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">A/C: </span>
                                                        753601010050187
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">IFSC: </span> UBIN0810746
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">UPI: </span>
                                                        designblocks@ybl
                                                    </p>
                                                </div>

                                                {/* SIGNATURE */}
                                                <div className="w-1/2 text-right flex flex-col items-end space-y-2">
                                                    <p className="text-sm">
                                                        For <span className="font-bold mr-2">DESIGN BLOCKS</span>
                                                    </p>
                                                    <p className="text-gray-500 text-sm">(Authorized Signatory)</p>
                                                </div>

                                            </div>

                                            <div className="text-center mt-3 font-semibold text-sm">Thank You</div>
                                        </td>
                                    </tr>

                                    {/* QUOTATION TERMS */}
                                    {quotation && (
                                        <tr>
                                            <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
                                                <p className="font-semibold">Terms & Conditions</p>
                                                <p>Quotation valid for 20 days from issue date.</p>
                                                <p>Increase in project scope will incur additional charges.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
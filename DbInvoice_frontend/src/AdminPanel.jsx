// import React, { useState, useEffect } from 'react';
// import {
//   Lock,
//   User,
//   LogOut,
//   FileText,
//   Receipt,
//   Trash2,
//   Edit,
//   Calendar,
//   DollarSign,
//   MapPin,
//   CreditCard
// } from 'lucide-react';

// function AdminPanel() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [activeTab, setActiveTab] = useState('invoices');
//   const [invoices, setInvoices] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [editItem, setEditItem] = useState(null); // track item being edited
//   const [editValue, setEditValue] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       setIsLoggedIn(true);
//       fetchData(token);
//     }
//   }, [activeTab]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await response.json();

//       if (data.success) {
//         localStorage.setItem('adminToken', data.token);
//         setIsLoggedIn(true);
//         fetchData(data.token);
//       } else {
//         setError(data.error || 'Login failed');
//       }
//     } catch (err) {
//       setError('Connection error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchData = async (token) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/${activeTab}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (activeTab === 'invoices') {
//           setInvoices(data.invoices);
//         } else {
//           setQuotations(data.quotations);
//         }
//       }
//     } catch (err) {
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (type, number) => {
//     if (!window.confirm(`Are you sure you want to delete ${type} #${number}?`)) {
//       return;
//     }

//     const token = localStorage.getItem('adminToken');
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/admin/${type.toLowerCase()}/${number}`,
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         alert(`${type} deleted successfully`);
//         fetchData(token);
//       } else {
//         alert(data.error || 'Delete failed');
//       }
//     } catch (err) {
//       alert('Connection error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditItem(item);
//     setEditValue(item.invoiceValue || item.quotationValue || 0);
//   };

//   const saveEdit = async () => {
//     const token = localStorage.getItem('adminToken');
//     const type = activeTab === 'invoices' ? 'invoice' : 'quotation';
//     const number = editItem.invoiceNumber || editItem.quotationNumber;

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/admin/${type}/${number}`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ invoiceValue: editValue })
//         }
//       );

//       const data = await response.json();
//       if (data.success) {
//         alert(`${type} updated successfully`);
//         setEditItem(null);
//         fetchData(token);
//       } else {
//         alert(data.error || 'Update failed');
//       }
//     } catch (err) {
//       alert('Connection error');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     setIsLoggedIn(false);
//     setUsername('');
//     setPassword('');
//     setInvoices([]);
//     setQuotations([]);
//   };

//   // Login Screen
//   if (!isLoggedIn) {
//     return (
  
//       <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-300 opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
//         </div>

//         <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
//           {/* Logo Section */}
//           <div className="flex flex-col items-center mb-8">
//             <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
//               <img
//                 src="https://designblocks.in/img/DB.png"
//                 alt="Design Blocks Logo"
//                 className="w-20 h-20 object-contain"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.parentElement.innerHTML = '<div class="text-white text-3xl font-bold">DB</div>';
//                 }}
//               />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//               Admin Portal
//             </h1>
//             <p className="text-gray-500 text-sm">Design Blocks Invoice System</p>
//           </div>

//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 animate-shake">
//               <Lock size={18} />
//               <span className="text-sm font-medium">{error}</span>
//             </div>
//           )}

//           <div className="space-y-5">
//             {/* Username Input */}
//             <div className="relative">
//               <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
//                 Username
//               </label>
//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
//                   <User size={20} />
//                 </div>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter your username"
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
//                   <Lock size={20} />
//                 </div>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
//                   placeholder="Enter your password"
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
//                 />
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Logging in...</span>
//                 </>
//               ) : (
//                 <>
//                   <Lock size={20} />
//                   <span>Login to Dashboard</span>
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Footer */}
//           <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//             <p className="text-gray-500 text-xs">
//               Secured by JWT Authentication
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentData = activeTab === 'invoices' ? invoices : quotations;
//   const totalValue = currentData.reduce(
//     (sum, item) => sum + (item.invoiceValue || 0),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-indigo-700 text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Admin Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
//           >
//             <LogOut size={18} className="inline mr-2" />
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
//             <p className="text-gray-500">Total Invoices</p>
//             <p className="text-2xl font-bold">{invoices.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
//             <p className="text-gray-500">Total Quotations</p>
//             <p className="text-2xl font-bold">{quotations.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
//             <p className="text-gray-500">Total Value</p>
//             <p className="text-2xl font-bold">₹{totalValue.toFixed(2)}</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex mb-6">
//           <button
//             onClick={() => setActiveTab('invoices')}
//             className={`flex-1 py-3 rounded-l-lg ${
//               activeTab === 'invoices'
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-white text-gray-700'
//             }`}
//           >
//             Invoices
//           </button>
//           <button
//             onClick={() => setActiveTab('quotations')}
//             className={`flex-1 py-3 rounded-r-lg ${
//               activeTab === 'quotations'
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-white text-gray-700'
//             }`}
//                   >
//             Quotations
//           </button>
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {loading ? (
//             <div className="text-center py-20">
//               <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600 font-medium">Loading data...</p>
//             </div>
//           ) : currentData.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 {activeTab === 'invoices' ? (
//                   <Receipt className="text-gray-400" size={40} />
//                 ) : (
//                   <FileText className="text-gray-400" size={40} />
//                 )}
//               </div>
//               <p className="text-gray-500 font-medium text-lg">
//                 No {activeTab} found
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Your {activeTab} will appear here
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       Bill To
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       Address
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       GSTIN
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
//                       Value
//                     </th>
//                     <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {currentData.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-indigo-50 transition-all duration-200"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-lg">
//                           {item.invoiceNumber || item.quotationNumber}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {item.billTO}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-600 max-w-xs truncate">
//                           {item.customerAddress}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-mono text-gray-700">
//                           {item.customerGSTIN}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         {editItem &&
//                         (editItem.invoiceNumber === item.invoiceNumber ||
//                           editItem.quotationNumber === item.quotationNumber) ? (
//                           <input
//                             type="number"
//                             value={editValue}
//                             onChange={(e) => setEditValue(e.target.value)}
//                             className="w-24 border rounded px-2 py-1 text-sm"
//                           />
//                         ) : (
//                           <span className="text-sm font-bold text-green-600">
//                             ₹{item.invoiceValue?.toFixed(2)}
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="text-sm text-gray-600">
//                           {new Date(item.createdAt).toLocaleDateString('en-GB')}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center flex gap-2 justify-center">
//                         {editItem &&
//                         (editItem.invoiceNumber === item.invoiceNumber ||
//                           editItem.quotationNumber === item.quotationNumber) ? (
//                           <>
//                             <button
//                               onClick={saveEdit}
//                               className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
//                             >
//                               Save
//                             </button>
//                             <button
//                               onClick={() => setEditItem(null)}
//                               className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() =>
//                                 handleEdit(item)
//                               }
//                               className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm flex items-center gap-1"
//                             >
//                               <Edit size={14} /> Edit
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDelete(
//                                   activeTab === 'invoices'
//                                     ? 'invoice'
//                                     : 'quotation',
//                                   item.invoiceNumber || item.quotationNumber
//                                 )
//                               }
//                               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm flex items-center gap-1"
//                             >
//                               <Trash2 size={14} /> Delete
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminPanel;


// import React, { useState, useEffect } from 'react';
// import {
//   Lock,
//   LogOut,
//   FileText,
//   Receipt,
//   Trash2,
//   Edit,
//   User
// } from 'lucide-react';

// // Added onLogout prop to handle logout from parent App.js
// function AdminPanel({ onLogout }) {
//   const [activeTab, setActiveTab] = useState('invoices');
//   const [invoices, setInvoices] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [editItem, setEditItem] = useState(null); 
//   const [editValue, setEditValue] = useState('');

//   // Initial Data Fetch
//   useEffect(() => {
//     // We assume App.js has already set the token
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       fetchData(token);
//     } else {
//         setError("Unauthorized access. Token missing.");
//     }
//   }, [activeTab]);

//   const fetchData = async (token) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://invoice-dbinvoice-backend.onrender.com/api/admin/${activeTab}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (activeTab === 'invoices') {
//           setInvoices(data.invoices);
//         } else {
//           setQuotations(data.quotations);
//         }
//       }
//     } catch (err) {
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (type, number) => {
//     if (!window.confirm(`Are you sure you want to delete ${type} #${number}?`)) {
//       return;
//     }

//     const token = localStorage.getItem('adminToken');
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://invoice-dbinvoice-backend.onrender.com/api/admin/${type.toLowerCase()}/${number}`,
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         alert(`${type} deleted successfully`);
//         fetchData(token);
//       } else {
//         alert(data.error || 'Delete failed');
//       }
//     } catch (err) {
//       alert('Connection error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditItem(item);
//     setEditValue(item.invoiceValue || item.quotationValue || 0);
//   };

//   const saveEdit = async () => {
//     const token = localStorage.getItem('adminToken');
//     const type = activeTab === 'invoices' ? 'invoice' : 'quotation';
//     const number = editItem.invoiceNumber || editItem.quotationNumber;

//     try {
//       const response = await fetch(
//         `https://invoice-dbinvoice-backend.onrender.com/api/admin/${type}/${number}`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ invoiceValue: editValue })
//         }
//       );

//       const data = await response.json();
//       if (data.success) {
//         alert(`${type} updated successfully`);
//         setEditItem(null);
//         fetchData(token);
//       } else {
//         alert(data.error || 'Update failed');
//       }
//     } catch (err) {
//       alert('Connection error');
//     }
//   };

//   const currentData = activeTab === 'invoices' ? invoices : quotations;
//   const totalValue = currentData.reduce(
//     (sum, item) => sum + (item.invoiceValue || 0),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-indigo-700 text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Admin Dashboard</h1>
//           <button
//             onClick={onLogout}
//             className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
//           >
//             <LogOut size={18} className="inline mr-2" />
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {error && (
//              <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border-l-4 border-red-500">
//                 {error}
//              </div>
//         )}

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
//             <p className="text-gray-500">Total Invoices</p>
//             <p className="text-2xl font-bold">{invoices.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
//             <p className="text-gray-500">Total Quotations</p>
//             <p className="text-2xl font-bold">{quotations.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
//             <p className="text-gray-500">Total Value</p>
//             <p className="text-2xl font-bold">₹{totalValue.toFixed(2)}</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex mb-6">
//           <button
//             onClick={() => setActiveTab('invoices')}
//             className={`flex-1 py-3 rounded-l-lg ${
//               activeTab === 'invoices'
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-white text-gray-700'
//             }`}
//           >
//             Invoices
//           </button>
//           <button
//             onClick={() => setActiveTab('quotations')}
//             className={`flex-1 py-3 rounded-r-lg ${
//               activeTab === 'quotations'
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-white text-gray-700'
//             }`}
//                   >
//             Quotations
//           </button>
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {loading ? (
//             <div className="text-center py-20">
//               <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600 font-medium">Loading data...</p>
//             </div>
//           ) : currentData.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 {activeTab === 'invoices' ? (
//                   <Receipt className="text-gray-400" size={40} />
//                 ) : (
//                   <FileText className="text-gray-400" size={40} />
//                 )}
//               </div>
//               <p className="text-gray-500 font-medium text-lg">
//                 No {activeTab} found
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Your {activeTab} will appear here
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       Bill To
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       Address
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
//                       GSTIN
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
//                       Value
//                     </th>
//                     <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {currentData.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-indigo-50 transition-all duration-200"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-lg">
//                           {item.invoiceNumber || item.quotationNumber}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {item.billTO}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-600 max-w-xs truncate">
//                           {item.customerAddress}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-mono text-gray-700">
//                           {item.customerGSTIN}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         {editItem &&
//                         (editItem.invoiceNumber === item.invoiceNumber ||
//                           editItem.quotationNumber === item.quotationNumber) ? (
//                           <input
//                             type="number"
//                             value={editValue}
//                             onChange={(e) => setEditValue(e.target.value)}
//                             className="w-24 border rounded px-2 py-1 text-sm"
//                           />
//                         ) : (
//                           <span className="text-sm font-bold text-green-600">
//                             ₹{item.invoiceValue?.toFixed(2)}
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="text-sm text-gray-600">
//                           {new Date(item.createdAt).toLocaleDateString('en-GB')}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center flex gap-2 justify-center">
//                         {editItem &&
//                         (editItem.invoiceNumber === item.invoiceNumber ||
//                           editItem.quotationNumber === item.quotationNumber) ? (
//                           <>
//                             <button
//                               onClick={saveEdit}
//                               className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
//                             >
//                               Save
//                             </button>
//                             <button
//                               onClick={() => setEditItem(null)}
//                               className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() =>
//                                 handleEdit(item)
//                               }
//                               className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm flex items-center gap-1"
//                             >
//                               <Edit size={14} /> Edit
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDelete(
//                                   activeTab === 'invoices'
//                                     ? 'invoice'
//                                     : 'quotation',
//                                   item.invoiceNumber || item.quotationNumber
//                                 )
//                               }
//                               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm flex items-center gap-1"
//                             >
//                               <Trash2 size={14} /> Delete
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminPanel;



// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     Lock,
//     LogOut,
//     FileText,
//     Receipt,
//     Trash2,
//     Edit,
//     User,
//     Home,
//     PlusSquare,
//     ClipboardList,
//     AlertTriangle,
//     CheckCircle,
//     X,
//     Loader
// } from 'lucide-react';
// import ReactToPrint from "react-to-print"; // Using ReactToPrint here as it was imported in the original App.js logic

// // --- CONFIGURATION ---
// const BASE_URL = `https://invoice-dbinvoice-backend.onrender.com`;

// // --- Utility: Number to Words Converter (Copied from App.js) ---
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

//     if (integer > 999999999) return 'Value too large';

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


// // --- Component: Modal (Custom Alert/Confirm - Copied from App.js) ---
// const Modal = ({ state, onClose, onConfirm }) => {
//     if (!state.isVisible) return null;

//     const isConfirm = state.type === 'CONFIRM';

//     return (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 font-sans hide-on-print">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
//                 {/* Header */}
//                 <div className={`flex items-center p-4 ${isConfirm ? 'bg-red-500' : 'bg-indigo-600'} text-white`}>
//                     {isConfirm ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
//                     <h3 className="ml-3 text-lg font-semibold">
//                         {isConfirm ? 'Confirm Action' : 'Notification'}
//                     </h3>
//                     <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* Body */}
//                 <div className="p-6 text-gray-700">
//                     <p>{state.message}</p>
//                 </div>

//                 {/* Footer */}
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
//                             if (isConfirm && onConfirm) {
//                                 onConfirm();
//                             }
//                             onClose();
//                         }}
//                         className={`px-4 py-2 rounded-lg transition font-medium ${isConfirm ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
//                     >
//                         {isConfirm ? 'Delete' : 'OK'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // --- Component: AdminPanel ---
// function AdminPanel({ onLogout }) {
//     // --- Admin Dashboard State (Existing Logic) ---
//     const [activeTab, setActiveTab] = useState('dashboard'); // Default tab is now 'dashboard'
//     const [invoices, setInvoices] = useState([]);
//     const [quotations, setQuotations] = useState([]);
//     const [dashboardLoading, setDashboardLoading] = useState(false);
//     const [dashboardError, setDashboardError] = useState('');
//     const [editItem, setEditItem] = useState(null);
//     const [editValue, setEditValue] = useState('');

//     // --- Billing Form State (Copied from App.js) ---
//     const date = new Date();
//     const printRef = useRef(null);

//     const [quotationMode, setQuotationMode] = useState(true); // Renamed from 'quotation'
//     const [invoiceMode, setInvoiceMode] = useState(false); // Renamed from 'invoice'
//     const [sgst, setSGST] = useState(false);
//     const [cgst, setCGST] = useState(false);
//     const [taxableValue, setTaxableValue] = useState(0);
//     const [invoiceValue, setInvoiceValue] = useState(0);
//     const [SGSTAmount, setSGSTAmount] = useState(0); // Renamed from 'SGST'
//     const [CGSTAmount, setCGSTAmount] = useState(0); // Renamed from 'CGST'
//     const [searchNumber, setSearchNumber] = useState("");
//     const [formLoading, setFormLoading] = useState(false);
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
//         items: [],
//     });

//     const [tableItems, setTableItems] = useState({
//         description: "",
//         quantity: "",
//         unitPrice: "",
//     });

//     // --- Modal State (Custom Alert/Confirm) ---
//     const [modalState, setModalState] = useState({
//         isVisible: false,
//         message: '',
//         type: 'ALERT',
//         onConfirm: null,
//     });

//     const closeModal = useCallback(() => {
//         setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
//     }, []);

//     const showModal = useCallback((message, type = 'ALERT', callback = null) => {
//         setModalState({
//             isVisible: true,
//             message,
//             type,
//             onConfirm: callback,
//         });
//     }, []);

//     const showNotification = (message, type) => {
//         showModal(message, 'ALERT');
//     };
    
//     // --- Data Fetching Logic (Admin Dashboard) ---
//     const fetchAdminData = useCallback(async (token) => {
//         setDashboardLoading(true);
//         setDashboardError('');
//         try {
//             // Fetch ALL data needed for dashboard and lists
//             const [invoicesResponse, quotationsResponse] = await Promise.all([
//                 fetch(`${BASE_URL}/api/admin/invoices`, { headers: { Authorization: `Bearer ${token}` } }),
//                 fetch(`${BASE_URL}/api/admin/quotations`, { headers: { Authorization: `Bearer ${token}` } })
//             ]);

//             const invoicesData = await invoicesResponse.json();
//             const quotationsData = await quotationsResponse.json();

//             if (invoicesData.success) {
//                 setInvoices(invoicesData.invoices);
//             } else {
//                 console.error("Failed to fetch invoices:", invoicesData.error);
//             }
//             if (quotationsData.success) {
//                 setQuotations(quotationsData.quotations);
//             } else {
//                 console.error("Failed to fetch quotations:", quotationsData.error);
//             }

//         } catch (err) {
//             setDashboardError('Failed to fetch dashboard data');
//             console.error('Admin Data Fetch Error:', err);
//         } finally {
//             setDashboardLoading(false);
//         }
//     }, []);

//     // Initial Data Fetch Effect
//     useEffect(() => {
//         const token = localStorage.getItem('adminToken');
//         if (token) {
//             fetchAdminData(token);
//         } else {
//             setDashboardError("Unauthorized access. Token missing.");
//         }
//     }, [activeTab, fetchAdminData]); // Re-fetch on tab switch for list accuracy


//     // --- Billing Form Logic (Copied from App.js) ---

//     // Generate unique invoice/quotation number
//     const generateUniqueNumber = useCallback(async () => {
//         try {
//             const url = quotationMode
//                 ? `${BASE_URL}/api/quotation/generate`
//                 : `${BASE_URL}/api/invoice/generate`;

//             const response = await fetch(url);
//             const data = await response.json();

//             if (data.success) {
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: quotationMode ? data.quotationNumber : data.invoiceNumber
//                 }));
//             }
//         } catch (error) {
//             console.error("Number generation failed", error);
//             showNotification("Error connecting to backend for number generation.", 'error');
//         }
//     }, [quotationMode]);

//     // Effect to reset form state when entering 'newBill' tab or switching modes
//     useEffect(() => {
//         if (activeTab === 'newBill') {
//             setBillDetails(prev => ({
//                 ...prev,
//                 billTO: "",
//                 customerAddress: "",
//                 customerGSTIN: "",
//                 items: [],
//                 associatedQuotationNumber: "",
//             }));
//             setSGST(false);
//             setCGST(false);
//             setTaxableValue(0);
//             setInvoiceValue(0);
//             setOriginalQuotationNumber(null);
//             setSearchNumber("");
//             setIsEditing(false);
//             setIsItemEditing(false);
//             setEditingItemOriginal(null);

//             generateUniqueNumber();
//         }
//     }, [activeTab, invoiceMode, quotationMode, generateUniqueNumber]);

//     // Calculation effect
//     useEffect(() => {
//         if (activeTab === 'newBill') {
//             const newTaxableValue = billDetails.items.reduce((acc, item) => {
//                 const quantity = Number(item.quantity) || 0;
//                 const unitPrice = Number(item.unitPrice) || 0;
//                 return acc + quantity * unitPrice;
//             }, 0);

//             const gstRate = 0.09;
//             const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//             const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;

//             const totalValue = newTaxableValue + currentSGST + currentCGST;

//             setSGSTAmount(currentSGST.toFixed(2));
//             setCGSTAmount(currentCGST.toFixed(2));
//             setTaxableValue(newTaxableValue);
//             setInvoiceValue(totalValue);
//         }
//     }, [billDetails.items, cgst, sgst, activeTab]);


//     // Handles adding/updating item in the form
//     const handleAddItem = (e) => {
//         e.preventDefault();
//         setIsItemEditing(false);
//         setEditingItemOriginal(null);

//         setBillDetails({
//             ...billDetails,
//             items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice), id: Date.now() }],
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
//             const updatedItems = [...billDetails.items];
//             updatedItems[index] = {
//                 ...updatedItems[index],
//                 description: tableItems.description,
//                 quantity: Number(tableItems.quantity),
//                 unitPrice: Number(tableItems.unitPrice)
//             };

//             setBillDetails({ ...billDetails, items: updatedItems });
//         }

//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//         setIsItemEditing(false);
//         setEditingItemOriginal(null);
//     };

//     const handleItem = (item) => {
//         let removedArray = billDetails.items.filter(e => e !== item);
//         setBillDetails({ ...billDetails, items: removedArray });
//     };

//     // Handle Update Logic (from App.js)
//     const handleUpdateForm = async () => {
//         const token = localStorage.getItem('adminToken');
//         if (!token) { showNotification("Authentication token missing. Cannot update.", 'error'); return; }

//         try {
//             setFormLoading(true);

//             const documentNumber = billDetails.quotationNumber;
//             const urlPath = invoiceMode ? "invoice/update" : "quotation/update";
//             const url = `${BASE_URL}/api/${urlPath}`;

//             const body = {
//                 [invoiceMode ? "invoiceNumber" : "quotationNumber"]: documentNumber,
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGSTAmount,
//                 CGSTAmount: CGSTAmount,
//                 invoiceValue: invoiceValue,
//                 originalQuotationNumber: invoiceMode ? billDetails.associatedQuotationNumber : null,
//             };

//             const res = await fetch(url, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//                 body: JSON.stringify(body)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 showNotification(`${invoiceMode ? "Invoice" : "Quotation"} #${documentNumber} updated successfully!`, 'success');
//                 fetchAdminData(token); // Refresh admin data
//             } else {
//                 showNotification(`Update Error: ${data.message || data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error(err);
//             showNotification("Unexpected error during update.", 'error');
//         } finally {
//             setFormLoading(false);
//         }
//     };

//     // Save/Update Handler (from App.js)
//     const handleSaveOrUpdate = () => {
//         if (isEditing) {
//             handleUpdateForm();
//         } else {
//             handleSaveForm();
//         }
//     };

//     // Save invoice/quotation to backend (from App.js)
//     const handleSaveForm = async () => {
//         const token = localStorage.getItem('adminToken');
//         if (!token) { showNotification("Authentication token missing. Cannot save.", 'error'); return; }

//         try {
//             setFormLoading(true);

//             const body = {
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGSTAmount,
//                 CGSTAmount: CGSTAmount,
//                 invoiceValue: invoiceValue,
//                 invoiceNumber: billDetails.quotationNumber,
//                 originalQuotationNumber: invoiceMode ? billDetails.associatedQuotationNumber : null,
//             };

//             const finalBody = quotationMode ? { ...body, quotationNumber: body.invoiceNumber } : body;
//             delete finalBody.invoiceNumber;

//             const url = quotationMode
//                 ? `${BASE_URL}/api/quotation/save`
//                 : `${BASE_URL}/api/invoice/save`;

//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//                 body: JSON.stringify(finalBody)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//                 showNotification(`${quotationMode ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
//                 setIsEditing(true);
//                 setBillDetails(prev => ({ ...prev, quotationNumber: savedNumber, }));
//                 fetchAdminData(token); // Refresh admin data
//             } else {
//                 showNotification(`Save Error: ${data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error(err);
//             showNotification("Unexpected error during save.", 'error');
//         } finally {
//             setFormLoading(false);
//         }
//     };

//     // Handle Delete Logic (from App.js)
//     const performActualDeleteForm = async () => {
//         const docType = invoiceMode ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;
//         const token = localStorage.getItem('adminToken');
        
//         try {
//             setFormLoading(true);
//             const urlPath = invoiceMode ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
//             const url = `${BASE_URL}/api/${urlPath}`;

//             const response = await fetch(url, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
//             const data = await response.json();

//             if (response.ok && data.success) {
//                 showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
//                 }));
//                 setSGST(false);
//                 setCGST(false);
//                 setIsEditing(false);
//                 generateUniqueNumber();
//                 fetchAdminData(token); // Refresh admin data
//             } else {
//                 showNotification(`Delete Error: ${data.message || data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error('Error deleting data:', err);
//             showNotification('Error deleting data. Check server connection.', 'error');
//         } finally {
//             setFormLoading(false);
//         }
//     };

//     const handleDeleteForm = () => {
//         const docType = invoiceMode ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;

//         if (!documentNumber || !isEditing) {
//             showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
//             return;
//         }
//         showModal(
//             `Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`,
//             'CONFIRM',
//             performActualDeleteForm
//         );
//     };


//     // Fetch invoice/quotation by number (from App.js)
//     const handleSearch = async (docNumber) => {
//         if (typeof docNumber === 'object' || !docNumber) {
//             docNumber = searchNumber;
//         }

//         if (!docNumber) {
//             showNotification("Please enter a document number to search.", 'info');
//             return;
//         }

//         try {
//             setFormLoading(true);
//             setIsEditing(false); 

//             // 1. Try fetching Quotation
//             const quoteUrl = `${BASE_URL}/api/quotation/fetch/${docNumber}`;
//             let response = await fetch(quoteUrl);
//             let result = await response.json();

//             if (response.ok && result.quotation) {
//                 const quote = result.quotation;

//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: quote.billTO || "",
//                     customerAddress: quote.customerAddress || "",
//                     customerGSTIN: quote.customerGSTIN || "",
//                     items: quote.items || [],
//                     associatedQuotationNumber: docNumber,
//                 }));
//                 setSGST(quote.sgst || false);
//                 setCGST(quote.cgst || false);
//                 setOriginalQuotationNumber(quote.quotationNumber);

//                 if (invoiceMode) {
//                     setIsEditing(false);
//                     setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber }));
//                     showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//                 } else {
//                     setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//                     setIsEditing(true);
//                     showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//                 }
//                 return;
//             }

//             // 2. Try fetching Invoice
//             else if (invoiceMode || !quotationMode) {
//                 const invoiceUrl = `${BASE_URL}/api/invoice/fetch/${docNumber}`;
//                 response = await fetch(invoiceUrl);
//                 result = await response.json();

//                 if (response.ok && result.invoice) {
//                     const inv = result.invoice;
//                     setBillDetails(prev => ({
//                         ...prev,
//                         billTO: inv.billTO || "",
//                         customerAddress: inv.customerAddress || "",
//                         customerGSTIN: inv.customerGSTIN || "",
//                         quotationNumber: inv.invoiceNumber,
//                         items: inv.items || [],
//                         associatedQuotationNumber: inv.originalQuotationNumber || '',
//                     }));
//                     setSGST(inv.sgst || false);
//                     setCGST(inv.cgst || false);
//                     setOriginalQuotationNumber(inv.originalQuotationNumber || null);

//                     setIsEditing(true);
//                     showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
//                     return;
//                 }
//             }

//             // If not found
//             setIsEditing(false);
//             setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
//             generateUniqueNumber();
//             showNotification(`Document #${docNumber} not found.`, 'error');

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             showNotification('Error fetching data. Check server connection.', 'error');
//         } finally {
//             setFormLoading(false);
//         }
//     };
//     // --- END Billing Form Logic ---
    

//     // --- Admin List Handlers (Existing Logic - Updated to use Modal/fetchAdminData) ---

//     const performDeleteAdmin = async (type, number, token) => {
//         setDashboardLoading(true);
//         try {
//             const response = await fetch(
//                 `${BASE_URL}/api/admin/${type.toLowerCase()}/${number}`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (data.success) {
//                 showModal(`${type} deleted successfully`, 'ALERT');
//                 fetchAdminData(token);
//             } else {
//                 showModal(data.error || 'Delete failed', 'ALERT');
//             }
//         } catch (err) {
//             showModal('Connection error: Failed to reach API.', 'ALERT');
//         } finally {
//             setDashboardLoading(false);
//         }
//     };

//     const handleDeleteAdmin = (type, number) => {
//         const token = localStorage.getItem('adminToken');
//         if (!token) { showModal("Authentication token missing. Cannot perform delete.", 'ALERT'); return; }

//         showModal(
//             `Are you sure you want to delete ${type} #${number}?`,
//             'CONFIRM',
//             () => performDeleteAdmin(type, number, token)
//         );
//     };
    
//     const handleEditAdmin = (item) => {
//         setEditItem(item);
//         const value = item.invoiceValue !== undefined ? item.invoiceValue : item.quotationValue !== undefined ? item.quotationValue : 0;
//         setEditValue(value);
//     };

//     const saveEditAdmin = async () => {
//         const token = localStorage.getItem('adminToken');
//         if (!token) { showModal("Authentication token missing. Cannot save changes.", 'ALERT'); return; }

//         const type = activeTab === 'invoices' ? 'invoice' : 'quotation';
//         const number = editItem.invoiceNumber || editItem.quotationNumber;
//         setDashboardLoading(true);

//         try {
//             const response = await fetch(
//                 `${BASE_URL}/api/admin/${type}/${number}`,
//                 {
//                     method: 'PUT',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ 
//                         [`${type}Value`]: parseFloat(editValue) 
//                     })
//                 }
//             );

//             const data = await response.json();
//             if (data.success) {
//                 showModal(`${type} updated successfully`, 'ALERT');
//                 setEditItem(null);
//                 fetchAdminData(token);
//             } else {
//                 showModal(data.error || 'Update failed', 'ALERT');
//             }
//         } catch (err) {
//             showModal('Connection error: Failed to update value.', 'ALERT');
//         } finally {
//             setDashboardLoading(false);
//         }
//     };

//     // --- Derived State & Render Helpers ---

//     const totalInvoiceValue = invoices.reduce((sum, item) => sum + (item.invoiceValue || 0), 0);
//     const totalQuotationCount = quotations.length;
    
//     const currentData = activeTab === 'invoices' ? invoices : quotations;

//     const renderDashboard = () => (
//         <div className="max-w-7xl mx-auto px-6 py-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Dashboard Overview</h2>
//             {dashboardError && (
//                 <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border-l-4 border-red-500">
//                     {dashboardError}
//                 </div>
//             )}
//             {dashboardLoading ? (
//                 <div className="text-center py-20">
//                     <Loader size={48} className="text-indigo-600 animate-spin mx-auto mb-4" />
//                     <p className="text-gray-600 font-medium">Loading stats...</p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-blue-500">
//                         <p className="text-gray-500 font-medium">Total Invoices</p>
//                         <p className="text-3xl font-bold text-blue-800">{invoices.length}</p>
//                         <p className="text-sm text-gray-400 mt-1">Total Value: ₹{totalInvoiceValue.toFixed(2)}</p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-green-500">
//                         <p className="text-gray-500 font-medium">Total Quotations</p>
//                         <p className="text-3xl font-bold text-green-800">{totalQuotationCount}</p>
//                         <p className="text-sm text-gray-400 mt-1">Ready for Conversion</p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-purple-500">
//                         <p className="text-gray-500 font-medium">Total Documents</p>
//                         <p className="text-3xl font-bold text-purple-800">{invoices.length + totalQuotationCount}</p>
//                         <p className="text-sm text-gray-400 mt-1">Invoices + Quotations</p>
//                     </div>
//                 </div>
//             )}

//             <div className="bg-white p-6 rounded-lg shadow-xl">
//                 <h3 className="text-xl font-semibold mb-4 text-indigo-700">Quick Actions</h3>
//                 <div className="flex flex-wrap gap-4">
//                     <button
//                         onClick={() => setActiveTab('newBill')}
//                         className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 flex items-center transition font-medium"
//                     >
//                         <PlusSquare size={18} className="mr-2" /> Create New Bill
//                     </button>
//                     <button
//                         onClick={() => setActiveTab('invoices')}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition font-medium"
//                     >
//                         <Receipt size={18} className="mr-2" /> View Invoices
//                     </button>
//                     <button
//                         onClick={() => setActiveTab('quotations')}
//                         className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center transition font-medium"
//                     >
//                         <FileText size={18} className="mr-2" /> View Quotations
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
    
//     const renderDataList = (type) => (
//         <div className="max-w-7xl mx-auto px-6 py-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">
//                 <ClipboardList size={28} className="inline mr-2 text-indigo-600" /> {type === 'invoices' ? "Invoices" : "Quotations"} List
//             </h2>
            
//             <div className="flex mb-6 hide-on-print">
//                 <button
//                     onClick={() => setActiveTab('invoices')}
//                     className={`flex-1 py-3 rounded-l-lg ${
//                         activeTab === 'invoices' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
//                     }`}
//                 >
//                     Invoices
//                 </button>
//                 <button
//                     onClick={() => setActiveTab('quotations')}
//                     className={`flex-1 py-3 rounded-r-lg ${
//                         activeTab === 'quotations' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
//                     }`}
//                 >
//                     Quotations
//                 </button>
//             </div>


//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 {dashboardLoading ? (
//                     <div className="text-center py-20">
//                         <Loader size={48} className="text-indigo-600 animate-spin mx-auto mb-4" />
//                         <p className="text-gray-600 font-medium">Loading data...</p>
//                     </div>
//                 ) : currentData.length === 0 ? (
//                     <div className="text-center py-20 bg-gray-50">
//                         <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
//                             {type === 'invoices' ? (<Receipt className="text-indigo-400" size={40} />) : (<FileText className="text-indigo-400" size={40} />)}
//                         </div>
//                         <p className="text-gray-600 font-bold text-xl">
//                             No {type} found
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-indigo-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Number</th>
//                                     <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Bill To</th>
//                                     <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Address</th>
//                                     <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">GSTIN</th>
//                                     <th className="px-6 py-3 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider">Value</th>
//                                     <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Date</th>
//                                     <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-100">
//                                 {currentData.map((item) => (
//                                     <tr
//                                         key={item.invoiceNumber || item.quotationNumber}
//                                         className="hover:bg-indigo-50 transition duration-150"
//                                     >
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className="px-3 py-1 bg-indigo-700 text-white text-sm font-bold rounded-full">
//                                                 {item.invoiceNumber || item.quotationNumber}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm font-medium text-gray-900">{item.billTO}</div>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm text-gray-600 max-w-xs truncate">{item.customerAddress}</div>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm font-mono text-gray-700">{item.customerGSTIN || 'N/A'}</div>
//                                         </td>
//                                         <td className="px-6 py-4 text-right whitespace-nowrap">
//                                             {editItem &&
//                                                 (editItem.invoiceNumber === item.invoiceNumber ||
//                                                     editItem.quotationNumber === item.quotationNumber) ? (
//                                                 <input
//                                                     type="number"
//                                                     value={editValue}
//                                                     min="0"
//                                                     step="0.01"
//                                                     onChange={(e) => setEditValue(e.target.value)}
//                                                     className="w-28 border-2 border-indigo-300 rounded-lg px-3 py-1 text-sm focus:border-indigo-500 transition"
//                                                     placeholder="New Value"
//                                                 />
//                                             ) : (
//                                                 <span className="text-sm font-bold text-green-600">
//                                                     ₹{(item.invoiceValue || item.quotationValue || 0).toFixed(2)}
//                                                 </span>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 text-center whitespace-nowrap">
//                                             <span className="text-xs text-gray-500">
//                                                 {new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 text-center whitespace-nowrap">
//                                             <div className="flex gap-2 justify-center">
//                                                 {editItem &&
//                                                     (editItem.invoiceNumber === item.invoiceNumber ||
//                                                         editItem.quotationNumber === item.quotationNumber) ? (
//                                                     <>
//                                                         <button onClick={saveEditAdmin} disabled={dashboardLoading} className="bg-green-600 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-700 text-sm font-medium transition disabled:opacity-50">Save</button>
//                                                         <button onClick={() => { setEditItem(null); setEditValue(''); }} disabled={dashboardLoading} className="bg-gray-400 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-500 text-sm font-medium transition disabled:opacity-50">Cancel</button>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <button onClick={() => handleEditAdmin(item)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 text-sm flex items-center gap-1 font-medium transition"><Edit size={14} /> Edit</button>
//                                                         <button onClick={() => handleDeleteAdmin(type === 'invoices' ? 'invoice' : 'quotation', item.invoiceNumber || item.quotationNumber)} className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 text-sm flex items-center gap-1 font-medium transition"><Trash2 size={14} /> Delete</button>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
    
//     const renderChangePassword = () => (
//         <div className="max-w-7xl mx-auto px-6 py-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">🔑 Change Password</h2>
//             <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto">
//                 <p className="text-gray-600 mb-4 font-medium">Update your administrative password.</p>
//                 <form className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Current Password</label>
//                         <input
//                             type="password"
//                             className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                             placeholder="Current Password"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">New Password</label>
//                         <input
//                             type="password"
//                             className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                             placeholder="New Password"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
//                         <input
//                             type="password"
//                             className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                             placeholder="Confirm New Password"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
//                         onClick={(e) => { e.preventDefault(); showModal("Password change functionality is a placeholder. Please implement backend logic.", 'ALERT'); }}
//                     >
//                         Save New Password
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
    
//     const renderNewBillForm = () => (
//         <div className="max-w-7xl mx-auto px-6 py-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">📄 New Bill Creator</h2>
//             <div className="w-full flex items-center justify-center">
//                 <div className="font-sans w-full lg:w-[50rem]">
//                     {/* Search Section */}
//                     <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//                         <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
//                             Search Quotation to Load
//                         </p>
//                         <div className="flex flex-col sm:flex-row items-stretch gap-3">
//                             <input
//                                 type="text"
//                                 placeholder="Enter Quotation Number"
//                                 className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full"
//                                 value={searchNumber}
//                                 onChange={(e) => setSearchNumber(e.target.value)}
//                             />
//                             <button
//                                 onClick={() => handleSearch(searchNumber)}
//                                 disabled={formLoading}
//                                 className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50 font-medium"
//                             >
//                                 {formLoading ? 'Searching...' : 'Search'}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Mode Switch */}
//                     <div className="flex items-center justify-start gap-5 mb-5 font-semibold text-lg">
//                         <button
//                             className={`px-4 py-2 rounded-lg transition-colors ${quotationMode ? "bg-green-600 text-white shadow-md" : "bg-white text-green-700 border-2 border-green-600 hover:bg-green-50"}`}
//                             onClick={() => { setQuotationMode(true); setInvoiceMode(false); }}
//                         >
//                             Quotation
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-lg transition-colors ${invoiceMode ? "bg-green-600 text-white shadow-md" : "bg-white text-green-700 border-2 border-green-600 hover:bg-green-50"}`}
//                             onClick={() => { setQuotationMode(false); setInvoiceMode(true); }}
//                         >
//                             Invoice
//                         </button>
//                     </div>

//                     {/* 1. Document Details Section */}
//                     <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                         <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                             1. {invoiceMode ? "Invoice" : "Quotation"} Details
//                         </p>
//                         <div className="flex items-center justify-start flex-wrap gap-3">
//                             <h1 className="font-medium">{invoiceMode ? "Invoice" : "Quotation"} Number:</h1>
//                             <input
//                                 type="text"
//                                 value={billDetails.quotationNumber}
//                                 placeholder={`Auto-generated`}
//                                 className="outline-none rounded px-3 py-2 border border-blue-500 shadow-md bg-indigo-100 font-bold text-indigo-800"
//                                 readOnly
//                             />

//                             {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
//                             {invoiceMode && (
//                                 <div className="flex items-center gap-3 mt-3">
//                                     <h1 className="font-medium">Quotation Ref:</h1>
//                                     <div className="flex items-center border border-blue-500 rounded shadow-md">
//                                         <input
//                                             type="text"
//                                             value={billDetails.associatedQuotationNumber}
//                                             placeholder={`Enter Q-Number to load`}
//                                             className="outline-none rounded-l px-3 py-2 flex-1"
//                                             onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
//                                         />
//                                         <button
//                                             onClick={() => handleSearch(billDetails.associatedQuotationNumber)}
//                                             disabled={formLoading}
//                                             className="bg-blue-500 text-white px-3 py-2 rounded-r h-full hover:bg-blue-600 disabled:opacity-50"
//                                         >
//                                             Load
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* 2. Recipient Details */}
//                     <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                         <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                             2. Recipient Details
//                         </p>
//                         <div className="flex items-start justify-start flex-wrap gap-5">
//                             <div className="flex items-start justify-center flex-col gap-2">
//                                 <h1 className="font-medium">Bill TO</h1>
//                                 <input type="text" placeholder="Enter Biller Details" className="outline-none rounded px-3 py-2 border border-blue-500 shadow-md" value={billDetails.billTO} onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })} />
//                             </div>
//                             <div className="flex items-start justify-center flex-col gap-2">
//                                 <h1 className="font-medium">Address</h1>
//                                 <input type="text" placeholder="Enter Biller Address" className="outline-none rounded px-3 py-2 border border-blue-500 shadow-md" value={billDetails.customerAddress} onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })} />
//                             </div>
//                             <div className="flex items-start justify-center flex-col gap-2">
//                                 <h1 className="font-medium">Customer GSTIN</h1>
//                                 <input type="text" placeholder="Enter Customer GSTIN" className="outline-none rounded px-3 py-2 border border-blue-500 shadow-md" value={billDetails.customerGSTIN} onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })} />
//                             </div>
//                         </div>
//                     </div>

//                     {/* 3. Items Section */}
//                     <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                         <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
//                             <div className="flex flex-row items-center justify-between w-full pb-3">
//                                 <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>
//                                 <div className="flex gap-3">
//                                     {isItemEditing && (
//                                         <button type="button" onClick={() => { setIsItemEditing(false); setEditingItemOriginal(null); setTableItems({ description: "", quantity: "", unitPrice: "" }); }} className="bg-yellow-500 px-4 py-2 rounded-md text-white shadow-md hover:bg-yellow-600 font-medium">Cancel Edit</button>
//                                     )}
//                                     <button type="submit" className={`px-4 py-2 rounded-md text-white shadow-md font-medium ${isItemEditing ? 'bg-orange-400 hover:bg-orange-500' : 'bg-green-600 hover:bg-green-700'}`}>
//                                         {isItemEditing ? 'Update Item' : 'Add Item'}
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="flex items-center justify-start flex-wrap gap-5">
//                                 <div className="flex items-start justify-center flex-col gap-2"><h1 className="font-medium">Description</h1><input type="text" required value={tableItems.description} placeholder="Enter Description" className="outline-none rounded px-3 py-2 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })} /></div>
//                                 <div className="flex items-start justify-center flex-col gap-2"><h1 className="font-medium">Quantity</h1><input type="number" required value={tableItems.quantity} placeholder="Enter Quantity" className="outline-none rounded px-3 py-2 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })} /></div>
//                                 <div className="flex items-start justify-center flex-col gap-2"><h1 className="font-medium">Unit Price (₹)</h1><input type="number" required value={tableItems.unitPrice} placeholder="Single Price" className="outline-none rounded px-3 py-2 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })} /></div>
//                             </div>
//                         </form>

//                         {/* Items Table Display */}
//                         {billDetails.items.length > 0 && (
//                             <div className="overflow-x-scroll w-full py-5">
//                                 <div className="w-full min-w-[50rem]">
//                                     <table className="w-full border-collapse border border-blue-500">
//                                         <tbody className="w-full">
//                                             <tr className="bg-indigo-100 font-bold border border-blue-500">
//                                                 <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
//                                                 <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
//                                                 <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
//                                                 <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td>
//                                                 <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td>
//                                                 <td className="px-3 w-[5%] text-center">Action</td>
//                                             </tr>
//                                             {billDetails.items.map((item, index) => (
//                                                 <tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}>
//                                                     <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
//                                                     <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                                                     <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
//                                                     <td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
//                                                     <td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
//                                                     <td className="px-3">
//                                                         <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs inline-block" onClick={(e) => { e.stopPropagation(); handleItem(item); }}>Delete</p>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* 4. GST Info */}
//                     <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                         <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
//                         <div className="flex items-center justify-start gap-5 mt-3">
//                             <button type="button" onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-600"} text-white px-5 py-2 rounded-lg duration-300 cursor-pointer font-medium shadow-md`}>SGST {sgst ? 'ON' : 'OFF'}</button>
//                             <button type="button" onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-600"} text-white px-5 py-2 rounded-lg duration-300 cursor-pointer font-medium shadow-md`}>CGST {cgst ? 'ON' : 'OFF'}</button>
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-3">
//                         {/* Save/Update Button */}
//                         <button
//                             onClick={handleSaveOrUpdate}
//                             disabled={formLoading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
//                             className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
//                         >
//                             {formLoading ? <Loader size={20} className="animate-spin" /> : isEditing ? 'Update Document' : 'Save Document'}
//                         </button>

//                         {/* Delete Button (Visible only in Editing mode) */}
//                         {isEditing && (
//                             <button
//                                 onClick={handleDeleteForm}
//                                 disabled={formLoading}
//                                 className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
//                             >
//                                 {formLoading ? 'Deleting...' : 'Delete Document'}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Print Trigger Button */}
//             <ReactToPrint
//                 trigger={() => (
//                     <button className="text-white bg-red-600 font-medium px-6 py-2 rounded-lg mb-5 mt-5 shadow-lg hover:bg-red-700 transition">
//                         Print Receipt
//                     </button>
//                 )}
//                 content={() => printRef.current}
//                 pageStyle="@page { size: A4 portrait; margin: 20mm; } body { margin: 20px; }"
//             />

//             {/* --- PDF/Print PREVIEW Area (Hidden from Print-Friendly UI) --- */}
//             <div className="w-full bg-white flex items-center justify-center">
//                 <div className="w-full xl:w-[60rem] border border-gray-300 shadow-xl">
//                     <div ref={printRef} className="flex flex-col w-[60rem] bg-white text-black printable-content">

//                         {/* Header Row */}
//                         <div className="flex flex-row h-[15rem] text-sm">
//                             <div className="h-full w-[20rem] border border-black">
//                                 <div className="flex items-center justify-center h-[30%]">
//                                     <p className="text-center font-bold text-2xl">{invoiceMode ? "TAX INVOICE" : "QUOTATION"}</p>
//                                 </div>
//                                 <div className="h-[70%] border-t border-black px-5 py-2">
//                                     <p className="font-semibold text-lg">Bill to:</p>
//                                     {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                                     <p>{billDetails.billTO}</p>
//                                     <p>{billDetails.customerAddress}</p>
//                                     {invoiceMode && billDetails.associatedQuotationNumber && (
//                                         <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="h-full w-[40rem] border border-black flex flex-col justify-between">
//                                 <div className="p-5 flex items-center justify-between">
//                                     <div className="w-[70%] text-sm">
//                                         <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                                         <p className="font-medium">DESIGN BLOCKS</p>
//                                         <p className="font-semibold text-lg pt-2">Address:</p>
//                                         <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                                     </div>
//                                     <div className="w-[100px] h-[100px] flex items-center justify-center">
//                                         <img
//                                             src="https://designblocks.in/img/DB.png"
//                                             alt="Design Blocks Logo"
//                                             className="w-full h-auto object-contain"
//                                             onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO"; }}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-between h-10 px-5 border-t border-black text-sm">
//                                     <p className="font-semibold text-lg">{invoiceMode ? "Invoice" : "Quotation"} No: <span className="font-normal">{billDetails.quotationNumber}</span></p>
//                                     <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="h-10 w-full border-x border-black"></div>

//                         {/* Items Table */}
//                         <table className="w-[60rem] text-sm">
//                             <thead>
//                                 <tr className="h-10 bg-gray-100 font-bold">
//                                     <td className="border border-black text-center w-[5%]">Item</td>
//                                     <td className="border border-black text-center w-[30rem]">Description</td>
//                                     <td className="border border-black text-center w-[10%]">Quantity</td>
//                                     <td className="border border-black text-center w-[15%]">Unit Price (Rs.)</td>
//                                     <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
//                                 </tr>
//                             </thead>
//                             <tbody className="border border-black">
//                                 {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
//                                     <tr key={key} className="h-10">
//                                         <td className="text-center border border-black">{key + 1}.</td>
//                                         <td className="px-2 border border-black">{items.description}</td>
//                                         <td className="px-2 border border-black text-center">{items.quantity}</td>
//                                         <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
//                                         <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
//                                     </tr>
//                                 )) : (
//                                     <tr className="h-20">
//                                         <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
//                                     </tr>
//                                 )}

//                                 {/* Totals */}
//                                 <tr className="border border-black h-10 bg-yellow-50">
//                                     <td colSpan={3}></td>
//                                     <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                                     <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                                 </tr>

//                                 {sgst && (
//                                     <tr className="h-8 border border-black">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                                         <td className="border border-black px-2 text-right font-medium">{SGSTAmount}</td>
//                                     </tr>
//                                 )}
//                                 {cgst && (
//                                     <tr className="h-8 border border-black">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                                         <td className="border border-black px-2 text-right font-medium">{CGSTAmount}</td>
//                                     </tr>
//                                 )}

//                                 {(cgst || sgst) && (
//                                     <tr className="border border-black h-10 bg-blue-100">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
//                                         <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                                     </tr>
//                                 )}

//                                 <tr className="border border-black h-10">
//                                     <td colSpan={5} className="px-2">
//                                         <span className="font-semibold">In Words: </span>
//                                         <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                                     </td>
//                                 </tr>

//                                 {/* Bank Details & Signature */}
//                                 <tr>
//                                     <td colSpan={5} className="p-2 border-t border-black text-xs">
//                                         <div className="flex justify-between">
//                                             <div className="w-1/2">
//                                                 <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                                                 <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                                                 <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                                                 <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                                             </div>
//                                             <div className="w-1/2 text-right pt-6">
//                                                 <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                                                 <p className="mt-6 text-gray-500">(Authorized Signatory)</p>
//                                             </div>
//                                         </div>
//                                         <div className="text-center mt-3 font-semibold">Thank You</div>
//                                     </td>
//                                 </tr>

//                                 {quotationMode && (
//                                     <tr>
//                                         <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                                             <div className="text-sm">
//                                                 <p className="font-semibold mb-1">Terms and Conditions.</p>
//                                                 <p>Quotation prices are valid for 20 days from the date of issue.</p>
//                                                 <p>Any increase in project scope will result in an additional cost.</p>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
    
//     // --- Main Admin Panel Structure ---
    
//     const SidebarItem = ({ icon: Icon, label, tab }) => (
//         <button
//             onClick={() => {
//                 setActiveTab(tab);
//                 // Reset form modes when navigating away from New Bill
//                 if (tab !== 'newBill') {
//                     setQuotationMode(true);
//                     setInvoiceMode(false);
//                 }
//             }}
//             className={`w-full flex items-center p-3 text-sm font-medium rounded-lg transition duration-150 ${activeTab === tab ? 'bg-indigo-700 shadow-md' : 'hover:bg-indigo-700'
//                 }`}
//         >
//             <Icon size={18} className="mr-3" />
//             {label}
//         </button>
//     );

//     const Sidebar = () => (
//         <div className="w-64 bg-indigo-900 text-white flex flex-col h-screen sticky top-0 shadow-2xl hide-on-print">
//             <div className="p-5 text-2xl font-extrabold border-b border-indigo-800">
//                 <span className="text-indigo-300">Admin</span> Portal
//             </div>
//             <nav className="flex-1 p-4 space-y-2">
//                 <SidebarItem icon={Home} label="Dashboard" tab="dashboard" />
//                 <SidebarItem icon={Receipt} label="Invoices List" tab="invoices" />
//                 <SidebarItem icon={FileText} label="Quotations List" tab="quotations" />
//                 <SidebarItem icon={PlusSquare} label="Create New Bill" tab="newBill" />
//                 <SidebarItem icon={Lock} label="Change Password" tab="changePassword" />
//             </nav>
//             <div className="p-4 border-t border-indigo-800">
//                 <button
//                     onClick={onLogout}
//                     className="w-full flex items-center p-3 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition duration-150 shadow-lg"
//                 >
//                     <LogOut size={18} className="mr-3" />
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'dashboard':
//                 return renderDashboard();
//             case 'invoices':
//                 return renderDataList('invoices');
//             case 'quotations':
//                 return renderDataList('quotations');
//             case 'newBill':
//                 return renderNewBillForm();
//             case 'changePassword':
//                 return renderChangePassword();
//             default:
//                 return renderDashboard();
//         }
//     };

//     return (
//         <div className="min-h-screen flex bg-gray-100 font-sans">
//             {/* Modal for all custom alerts/confirms */}
//             <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
            
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Main Content Area */}
//             <div className="flex-1 overflow-y-auto">
//                 {/* Header (Minimal) */}
//                 <header className="bg-white text-gray-800 shadow-md p-4 sticky top-0 z-10 border-b hide-on-print">
//                     <div className="max-w-7xl mx-auto flex justify-between items-center">
//                         <h1 className="text-xl font-bold capitalize text-indigo-800">
//                             {activeTab.replace(/([A-Z])/g, ' $1').trim()}
//                         </h1>
//                     </div>
//                 </header>

//                 <main>
//                     {renderContent()}
//                 </main>
//             </div>
//         </div>
//     );
// }

// export default AdminPanel;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Lock,
    LogOut,
    FileText,
    Receipt,
    Trash2,
    Edit,
    User,
    Home,
    PlusSquare,
    ClipboardList,
    AlertTriangle,
    CheckCircle,
    X,
    Loader,
    Menu
} from 'lucide-react';
import ReactToPrint from "react-to-print";

// --- CONFIGURATION ---
const BASE_URL = `https://invoice-dbinvoice-backend.onrender.com`;

// --- Utility: Number to Words Converter (Copied from App.js) ---
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

    if (integer > 999999999) return 'Value too large';

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


// --- Component: Modal (Custom Alert/Confirm - Copied from App.js) ---
const Modal = ({ state, onClose, onConfirm }) => {
    if (!state.isVisible) return null;

    const isConfirm = state.type === 'CONFIRM';

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 font-sans hide-on-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                {/* Header */}
                <div className={`flex items-center p-4 ${isConfirm ? 'bg-red-500' : 'bg-indigo-600'} text-white`}>
                    {isConfirm ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                    <h3 className="ml-3 text-lg font-semibold">
                        {isConfirm ? 'Confirm Action' : 'Notification'}
                    </h3>
                    <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 text-gray-700">
                    <p>{state.message}</p>
                </div>

                {/* Footer */}
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
                            if (isConfirm && onConfirm) {
                                onConfirm();
                            }
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


// --- Component: AdminPanel ---
function AdminPanel({ onLogout }) {
    // --- Admin Dashboard State (Existing Logic) ---
    const [activeTab, setActiveTab] = useState('dashboard');
    const [invoices, setInvoices] = useState([]);
    const [quotations, setQuotations] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(false);
    const [dashboardError, setDashboardError] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [editValue, setEditValue] = useState('');
    
    // --- Billing Form State (Copied from App.js) ---
    const date = new Date();
    const printRef = useRef(null);
    const [quotation, setQuotation] = useState(true);
    const [invoice, setInvoice] = useState(false);
    const [sgst, setSGST] = useState(false);
    const [cgst, setCGST] = useState(false);
    const [taxableValue, setTaxableValue] = useState(0);
    const [invoiceValue, setInvoiceValue] = useState(0);
    const [SGSTAmount, setSGSTAmount] = useState(0); 
    const [CGSTAmount, setCGSTAmount] = useState(0); 
    const [searchNumber, setSearchNumber] = useState("");
    const [formLoading, setFormLoading] = useState(false); // Loading for form actions
    const [isEditing, setIsEditing] = useState(false);
    const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);
    const [isItemEditing, setIsItemEditing] = useState(false);
    const [editingItemOriginal, setEditingItemOriginal] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // NEW: Mobile sidebar state

    const [billDetails, setBillDetails] = useState({
        billTO: "",
        customerAddress: "",
        customerGSTIN: "",
        quotationNumber: "",
        associatedQuotationNumber: "",
        items: [],
    });

    const [tableItems, setTableItems] = useState({
        description: "",
        quantity: "",
        unitPrice: "",
    });

    // --- NEW: Change Password State ---
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // --- Modal State (Custom Alert/Confirm) ---
    const [modalState, setModalState] = useState({
        isVisible: false,
        message: '',
        type: 'ALERT',
        onConfirm: null,
    });

    const closeModal = useCallback(() => {
        setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
    }, []);

    const showModal = useCallback((message, type = 'ALERT', callback = null) => {
        setModalState({
            isVisible: true,
            message,
            type,
            onConfirm: callback,
        });
    }, []);

    const showNotification = (message, type) => {
        showModal(message, 'ALERT');
    };
    
    // ----------------------------------------------------
    // --- Data Fetching Logic (Admin Dashboard & Lists) ---
    // ----------------------------------------------------
    const fetchAdminData = useCallback(async (token) => {
        setDashboardLoading(true);
        setDashboardError('');
        try {
            // Fetch ALL data needed for dashboard and lists
            // CHANGED API ENDPOINTS: /api/admin/invoice -> /api/admin/invoices (Plural for list fetch)
            // CHANGED API ENDPOINTS: /api/admin/quotation -> /api/admin/quotations (Plural for list fetch)
            const [invoicesResponse, quotationsResponse] = await Promise.all([
                fetch(`${BASE_URL}/api/admin/invoice`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${BASE_URL}/api/admin/quotation`, { headers: { Authorization: `Bearer ${token}` } })
            ]);

            const invoicesData = await invoicesResponse.json();
            const quotationsData = await quotationsResponse.json();

            if (invoicesResponse.ok && invoicesData.success) {
                setInvoices(invoicesData.invoices);
            } else {
                console.error("Failed to fetch invoices:", invoicesData.error || invoicesData.message);
                setDashboardError(prev => prev + ' Failed to load invoices data. ');
            }
            if (quotationsResponse.ok && quotationsData.success) {
                setQuotations(quotationsData.quotations);
            } else {
                console.error("Failed to fetch quotations:", quotationsData.error || quotationsData.message);
                setDashboardError(prev => prev + ' Failed to load quotations data. ');
            }

        } catch (err) {
            setDashboardError('Failed to fetch dashboard data. Check network connection.');
            console.error('Admin Data Fetch Error:', err);
        } finally {
            setDashboardLoading(false);
        }
    }, []);

    // Initial Data Fetch Effect
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            // Check if we are on a list tab before forcing a refetch on render
            if (activeTab === 'invoices' || activeTab === 'quotations' || activeTab === 'dashboard') {
                fetchAdminData(token);
            }
        } else {
            setDashboardError("Unauthorized access. Token missing.");
        }
    }, [activeTab, fetchAdminData]); 


    // ----------------------------------------------------
    // --- Billing Form Logic (Copied from App.js) ---
    // ----------------------------------------------------

    // Generate unique invoice/quotation number
    const generateUniqueNumber = useCallback(async () => {
        try {
            const url = quotation
                ? `${BASE_URL}/api/quotation/generate`
                : `${BASE_URL}/api/invoice/generate`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setBillDetails(prev => ({
                    ...prev,
                    quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
                }));
            }
        } catch (error) {
            console.error("Number generation failed", error);
            showNotification("Error connecting to backend for number generation.", 'error');
        }
    }, [quotation, showNotification]);

    // Effect to reset form state when entering 'newBill' tab or switching modes
    useEffect(() => {
        if (activeTab === 'newBill') {
            setBillDetails(prev => ({
                ...prev,
                billTO: "",
                customerAddress: "",
                customerGSTIN: "",
                items: [],
                associatedQuotationNumber: "",
            }));
            setSGST(false);
            setCGST(false);
            setTaxableValue(0);
            setInvoiceValue(0);
            setOriginalQuotationNumber(null);
            setSearchNumber("");
            setIsEditing(false);
            setIsItemEditing(false);
            setEditingItemOriginal(null);

            generateUniqueNumber();
        }
    }, [activeTab, quotation, invoice, generateUniqueNumber]);

    // Calculation effect
    useEffect(() => {
        if (activeTab === 'newBill') {
            const newTaxableValue = billDetails.items.reduce((acc, item) => {
                const quantity = Number(item.quantity) || 0;
                const unitPrice = Number(item.unitPrice) || 0;
                return acc + quantity * unitPrice;
            }, 0);

            const gstRate = 0.09;
            const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
            const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;

            const totalValue = newTaxableValue + currentSGST + currentCGST;

            setSGSTAmount(currentSGST.toFixed(2));
            setCGSTAmount(currentCGST.toFixed(2));
            setTaxableValue(newTaxableValue);
            setInvoiceValue(totalValue);
        }
    }, [billDetails.items, cgst, sgst, activeTab]);


    // Handles adding/updating item in the form
    const handleAddItem = (e) => {
        e.preventDefault();
        setIsItemEditing(false);
        setEditingItemOriginal(null);

        setBillDetails({
            ...billDetails,
            items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice), id: Date.now() }],
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
            const updatedItems = [...billDetails.items];
            updatedItems[index] = {
                ...updatedItems[index],
                description: tableItems.description,
                quantity: Number(tableItems.quantity),
                unitPrice: Number(tableItems.unitPrice)
            };

            setBillDetails({ ...billDetails, items: updatedItems });
        }

        setTableItems({ description: "", quantity: "", unitPrice: "" });
        setIsItemEditing(false);
        setEditingItemOriginal(null);
    };

    const handleItem = (item) => {
        let removedArray = billDetails.items.filter(e => e !== item);
        setBillDetails({ ...billDetails, items: removedArray });
    };

    // Handle Update Logic (from App.js)
    const handleUpdateForm = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) { showNotification("Authentication token missing. Cannot update.", 'error'); return; }

        try {
            setFormLoading(true);

            const documentNumber = billDetails.quotationNumber;
            const urlPath = invoice ? "invoice/update" : "quotation/update";
            const url = `${BASE_URL}/api/${urlPath}`;

            const body = {
                [invoice ? "invoiceNumber" : "quotationNumber"]: documentNumber,
                billTO: billDetails.billTO,
                customerAddress: billDetails.customerAddress,
                customerGSTIN: billDetails.customerGSTIN,
                items: billDetails.items,
                sgst: sgst,
                cgst: cgst,
                taxableValue: taxableValue,
                SGSTAmount: SGSTAmount,
                CGSTAmount: CGSTAmount,
                invoiceValue: invoiceValue,
                originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
            };

            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (data.success) {
                showNotification(`${invoice ? "Invoice" : "Quotation"} #${documentNumber} updated successfully!`, 'success');
                fetchAdminData(token); // Refresh admin data
            } else {
                showNotification(`Update Error: ${data.message || data.error}`, 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification("Unexpected error during update.", 'error');
        } finally {
            setFormLoading(false);
        }
    };

    // Save/Update Handler (from App.js)
    const handleSaveOrUpdate = () => {
        if (isEditing) {
            handleUpdateForm();
        } else {
            handleSaveForm();
        }
    };

    // Save invoice/quotation to backend (from App.js)
    const handleSaveForm = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) { showNotification("Authentication token missing. Cannot save.", 'error'); return; }

        try {
            setFormLoading(true);

            const body = {
                billTO: billDetails.billTO,
                customerAddress: billDetails.customerAddress,
                customerGSTIN: billDetails.customerGSTIN,
                items: billDetails.items,
                sgst: sgst,
                cgst: cgst,
                taxableValue: taxableValue,
                SGSTAmount: SGSTAmount,
                CGSTAmount: CGSTAmount,
                invoiceValue: invoiceValue,
                invoiceNumber: billDetails.quotationNumber,
                originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
            };

            const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
            delete finalBody.invoiceNumber;

            const url = quotation
                ? `${BASE_URL}/api/quotation/save`
                : `${BASE_URL}/api/invoice/save`;

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(finalBody)
            });

            const data = await res.json();

            if (data.success) {
                const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
                showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
                setIsEditing(true);
                setBillDetails(prev => ({ ...prev, quotationNumber: savedNumber, }));
                fetchAdminData(token); // Refresh admin data
            } else {
                showNotification(`Save Error: ${data.error}`, 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification("Unexpected error during save.", 'error');
        } finally {
            setFormLoading(false);
        }
    };

    // Handle Delete Logic (from App.js)
    const performActualDeleteForm = async () => {
        const docType = invoice ? "Invoice" : "Quotation";
        const documentNumber = billDetails.quotationNumber;
        const token = localStorage.getItem('adminToken');
        
        try {
            setFormLoading(true);
            const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
            const url = `${BASE_URL}/api/${urlPath}`;

            const response = await fetch(url, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
            const data = await response.json();

            if (response.ok && data.success) {
                showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
                setBillDetails(prev => ({
                    ...prev,
                    billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
                }));
                setSGST(false);
                setCGST(false);
                setIsEditing(false);
                generateUniqueNumber();
                fetchAdminData(token); // Refresh admin data
            } else {
                showNotification(`Delete Error: ${data.message || data.error}`, 'error');
            }
        } catch (err) {
            console.error('Error deleting data:', err);
            showNotification('Error deleting data. Check server connection.', 'error');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteForm = () => {
        const docType = invoice ? "Invoice" : "Quotation";
        const documentNumber = billDetails.quotationNumber;

        if (!documentNumber || !isEditing) {
            showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
            return;
        }
        showModal(
            `Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`,
            'CONFIRM',
            performActualDeleteForm
        );
    };


    // Fetch invoice/quotation by number (from App.js)
    const handleSearch = async (docNumber) => {
        if (typeof docNumber === 'object' || !docNumber) {
            docNumber = searchNumber;
        }

        if (!docNumber) {
            showNotification("Please enter a document number to search.", 'info');
            return;
        }

        try {
            setFormLoading(true);
            setIsEditing(false); 
            const token = localStorage.getItem('adminToken'); // Token required for search if using protected routes

            // 1. Try fetching Quotation (Using /quotation/fetch/ as per your initial App.js logic structure)
            const quoteUrl = `${BASE_URL}/api/quotation/fetch/${docNumber}`;
            let response = await fetch(quoteUrl, { headers: { "Authorization": `Bearer ${token}` } });
            let result = await response.json();

            if (response.ok && result.quotation) {
                const quote = result.quotation;

                setBillDetails(prev => ({
                    ...prev,
                    billTO: quote.billTO || "",
                    customerAddress: quote.customerAddress || "",
                    customerGSTIN: quote.customerGSTIN || "",
                    items: quote.items || [],
                    associatedQuotationNumber: docNumber,
                }));
                setSGST(quote.sgst || false);
                setCGST(quote.cgst || false);
                setOriginalQuotationNumber(quote.quotationNumber);

                if (invoice) {
                    setIsEditing(false);
                    setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber }));
                    showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
                } else {
                    setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
                    setIsEditing(true);
                    showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
                }
                return;
            }

            // 2. Try fetching Invoice (Using /invoice/fetch/ as per your initial App.js logic structure)
            else if (invoice || !quotation) {
                const invoiceUrl = `${BASE_URL}/api/invoice/fetch/${docNumber}`;
                response = await fetch(invoiceUrl, { headers: { "Authorization": `Bearer ${token}` } });
                result = await response.json();

                if (response.ok && result.invoice) {
                    const inv = result.invoice;
                    setBillDetails(prev => ({
                        ...prev,
                        billTO: inv.billTO || "",
                        customerAddress: inv.customerAddress || "",
                        customerGSTIN: inv.customerGSTIN || "",
                        quotationNumber: inv.invoiceNumber,
                        items: inv.items || [],
                        associatedQuotationNumber: inv.originalQuotationNumber || '',
                    }));
                    setSGST(inv.sgst || false);
                    setCGST(inv.cgst || false);
                    setOriginalQuotationNumber(inv.originalQuotationNumber || null);

                    setIsEditing(true);
                    showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
                    return;
                }
            }

            // If not found
            setIsEditing(false);
            setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
            generateUniqueNumber();
            showNotification(`Document #${docNumber} not found.`, 'error');

        } catch (error) {
            console.error('Error fetching data:', error);
            showNotification('Error fetching data. Check server connection.', 'error');
        } finally {
            setFormLoading(false);
        }
    };
    // ----------------------------------------------------
    // --- END Billing Form Logic ---
    // ----------------------------------------------------

    // --- Admin List Handlers (Updated to use Modal/fetchAdminData) ---

    const performDeleteAdmin = async (type, number, token) => {
        setDashboardLoading(true);
        try {
            // CHANGED API ENDPOINT: /api/admin/type -> /api/admin/types (Plural convention)
            const response = await fetch(
                `${BASE_URL}/api/admin/${type.toLowerCase()}s/${number}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                showModal(`${type} deleted successfully`, 'ALERT');
                fetchAdminData(token);
            } else {
                showModal(data.error || 'Delete failed', 'ALERT');
            }
        } catch (err) {
            showModal('Connection error: Failed to reach API.', 'ALERT');
        } finally {
            setDashboardLoading(false);
        }
    };

    const handleDeleteAdmin = (type, number) => {
        const token = localStorage.getItem('adminToken');
        if (!token) { showModal("Authentication token missing. Cannot perform delete.", 'ALERT'); return; }

        showModal(
            `Are you sure you want to delete ${type} #${number}?`,
            'CONFIRM',
            () => performDeleteAdmin(type, number, token)
        );
    };
    
    const handleEditAdmin = (item) => {
        setEditItem(item);
        const value = item.invoiceValue !== undefined ? item.invoiceValue : item.quotationValue !== undefined ? item.quotationValue : 0;
        setEditValue(value);
    };

    const saveEditAdmin = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) { showModal("Authentication token missing. Cannot save changes.", 'ALERT'); return; }

        const type = activeTab === 'invoices' ? 'invoice' : 'quotation';
        const number = editItem.invoiceNumber || editItem.quotationNumber;
        setDashboardLoading(true);

        try {
            // CHANGED API ENDPOINT: /api/admin/type -> /api/admin/types (Plural convention)
            const response = await fetch(
                `${BASE_URL}/api/admin/${type}s/${number}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        [`${type}Value`]: parseFloat(editValue) 
                    })
                }
            );

            const data = await response.json();
            if (data.success) {
                showModal(`${type} updated successfully`, 'ALERT');
                setEditItem(null);
                fetchAdminData(token);
            } else {
                showModal(data.error || 'Update failed', 'ALERT');
            }
        } catch (err) {
            showModal('Connection error: Failed to update value.', 'ALERT');
        } finally {
            setDashboardLoading(false);
        }
    };

    // ----------------------------------------------------
    // --- NEW: Change Password Logic ---
    // ----------------------------------------------------
    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitPasswordChange = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = passwordForm;

        if (newPassword !== confirmNewPassword) {
            showNotification("New password and confirmation password do not match.", 'ALERT');
            return;
        }
        if (newPassword.length < 6) {
            showNotification("New password must be at least 6 characters long.", 'ALERT');
            return;
        }

        const token = localStorage.getItem('adminToken');
        if (!token) {
            showNotification("Authentication token missing. Please log in again.", 'ALERT');
            return;
        }

        setPasswordLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/admin/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showNotification("Password changed successfully!", 'ALERT');
                // Clear the form
                setPasswordForm({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
            } else {
                showNotification(`Password Change Failed: ${data.error || data.message || "An unknown error occurred."}`, 'ALERT');
            }
        } catch (error) {
            console.error("Change password error:", error);
            showNotification("Network error. Could not connect to the server.", 'ALERT');
        } finally {
            setPasswordLoading(false);
        }
    };
    // ----------------------------------------------------
    // --- END Change Password Logic ---
    // ----------------------------------------------------


    // ----------------------------------------------------
    // --- Derived State & Render Helpers ---
    // ----------------------------------------------------

    const totalInvoiceValue = invoices.reduce((sum, item) => sum + (item.invoiceValue || 0), 0);
    // Total Quotation Value calculation remains correct
    const totalQuotationValue = quotations.reduce((sum, item) => sum + (item.quotationValue || 0), 0);
    
    // Total Quotation Count calculation remains correct
    const totalQuotationCount = quotations.length;
    
    const adminListData = activeTab === 'invoices' ? invoices : quotations;

    const renderDashboard = () => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Dashboard Overview</h2>
            {dashboardError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm border-l-4 border-red-500 shadow-md">
                    <AlertTriangle size={20} className="inline mr-2" />
                    {dashboardError}
                </div>
            )}
            {dashboardLoading ? (
                <div className="text-center py-20">
                    <Loader size={48} className="text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading stats...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-blue-500">
                        <p className="text-gray-500 font-medium">Total Invoices</p>
                        <p className="text-3xl font-bold text-blue-800">{invoices.length}</p>
                        {/* Showing Total Invoice Value */}
                        <p className="text-sm text-gray-400 mt-1">Total Value: ₹{totalInvoiceValue.toFixed(2)}</p>
                    </div>
                    {/* Quotations Card */}
                    <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-green-500">
                        <p className="text-gray-500 font-medium">Total Quotations</p>
                        {/* totalQuotationCount should show the number of items in the array */}
                        <p className="text-3xl font-bold text-green-800">{totalQuotationCount}</p>
                        {/* Showing Total Quotation Value */}
                        <p className="text-sm text-gray-400 mt-1">Total Value: ₹{totalQuotationValue.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-purple-500">
                        <p className="text-gray-500 font-medium">Total Documents</p>
                        <p className="text-3xl font-bold text-purple-800">{invoices.length + totalQuotationCount}</p>
                        <p className="text-sm text-gray-400 mt-1">Invoices + Quotations</p>
                    </div>
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setActiveTab('newBill')}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 flex items-center transition font-medium"
                    >
                        <PlusSquare size={18} className="mr-2" /> Create New Bill
                    </button>
                    <button
                        onClick={() => setActiveTab('invoices')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition font-medium"
                    >
                        <Receipt size={18} className="mr-2" /> View Invoices
                    </button>
                </div>
            </div>
        </div>
    );
    
    const renderDataList = (type) => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                <ClipboardList size={28} className="inline mr-2 text-indigo-600" /> {type === 'invoices' ? "Invoices" : "Quotations"} List
            </h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {dashboardLoading ? (
                    <div className="text-center py-20">
                        <Loader size={48} className="text-indigo-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Loading data...</p>
                    </div>
                ) : adminListData.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50">
                        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
                            {type === 'invoices' ? (<Receipt className="text-indigo-400" size={40} />) : (<FileText className="text-indigo-400" size={40} />)}
                        </div>
                        <p className="text-gray-600 font-bold text-xl">
                            No {type} found
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Bill To</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">GSTIN</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider">Value</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {adminListData.map((item) => (
                                    <tr
                                        key={item.invoiceNumber || item.quotationNumber}
                                        className="hover:bg-indigo-50 transition duration-150"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-indigo-700 text-white text-sm font-bold rounded-full">
                                                {item.invoiceNumber || item.quotationNumber}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.billTO}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-xs truncate">{item.customerAddress}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-mono text-gray-700">{item.customerGSTIN || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            {editItem &&
                                                (editItem.invoiceNumber === item.invoiceNumber ||
                                                    editItem.quotationNumber === item.quotationNumber) ? (
                                                    <input
                                                        type="number"
                                                        value={editValue}
                                                        min="0"
                                                        step="0.01"
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        className="w-28 border-2 border-indigo-300 rounded-lg px-3 py-1 text-sm focus:border-indigo-500 transition"
                                                        placeholder="New Value"
                                                    />
                                                ) : (
                                                    <span className="text-sm font-bold text-green-600">
                                                        {/* Check which value field to display */}
                                                        ₹{(item.invoiceValue !== undefined ? item.invoiceValue : item.quotationValue || 0).toFixed(2)}
                                                    </span>
                                                )}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <span className="text-xs text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <div className="flex gap-2 justify-center">
                                                {editItem &&
                                                    (editItem.invoiceNumber === item.invoiceNumber ||
                                                        editItem.quotationNumber === item.quotationNumber) ? (
                                                        <>
                                                            <button onClick={saveEditAdmin} disabled={dashboardLoading} className="bg-green-600 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-700 text-sm font-medium transition disabled:opacity-50">Save</button>
                                                            <button onClick={() => { setEditItem(null); setEditValue(''); }} disabled={dashboardLoading} className="bg-gray-400 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-500 text-sm font-medium transition disabled:opacity-50">Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => handleEditAdmin(item)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 text-sm flex items-center gap-1 font-medium transition"><Edit size={14} /> Edit</button>
                                                            <button onClick={() => handleDeleteAdmin(type === 'invoices' ? 'invoice' : 'quotation', item.invoiceNumber || item.quotationNumber)} className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 text-sm flex items-center gap-1 font-medium transition"><Trash2 size={14} /> Delete</button>
                                                        </>
                                                    )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
    
    const renderChangePassword = () => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🔑 Change Password</h2>
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto">
                <p className="text-gray-600 mb-4 font-medium">Update your administrative password.</p>
                <form className="space-y-6" onSubmit={handleSubmitPasswordChange}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwordForm.oldPassword}
                            onChange={handlePasswordChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Current Password"
                            disabled={passwordLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            required
                            minLength={6}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="New Password (min 6 characters)"
                            disabled={passwordLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={passwordForm.confirmNewPassword}
                            onChange={handlePasswordChange}
                            required
                            minLength={6}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Confirm New Password"
                            disabled={passwordLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md disabled:bg-indigo-400"
                        disabled={passwordLoading || !passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmNewPassword}
                    >
                        {passwordLoading ? (
                            <Loader size={20} className="animate-spin mx-auto" />
                        ) : (
                            'Save New Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
    
    const renderNewBillForm = () => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📄 New Bill Creator</h2>
            <div className="w-full flex items-center justify-center">
                {/* Changed fixed width lg:w-[50rem] to fluid w-full max-w-4xl */}
                <div className="font-sans w-full max-w-4xl"> 
                    {/* Search Section */}
                    <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
                        <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
                            Search Quotation/Invoice
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                            <input
                                type="text"
                                placeholder="Enter document number to search"
                                className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full"
                                value={searchNumber}
                                onChange={(e) => setSearchNumber(e.target.value)}
                            />
                            <button
                                onClick={() => handleSearch(searchNumber)}
                                disabled={formLoading}
                                className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 disabled:opacity-50 font-medium whitespace-nowrap"
                            >
                                {formLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>

                    {/* Mode Switch */}
                    <div className="flex items-center justify-start gap-5 mb-5 font-semibold text-lg">
                        <button
                            className={`px-4 py-2 rounded-lg transition-colors ${quotation ? "bg-green-600 text-white shadow-md" : "bg-white text-green-700 border-2 border-green-600 hover:bg-green-50"}`}
                            onClick={() => { setQuotation(true); setInvoice(false); }}
                        >
                            Quotation
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg transition-colors ${invoice ? "bg-green-600 text-white shadow-md" : "bg-white text-green-700 border-2 border-green-600 hover:bg-green-50"}`}
                            onClick={() => { setQuotation(false); setInvoice(true); }}
                        >
                            Invoice
                        </button>
                    </div>

                    {/* 1. Document Details Section */}
                    <div className="border-dashed border-2 border-slate-400 rounded-xl p-5 bg-gray-50">
                        <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                            1. {invoice ? "Invoice" : "Quotation"} Details
                        </p>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-start flex-wrap gap-5"> {/* Added md:flex-row */}
                            <h1 className="font-medium">{invoice ? "Invoice" : "Quotation"} Number:</h1>
                            <input
                                type="text"
                                value={billDetails.quotationNumber}
                                placeholder={`Auto-generated`}
                                className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md bg-indigo-100 font-bold text-indigo-800 w-full md:w-auto" // Added w-full md:w-auto
                                readOnly
                            />

                            {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
                            {invoice && (
                                <div className="flex items-center gap-3 mt-3 w-full md:w-auto"> {/* Added w-full md:w-auto */}
                                    <h1 className="font-medium">Quotation Ref:</h1>
                                    <div className="flex items-center border border-blue-500 rounded-lg shadow-md flex-1">
                                        <input
                                            type="text"
                                            value={billDetails.associatedQuotationNumber}
                                            placeholder={`Enter Q-Number to load`}
                                            className="outline-none rounded-l-lg px-3 py-2 flex-1 min-w-0" // Added min-w-0
                                            onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
                                        />
                                        <button
                                            onClick={() => handleSearch(billDetails.associatedQuotationNumber)}
                                            disabled={formLoading}
                                            className="bg-blue-500 text-white px-3 py-2 rounded-r-lg h-full hover:bg-blue-600 disabled:opacity-50"
                                        >
                                            Load
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Recipient Details */}
                    <div className="border-dashed border-2 border-slate-400 rounded-xl my-7 p-5 bg-gray-50">
                        <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                            2. Recipient Details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> {/* Changed to responsive grid */}
                            <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Bill TO</h1><input type="text" placeholder="Enter Biller Details" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" value={billDetails.billTO} onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })} /></div>
                            <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Address</h1><input type="text" placeholder="Enter Biller Address" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" value={billDetails.customerAddress} onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })} /></div>
                            <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Customer GSTIN</h1><input type="text" placeholder="Enter Customer GSTIN" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" value={billDetails.customerGSTIN} onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })} /></div>
                        </div>
                    </div>

                    {/* 3. Items Section */}
                    <div className="border-dashed border-2 border-slate-400 rounded-xl my-7 p-5 bg-gray-50 w-full">
                        <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pb-3"> {/* Added sm:flex-row */}
                                <p className="text-xl font-semibold uppercase text-blue-600 mb-2 sm:mb-0">3. Items</p>
                                <div className="flex gap-3">
                                    {isItemEditing && (
                                        <button type="button" onClick={() => { setIsItemEditing(false); setEditingItemOriginal(null); setTableItems({ description: "", quantity: "", unitPrice: "" }); }} className="bg-yellow-500 px-4 py-2 rounded-lg text-white shadow-md hover:bg-yellow-600 font-medium">Cancel Edit</button>
                                    )}
                                    <button type="submit" className={`px-4 py-2 rounded-lg text-white shadow-md font-medium transition-colors ${isItemEditing ? 'bg-orange-400 hover:bg-orange-500' : 'bg-green-600 hover:bg-green-700'}`}>
                                        {isItemEditing ? 'Update Item' : 'Add Item'}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"> {/* Changed to responsive grid */}
                                <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Description</h1><input type="text" required value={tableItems.description} placeholder="Enter Description" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })} /></div>
                                <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Quantity</h1><input type="number" required value={tableItems.quantity} placeholder="Enter Quantity" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })} /></div>
                                <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Unit Price (₹)</h1><input type="number" required value={tableItems.unitPrice} placeholder="Single Price" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })} /></div>
                            </div>
                        </form>

                        {/* Items Table Display */}
                        {billDetails.items.length > 0 && (
                            <div className="overflow-x-auto w-full py-5">
                                <div className="min-w-[40rem] md:min-w-full"> {/* Made min-w smaller for mobile tables */}
                                    <table className="w-full border-collapse border border-blue-500">
                                        <tbody className="w-full">
                                            <tr className="bg-indigo-100 font-bold border border-blue-500">
                                                <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
                                                <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
                                                <td className="border border-blue-500 px-3 py-2 w-[10%] text-center">Qty</td>
                                                <td className="border border-blue-500 px-3 py-2 w-[20%] text-right">Unit Price</td>
                                                <td className="border border-blue-500 px-3 py-2 w-[20%] text-right">Total Price</td>
                                                <td className="px-3 w-[5%] text-center">Action</td>
                                            </tr>
                                            {billDetails.items.map((item, index) => (
                                                <tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}>
                                                    <td className="text-center border border-blue-500 px-3 py-2">{index + 1}</td>
                                                    <td className="px-2 border border-blue-500 py-2">{item.description}</td>
                                                    <td className="px-2 border border-blue-500 py-2 text-center">{item.quantity}</td>
                                                    <td className="px-2 border border-blue-500 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                                                    <td className="px-2 border border-blue-500 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
                                                    <td className="px-3">
                                                        <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs inline-block" onClick={(e) => { e.stopPropagation(); handleItem(item); }}>Delete</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 4. GST Info */}
                    <div className="border-dashed border-2 border-slate-400 rounded-xl my-7 p-5 bg-gray-50">
                        <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
                        <div className="flex flex-wrap items-center justify-start gap-5 mt-3"> {/* Added flex-wrap */}
                            <button type="button" onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-600"} text-white px-5 py-2 rounded-lg duration-300 cursor-pointer font-medium shadow-md`}>SGST {sgst ? 'ON' : 'OFF'}</button>
                            <button type="button" onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-600"} text-white px-5 py-2 rounded-lg duration-300 cursor-pointer font-medium shadow-md`}>CGST {cgst ? 'ON' : 'OFF'}</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3"> {/* Added flex-wrap */}
                        {/* Save/Update Button */}
                        <button
                            onClick={handleSaveOrUpdate}
                            disabled={formLoading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center min-w-[10rem]"
                        >
                            {formLoading ? <Loader size={20} className="animate-spin" /> : isEditing ? 'Update Document' : 'Save Document'}
                        </button>

                        {/* Delete Button (Visible only in Editing mode) */}
                        {isEditing && (
                            <button
                                onClick={handleDeleteForm}
                                disabled={formLoading}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center min-w-[10rem]"
                            >
                                {formLoading ? 'Deleting...' : 'Delete Document'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Print Trigger Button */}
            <ReactToPrint
                trigger={() => (
                    <div className='flex justify-center'>
                        <button className="text-white bg-red-600 font-medium px-6 py-2 rounded-lg mb-5 mt-5 shadow-lg hover:bg-red-700 transition">
                            Print Receipt
                        </button>
                    </div>
                    
                )}
                content={() => printRef.current}
                pageStyle="@page { size: A4 portrait; margin: 20mm; } body { margin: 20px; }"
            />

            {/* --- PDF/Print PREVIEW Area (Updated for responsiveness) --- */}
            <div className="w-full bg-white flex items-center justify-center p-2 sm:p-4">
                <div className="w-full max-w-full xl:max-w-[60rem] border border-gray-300 shadow-xl overflow-x-auto">
                    {/* The content inside printRef should keep fixed dimensions for correct printout, but the wrapper must be responsive */}
                    <div ref={printRef} className="flex flex-col min-w-[50rem] xl:w-[60rem] bg-white text-black printable-content mx-auto"> 

                        {/* Header Row */}
                        <div className="flex flex-row h-[15rem] text-sm border border-black">
                            {/* Left Side: Bill To */}
                            <div className="h-full w-2/5 sm:w-[20rem] border-r border-black flex flex-col"> {/* Adjusted width for small screens */}
                                <div className="flex items-center justify-center h-[30%] border-b border-black">
                                    <p className="text-center font-bold text-lg sm:text-2xl">{invoice ? "TAX INVOICE" : "QUOTATION"}</p>
                                </div>
                                <div className="flex-1 px-3 sm:px-5 py-2 overflow-hidden"> {/* Added overflow-hidden */}
                                    <p className="font-semibold text-base sm:text-lg">Bill to:</p>
                                    {billDetails.customerGSTIN && <p className='truncate'><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
                                    <p className='truncate'>{billDetails.billTO}</p>
                                    <p className='truncate'>{billDetails.customerAddress}</p>
                                    {invoice && billDetails.associatedQuotationNumber && (
                                        <p className="mt-2 text-xs truncate">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Company Details */}
                            <div className="h-full w-3/5 sm:w-[40rem] flex flex-col justify-between"> {/* Adjusted width for small screens */}
                                <div className="p-3 sm:p-5 flex items-start justify-between">
                                    <div className="w-[70%] text-xs sm:text-sm">
                                        <p className="font-semibold text-base sm:text-xl truncate">GSTIN: <span className="font-medium text-xs sm:text-base">37AKOPY6766H1Z4</span></p>
                                        <p className="font-medium pt-1">DESIGN BLOCKS</p>
                                        <p className="font-semibold text-base pt-2">Address:</p>
                                        <p className='text-xs sm:text-sm'>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
                                    </div>
                                    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex items-center justify-center flex-shrink-0"> {/* Adjusted size */}
                                        <img
                                            src="https://designblocks.in/img/DB.png"
                                            alt="Design Blocks Logo"
                                            className="w-full h-auto object-contain"
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO"; }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between h-10 px-3 sm:px-5 border-t border-black text-sm">
                                    <p className="font-semibold text-sm sm:text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal">{billDetails.quotationNumber}</span></p>
                                    <p className='whitespace-nowrap'>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Item table container (force full width and rely on internal structure for print) */}
                        <div className="h-10 w-full border-x border-black"></div> 

                        {/* Items Table */}
                        <table className="w-full text-sm table-fixed">
                            <thead>
                                <tr className="h-10 bg-gray-100 font-bold">
                                    <td className="border border-black text-center w-[5%]">Item</td>
                                    <td className="border border-black text-center w-[45%]">Description</td>
                                    <td className="border border-black text-center w-[10%]">Quantity</td>
                                    <td className="border border-black text-center w-[20%]">Unit Price (Rs.)</td>
                                    <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
                                </tr>
                            </thead>
                            <tbody className="border border-black">
                                {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
                                    <tr key={key} className="h-10">
                                        <td className="text-center border border-black">{key + 1}.</td>
                                        <td className="px-2 border border-black">{items.description}</td>
                                        <td className="px-2 border border-black text-center">{items.quantity}</td>
                                        <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
                                        <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
                                    </tr>
                                )) : (
                                    <tr className="h-20">
                                        <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
                                    </tr>
                                )}

                                {/* Totals */}
                                <tr className="border border-black h-10 bg-yellow-50">
                                    <td colSpan={3}></td>
                                    <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
                                    <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
                                </tr>

                                {sgst && (
                                    <tr className="h-8 border border-black">
                                        <td colSpan={3}></td>
                                        <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
                                        <td className="border border-black px-2 text-right font-medium">{SGSTAmount}</td>
                                    </tr>
                                )}
                                {cgst && (
                                    <tr className="h-8 border border-black">
                                        <td colSpan={3}></td>
                                        <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
                                        <td className="border border-black px-2 text-right font-medium">{CGSTAmount}</td>
                                    </tr>
                                )}

                                {(cgst || sgst) && (
                                    <tr className="border border-black h-10 bg-blue-100">
                                        <td colSpan={3}></td>
                                        <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
                                        <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
                                    </tr>
                                )}

                                <tr className="border border-black h-10">
                                    <td colSpan={5} className="px-2">
                                        <span className="font-semibold">In Words: </span>
                                        <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
                                    </td>
                                </tr>

                                {/* Bank Details & Signature */}
                                <tr>
                                    <td colSpan={5} className="p-2 border-t border-black text-xs">
                                        <div className="flex flex-col sm:flex-row justify-between"> {/* Added flex-col sm:flex-row */}
                                            <div className="w-full sm:w-1/2 mb-4 sm:mb-0"> {/* Added responsive margins */}
                                                <p className="font-semibold text-sm">BANK DETAILS:-</p>
                                                <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
                                                <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
                                                <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
                                            </div>
                                            <div className="w-full sm:w-1/2 text-left sm:text-right pt-2 sm:pt-6"> {/* Added responsive text alignment and padding */}
                                                <p className="text-sm">For <span className="uppercase font-bold">Design Blocks</span></p>
                                                <p className="mt-6 text-gray-500">(Authorized Signatory)</p>
                                            </div>
                                        </div>
                                        <div className="text-center mt-3 font-semibold">Thank You</div>
                                    </td>
                                </tr>

                                {quotation && (
                                    <tr>
                                        <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
                                            <div className="text-sm">
                                                <p className="font-semibold mb-1">Terms and Conditions.</p>
                                                <p>Quotation prices are valid for 20 days from the date of issue.</p>
                                                <p>Any increase in project scope will result in an additional cost.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
    
    // --- Main Admin Panel Structure ---
    
    const SidebarItem = ({ icon: Icon, label, tab }) => (
        <button
            onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false); // Close sidebar on mobile after clicking item
                // Reset form modes when navigating away from New Bill
                if (tab !== 'newBill') {
                    setQuotation(true);
                    setInvoice(false);
                }
            }}
            className={`w-full flex items-center p-3 text-sm font-medium rounded-lg transition duration-150 ${activeTab === tab ? 'bg-indigo-700 shadow-md' : 'hover:bg-indigo-700'
                }`}
        >
            <Icon size={18} className="mr-3" />
            {label}
        </button>
    );

    const Sidebar = () => (
        // Sidebar fixed on desktop (md:fixed md:h-screen)
        <div className={`
            fixed top-0 left-0 w-64 bg-indigo-900 text-white flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out h-screen
            md:fixed md:translate-x-0 md:flex md:top-0 md:h-screen 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            hide-on-print
        `}>
            <div className="p-5 text-2xl font-extrabold border-b border-indigo-800 flex justify-between items-center">
                <span className="text-indigo-300">Admin Portal
                </span> 
                <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1">
                    <X size={24} />
                </button>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <SidebarItem icon={Home} label="Dashboard" tab="dashboard" />
                <SidebarItem icon={Receipt} label="Invoices List" tab="invoices" />
                <SidebarItem icon={FileText} label="Quotations List" tab="quotations" />
                <SidebarItem icon={PlusSquare} label="Create New Bill" tab="newBill" />
                <SidebarItem icon={Lock} label="Change Password" tab="changePassword" />
            </nav>
            <div className="p-4 border-t border-indigo-800">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center p-3 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition duration-150 shadow-lg"
                >
                    <LogOut size={18} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'invoices':
                return renderDataList('invoices');
            case 'quotations':
                return renderDataList('quotations');
            case 'newBill':
                return renderNewBillForm();
            case 'changePassword':
                return renderChangePassword();
            default:
                return renderDashboard();
        }
    };

    return (
        // md:pl-64 creates space for the fixed sidebar on desktop
        <div className="min-h-screen flex bg-gray-100 font-sans md:pl-64"> 
            {/* Modal for all custom alerts/confirms */}
            <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
            
            {/* Sidebar (Now fixed on desktop) */}
            <Sidebar />

            {/* Backdrop for mobile sidebar */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden hide-on-print" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}


            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                {/* Header (Displays current active tab name) */}
                <header className="bg-white text-gray-800 shadow-md p-4 sticky top-0 z-10 border-b hide-on-print">
                    <div className="max-w-full mx-auto flex justify-start items-center">
                        <button 
                            onClick={() => setIsSidebarOpen(true)} 
                            className="p-1 mr-4 text-indigo-800 md:hidden"
                            aria-label="Toggle Menu"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold capitalize text-indigo-800">
                            {activeTab.replace(/([A-Z])/g, ' $1').trim()}
                        </h1>
                    </div>
                </header>

                <main>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
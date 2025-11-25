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


import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  FileText,
  Receipt,
  Trash2,
  Edit,
  User
} from 'lucide-react';

// Added onLogout prop to handle logout from parent App.js
function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState('invoices');
  const [invoices, setInvoices] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState(null); 
  const [editValue, setEditValue] = useState('');

  // Initial Data Fetch
  useEffect(() => {
    // We assume App.js has already set the token
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetchData(token);
    } else {
        setError("Unauthorized access. Token missing.");
    }
  }, [activeTab]);

  const fetchData = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`https://invoice-dbinvoice-backend.onrender.com/api/admin/${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        if (activeTab === 'invoices') {
          setInvoices(data.invoices);
        } else {
          setQuotations(data.quotations);
        }
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, number) => {
    if (!window.confirm(`Are you sure you want to delete ${type} #${number}?`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    setLoading(true);

    try {
      const response = await fetch(
        `https://invoice-dbinvoice-backend.onrender.com/api/admin/${type.toLowerCase()}/${number}`,
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
        alert(`${type} deleted successfully`);
        fetchData(token);
      } else {
        alert(data.error || 'Delete failed');
      }
    } catch (err) {
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditValue(item.invoiceValue || item.quotationValue || 0);
  };

  const saveEdit = async () => {
    const token = localStorage.getItem('adminToken');
    const type = activeTab === 'invoices' ? 'invoice' : 'quotation';
    const number = editItem.invoiceNumber || editItem.quotationNumber;

    try {
      const response = await fetch(
        `https://invoice-dbinvoice-backend.onrender.com/api/admin/${type}/${number}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ invoiceValue: editValue })
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(`${type} updated successfully`);
        setEditItem(null);
        fetchData(token);
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Connection error');
    }
  };

  const currentData = activeTab === 'invoices' ? invoices : quotations;
  const totalValue = currentData.reduce(
    (sum, item) => sum + (item.invoiceValue || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <LogOut size={18} className="inline mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
             <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border-l-4 border-red-500">
                {error}
             </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-500">Total Invoices</p>
            <p className="text-2xl font-bold">{invoices.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-gray-500">Total Quotations</p>
            <p className="text-2xl font-bold">{quotations.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <p className="text-gray-500">Total Value</p>
            <p className="text-2xl font-bold">₹{totalValue.toFixed(2)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`flex-1 py-3 rounded-l-lg ${
              activeTab === 'invoices'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('quotations')}
            className={`flex-1 py-3 rounded-r-lg ${
              activeTab === 'quotations'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700'
            }`}
                  >
            Quotations
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading data...</p>
            </div>
          ) : currentData.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'invoices' ? (
                  <Receipt className="text-gray-400" size={40} />
                ) : (
                  <FileText className="text-gray-400" size={40} />
                )}
              </div>
              <p className="text-gray-500 font-medium text-lg">
                No {activeTab} found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Your {activeTab} will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Bill To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      GSTIN
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                      Value
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-indigo-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-lg">
                          {item.invoiceNumber || item.quotationNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.billTO}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {item.customerAddress}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-gray-700">
                          {item.customerGSTIN}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {editItem &&
                        (editItem.invoiceNumber === item.invoiceNumber ||
                          editItem.quotationNumber === item.quotationNumber) ? (
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-24 border rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          <span className="text-sm font-bold text-green-600">
                            ₹{item.invoiceValue?.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-600">
                          {new Date(item.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center flex gap-2 justify-center">
                        {editItem &&
                        (editItem.invoiceNumber === item.invoiceNumber ||
                          editItem.quotationNumber === item.quotationNumber) ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditItem(null)}
                              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleEdit(item)
                              }
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm flex items-center gap-1"
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(
                                  activeTab === 'invoices'
                                    ? 'invoice'
                                    : 'quotation',
                                  item.invoiceNumber || item.quotationNumber
                                )
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm flex items-center gap-1"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
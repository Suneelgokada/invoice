
import React, { useState, useEffect, useCallback } from 'react';
import { PlusSquare, Loader, ClipboardList } from 'lucide-react';

// --- Configuration ---
// The component receives BASE_URL as a prop but keeps the original definition here
const BASE_URL = `https://invoice-backend-um3n.onrender.com/`;

function PurchaseManager({ showNotification, token }) {

    // 1. --- Purchase Module State (UNCHANGED) ---
    const [purchases, setPurchases] = useState([]);
    const [purchaseLoading, setPurchaseLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);

    const [purchaseForm, setPurchaseForm] = useState({
        supplierName: "",
        purchaseDate: new Date().toISOString().split("T")[0],
        description: "",
        amount: "",
        billFile: null,
    });

    // 2. --- Core Logic Functions (UNCHANGED) ---

    // [A] Fetch Purchases List (URL is kept exactly as in your original code: http://localhost:5000)
    const fetchPurchases = useCallback(async (authToken) => {
        if (!authToken) return setPurchaseLoading(false);

        setPurchaseLoading(true);
        try {
            // WARNING: Using local URL as per your code. This might cause issues if running on production.
            const response = await fetch(`${BASE_URL}/api/admin/purchase/list`, {
                headers: { "Authorization": `Bearer ${authToken}` }
            });
            const data = await response.json();

            if (response.ok && data.success) {
                setPurchases(data.purchases);
            } else {
                showNotification(`Failed to load purchases: ${data.error || 'Server error'}`, 'error');
                setPurchases([]);
            }
        } catch (err) {
            console.error("Network error fetching purchases:", err);
            showNotification("Network error. Could not load purchases.", 'error');
        } finally {
            setPurchaseLoading(false);
        }
    }, [showNotification]);

    // [B] Initial Load Effect (UNCHANGED)
    useEffect(() => {
        if (token) {
            fetchPurchases(token);
        }
    }, [token, fetchPurchases]);


    // [C] Handle Form Input Changes (UNCHANGED)
    const handlePurchaseDataChange = (e) => {
        const { name, value, files } = e.target;
        setPurchaseForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    // [D] Handle Form Submission (Functionality UNCHANGED)
    const handleSavePurchase = async (e) => {
        e.preventDefault();

        if (!token) { showNotification("Authentication required.", 'error'); return; }
        if (!purchaseForm.supplierName || !purchaseForm.amount || !purchaseForm.description) {
            showNotification("Please fill in Vendor Name, Description, and Amount.", 'error');
            return;
        }

        setSaveLoading(true);

        try {
            const formData = new FormData();
            formData.append("supplierName", purchaseForm.supplierName);
            formData.append("purchaseDate", purchaseForm.purchaseDate);
            formData.append("description", purchaseForm.description);
            formData.append("amount", purchaseForm.amount);

            if (purchaseForm.billFile) {
                formData.append("billFile", purchaseForm.billFile);
            }

            // URL is kept exactly as in your original code
            const url = `${BASE_URL}/api/admin/purchase/save`;

            const res = await fetch(url, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });

            const data = await res.json();

            if (res.ok && data.success) {
                showNotification(`Purchase from ${purchaseForm.supplierName} saved successfully!`, 'success');

                // Reset Form
                setPurchaseForm({
                    supplierName: "",
                    purchaseDate: new Date().toISOString().split("T")[0],
                    description: "",
                    amount: "",
                    billFile: null,
                });

                fetchPurchases(token);

            } else {
                showNotification(`Purchase Save Error: ${data.error || 'Server rejected the request.'}`, 'error');
            }

        } catch (err) {
            console.error("Purchase save error:", err);
            showNotification("Network error during save.", 'error');
        } finally {
            setSaveLoading(false);
        }
    };

    // 3. --- Rendering the Purchase Form (UI UPDATED to use Indigo/Blue colors) ---
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Record New Purchase</h2>

            <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
                <p className="text-gray-600 mb-6 font-medium">Add details of your expenditure (e.g., Office Supplies, Books).</p>

                <form className="space-y-6" onSubmit={handleSavePurchase}>

                    {/* 1. Supplier / Vendor Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
                            <input
                                type="text"
                                name="supplierName"
                                value={purchaseForm.supplierName}
                                onChange={handlePurchaseDataChange}
                                required
                                placeholder="Enter Vendor Name"
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                disabled={saveLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                            <input
                                type="date"
                                name="purchaseDate"
                                value={purchaseForm.purchaseDate}
                                onChange={handlePurchaseDataChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                disabled={saveLoading}
                            />
                        </div>
                    </div>

                    {/* 2. Item Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={purchaseForm.description}
                            onChange={handlePurchaseDataChange}
                            required
                            rows="3"
                            placeholder="2025 Calendar, 10 Notebooks, Pen set"
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            disabled={saveLoading}
                        />
                    </div>

                    {/* 3. Amount & Bill Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={purchaseForm.amount}
                                onChange={handlePurchaseDataChange}
                                required
                                placeholder="Enter Amount in ₹"
                                step="0.01"
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                disabled={saveLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Bill / Receipt (Optional)</label>
                            <input
                                type="file"
                                name="billFile"
                                onChange={handlePurchaseDataChange}
                                // ⭐ UI CHANGE: File input color updated to indigo
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                disabled={saveLoading}
                            />
                            {/* ⭐ UI CHANGE: Text color updated to indigo */}
                            {purchaseForm.billFile && <p className="text-xs text-indigo-600 pt-1 truncate">File Selected: {purchaseForm.billFile.name || 'Local File'}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        // ⭐ UI CHANGE: Button color updated from green-600 to indigo-600
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md disabled:bg-indigo-400 flex items-center justify-center gap-2"
                        disabled={saveLoading || !purchaseForm.supplierName || !purchaseForm.description || !purchaseForm.amount}
                    >
                        {saveLoading ? (
                            <>
                                <Loader size={20} className="animate-spin" /> Saving Purchase...
                            </>
                        ) : (
                            <>
                                <PlusSquare size={20} /> Save Purchase
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Purchase History Summary - Displaying fetched purchases list */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Purchase History Summary ({purchases.length} Records)</h3>

                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    {purchaseLoading ? (
                        <div className="text-center py-8">
                            <Loader size={32} className="text-indigo-600 animate-spin mx-auto mb-2" />
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            {/* ⭐ UI CHANGE: Table header background and text color updated to indigo */}
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Vendor</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider">Amount (₹)</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Bill</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {purchases.length > 0 ? (
                                    purchases.map((item) => (
                                        // ⭐ UI CHANGE: Hover background updated to indigo
                                        <tr key={item._id || item.id} className="hover:bg-indigo-50 transition duration-150">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {new Date(item.purchaseDate).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.supplierName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.description}</td>
                                            {/* ⭐ UI CHANGE: Amount text color updated to indigo */}
                                            <td className="px-6 py-4 text-right text-sm font-bold text-indigo-600">₹{Number(item.amount).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-center text-xs text-gray-500">
                                                {item.billUrl ? (
                                                    <a href={item.billUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium cursor-pointer hover:underline">View Bill</a>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">No purchases recorded yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PurchaseManager;
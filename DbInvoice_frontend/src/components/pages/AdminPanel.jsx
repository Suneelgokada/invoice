
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
import AnalyticsDashboard from "../charts/AnalyticsDashboard";
import PurchaseManager from '../purchase/PurchaseManager';
import { Users } from "lucide-react";
import QuotationEditor from '../QuotationEditor';
import ClientManager from '../client/ClientManager';
import { FileEdit } from "lucide-react";
import QuotationBuilder from './QuotationBuilder';
// --- CONFIGURATION ---
const BASE_URL = `https://invoice-backend-um3n.onrender.com`;

// --- Utility: Number to Words Converter (Keep the original utility) ---
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


// --- Component: Modal (Custom Alert/Confirm) - Keep the original Modal ---
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

const handleUnauthorized = () => {
    localStorage.removeItem("authToken");
    onLogout();
};
// --- Component: AdminPanel ---
function AdminPanel({ onLogout }) {
    // --- Admin Dashboard State (Keep Original) ---
    const [activeTab, setActiveTab] = useState('dashboard');
    const [invoices, setInvoices] = useState([]);
    const [quotations, setQuotations] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(false);
    const [dashboardError, setDashboardError] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [editValue, setEditValue] = useState('');

    // --- Billing Form State (Updated with App.jsx variables/defaults) ---
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
    const [formLoading, setFormLoading] = useState(false); // Renamed from 'loading' in App.jsx
    const [isEditing, setIsEditing] = useState(false);
    const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);
    const [isItemEditing, setIsItemEditing] = useState(false);
    const [editingItemOriginal, setEditingItemOriginal] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isEditingNumber, setIsEditingNumber] = useState(false);
    const [chartData, setChartData] = useState({
        monthlyData: [],
        weeklyData: [],
        loading: false,
        error: ""
    });



    const [billDetails, setBillDetails] = useState({
        billTO: "",
        phone: "",
        customerAddress: "",
        customerGSTIN: "",
        quotationNumber: "",
        invoiceNumber: "",
        associatedQuotationNumber: "",
        items: [],
        documentDate: new Date().toISOString().split("T")[0], // Added from App.jsx
    });

    const [tableItems, setTableItems] = useState({
        description: "",
        quantity: "",
        unitPrice: "",
    });

    // --- Change Password State (Keep Original) ---
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // --- Modal State (Custom Alert/Confirm) - Keep Original ---
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
    // --- 1. Data Fetching Logic (Admin Dashboard & Lists) - Keep Original ---
    // ----------------------------------------------------
    const fetchAdminData = useCallback(async (token) => {
        setDashboardLoading(true);
        setDashboardError('');
        try {
            const headers = { Authorization: `Bearer ${token}` };

            const [invoicesResponse, quotationsResponse] = await Promise.all([
                fetch(`${BASE_URL}/api/admin/invoices`, { method: "GET", headers }),
                fetch(`${BASE_URL}/api/admin/quotations`, { method: "GET", headers })
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
            setDashboardError('Failed to fetch data. Please login again if issue persists.');
            console.error('Admin Data Fetch Error:', err);
        } finally {
            setDashboardLoading(false);
        }
    }, []);

    // Initial Data Fetch Effect (Keep Original)
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if (activeTab === 'invoices' || activeTab === 'quotations' || activeTab === 'dashboard') {
                fetchAdminData(token);
            }
        } else {
            setDashboardError("Unauthorized access. Token missing.");
        }
    }, [activeTab, fetchAdminData]);

    const fetchAnalyticsData = useCallback(async (token) => {
        setChartData(prev => ({ ...prev, loading: true, error: "" }));
        try {
            const response = await fetch(`${BASE_URL}/api/admin/analytics`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }
            const data = await response.json();

            if (response.ok && data.success) {
                setChartData({
                    monthlyData: data.monthlyData || [],
                    weeklyData: data.weeklyData || [],
                    loading: false,
                    error: ""
                });
            } else {
                setChartData(prev => ({ ...prev, loading: false, error: data.error || "Failed to load analytics" }));
            }
        } catch (err) {
            setChartData(prev => ({ ...prev, loading: false, error: "Network error while fetching analytics" }));
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token && activeTab === "dashboard") {
            fetchAnalyticsData(token);
        }
    }, [activeTab, fetchAnalyticsData]);


    const generateUniqueNumber = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) { return; }

        try {
            // ⭐ UPDATED API URLS: /api/invoice/generate or /api/quotation/generate
            const url = quotation
                ? `${BASE_URL}/api/quotation/generate`
                : `${BASE_URL}/api/invoice/generate`;

            const response = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
            const data = await response.json();

            if (data.success) {
                setBillDetails(prev => ({
                    ...prev,
                    quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber,
                    [quotation ? "quotationNumber" : "invoiceNumber"]:
                        quotation ? data.quotationNumber : data.invoiceNumber
                }));
            } else {
                showNotification(`Number generation failed: ${data.error || 'API Error'}`, 'error');
            }
        } catch (error) {
            console.error("Number generation failed", error);
        }
    }, [quotation]);

    // ** Effect to reset form state and trigger number generation (COMBINED/UPDATED with App.jsx logic) **
    useEffect(() => {
        if (activeTab === 'newBill') {
            // 1. Reset all local states (based on App.jsx reset)
            setBillDetails(prev => ({
                ...prev,
                billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
                quotationNumber: "",
                invoiceNumber: "",
                documentDate: new Date().toISOString().split("T")[0],
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

            // 2. Generate a new number (will run whenever activeTab, quotation, or invoice changes)
            generateUniqueNumber();
        }
    }, [activeTab, quotation, invoice, generateUniqueNumber]);


    // Calculation effect (Kept original logic, adjusted variable names)
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


    // Handles adding/updating item in the form (FROM App.jsx)
    const handleAddItem = (e) => {
        e.preventDefault();
        setIsItemEditing(false);
        setEditingItemOriginal(null);

        // Add unique ID for better list tracking
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

        // Use object reference for finding index as per the original component style
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

    const handleItem = (itemToDelete) => {
        let removedArray = billDetails.items.filter(e => e !== itemToDelete);
        setBillDetails({ ...billDetails, items: removedArray });
    };

    const handleUpdate = async () => {

        const token = localStorage.getItem('authToken');
        if (!token) {
            showNotification("Authentication token missing.", 'error');
            return;
        }

        try {

            setFormLoading(true);

            const documentNumber = invoice
                ? billDetails.invoiceNumber
                : billDetails.quotationNumber;

            const docKey = invoice ? "invoiceNumber" : "quotationNumber";
            const valueKey = invoice ? "invoiceValue" : "quotationValue";

            const url = `${BASE_URL}/api/admin/${invoice ? "invoice/update" : "quotation/update"}`;

            const body = {
                [docKey]: documentNumber,

                originalQuotationNumber: documentNumber,

                billTO: billDetails.billTO,
                phone: billDetails.phone,
                customerAddress: billDetails.customerAddress,
                customerGSTIN: billDetails.customerGSTIN,

                items: billDetails.items,

                sgst: sgst,
                cgst: cgst,

                taxableValue: taxableValue,
                SGSTAmount: SGSTAmount,
                CGSTAmount: CGSTAmount,

                [valueKey]: invoiceValue,

                documentDate: billDetails.documentDate
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
                showNotification(`${invoice ? "Invoice" : "Quotation"} updated successfully`, 'success');
                fetchAdminData(token);
            } else {
                showNotification(`Update Error: ${data.error}`, 'error');
            }

        } catch (err) {
            console.error(err);
            showNotification("Unexpected error during update.", 'error');
        }
        finally {
            setFormLoading(false);
        }
    };

    // Fallback function for deletion to wrap around performActualDeleteForm
    const handleDeleteForm = () => {
        const docType = invoice ? "Invoice" : "Quotation";
        const documentNumber = invoice ? billDetails.invoiceNumber : billDetails.quotationNumber; // ✅ FIXED

        if (!documentNumber) {
            showNotification("Cannot delete. Document number is missing.", 'ALERT');
            return;
        }

        showModal(
            `Are you sure you want to permanently delete ${docType} #${documentNumber}? This action cannot be undone.`,
            "CONFIRM",
            performActualDeleteForm // This is the callback for confirmation
        );
    };

    // Save/Update Handler (Keep Original Structure, calls updated functions)
    const handleSaveOrUpdate = () => {
        if (isEditing) {
            handleUpdate();
        } else {
            handleSave();
        }
    };

    // Save invoice/quotation to backend (FROM App.jsx)
    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) { showNotification("Authentication token missing. Cannot save.", 'error'); return; }

        try {
            setSaveLoading(true);

            const docKey = quotation ? "quotationNumber" : "invoiceNumber";
            const valueKey = quotation ? "quotationValue" : "invoiceValue";
            const safeDocumentDate = billDetails.documentDate
                ? billDetails.documentDate
                : new Date().toISOString().split("T")[0];

            const body = {
                billTO: billDetails.billTO,
                phone: billDetails.phone,
                customerAddress: billDetails.customerAddress,
                customerGSTIN: billDetails.customerGSTIN,
                items: billDetails.items,
                sgst,
                cgst,
                taxableValue,
                SGSTAmount,
                CGSTAmount,
                [valueKey]: invoiceValue,
                [docKey]: invoice ? billDetails.invoiceNumber : billDetails.quotationNumber,
                originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
                documentDate: safeDocumentDate,
            };

            // Backend expects just 'quotationNumber' or 'invoiceNumber' at the top level
            const finalBody = {
                ...body,
                [docKey]: body[docKey]
            };

            // Remove the conflicting key if it exists
            if (quotation) { delete finalBody.invoiceNumber; } else { delete finalBody.quotationNumber; }


            // ⭐ UPDATED API URLS: /api/invoice/save or /api/quotation/save
            const url = quotation
                ? `${BASE_URL}/api/admin/quotation/save` // Assuming /api/admin is still needed for save? Router shows this under admin.
                : `${BASE_URL}/api/admin/invoice/save`; // Router shows this under admin.

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
                setBillDetails(prev => ({
                    ...prev,
                    [docKey]: savedNumber,
                    documentDate: safeDocumentDate
                }));
                fetchAdminData(token);
            } else {
                showNotification(`Save Error: ${data.error}`, 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification("Unexpected error during save.", 'error');
        } finally {
            setSaveLoading(false);
        }
    };

    // Handle Delete Logic (FROM App.jsx - renamed functions)
    // --- AdminPanel component లోని performActualDeleteForm ఫంక్షన్ ---

    const performActualDeleteForm = async () => {
        const docType = invoice ? "invoice" : "quotation";
        const documentNumber = billDetails.quotationNumber;
        const token = localStorage.getItem('authToken');

        try {
            setDeleteLoading(true);

            // ⭐ UPDATED API URLS: /api/admin/invoice/:number or /api/admin/quotation/:number
            const url = `${BASE_URL}/api/admin/${docType}/${documentNumber}`;

            const response = await fetch(url, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            const data = await response.json();

            if (response.ok && data.success) {
                showNotification(`${docType.charAt(0).toUpperCase() + docType.slice(1)} #${documentNumber} deleted successfully!`, 'success');

                // 2. ✅ ఫారమ్ స్టేట్ పటిష్టంగా రీసెట్ చేయడం (మీరు ఎదుర్కొంటున్న లోపాన్ని నివారించడానికి)
                const docTypeForReset = invoice; // Keep current doc type for regeneration

                // అన్ని వాల్యూస్‌ను ఖాళీగా సెట్ చేస్తుంది
                setBillDetails({
                    billTO: "",
                    customerAddress: "",
                    customerGSTIN: "",
                    quotationNumber: "", // ఇది ఖచ్చితంగా క్లియర్ చేయాలి
                    associatedQuotationNumber: "",
                    invoiceNumber: "",
                    items: [],
                    documentDate: new Date().toISOString().split("T")[0],
                });

                setSGST(false);
                setCGST(false);
                setIsEditing(false); // ఎడిటింగ్ మోడ్ నుండి నిష్క్రమిస్తుంది
                setSearchNumber(""); // సెర్చ్ ఫీల్డ్‌ను క్లియర్ చేస్తుంది

                // 3. కొత్త ఇన్వాయిస్/కొటేషన్ నంబర్‌ను జనరేట్ చేస్తుంది
                // ఇది పైన billDetails క్లియర్ అయిన తర్వాత కొత్త నంబర్‌ను సెట్ చేస్తుంది.
                // NOTE: generateUniqueNumber relies on the current `quotation` state, which is correct.
                // It will generate a new number for the document type currently selected (invoice or quotation).
                generateUniqueNumber();

                // 4. డాష్‌బోర్డ్ లిస్ట్‌ను రిఫ్రెష్ చేస్తుంది
                fetchAdminData(token);

            } else {
                // API నుండి 404/ఇతర ఎర్రర్ వచ్చినప్పుడు
                showNotification(`Delete Error: ${data.message || data.error || 'Failed to delete document'}`, 'error');
            }
        } catch (err) {
            console.error('Error deleting data:', err);
            showNotification('Network error. Could not connect to the server.', 'error');
        } finally {
            setDeleteLoading(false);
        }
    };


    // Fetch invoice/quotation by number (FROM App.jsx)
    // --- 
    //  function (Around line 522) ---

    // Fetch invoice/quotation by number (FROM App.jsx)
    // ... (Previous code remains the same up to here)

    // ----------------------------------------------------
    // --- NEW/UPDATED 2. Billing Form Logic ---
    // ----------------------------------------------------

    // ... (Your existing calculation effects, handleAddItem, handleUpdateItem, etc. remain here)


    // 1. Function to fetch QUOTATION only (Used when Q-Mode is selected or loading from Quotation List)
    const fetchQuotationByNumber = async (docNumber) => {
        if (!docNumber) {
            showNotification("Please enter a Quotation number.", "info");
            return false;
        }
        setFormLoading(true);
        setIsEditing(false);
        setQuotation(true); // Explicitly set mode
        setInvoice(false);

        try {
            const token = localStorage.getItem("authToken");
            if (!token) { showNotification("Authentication token missing.", "ALERT"); return false; }

            // ⭐ ADMIN ROUTE: /api/admin/quotation/fetch/:number
            const quoteURL = `${BASE_URL}/api/admin/quotation/fetch/${docNumber}`;

            const response = await fetch(quoteURL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }
            const result = await response.json();

            if (response.ok && result.quotation) {
                const q = result.quotation;

                // Normalize items and date
                const normalizedItems = q.items.map(i => ({
                    description: i.description,
                    quantity: Number(i.quantity),
                    unitPrice: Number(i.unitPrice),
                    id: i._id || Date.now() + Math.random()
                }));

                setBillDetails(prev => ({
                    ...prev,
                    billTO: q.billTO,
                    customerAddress: q.customerAddress,
                    customerGSTIN: q.customerGSTIN,
                    items: normalizedItems,
                    quotationNumber: q.quotationNumber,
                    associatedQuotationNumber: "",
                    documentDate: (q.documentDate && q.documentDate.split("T")[0]) || new Date().toISOString().split("T")[0]
                }));

                setSGST(q.sgst || false);
                setCGST(q.cgst || false);
                setIsEditing(true);

                showNotification(`Quotation #${docNumber} loaded for editing.`, "success");
                return true; // Success
            } else {
                showNotification(`Quotation #${docNumber} not found.`, "error");
                generateUniqueNumber();
                return false;
            }
        } catch (error) {
            console.error(error);
            showNotification("Error fetching quotation.", "error");
            return false;
        } finally {
            setFormLoading(false);
        }
    };

    // 2. Function to fetch INVOICE only (Used when I-Mode is selected or loading from Invoice List)
    const fetchInvoiceByNumber = async (docNumber) => {
        if (!docNumber) {
            showNotification("Please enter an Invoice number.", "info");
            return false;
        }
        setFormLoading(true);
        setIsEditing(false);
        setQuotation(false);
        setInvoice(true); // Explicitly set mode

        try {
            const token = localStorage.getItem("authToken");
            if (!token) { showNotification("Authentication token missing.", "ALERT"); return false; }

            // ⭐ ADMIN ROUTE: /api/admin/invoice/fetch/:number
            const invoiceURL = `${BASE_URL}/api/admin/invoice/fetch/${docNumber}`;

            const response = await fetch(invoiceURL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }
            const result = await response.json();

            if (response.ok && result.invoice) {
                const inv = result.invoice;

                // Normalize items and date
                const normalizedItems = inv.items.map(i => ({
                    description: i.description,
                    quantity: Number(i.quantity),
                    unitPrice: Number(i.unitPrice),
                    id: i._id || Date.now() + Math.random()
                }));

                setBillDetails(prev => ({
                    ...prev,
                    billTO: inv.billTO,
                    phone: inv.phone,
                    customerAddress: inv.customerAddress,
                    customerGSTIN: inv.customerGSTIN,
                    items: normalizedItems,
                    invoiceNumber: inv.invoiceNumber,   // ✅ CORRECT
                    associatedQuotationNumber: inv.originalQuotationNumber || "",
                    documentDate: (inv.documentDate && inv.documentDate.split("T")[0]) || new Date().toISOString().split("T")[0]
                }));
                setIsEditing(true);
                setOriginalQuotationNumber(inv.invoiceNumber);
                setSGST(inv.sgst || false);
                setCGST(inv.cgst || false);
                setIsEditing(true);

                showNotification(`Invoice #${docNumber} loaded for editing.`, "success");
                return true; // Success
            } else {
                showNotification(`Invoice #${docNumber} not found.`, "error");
                generateUniqueNumber();
                return false;
            }
        } catch (error) {
            console.error(error);
            showNotification("Error fetching invoice.", "error");
            return false;
        } finally {
            setFormLoading(false);
        }
    };

    // 3. Main Search/Load Handler (For Search Box functionality)
    const
        OrLoad = async (docNumber) => {
            // Use searchNumber if docNumber is not explicitly passed (i.e., when clicking the search button)
            if (typeof docNumber === "object" || !docNumber) {
                docNumber = searchNumber;
            }

            if (!docNumber) {
                showNotification("Please enter a document number to search.", "info");
                return;
            }

            // Prioritize the currently selected mode (Invoice or Quotation)
            if (invoice) {
                const loaded = await fetchInvoiceByNumber(docNumber);
                if (loaded) return;

                // If Invoice fails, try Quotation as a fallback (This retains the multi-search capability)
                await fetchQuotationByNumber(docNumber);

            } else { // Must be quotation
                const loaded = await fetchQuotationByNumber(docNumber);
                if (loaded) return;

                // If Quotation fails, try Invoice as a fallback
                await fetchInvoiceByNumber(docNumber);
            }

            // If nothing was loaded, the specific fetch functions will handle showing the 'Not Found' notification
        };

    // 4. Special Function to load Quotation details into Invoice Form 
    const loadQuotationForInvoice = async (docNumber) => {
        if (!docNumber) {
            showNotification("Please enter a Quotation Ref number.", "info");
            return;
        }
        setFormLoading(true);
        // Note: We deliberately KEEP invoice=true and quotation=false mode here

        try {
            const token = localStorage.getItem("authToken");
            if (!token) { showNotification("Authentication token missing.", "ALERT"); return; }

            const quoteURL = `${BASE_URL}/api/admin/quotation/fetch/${docNumber}`;

            const response = await fetch(quoteURL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }
            const result = await response.json();

            if (response.ok && result.quotation) {
                const q = result.quotation;

                // Normalize items and date
                const normalizedItems = q.items.map(i => ({
                    description: i.description,
                    quantity: Number(i.quantity),
                    unitPrice: Number(i.unitPrice),
                    id: i._id || Date.now() + Math.random()
                }));

                // ⚠️ IMPORTANT: Load data but RETAIN the current Invoice Number (billDetails.quotationNumber)
                setBillDetails(prev => ({
                    ...prev,
                    billTO: q.billTO,
                    customerAddress: q.customerAddress,
                    customerGSTIN: q.customerGSTIN,
                    items: normalizedItems,
                    // Do NOT overwrite the current invoiceNumber (which is stored in quotationNumber state)
                    associatedQuotationNumber: q.quotationNumber, // Set the associated Q-number
                    documentDate: (q.documentDate && q.documentDate.split("T")[0]) || new Date().toISOString().split("T")[0]
                }));

                setSGST(q.sgst || false);
                setCGST(q.cgst || false);
                setIsEditing(false); // Since we are creating a new invoice based on an old quote, it's NOT editing the invoice yet.

                showNotification(`Quotation #${docNumber} details successfully loaded into Invoice.`, "success");

            } else {
                showNotification(`Quotation #${docNumber} not found.`, "error");
            }
        } catch (error) {
            console.error(error);
            showNotification("Error loading quotation for invoice.", "error");
        } finally {
            setFormLoading(false);
        }
    };

    const performDeleteAdmin = async (type, number, token) => {
        setDashboardLoading(true);

        try {
            // ⭐ UPDATED API URL: /api/admin/:type/:number
            const url = `${BASE_URL}/api/admin/${type}/${number}`;

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            const data = await response.json();

            if (response.ok && data.success) {
                showModal(`${type.charAt(0).toUpperCase() + type.slice(1)} #${number} deleted successfully`, "ALERT");

                // refresh list
                fetchAdminData(token);
            } else {
                showModal(data.error || "Failed to delete document", "ALERT");
            }
        } catch (err) {
            console.error("Delete error:", err);
            showModal("Network error. Could not reach server", "ALERT");
        } finally {
            setDashboardLoading(false);
        }
    };


    const handleDeleteAdmin = (type, number) => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            showModal("Token missing. Please login again.", "ALERT");
            return;
        }

        showModal(
            `Are you sure you want to delete ${type} #${number}?`,
            "CONFIRM",
            () => performDeleteAdmin(type, number, token)
        );
    };


    const handleEditAdmin = (item) => {
        setEditItem(item);
        const value = item.invoiceValue !== undefined ? item.invoiceValue : item.quotationValue !== undefined ? item.quotationValue : 0;
        setEditValue(value);
    };

    const saveEditAdmin = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) { showModal("Authentication token missing. Cannot save changes.", 'ALERT'); return; }

        const type = activeTab === 'invoices' ? 'invoice' : 'quotation';
        const number = editItem.invoiceNumber || editItem.quotationNumber;
        setDashboardLoading(true);

        try {
            // The logic here seems to assume a PUT route for /api/admin/invoices/:number or /api/admin/quotations/:number.
            // This endpoint is NOT in your provided router code, so I'm leaving the URL as-is, assuming it works or should be used.
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
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

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

    // --- NEW: Change Password Logic (Keep Original) ---
    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitPasswordChange = async (e, isAdmin = false, targetUserId = null, targetUsername = null) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = passwordForm;

        // validations
        if (newPassword !== confirmNewPassword) {
            showNotification("New password and confirmation password do not match.", 'ALERT');
            return;
        }
        if (newPassword.length < 6) {
            showNotification("New password must be at least 6 characters long.", 'ALERT');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            showNotification("Authentication token missing. Please log in again.", 'ALERT');
            return;
        }

        setPasswordLoading(true);

        try {
            let url = "";
            let body = {};

            if (isAdmin) {
                // Admin reset flow
                // ⭐ UPDATED API URL: /api/admin/change-user-password
                url = `${BASE_URL}/api/admin/change-user-password`;
                if (targetUserId) {
                    body = { userId: targetUserId, newPassword };
                } else if (targetUsername) {
                    body = { username: targetUsername, newPassword };
                } else {
                    showNotification("Admin must provide userId or username.", 'ALERT');
                    setPasswordLoading(false);
                    return;
                }
            } else {
                // Normal user flow
                // ⭐ UPDATED API URL: /api/admin/change-user-password (Self-change uses the same admin route in your router)
                url = `${BASE_URL}/api/admin/change-user-password`;
                body = { oldPassword, newPassword };
            }

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            const data = await response.json();

            if (response.ok && data.success) {
                showNotification("Password changed successfully!", 'ALERT');
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

    const totalInvoiceValue = invoices.reduce((sum, item) => sum + (Number(item.invoiceValue) || 0), 0);

    const totalQuotationValue = quotations.reduce((sum, item) => sum + (Number(item.quotationValue) || 0), 0);

    const totalQuotationCount = quotations.length;
    const adminListData = activeTab === 'invoices' ? invoices : quotations;

    const renderDashboard = () => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Dashboard Overview</h2>

            {dashboardError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm border-l-4 border-red-500 shadow-md">
                    <AlertTriangle size={20} className="inline mr-2" /> {dashboardError}
                </div>
            )}

            {dashboardLoading ? (
                <div className="text-center py-20">
                    <Loader size={48} className="text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading stats...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* 💳 CARD 1: Monthly Revenue (Invoices ONLY) */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-blue-500">
                        <p className="text-gray-500 font-medium text-sm">Monthly Revenue</p>
                        <p className="text-3xl font-bold text-blue-800 mt-1">₹{totalInvoiceValue.toFixed(2)}</p>
                        <p className="text-xs text-blue-400 mt-2 font-semibold uppercase">{invoices.length} Paid/Billed Invoices</p>
                    </div>

                    {/* 📋 CARD 2: Estimated Pipeline (Quotations ONLY) */}
                    <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-green-500">
                        <p className="text-gray-500 font-medium text-sm">Estimated Pipeline</p>
                        <p className="text-3xl font-bold text-green-800 mt-1">₹{totalQuotationValue.toFixed(2)}</p>
                        <p className="text-xs text-green-400 mt-2 font-semibold uppercase">{quotations.length} Pending Quotations</p>
                    </div>


                    <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-purple-500">
                        <p className="text-gray-500 font-medium text-sm">Total Transactions</p>
                        <p className="text-3xl font-bold text-purple-800 mt-1">{invoices.length + quotations.length}</p>
                        <p className="text-xs text-purple-400 mt-2 font-semibold uppercase">Total Documents Generated</p>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-indigo-50">
                <h3 className="text-lg font-semibold mb-4 text-indigo-700">Quick Operations</h3>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('newBill')} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center transition shadow-lg"><PlusSquare size={18} className="mr-2" /> Create New Bill</button>
                    <button onClick={() => setActiveTab('invoices')} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 flex items-center transition shadow-lg"><Receipt size={18} className="mr-2" /> View Sales History</button>
                </div>
            </div>

            {/* Charts Section */}
            <div className="mt-10">
                {chartData.loading ? (
                    <p className="text-center text-gray-500 py-10">Syncing analytics data...</p>
                ) : (
                    <AnalyticsDashboard chartData={chartData} />
                )}
            </div>
        </div>
    );

    const renderDataList = (type) => {
        const isInvoice = type === "invoices";

        return (
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    <ClipboardList size={28} className="inline mr-2 text-indigo-600" />
                    {isInvoice ? "Invoices" : "Quotations"} List
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
                                {isInvoice ? (
                                    <Receipt className="text-indigo-400" size={40} />
                                ) : (
                                    <FileText className="text-indigo-400" size={40} />
                                )}
                            </div>
                            <p className="text-gray-600 font-bold text-xl">
                                No {isInvoice ? "Invoices" : "Quotations"} found
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
                                    {adminListData.map((item) => {
                                        const number = item.invoiceNumber || item.quotationNumber;
                                        const value =
                                            item.invoiceValue !== undefined
                                                ? item.invoiceValue
                                                : item.quotationValue || 0;

                                        return (
                                            <tr key={number} className="hover:bg-indigo-50 transition duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-indigo-700 text-white text-sm font-bold rounded-full">
                                                        {number}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {item.billTO}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                                    {item.customerAddress}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-mono text-gray-700">
                                                    {item.customerGSTIN || "N/A"}
                                                </td>

                                                <td className="px-6 py-4 text-right text-sm font-bold text-green-600">
                                                    ₹{value.toFixed(2)}
                                                </td>

                                                <td className="px-6 py-4 text-center text-xs text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex gap-2 justify-center">


                                                        <button
                                                            onClick={() => {
                                                                // Step 1: Switch to form page
                                                                setActiveTab("newBill");

                                                                // Step 2: Set mode correctly immediately
                                                                const typeToLoad = isInvoice ? 'invoice' : 'quotation';
                                                                setInvoice(isInvoice);
                                                                setQuotation(!isInvoice);

                                                                // Step 3: Wait for state reset, then load the document using the specific function
                                                                setTimeout(() => {
                                                                    if (typeToLoad === 'invoice') {
                                                                        // Direct call for Invoice
                                                                        fetchInvoiceByNumber(number);
                                                                    } else {
                                                                        // Direct call for Quotation
                                                                        fetchQuotationByNumber(number);
                                                                    }
                                                                }, 400); // Ensures state reset completes before fetching

                                                            }}
                                                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 text-sm flex items-center gap-1 transition"
                                                        >
                                                            <Edit size={14} /> Edit
                                                        </button>


                                                        {/* DELETE BUTTON - FIXED */}
                                                        <button
                                                            onClick={() => {
                                                                handleDeleteAdmin(
                                                                    isInvoice ? "invoice" : "quotation",
                                                                    number
                                                                );
                                                            }}
                                                            className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 text-sm flex items-center gap-1 transition"
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderChangePassword = () => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* 🔑 Updated H2 title for clarity and professionalism */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                🔑 User Account Management
            </h2>

            {/* ⭐ NEW/UPDATED PROFESSIONAL DESCRIPTION */}
            <p className="text-gray-600 mb-6 font-medium text-lg border-b pb-4">
                Administrator Password Reset Utility. Use this form to securely reset the password for any specific user account via their Username.
            </p>

            <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto">
                {/* The previous <p> tag was here and has been moved/integrated above. */}

                <form
                    className="space-y-6"
                    // ⭐ UNCHANGED: Call handleSubmitPasswordChange with isAdmin=true and targetUsername
                    onSubmit={(e) =>
                        handleSubmitPasswordChange(e, true, null, passwordForm.usernameToReset)
                    }
                >
                    {/* 1. USERNAME INPUT (New Field) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Target Username</label>
                        <input
                            type="text"
                            name="usernameToReset"
                            // ⭐ STATE BINDING: Assuming you add 'usernameToReset' to passwordForm state
                            value={passwordForm.usernameToReset || ''}
                            onChange={(e) => {
                                // Using handlePasswordChange to manage state, setting a new field
                                handlePasswordChange({ target: { name: 'usernameToReset', value: e.target.value } });
                            }}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Enter Username to reset"
                            disabled={passwordLoading}
                        />
                    </div>

                    {/* 2. NEW PASSWORD INPUT (UNCHANGED) */}
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

                    {/* 3. CONFIRM NEW PASSWORD INPUT (UNCHANGED) */}
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
                        // ⭐ UNCHANGED DISABLED LOGIC
                        disabled={passwordLoading || !passwordForm.usernameToReset || !passwordForm.newPassword || !passwordForm.confirmNewPassword}
                    >
                        {passwordLoading ? (
                            <Loader size={20} className="animate-spin mx-auto" />
                        ) : (
                            'Reset Password for User'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );

    // --- REPLACED: renderNewBillForm (FROM App.jsx UI) ---
    const renderNewBillForm = () => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📄 New Bill Creator</h2>
            <div className="w-full flex items-center justify-center">
                <div className="font-sans w-full max-w-4xl">
                    {/* Search Section */}
                    <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5 hide-on-print">
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
                                // ⭐ UPDATED FUNCTIONALITY: Using the priority/fallback search handler
                                onClick={() =>

                                    OrLoad(searchNumber)}
                                disabled={formLoading}
                                className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 disabled:opacity-50 font-medium whitespace-nowrap"
                            >
                                {formLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>

                    {/* Mode Switch */}
                    <div className="flex items-center justify-start gap-5 mb-5 font-semibold text-lg hide-on-print">
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
                    <div className="border-dashed border-2 border-slate-400 rounded-xl p-5 bg-gray-50 hide-on-print">
                        <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                            1. {invoice ? "Invoice" : "Quotation"} Details
                        </p>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-start flex-wrap gap-5">
                            <h1 className="font-medium">{invoice ? "Invoice" : "Quotation"} Number:</h1>
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
                            <h1 className="font-medium">Date:</h1>
                            <input
                                type="date"
                                value={billDetails.documentDate}
                                onChange={(e) => setBillDetails({ ...billDetails, documentDate: e.target.value })}
                                className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full md:w-auto"
                            />




                            {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
                            {invoice && (
                                <div className="flex items-center gap-3 mt-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
                                    <h1 className="font-medium text-sm flex-shrink-0">Quotation Ref:</h1>
                                    <div className="flex items-center border border-blue-500 rounded-lg shadow-md flex-1 w-full sm:w-auto">
                                        <input
                                            type="text"
                                            value={billDetails.associatedQuotationNumber}
                                            placeholder={`Enter Q-Number to load`}
                                            className="outline-none rounded-l-lg px-2 py-1 text-sm flex-1 min-w-0"
                                            onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
                                        />
                                        <button
                                            // ⭐ FINAL FIX: Using the dedicated function 'loadQuotationForInvoice' 
                                            // This function loads the data but maintains the 'invoice' mode.
                                            onClick={() => loadQuotationForInvoice(billDetails.associatedQuotationNumber)}
                                            disabled={formLoading}
                                            className="bg-blue-500 text-white px-2 py-1 rounded-r-lg h-full hover:bg-blue-600 disabled:opacity-50 text-sm flex-shrink-0"
                                        >
                                            Load
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* idhi reciepent details */}

                    {/*                    
                    <div className="border-dashed border-2 border-slate-400 rounded-xl my-7 p-5 bg-gray-50 hide-on-print">
                        <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                            2. Recipient Details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Bill TO</h1><input type="text" placeholder="Enter Biller Details" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" value={billDetails.billTO} onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })} /></div>
                            <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Address</h1><input type="text" placeholder="Enter Biller Address" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" value={billDetails.customerAddress} onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })} /></div>
                            <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Customer GSTIN</h1><input type="text" placeholder="Enter Customer GSTIN" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" value={billDetails.customerGSTIN} onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })} /></div>
                        </div>
                    </div> */}

                    {/* 2. Recipient Details */}
                    <div className="border-dashed border-2 border-slate-400 rounded-xl my-7 p-5 bg-gray-50 hide-on-print">

                        <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                            2. Recipient Details
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                            <div className="flex items-start justify-center flex-col gap-2 w-full">
                                <h1 className="font-medium">Bill TO</h1>
                                <input
                                    type="text"
                                    placeholder="Enter Biller Details"
                                    className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full"
                                    value={billDetails.billTO}
                                    onChange={(e) =>
                                        setBillDetails({ ...billDetails, billTO: e.target.value })
                                    }
                                />
                            </div>

                            {invoice && (
                                <div className="flex items-start justify-center flex-col gap-2 w-full">
                                    <h1 className="font-medium">Phone</h1>
                                    <input
                                        type="tel"
                                        placeholder="Enter Mobile Number"
                                        maxLength={10}
                                        className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full"
                                        value={billDetails.phone || ""}
                                        onChange={(e) =>
                                            setBillDetails({ ...billDetails, phone: e.target.value })
                                        }
                                    />
                                </div>
                            )}

                            <div className="flex items-start justify-center flex-col gap-2 w-full">
                                <h1 className="font-medium">Address</h1>
                                <input
                                    type="text"
                                    placeholder="Enter Biller Address"
                                    className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full"
                                    value={billDetails.customerAddress}
                                    onChange={(e) =>
                                        setBillDetails({ ...billDetails, customerAddress: e.target.value })
                                    }
                                />
                            </div>

                            <div className="flex items-start justify-center flex-col gap-2 w-full">
                                <h1 className="font-medium">Customer GSTIN</h1>
                                <input
                                    type="text"
                                    placeholder="Enter Customer GSTIN"
                                    className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full"
                                    value={billDetails.customerGSTIN}
                                    onChange={(e) =>
                                        setBillDetails({ ...billDetails, customerGSTIN: e.target.value })
                                    }
                                />
                            </div>

                        </div>

                    </div>

                    {/* 3. Items Section */}
                    <div className="border-dashed border-2 border-slate-400 rounded-xl my-7 p-5 bg-gray-50 w-full hide-on-print">
                        <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pb-3">
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                                <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Description</h1><input type="text" required value={tableItems.description} placeholder="Enter Description" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })} /></div>
                                <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Quantity</h1><input type="number" required value={tableItems.quantity} placeholder="Enter Quantity" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })} /></div>
                                <div className="flex items-start justify-center flex-col gap-2 w-full"><h1 className="font-medium">Unit Price (₹)</h1><input type="number" required value={tableItems.unitPrice} placeholder="Single Price" className="outline-none rounded-lg px-3 py-2 border border-blue-500 shadow-md w-full" onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })} /></div>
                            </div>
                        </form>

                        {/* Items Table Display */}
                        {billDetails.items.length > 0 && (
                            <div className="overflow-x-auto w-full py-5">
                                <div className="min-w-[40rem] md:min-w-full">
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
                                                <tr key={item.id} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}>
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
                    <div className="border-dashed border-2 border-slate-400 rounded-xl my-7 p-5 bg-gray-50 hide-on-print">
                        <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
                        <div className="flex flex-wrap items-center justify-start gap-5 mt-3">
                            <button type="button" onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-600"} text-white px-5 py-2 rounded-lg duration-300 cursor-pointer font-medium shadow-md`}>SGST {sgst ? 'ON' : 'OFF'}</button>
                            <button type="button" onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-600"} text-white px-5 py-2 rounded-lg duration-300 cursor-pointer font-medium shadow-md`}>CGST {cgst ? 'ON' : 'OFF'}</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 hide-on-print">
                        {/* Save/Update Button */}
                        <button
                            onClick={handleSaveOrUpdate}
                            disabled={
                                saveLoading ||
                                billDetails.items.length === 0 ||
                                !billDetails.billTO ||
                                !billDetails.customerAddress ||
                                (invoice && !billDetails.phone)
                            }
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center min-w-[10rem]"
                        >
                            {saveLoading ? <Loader size={20} className="animate-spin" /> : isEditing ? 'Update Document' : 'Save Document'}
                        </button>

                        {/* Delete Button (Visible only in Editing mode) */}
                        {isEditing && (
                            <button
                                onClick={handleDeleteForm}
                                disabled={deleteLoading}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center min-w-[10rem]"
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete Document'}
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* Print Trigger Button */}
            <ReactToPrint
                trigger={() => (
                    <div className='flex justify-center hide-on-print'>
                        <button className="text-white bg-red-600 font-medium px-6 py-2 rounded-lg mb-5 mt-5 shadow-lg hover:bg-red-700 transition">
                            Print Receipt
                        </button>
                    </div>

                )}
                content={() => printRef.current}
                pageStyle="@page { size: A4 portrait; margin: 20mm; } body { margin: 20px; }"
            />

            {/* --- PDF/Print PREVIEW Area (Updated to use documentDate) --- */}
            <div className="w-full bg-white flex items-center justify-center p-2 sm:p-4">
                <div className="w-full max-w-full xl:max-w-[60rem] border border-gray-300 shadow-xl overflow-x-auto">
                    <div ref={printRef} className="flex flex-col min-w-[50rem] xl:w-[60rem] bg-white text-black printable-content mx-auto">

                        {/* Header Row */}
                        <div className="flex flex-row h-[15rem] text-sm border border-black">
                            {/* Left Side: Bill To */}
                            <div className="h-full w-2/5 sm:w-[20rem] border-r border-black flex flex-col">
                                <div className="flex items-center justify-center h-[30%] border-b border-black">
                                    <p className="text-center font-bold text-lg sm:text-2xl">{invoice ? "TAX INVOICE" : "QUOTATION"}</p>
                                </div>
                                <div className="flex-1 px-3 sm:px-5 py-2 overflow-hidden">
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
                            <div className="h-full w-3/5 sm:w-[40rem] flex flex-col justify-between">
                                <div className="p-3 sm:p-5 flex items-start justify-between">
                                    <div className="w-[70%] text-xs sm:text-sm">
                                        <p className="font-semibold text-base sm:text-xl truncate">GSTIN: <span className="font-medium text-xs sm:text-base">37AKOPY6766H1Z4</span></p>
                                        <p className="font-medium pt-1">DESIGN BLOCKS</p>
                                        <p className="font-semibold text-base pt-2">Address:</p>
                                        <p className='text-xs sm:text-sm'>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
                                    </div>
                                    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex items-center justify-center flex-shrink-0">
                                        <img
                                            src="https://designblocks.in/img/DB.png"
                                            alt="Design Blocks Logo"
                                            className="w-full h-auto object-contain"
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO"; }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between h-10 px-3 sm:px-5 border-t border-black text-sm">
                                    <p className="font-semibold text-sm sm:text-lg">
                                        {invoice ? "Invoice" : "Quotation"} No:
                                        <span className="font-normal">
                                            {invoice ? billDetails.invoiceNumber : billDetails.quotationNumber}
                                        </span>
                                    </p>
                                    <p className='whitespace-nowrap'>Date: <span>{new Date(billDetails.documentDate).toLocaleDateString("en-GB")}</span></p>
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
                                    <tr key={items.id} className="h-10">
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
                                        <div className="flex flex-col sm:flex-row justify-between">
                                            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                                <p className="font-semibold text-sm">BANK DETAILS:-</p>
                                                <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
                                                <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
                                                <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
                                            </div>
                                            <div className="w-full sm:w-1/2 text-left sm:text-right pt-2 sm:pt-6">
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

    // --- Main Admin Panel Structure (Keep Original) ---

    const SidebarItem = ({ icon: Icon, label, tab }) => (
        <button
            onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
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
        <div
            className={`
      fixed top-0 left-0 w-64 bg-indigo-900 text-white flex flex-col shadow-2xl z-50 
      transform transition-transform duration-300 ease-in-out h-screen
      md:fixed md:translate-x-0 md:flex md:top-0 md:h-screen
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      hide-on-print
    `}
        >
            {/* HEADER */}
            <div className="p-5 text-2xl font-extrabold border-b border-indigo-800 flex justify-between items-center">
                <span className="text-indigo-300">Admin Portal</span>

                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden p-1"
                >
                    <X size={24} />
                </button>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <SidebarItem icon={Home} label="Dashboard" tab="dashboard" />
                <SidebarItem icon={Receipt} label="Invoices List" tab="invoices" />
                <SidebarItem icon={FileText} label="Quotations List" tab="quotations" />
                <SidebarItem icon={PlusSquare} label="Create New Bill" tab="newBill" />
                <SidebarItem icon={Lock} label="Change Password" tab="changePassword" />
                {/* Mobile gap for logout visibility */}
                <div className="mb-16 md:mb-0">
                    <SidebarItem icon={ClipboardList} label="Purchases" tab="purchases" />
                </div>
                <SidebarItem icon={Users} label="Clients" tab="clients" />
                <SidebarItem icon={FileEdit} label="Quotation Builder" tab="quotationEditor" />

            </nav>

            {/* LOGOUT BUTTON */}
            <div className="p-4 border-t border-indigo-800 mt-auto">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center p-3 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition duration-150 shadow-lg"
                >
                    <LogOut size={18} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );

    const renderContent = () => {
        const token = localStorage.getItem('authToken');
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

            case 'quotationEditor':
                return (
                    <QuotationBuilder
                        BASE_URL={BASE_URL}
                        showNotification={showNotification}
                        token={token}
                    />
                );

            //         case 'quotationBuilder':
            // return (
            //     <QuotationBuilder
            //         BASE_URL={BASE_URL}
            //         showNotification={showNotification}
            //         token={token}
            //     />
            // );
            case 'purchases':
                return (
                    <PurchaseManager
                        BASE_URL={BASE_URL}
                        showNotification={showNotification}
                        token={token}
                    />
                );
            case 'clients':
                return (
                    <ClientManager
                        BASE_URL={BASE_URL}
                        showNotification={showNotification}
                        token={token}
                    />
                );
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100 font-sans md:pl-64">
            <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />

            <Sidebar />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden hide-on-print"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}


            <div className="flex-1 overflow-y-auto">
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
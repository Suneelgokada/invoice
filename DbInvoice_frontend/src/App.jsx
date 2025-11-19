// import React, { useState, useRef, useEffect } from "react";
// import { ToWords } from 'to-words';
// import ReactToPrint from "react-to-print";

// function App() {
//     const date=new Date();
//     const toWords = new ToWords();
//     const [quotation, setQuotation] = useState(true);
//     const [invoice, setInvoice] = useState(false);
//     const [sgst, setSGST] = useState(false);
//     const [cgst, setCGST] = useState(false);
//     const printRef = useRef(null);
//     const [taxableValue, setTaxableValue] = useState(0);
//     const [invoiceValue, setInvoiceValue] = useState(0);
//     const [SGST, setSGSTValue] = useState(0);
//     const [CGST, setCGSTValue] = useState(0);

//     const [billDetails, setBillDetails] = useState({
//         billTO: "",
//         customerAddress: "",
//         customerGSTIN:"",
//         quotationNumber: "",
//         items: [],
//         sgstValue: "",
//         cgstValue: "",
//         InvoiceValue: "",
//     });
//     const [tableItems, setTableItems] = useState({
//         description: "",
//         quantity: "",
//         unitPrice: "",
//     });

//     useEffect(() => {
//         // Calculate taxable value and taxes whenever billDetails.items changes
//         const newTaxableValue = billDetails.items.reduce((acc, item) => {
//             return acc + item.quantity * item.unitPrice;
//         }, 0);
//         let totalValue=0;
//         if(sgst)
//         {
//             setSGSTValue((newTaxableValue * 0.09).toFixed(2));
//         }
//         else{
//             setSGSTValue(0);
//         }
//         if(cgst)
//         {
//             setCGSTValue((newTaxableValue * 0.09).toFixed(2));
//         }
//         else{
//             setCGSTValue(0);
//         }
//         setTaxableValue(newTaxableValue);
//         totalValue+=(Number(taxableValue)+Number(SGST)+Number(CGST));
//         setInvoiceValue(totalValue);
//     }, [billDetails.items, cgst, sgst, CGST, SGST, taxableValue]);

//     const handleAddItem = (e) => {
//         e.preventDefault();
//         setBillDetails({
//             ...billDetails,
//             items: [...billDetails.items, tableItems],
//         });
//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//     };

//     const handleItem=(item)=>{
//         let removedArray=billDetails.items.filter(e=>e!=item);
//         console.log(removedArray);
//         setBillDetails({...billDetails,items:removedArray});
//         console.log(billDetails);
//     }

//     return (
//         <div className="flex items-center justify-center">
//             <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
//                 <div className="w-full flex items-center justify-center">
//                     <div className="font-[Poppins] w-full lg:w-[50rem]">
//                         {/* Heading */}
//                         <div className="pb-5 text-3xl">
//                             <p className="font-bold text-blue-500">
//                                 Design{" "}
//                                 <span className="text-green-400">Blocks</span>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-start gap-5 mb-5">
//                             <div className={`cursor-pointer px-4 py-1 ${quotation?"bg-green-400":"bg-transparent"} border-2 border-green-400 rounded`} onClick={()=>{setQuotation(!quotation),setInvoice(!invoice)}}>Quotation</div>
//                             <div className={`cursor-pointer px-4 py-1 ${invoice?"bg-green-400":"bg-transparent"} border-2 border-green-400 rounded`} onClick={()=>{setQuotation(!quotation),setInvoice(!invoice)}}>Invoice</div>
//                         </div>
//                         {/* Invoice Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 1. {invoice?"Invoice":"Quotation"} Details
//                             </p>
//                             <div className="flex items-center justify-start flex-wrap gap-3">
//                                 <h1>{invoice?"Invoice":"Quotation"} Number</h1>
//                                 <input
//                                     type="text"
//                                     name="Quotation Number"
//                                     placeholder={`Enter ${invoice?"Invoice":"Quotation"} Number`}
//                                     className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
//                                     onChange={(e) => {
//                                         setBillDetails({
//                                             ...billDetails,
//                                             quotationNumber: e.target.value,
//                                         });
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                         {/* Receipient Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 2. Receipient Details
//                             </p>
//                             <div className="flex items-start justify-start flex-wrap gap-3">
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Bill TO</h1>
//                                     <input
//                                         type="text"
//                                         name="Bill To"
//                                         placeholder="Enter Biller Details"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
//                                         value={billDetails.billTO}
//                                         onChange={(e) => {
//                                             setBillDetails({
//                                                 ...billDetails,
//                                                 billTO: e.target.value,
//                                             });
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Address</h1>
//                                     <input
//                                         type="text"
//                                         name="Customer Address"
//                                         placeholder="Enter Biller Address"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
//                                         value={billDetails.customerAddress}
//                                         onChange={(e) => {
//                                             setBillDetails({
//                                                 ...billDetails,
//                                                 customerAddress: e.target.value,
//                                             });
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Customer GSTIN</h1>
//                                     <input
//                                         type="text"
//                                         name="Customer Address"
//                                         placeholder="Enter Biller Address"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
//                                         value={billDetails.customerGSTIN}
//                                         onChange={(e) => {
//                                             setBillDetails({
//                                                 ...billDetails,
//                                                 customerGSTIN: e.target.value,
//                                             });
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Items Details Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                             <form
//                                 className="flex items-start justify-start flex-col"
//                                 onSubmit={handleAddItem}
//                             >
//                                 <div className="flex flex-row items-center justify-between w-full pb-3">
//                                     <p className="text-xl font-semibold uppercase text-blue-600">
//                                         3. Items
//                                     </p>
//                                     <button
//                                         type="submit"
//                                         className="bg-green-400 px-3 py-2 py-0.5 rounded-md text-green-950 shadow-md shadow-black/30"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                                 <div className="flex items-center justify-start flex-wrap gap-3">
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Description</h1>
//                                         <input
//                                             type="text"
//                                             name="Description"
//                                             required
//                                             value={tableItems.description}
//                                             placeholder="Enter Quotation Number"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
//                                             onChange={(e) => {
//                                                 setTableItems({
//                                                     ...tableItems,
//                                                     description: e.target.value,
//                                                 });
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Quantity</h1>
//                                         <input
//                                             type="number"
//                                             name="Quantity"
//                                             required
//                                             value={tableItems.quantity}
//                                             placeholder="Enter No. Of Products"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
//                                             onChange={(e) => {
//                                                 setTableItems({
//                                                     ...tableItems,
//                                                     quantity: e.target.value,
//                                                 });
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Unit Price</h1>
//                                         <input
//                                             type="number"
//                                             name="Unit Price"
//                                             required
//                                             value={tableItems.unitPrice}
//                                             placeholder="Single Product Price"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
//                                             onChange={(e) => {
//                                                 setTableItems({
//                                                     ...tableItems,
//                                                     unitPrice: e.target.value,
//                                                 });
//                                             }}
//                                         />
//                                     </div>
//                                 </div>
//                             </form>
//                             {
//                                 billDetails.items.length>0 &&
//                                 <div className="overflow-x-scroll w-full py-5">
//                                     <div className="w-[50rem]">
//                                         <table className="w-full">
//                                             <tbody className="w-full">
//                                                 {
//                                                     billDetails.items.map((item, index) => {
//                                                         return (
//                                                             <tr key={index} className="">
//                                                                 <td className="border border-blue-500 px-3 py-2">{index + 1}</td>
//                                                                 <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                                                                 <td className="border border-blue-500 px-3 py-2">{item.quantity}</td>
//                                                                 <td className="border border-blue-500 px-3 py-2">{item.unitPrice}</td>
//                                                                 <td className="px-3">
//                                                                     <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white" onClick={()=>handleItem(item)}>Delete</p>
//                                                                 </td>
//                                                             </tr>
//                                                         );
//                                                 })}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="text-xl font-semibold uppercase text-blue-600">
//                                 4. GST Info
//                             </p>
//                             <div className="flex items-center justify-start gap-5 mt-3">
//                                 <label
//                                     htmlFor="SGST"
//                                     onClick={() => {
//                                         setSGST(!sgst);
//                                     }}
//                                     className={`${sgst?"bg-red-400":"bg-green-400"} px-5 py-1 rounded duration-300`}
//                                 >
//                                     SGST
//                                 </label>
//                                 <input type="checkbox" name="sgst" id="SGST" className="hidden"/>
//                                 <label
//                                     htmlFor="CGST"
//                                     onClick={() => {
//                                         setCGST(!cgst);
//                                     }}
//                                     className={`${cgst?"bg-red-400":"bg-green-400"} px-5 py-1 rounded duration-300`}
//                                 >
//                                     CGST
//                                 </label>
//                                 <input type="checkbox" name="cgst" id="CGST" className="hidden"/>
//                             </div>
//                         </div>
//                         <div></div>
//                     </div>
//                 </div>
//                 <ReactToPrint
//                     trigger={() => (
//                         <button className="text-white bg-red-500 font-medium px-4 py-1 rounded mb-5">
//                             Print Receipt
//                         </button>
//                     )}
//                     content={() => printRef.current}
//                     pageStyle="@page { size: A4 portrait; margin: 20mm; } body { margin: 20px; }"
//                 />
//                 <div className="w-full font-[Lora] bg-white flex items-center justify-center">
//                     <div className="overflow-x-scroll w-full xl:w-[60rem]">
//                         <div ref={printRef} className="flex items-center justify-center flex-col w-[60rem]">
//                             {/* Starting Row */}
//                             <div className="flex items-center justify-start flex-row h-[15rem]">
//                                 <div className="h-full w-[20rem] border border-black">
//                                     <div className=" flex items-center justify-center h-[30%]">
//                                         <p className="text-center font-bold text-2xl">{invoice?"Invoice":"Quotation"}</p>
//                                     </div>
//                                     <div className="h-[70%] border-t border-black px-5 py-2">
//                                         <p className="font-semibold text-lg">Bill to:</p>
//                                         {
//                                             billDetails.customerGSTIN !="" &&
//                                             <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>
//                                         }
//                                         <p>{billDetails.billTO}</p>
//                                         <p>{billDetails.customerAddress}</p>
//                                     </div>
//                                 </div>
//                                 <div className="h-full w-[40rem] border-l-0 border border-black flex flex-col justify-between">
//                                     <div className="p-5 flex items-center justify-between">
//                                         <div className="w-[70%]">
//                                             <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                                             <p className="font-medium">DESIGN BLOCKS</p>
//                                             <p className="font-semibold text-lg pt-2">Address:</p>
//                                             <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                                         </div>
//                                         <img src="https://designblocks.in/img/DB.png" alt="Design Blocks Logo" className="w-[20%]"/>
//                                     </div>
//                                     <div className="flex items-center justify-between flex-row h-10 px-5 border-t border-black">
//                                         <div>
//                                             <p className="font-semibold text-lg">{invoice?"Invoice":"Quotation"} No: <span className="font-normal text-base">{billDetails.quotationNumber}</span></p>
//                                         </div>
//                                         <div>
//                                             <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Blank Row */}
//                             <div className="h-10 w-full border-x border-black"></div>
//                             {/* Items Row */}
//                             <table className="w-[60rem]">
//                                 <thead>
//                                     <tr className="h-10">
//                                         <td className="border border-black text-center">Item</td>
//                                         <td className="border border-black text-center w-[30rem]">Description</td>
//                                         <td className="border border-black text-center">Quantity</td>
//                                         <td className="border border-black text-center">Unit Price (Rs.)</td>
//                                         <td className="border border-black text-center">Total Price (Rs.)</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="border border-black">
//                                     {   
//                                         billDetails.items.length>0 &&
//                                         billDetails.items.map((items,key)=>{
//                                             return(
//                                             <tr key={key} className="h-10">
//                                                 <td className="text-center border border-black">{key+1}.</td>
//                                                 <td className="px-2 border border-black">{items.description}</td>
//                                                 <td className="px-2 border border-black">{items.quantity}</td>
//                                                 <td className="px-2 border border-black">{items.unitPrice}</td>
//                                                 <td className="px-2 border border-black">{(items.quantity*items.unitPrice).toFixed(2)}</td>
//                                             </tr>
//                                             )
//                                         })
//                                     }
//                                     <tr className="border border-black h-10">
//                                         <td className=""></td>
//                                         <td></td>
//                                         <td></td>
//                                         <td className="px-2 text-red-700 font-semibold border border-black">Taxable Value</td>
//                                         <td className="px-2 border border-black">{taxableValue.toFixed(2)}</td>
//                                     </tr>
//                                     <tr className="h-10 w-full"></tr>
//                                     {
//                                         sgst && 
//                                         <tr className="h-10 border border-black">
//                                             <td className="border border-black text-center">i</td>
//                                             <td className="px-2">SGST@9.00%</td>
//                                             <td className=""></td>
//                                             <td className=""></td>
//                                             <td className="border border-black px-2">{
//                                                 // (taxableValue*(9/100)).toFixed(2)
//                                                 SGST
//                                             }</td>
//                                         </tr>
//                                     }
//                                     {
//                                         cgst && 
//                                         <>
//                                             <tr className="h-10 border border-black">
//                                                 <td className="border border-black text-center">ii</td>
//                                                 <td className="px-2">CGST@9.00%</td>
//                                                 <td className=""></td>
//                                                 <td className=""></td>
//                                                 <td className="border border-black px-2">{
//                                                     // (taxableValue*(9/100)).toFixed(2)
//                                                     CGST
//                                                 }</td>
//                                             </tr>
//                                         </>
//                                     }
//                                     {
//                                         (cgst || sgst) && 
//                                         <>
//                                             <tr className="border border-black h-10">
//                                                 <td className=""></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td className="px-2 text-red-700 font-semibold border border-black">Invoice Value</td>
//                                                 <td className="px-2 border border-black">{invoiceValue}</td>
//                                             </tr>
//                                             <tr className="h-10 w-full"></tr>
//                                         </>
//                                     }
//                                     <tr className="border border-black h-10">
//                                         <td></td>
//                                         <td><span className="font-semibold">In Words: </span>{toWords.convert(invoiceValue>0?invoiceValue:taxableValue)}</td>
//                                         <td></td>
//                                         <td></td>
//                                         <td></td>
//                                     </tr>
//                                     <tr>
//                                         <td colSpan={5} className="p-2">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <p className="font-semibold">BANK DETAILS:-</p>
//                                                     <p>UNION BANK OF INDIA , MURALI NAGAR,VISAKHAPATNAM</p>
//                                                     <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187 ; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                                                     <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                                                 </div>
//                                                 <div>
//                                                     <p className="text-xl">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-center mt-3">
//                                                 Thank You
//                                             </div>
//                                         </td>
//                                     </tr>
//                                     {
//                                         quotation && 
//                                         <tr>
//                                             <td colSpan={5} className="p-2 border border-black">
//                                                 <div className="text-sm">
//                                                     <p className="font-semibold  mb-5">Terms and Conditions.</p>
//                                                     <p>Quotation prices are valid for 20 days from the date of issue.</p>
//                                                     <p>Any increase in project scope will result in an additional cost.</p>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     }
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

// import React, { useState, useRef, useEffect } from "react";
// // External libraries "to-words" and "react-to-print" removed due to sandbox environment constraints.

// function App() {
//     const date = new Date();
//     // Simplified Number to Words Converter (Replaces 'to-words' library)
//     const numberToWords = (num) => {
//         if (num === 0) return 'Zero';

//         const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//         const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//         const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//         const scales = ['', 'Thousand', 'Million'];

//         const convertChunk = (n) => {
//             if (n === 0) return '';
//             if (n < 10) return units[n];
//             if (n < 20) return teens[n - 10];
//             if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
//             return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertChunk(n % 100) : '');
//         };

//         let words = '';
//         let i = 0;
        
//         // Handle rounding and separation of integer/decimal parts
//         const roundedNum = parseFloat(num.toFixed(2));
//         const [intPart, fracPart] = roundedNum.toString().split('.');

//         let integer = parseInt(intPart);
//         const fractional = fracPart ? parseInt(fracPart) : 0;
        
//         if (integer > 999999999) return 'Value too large'; // Safety limit

//         while (integer > 0) {
//             const chunk = integer % 1000;
//             if (chunk !== 0) {
//                 let chunkWords = convertChunk(chunk);
//                 words = chunkWords + (scales[i] ? ' ' + scales[i] : '') + ' ' + words;
//             }
//             integer = Math.floor(integer / 1000);
//             i++;
//         }
//         words = words.trim();

//         if (fractional > 0) {
//             words += (words ? ' and ' : '') + convertChunk(fractional) + ' Paisa';
//         }

//         return words.trim();
//     };

//     const [quotation, setQuotation] = useState(true);
//     const [invoice, setInvoice] = useState(false);
//     const [sgst, setSGST] = useState(false);
//     const [cgst, setCGST] = useState(false);
//     const printRef = useRef(null);
//     const [taxableValue, setTaxableValue] = useState(0);
//     const [invoiceValue, setInvoiceValue] = useState(0);
//     const [SGST, setSGSTValue] = useState(0);
//     const [CGST, setCGSTValue] = useState(0);
//     const [searchNumber, setSearchNumber] = useState("");
//     const [loading, setLoading] = useState(false);
    
//     // State to hold the original quote number if we load one (separate from billDetails.quotationNumber which holds the current doc number)
//     const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);

//     // Using simple alert as a placeholder for showNotification
//     const showNotification = (message, type) => {
//         // Use console.log for debugging notification types if needed
//         alert(`${type.toUpperCase()}: ${message}`);
//     };

//     const [billDetails, setBillDetails] = useState({
//         billTO: "",
//         customerAddress: "",
//         customerGSTIN: "",
//         quotationNumber: "", // This holds the current document number (either Q-xxx or I-xxx)
//         associatedQuotationNumber: "", // NEW: Holds the quotation number if converting to invoice (used for Section 1 input)
//         items: [],
//     });

//     const [tableItems, setTableItems] = useState({
//         description: "",
//         quantity: "",
//         unitPrice: "",
//     });

//     // Generate unique number on component mount or when switching between invoice/quotation
//     useEffect(() => {
//         // Clear form fields when switching modes
//         setBillDetails(prev => ({
//             ...prev,
//             billTO: "",
//             customerAddress: "",
//             customerGSTIN: "",
//             items: [],
//             associatedQuotationNumber: "", // Clear associated quotation number
//         }));
//         setSGST(false);
//         setCGST(false);
//         setTaxableValue(0);
//         setInvoiceValue(0);
//         setOriginalQuotationNumber(null);
//         setSearchNumber("");
        
//         generateUniqueNumber();
//     }, [invoice, quotation]);

//     // Generate unique invoice/quotation number
//     const generateUniqueNumber = async () => {
//         try {
//             const url = quotation
//                 ? "http://localhost:5000/api/quotation/generate"
//                 : "http://localhost:5000/api/invoice/generate";

//             const response = await fetch(url);
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
//     };

//     // Calculation effect
//     useEffect(() => {
//         const newTaxableValue = billDetails.items.reduce((acc, item) => {
//             const quantity = Number(item.quantity) || 0;
//             const unitPrice = Number(item.unitPrice) || 0;
//             return acc + quantity * unitPrice;
//         }, 0);
        
//         const gstRate = 0.09;
//         const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//         const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;
        
//         const totalValue = newTaxableValue + currentSGST + currentCGST;

//         setSGSTValue(currentSGST.toFixed(2));
//         setCGSTValue(currentCGST.toFixed(2));
//         setTaxableValue(newTaxableValue);
//         setInvoiceValue(totalValue);
//     }, [billDetails.items, cgst, sgst]);

//     const handleAddItem = (e) => {
//         e.preventDefault();
//         setBillDetails({
//             ...billDetails,
//             items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice) }],
//         });
//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//     };

//     const handleItem = (item) => {
//         let removedArray = billDetails.items.filter(e => e !== item);
//         setBillDetails({ ...billDetails, items: removedArray });
//     };

//     // Save invoice/quotation to backend
//     const handleSave = async () => {
//         try {
//             setLoading(true);

//             const body = {
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 invoiceValue: invoiceValue,
//                 invoiceNumber: billDetails.quotationNumber,
//                 // Include associated quotation number only if we are saving an invoice
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null, 
//             };
            
//             // Adjust body keys based on mode
//             const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
//             delete finalBody.invoiceNumber; 

//             const url = quotation
//                 ? "http://localhost:5000/api/quotation/save"
//                 : "http://localhost:5000/api/invoice/save";

//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(finalBody)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 alert(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${data.invoice?.invoiceNumber || data.quotation?.quotationNumber}`);
//             } else {
//                 alert("Error: " + data.error);
//             }
//         } catch (err) {
//             console.error(err);
//             alert("Unexpected error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch invoice/quotation by number (Refactored to accept argument)
//     const handleSearch = async (docNumber) => {
//         // Ensure docNumber is the actual value from the input fields
//         if (typeof docNumber === 'object' || !docNumber) {
//              // If called without argument from the main button, docNumber defaults to searchNumber
//             docNumber = searchNumber;
//         }

//         if (!docNumber) {
//             showNotification("Please enter a document number to search.", 'info');
//             return;
//         }

//         try {
//             setLoading(true);

//             // --- Primary goal: Check for Quotation for pre-fill/conversion ---
//             const quoteUrl = `http://localhost:5000/api/quotation/fetch/${docNumber}`;
//             let response = await fetch(quoteUrl);
//             let result = await response.json();

//             if (response.ok && result.quotation) {
//                 const quote = result.quotation;

//                 // 1. Populate the form with all quotation details
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: quote.billTO || "",
//                     customerAddress: quote.customerAddress || "",
//                     customerGSTIN: quote.customerGSTIN || "",
//                     items: quote.items || [],
//                     associatedQuotationNumber: docNumber, // Set the number that was just searched
//                 }));
//                 // Set GST flags and derived values
//                 setSGST(quote.sgst || false);
//                 setCGST(quote.cgst || false);
//                 setOriginalQuotationNumber(quote.quotationNumber);

//                 // 3. Update document number based on current mode
//                 if (invoice) {
//                     // Current mode is Invoice: Keep the new auto-generated Invoice number 
//                     showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//                 } else {
//                     // Current mode is Quotation: Overwrite with the fetched quote number for editing/resaving
//                     setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//                     showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//                 }
//                 return; // Exit successfully
//             }

//             // --- Secondary goal: If quote search failed, check for existing Invoice ---
//             else if (invoice || !quotation) {
//                 const invoiceUrl = `http://localhost:5000/api/invoice/fetch/${docNumber}`;
//                 response = await fetch(invoiceUrl);
//                 result = await response.json();

//                 if (response.ok && result.invoice) {
//                     const inv = result.invoice;
//                     // Load Invoice details
//                     setBillDetails(prev => ({ 
//                         ...prev,
//                         billTO: inv.billTO || "",
//                         customerAddress: inv.customerAddress || "",
//                         customerGSTIN: inv.customerGSTIN || "",
//                         quotationNumber: inv.invoiceNumber,
//                         items: inv.items || [],
//                         associatedQuotationNumber: inv.originalQuotationNumber || '', // Load associated number if present
//                     }));
//                     setSGST(inv.sgst || false);
//                     setCGST(inv.cgst || false);
//                     setOriginalQuotationNumber(inv.originalQuotationNumber || null);
                    
//                     showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
//                     return; // Exit successfully
//                 }
//             }

//             // --- If nothing was found ---
//             showNotification(`Document #${docNumber} not found in either Quotations or Invoices.`, 'error');

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             showNotification('Error fetching data. Check server connection.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };


//     // Download PDF
//     const handleDownloadPDF = async () => {
//         try {
//             const documentNumber = billDetails.quotationNumber;
//             const response = await fetch(`http://localhost:5000/api/download/${documentNumber}`);
//             if (response.ok) {
//                 const blob = await response.blob();
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `${documentNumber}.pdf`;
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 document.body.removeChild(a);
//             } else {
//                 alert('Error downloading PDF: Document not found or server error.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Error downloading PDF');
//         }
//     };
    
//     // Manual Print Function (Replaces ReactToPrint)
//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="flex items-center justify-center">
//             <script src="https://cdn.tailwindcss.com"></script>
//             <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
//                 <div className="w-full flex items-center justify-center">
//                     <div className="font-sans w-full lg:w-[50rem]">
//                         <div className="pb-5 text-3xl">
//                             <p className="font-bold text-blue-500">
//                                 Design <span className="text-green-400">Blocks</span>
//                             </p>
//                         </div>

//                         {/* Search Section (Main Search) */}
//                         <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//                             <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
//                                 Search Invoice/Quotation
//                             </p>
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Invoice/Quotation Number"
//                                     className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md flex-1"
//                                     value={searchNumber}
//                                     onChange={(e) => setSearchNumber(e.target.value)}
//                                 />
//                                 <button
//                                     onClick={() => handleSearch(searchNumber)}
//                                     disabled={loading}
//                                     className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                                 >
//                                     {loading ? 'Searching...' : 'Search'}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Mode Switch */}
//                         <div className="flex items-center justify-start gap-5 mb-5">
//                             <div className={`cursor-pointer px-4 py-1 ${quotation ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(true); setInvoice(false); }}>Quotation</div>
//                             <div className={`cursor-pointer px-4 py-1 ${invoice ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(false); setInvoice(true); }}>Invoice</div>
//                         </div>

//                         {/* 1. Document Details Section */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 1. {invoice ? "Invoice" : "Quotation"} Details
//                             </p>
//                             <div className="flex items-center justify-start flex-wrap gap-3">
//                                 <h1>{invoice ? "Invoice" : "Quotation"} Number</h1>
//                                 <input
//                                     type="text"
//                                     value={billDetails.quotationNumber}
//                                     placeholder={`Auto-generated`}
//                                     className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100"
//                                     readOnly
//                                 />
                                
//                                 {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
//                                 {invoice && (
//                                     <div className="flex items-center gap-3 mt-3">
//                                         <h1>Quotation Number</h1>
//                                         <div className="flex items-center border border-blue-500 rounded shadow-md">
//                                             <input
//                                                 type="text"
//                                                 // Using billDetails.associatedQuotationNumber state
//                                                 value={billDetails.associatedQuotationNumber}
//                                                 placeholder={`Enter Q-Number to load`}
//                                                 className="outline-none rounded-l px-2 py-1 flex-1"
//                                                 onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
//                                             />
//                                             <button
//                                                 // Section 1 search button: Passes the specific associated quote number
//                                                 onClick={() => handleSearch(billDetails.associatedQuotationNumber)} 
//                                                 disabled={loading}
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-r h-full hover:bg-blue-600 disabled:opacity-50"
//                                             >
//                                                 Load
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* 2. Recipient Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 2. Recipient Details
//                             </p>
//                             <div className="flex items-start justify-start flex-wrap gap-3">
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Bill TO</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Biller Details"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.billTO}
//                                         onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Address</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Biller Address"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.customerAddress}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Customer GSTIN</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Customer GSTIN"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.customerGSTIN}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })}
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* 3. Items Section */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                             <form className="flex items-start justify-start flex-col" onSubmit={handleAddItem}>
//                                 <div className="flex flex-row items-center justify-between w-full pb-3">
//                                     <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>
//                                     <button type="submit" className="bg-green-400 px-3 py-2 rounded-md text-green-950 shadow-md">Add</button>
//                                 </div>
//                                 <div className="flex items-center justify-start flex-wrap gap-3">
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Description</h1>
//                                         <input
//                                             type="text"
//                                             required
//                                             value={tableItems.description}
//                                             placeholder="Enter Description"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Quantity</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.quantity}
//                                             placeholder="Enter Quantity"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Unit Price</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.unitPrice}
//                                             placeholder="Single Product Price"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })}
//                                         />
//                                     </div>
//                                 </div>
//                             </form>
//                             {/* Items Table Display (Restored original styling) */}
//                             {billDetails.items.length > 0 && (
//                                 <div className="overflow-x-scroll w-full py-5">
//                                     <div className="w-full min-w-[50rem]">
//                                         <table className="w-full">
//                                             <tbody className="w-full">
//                                                 {/* Table Header Row */}
//                                                 <tr className="bg-gray-200 font-bold">
//                                                     <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td>
//                                                     <td className="px-3 w-[5%] text-center"></td>
//                                                 </tr>

//                                                 {billDetails.items.map((item, index) => (
//                                                     <tr key={index} className="odd:bg-white even:bg-gray-100">
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
//                                                         <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
//                                                         <td className="px-3">
//                                                             <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs" onClick={() => handleItem(item)}>Delete</p>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* 4. GST Info */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
//                             <div className="flex items-center justify-start gap-5 mt-3">
//                                 <label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>SGST</label>
//                                 <label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>CGST</label>
//                             </div>
//                         </div>

//                         {/* Save Button */}
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={handleSave}
//                                 disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
//                                 className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? 'Saving...' : 'Save'}
//                             </button>
//                             <button
//                                 onClick={handleDownloadPDF}
//                                 disabled={loading || !billDetails.quotationNumber}
//                                 className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Download PDF
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Print Trigger Button (Restored original style, replaced ReactToPrint with manual print) */}
//                 <button 
//                     onClick={handlePrint}
//                     className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 print:hidden"
//                 >
//                     Print Receipt
//                 </button>

//                 {/* --- PDF/Print PREVIEW Area --- */}
//                 <div className="w-full bg-white flex items-center justify-center">
//                     <div className="overflow-x-scroll w-full xl:w-[60rem]">
//                         <div ref={printRef} className="flex items-center justify-center flex-col w-[60rem] bg-white text-black">
                            
//                             {/* Header Row */}
//                             <div className="flex items-center justify-start flex-row h-[15rem]">
//                                 <div className="h-full w-[20rem] border border-black">
//                                     <div className="flex items-center justify-center h-[30%]">
//                                         <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
//                                     </div>
//                                     <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                                         <p className="font-semibold text-lg">Bill to:</p>
//                                         {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                                         <p>{billDetails.billTO}</p>
//                                         <p>{billDetails.customerAddress}</p>
//                                     </div>
//                                 </div>
//                                 <div className="h-full w-[40rem] border-l-0 border border-black flex flex-col justify-between">
//                                     <div className="p-5 flex items-center justify-between">
//                                         <div className="w-[70%] text-sm">
//                                             <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                                             <p className="font-medium">DESIGN BLOCKS</p>
//                                             <p className="font-semibold text-lg pt-2">Address:</p>
//                                             <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                                         </div>
//                                         <img src="https://designblocks.in/img/DB.png" alt="Design Blocks Logo" className="w-[20%]" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO" }}/>
//                                     </div>
//                                     <div className="flex items-center justify-between flex-row h-10 px-5 border-t border-black text-sm">
//                                         <div>
//                                             <p className="font-semibold text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal text-base">{billDetails.quotationNumber}</span></p>
//                                         </div>
//                                         <div>
//                                             <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="h-10 w-full border-x border-black"></div>
                            
//                             {/* Items Table */}
//                             <table className="w-[60rem] text-sm">
//                                 <thead>
//                                     <tr className="h-10 bg-gray-100 font-bold">
//                                         <td className="border border-black text-center w-[5%]">Item</td>
//                                         <td className="border border-black text-center w-[30rem]">Description</td>
//                                         <td className="border border-black text-center w-[10%]">Quantity</td>
//                                         <td className="border border-black text-center w-[15%]">Unit Price (Rs.)</td>
//                                         <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="border border-black">
//                                     {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
//                                         <tr key={key} className="h-10 border-b border-gray-300">
//                                             <td className="text-center border border-black">{key + 1}.</td>
//                                             <td className="px-2 border border-black">{items.description}</td>
//                                             <td className="px-2 border border-black text-center">{items.quantity}</td>
//                                             <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
//                                             <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
//                                         </tr>
//                                     )) : (
//                                         <tr className="h-20">
//                                             <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
//                                         </tr>
//                                     )}

//                                     {/* Taxable Value Row */}
//                                     <tr className="border border-black h-10 bg-yellow-50">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                                         <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                                     </tr>
//                                     <tr className="h-1"></tr> {/* Spacer */}
                                    
//                                     {/* GST Rows */}
//                                     {sgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3} className="border border-black text-center"></td>
//                                             <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{SGST}</td>
//                                         </tr>
//                                     )}
//                                     {cgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3} className="border border-black text-center"></td>
//                                             <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{CGST}</td>
//                                         </tr>
//                                     )}
                                    
//                                     {/* Final Invoice Value */}
//                                     {(cgst || sgst) && (
//                                         <>
//                                             <tr className="border border-black h-10 bg-blue-100">
//                                                 <td colSpan={3}></td>
//                                                 <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
//                                                 <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                                             </tr>
//                                         </>
//                                     )}

//                                     {/* In Words */}
//                                     <tr className="border border-black h-10">
//                                         <td colSpan={5} className="px-2">
//                                             <span className="font-semibold">In Words: </span>
//                                             <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                                         </td>
//                                     </tr>
                                    
//                                     {/* Bank Details & Signature */}
//                                     <tr>
//                                         <td colSpan={5} className="p-2 border-t border-black text-xs">
//                                             <div className="flex items-start justify-between">
//                                                 <div className="w-1/2">
//                                                     <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                                                     <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                                                     <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                                                     <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                                                 </div>
//                                                 <div className="w-1/2 text-right pt-6">
//                                                     <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-center mt-3 font-semibold">Thank You</div>
//                                         </td>
//                                     </tr>

//                                     {/* Quotation Terms and Conditions */}
//                                     {quotation && (
//                                         <tr>
//                                             <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                                                 <div className="text-sm">
//                                                     <p className="font-semibold mb-1">Terms and Conditions.</p>
//                                                     <p>Quotation prices are valid for 20 days from the date of issue.</p>
//                                                     <p>Any increase in project scope will result in an additional cost.</p>
//                                                 </div>
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


// import React, { useState, useRef, useEffect } from "react";
// // External libraries "to-words" and "react-to-print" removed due to sandbox environment constraints.

// function App() {
//     const date = new Date();
//     // Simplified Number to Words Converter (Replaces 'to-words' library)
//     const numberToWords = (num) => {
//         if (num === 0) return 'Zero';

//         const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//         const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//         const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//         const scales = ['', 'Thousand', 'Million'];

//         const convertChunk = (n) => {
//             if (n === 0) return '';
//             if (n < 10) return units[n];
//             if (n < 20) return teens[n - 10];
//             if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
//             return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertChunk(n % 100) : '');
//         };

//         let words = '';
//         let i = 0;
        
//         // Handle rounding and separation of integer/decimal parts
//         const roundedNum = parseFloat(num.toFixed(2));
//         const [intPart, fracPart] = roundedNum.toString().split('.');

//         let integer = parseInt(intPart);
//         const fractional = fracPart ? parseInt(fracPart) : 0;
        
//         if (integer > 999999999) return 'Value too large'; // Safety limit

//         while (integer > 0) {
//             const chunk = integer % 1000;
//             if (chunk !== 0) {
//                 let chunkWords = convertChunk(chunk);
//                 words = chunkWords + (scales[i] ? ' ' + scales[i] : '') + ' ' + words;
//             }
//             integer = Math.floor(integer / 1000);
//             i++;
//         }
//         words = words.trim();

//         if (fractional > 0) {
//             words += (words ? ' and ' : '') + convertChunk(fractional) + ' Paisa';
//         }

//         return words.trim();
//     };

//     const [quotation, setQuotation] = useState(true);
//     const [invoice, setInvoice] = useState(false);
//     const [sgst, setSGST] = useState(false);
//     const [cgst, setCGST] = useState(false);
//     const printRef = useRef(null);
//     const [taxableValue, setTaxableValue] = useState(0);
//     const [invoiceValue, setInvoiceValue] = useState(0);
//     const [SGST, setSGSTValue] = useState(0);
//     const [CGST, setCGSTValue] = useState(0);
//     const [searchNumber, setSearchNumber] = useState("");
//     const [loading, setLoading] = useState(false);
    
//     // State to track if the current form represents an existing document loaded for editing
//     const [isEditing, setIsEditing] = useState(false); 
    
//     // State to hold the original quote number if we load one (separate from billDetails.quotationNumber which holds the current doc number)
//     const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);

//     // Using simple alert as a placeholder for showNotification
//     const showNotification = (message, type) => {
//         alert(`${type.toUpperCase()}: ${message}`);
//     };

//     const [billDetails, setBillDetails] = useState({
//         billTO: "",
//         customerAddress: "",
//         customerGSTIN: "",
//         quotationNumber: "", // This holds the current document number (either Q-xxx or I-xxx)
//         associatedQuotationNumber: "", // Holds the quotation number if converting to invoice (used for Section 1 input)
//         items: [],
//     });

//     const [tableItems, setTableItems] = useState({
//         description: "",
//         quantity: "",
//         unitPrice: "",
//     });

//     // Generate unique number on component mount or when switching between invoice/quotation
//     useEffect(() => {
//         // Clear form fields and reset editing state when switching modes
//         setBillDetails(prev => ({
//             ...prev,
//             billTO: "",
//             customerAddress: "",
//             customerGSTIN: "",
//             items: [],
//             associatedQuotationNumber: "", 
//         }));
//         setSGST(false);
//         setCGST(false);
//         setTaxableValue(0);
//         setInvoiceValue(0);
//         setOriginalQuotationNumber(null);
//         setSearchNumber("");
//         setIsEditing(false); // Reset editing state on mode change
        
//         generateUniqueNumber();
//     }, [invoice, quotation]);

//     // Generate unique invoice/quotation number
//     const generateUniqueNumber = async () => {
//         try {
//             const url = quotation
//                 ? "http://localhost:5000/api/quotation/generate"
//                 : "http://localhost:5000/api/invoice/generate";

//             const response = await fetch(url);
//             const data = await response.json();

//             if (data.success) {
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
//                 }));
//             }
//         } catch (error) {
//                 // Number generation is critical, alert user if server is down
//             console.error("Number generation failed", error);
//             showNotification("Error connecting to backend for number generation.", 'error');
//         }
//     };

//     // Calculation effect
//     useEffect(() => {
//         const newTaxableValue = billDetails.items.reduce((acc, item) => {
//             const quantity = Number(item.quantity) || 0;
//             const unitPrice = Number(item.unitPrice) || 0;
//             return acc + quantity * unitPrice;
//         }, 0);
        
//         const gstRate = 0.09;
//         const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//         const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;
        
//         const totalValue = newTaxableValue + currentSGST + currentCGST;

//         setSGSTValue(currentSGST.toFixed(2));
//         setCGSTValue(currentCGST.toFixed(2));
//         setTaxableValue(newTaxableValue);
//         setInvoiceValue(totalValue);
//     }, [billDetails.items, cgst, sgst]);

//     const handleAddItem = (e) => {
//         e.preventDefault();
//         // Ensure that quantity and unitPrice are treated as numbers when adding
//         setBillDetails({
//             ...billDetails,
//             items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice) }],
//         });
//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//     };

//     const handleItem = (item) => {
//         let removedArray = billDetails.items.filter(e => e !== item);
//         setBillDetails({ ...billDetails, items: removedArray });
//     };

//     // --- Handle Update Logic ---
//     const handleUpdate = async () => {
//         try {
//             setLoading(true);

//             const documentNumber = billDetails.quotationNumber;
//             const urlPath = invoice ? "invoice/update" : "quotation/update";

//             const body = {
//                 // Use the correct key based on the mode for the backend PUT route
//                 [invoice ? "invoiceNumber" : "quotationNumber"]: documentNumber, 
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 invoiceValue: invoiceValue,
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null, 
//             };
            
//             const url = `http://localhost:5000/api/${urlPath}`;

//             const res = await fetch(url, {
//                 method: "PUT", // Use PUT for updating
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 showNotification(`${invoice ? "Invoice" : "Quotation"} #${documentNumber} updated successfully!`, 'success');
//                 // Keep editing state true as the user is still on the document
//             } else {
//                 showNotification(`Update Error: ${data.message || data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error(err);
//             showNotification("Unexpected error during update.", 'error');
//         } finally {
//             setLoading(false);
//         }
//     };
//     // --- END Handle Update Logic ---


//     // Save/Update Handler
//     const handleSaveOrUpdate = () => {
//         // Check if we are in editing mode (i.e., document was loaded from search)
//         if (isEditing) {
//             handleUpdate();
//         } else {
//             handleSave();
//         }
//     };

//     // Save invoice/quotation to backend
//     const handleSave = async () => {
//         try {
//             setLoading(true);

//             const body = {
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 invoiceValue: invoiceValue,
//                 invoiceNumber: billDetails.quotationNumber,
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null, 
//             };
            
//             // Adjust body keys based on mode for POST request
//             const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
//             delete finalBody.invoiceNumber; 

//             const url = quotation
//                 ? "http://localhost:5000/api/quotation/save"
//                 : "http://localhost:5000/api/invoice/save";

//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(finalBody)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//                 showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
//                 // After successful save, update state to the saved document number and enter editing mode
//                 setIsEditing(true); 
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: savedNumber,
//                 }));
//             } else {
//                 showNotification(`Save Error: ${data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error(err);
//             showNotification("Unexpected error during save.", 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // --- Handle Delete Logic ---
//     const handleDelete = async () => {
//         const docType = invoice ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;
        
//         if (!documentNumber || !isEditing) {
//             showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
//             return;
//         }

//         const confirmDelete = window.confirm(`Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`);
//         if (!confirmDelete) return;

//         try {
//             setLoading(true);
//             const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
//             const url = `http://localhost:5000/api/${urlPath}`;

//             const response = await fetch(url, { method: "DELETE" });
//             const data = await response.json();

//             if (response.ok && data.success) {
//                 showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
//                 // Reset form state after successful deletion
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
//                 }));
//                 setSGST(false);
//                 setCGST(false);
//                 setIsEditing(false);
//                 generateUniqueNumber(); // Generate a new number for a clean start
//             } else {
//                 showNotification(`Delete Error: ${data.message || data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error('Error deleting data:', err);
//             showNotification('Error deleting data. Check server connection.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };
//     // --- END Handle Delete Logic ---


//     // Fetch invoice/quotation by number (Refactored to accept argument)
//     const handleSearch = async (docNumber) => {
//         // Ensure docNumber is the actual value from the input fields
//         if (typeof docNumber === 'object' || !docNumber) {
//              // If called without argument from the main button, docNumber defaults to searchNumber
//             docNumber = searchNumber;
//         }

//         if (!docNumber) {
//             showNotification("Please enter a document number to search.", 'info');
//             return;
//         }

//         try {
//             setLoading(true);
//             setIsEditing(false); // Assume fresh load initially

//             // --- Primary goal: Check for Quotation for pre-fill/conversion ---
//             const quoteUrl = `http://localhost:5000/api/quotation/fetch/${docNumber}`;
//             let response = await fetch(quoteUrl);
//             let result = await response.json();

//             if (response.ok && result.quotation) {
//                 const quote = result.quotation;

//                 // 1. Populate the form with all quotation details
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: quote.billTO || "",
//                     customerAddress: quote.customerAddress || "",
//                     customerGSTIN: quote.customerGSTIN || "",
//                     items: quote.items || [],
//                     associatedQuotationNumber: docNumber, // Set the number that was just searched
//                 }));
//                 // Set GST flags and derived values
//                 setSGST(quote.sgst || false);
//                 setCGST(quote.cgst || false);
//                 setOriginalQuotationNumber(quote.quotationNumber);

//                 // 3. Update document number based on current mode
//                 if (invoice) {
//                     // Current mode is Invoice: Keep the new auto-generated Invoice number (Conversion workflow)
//                     setIsEditing(false);
//                     setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber })); // Ensure associated number is set
//                     showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//                 } else {
//                     // Current mode is Quotation: Overwrite with the fetched quote number for editing/resaving
//                     setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//                     setIsEditing(true); // Enable editing/update mode
//                     showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//                 }
//                 return; // Exit successfully
//             }

//             // --- Secondary goal: If quote search failed, check for existing Invoice ---
//             else if (invoice || !quotation) {
//                 const invoiceUrl = `http://localhost:5000/api/invoice/fetch/${docNumber}`;
//                 response = await fetch(invoiceUrl);
//                 result = await response.json();

//                 if (response.ok && result.invoice) {
//                     const inv = result.invoice;
//                     // Load Invoice details
//                     setBillDetails(prev => ({ 
//                         ...prev,
//                         billTO: inv.billTO || "",
//                         customerAddress: inv.customerAddress || "",
//                         customerGSTIN: inv.customerGSTIN || "",
//                         quotationNumber: inv.invoiceNumber,
//                         items: inv.items || [],
//                         associatedQuotationNumber: inv.originalQuotationNumber || '', // Load associated number if present
//                     }));
//                     setSGST(inv.sgst || false);
//                     setCGST(inv.cgst || false);
//                     setOriginalQuotationNumber(inv.originalQuotationNumber || null);
                    
//                     setIsEditing(true); // Enable editing/update mode
//                     showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
//                     return; // Exit successfully
//                 }
//             }
            
//             // If no document was found, reset to new document mode
//             setIsEditing(false);
//             setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
//             generateUniqueNumber();
//             showNotification(`Document #${docNumber} not found in either Quotations or Invoices.`, 'error');

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             showNotification('Error fetching data. Check server connection.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };


//     // Download PDF
//     const handleDownloadPDF = async () => {
//         try {
//             const documentNumber = billDetails.quotationNumber;
//             const response = await fetch(`http://localhost:5000/api/download/${documentNumber}`);
//             if (response.ok) {
//                 const blob = await response.blob();
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `${documentNumber}.pdf`;
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 document.body.removeChild(a);
//             } else {
//                 alert('Error downloading PDF: Document not found or server error.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Error downloading PDF');
//         }
//     };
    
//     // Manual Print Function (Replaces ReactToPrint)
//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="flex items-center justify-center">
//             <script src="https://cdn.tailwindcss.com"></script>
//             <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
//                 <div className="w-full flex items-center justify-center">
//                     <div className="font-sans w-full lg:w-[50rem]">
//                         <div className="pb-5 text-3xl">
//                             <p className="font-bold text-blue-500">
//                                 Design <span className="text-green-400">Blocks</span>
//                             </p>
//                         </div>

//                         {/* Search Section (Main Search) */}
//                         <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//                             <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
//                                 Search Invoice/Quotation
//                             </p>
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Invoice/Quotation Number"
//                                     className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md flex-1"
//                                     value={searchNumber}
//                                     onChange={(e) => setSearchNumber(e.target.value)}
//                                 />
//                                 <button
//                                     onClick={() => handleSearch(searchNumber)}
//                                     disabled={loading}
//                                     className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                                 >
//                                     {loading ? 'Searching...' : 'Search'}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Mode Switch */}
//                         <div className="flex items-center justify-start gap-5 mb-5">
//                             <div className={`cursor-pointer px-4 py-1 ${quotation ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(true); setInvoice(false); }}>Quotation</div>
//                             <div className={`cursor-pointer px-4 py-1 ${invoice ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(false); setInvoice(true); }}>Invoice</div>
//                         </div>

//                         {/* 1. Document Details Section */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 1. {invoice ? "Invoice" : "Quotation"} Details
//                             </p>
//                             <div className="flex items-center justify-start flex-wrap gap-3">
//                                 <h1>{invoice ? "Invoice" : "Quotation"} Number</h1>
//                                 <input
//                                     type="text"
//                                     value={billDetails.quotationNumber}
//                                     placeholder={`Auto-generated`}
//                                     className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100"
//                                     readOnly
//                                 />
                                
//                                 {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
//                                 {invoice && (
//                                     <div className="flex items-center gap-3 mt-3">
//                                         <h1>Quotation Number</h1>
//                                         <div className="flex items-center border border-blue-500 rounded shadow-md">
//                                             <input
//                                                 type="text"
//                                                 // Using billDetails.associatedQuotationNumber state
//                                                 value={billDetails.associatedQuotationNumber}
//                                                 placeholder={`Enter Q-Number to load`}
//                                                 className="outline-none rounded-l px-2 py-1 flex-1"
//                                                 onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
//                                             />
//                                             <button
//                                                 // Section 1 search button: Passes the specific associated quote number
//                                                 onClick={() => handleSearch(billDetails.associatedQuotationNumber)} 
//                                                 disabled={loading}
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-r h-full hover:bg-blue-600 disabled:opacity-50"
//                                             >
//                                                 Load
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* 2. Recipient Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 2. Recipient Details
//                             </p>
//                             <div className="flex items-start justify-start flex-wrap gap-3">
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Bill TO</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Biller Details"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.billTO}
//                                         onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Address</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Biller Address"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.customerAddress}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Customer GSTIN</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Customer GSTIN"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.customerGSTIN}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })}
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* 3. Items Section */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                             <form className="flex items-start justify-start flex-col" onSubmit={handleAddItem}>
//                                 <div className="flex flex-row items-center justify-between w-full pb-3">
//                                     <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>
//                                     <button type="submit" className="bg-green-400 px-3 py-2 rounded-md text-green-950 shadow-md">Add</button>
//                                 </div>
//                                 <div className="flex items-center justify-start flex-wrap gap-3">
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Description</h1>
//                                         <input
//                                             type="text"
//                                             required
//                                             value={tableItems.description}
//                                             placeholder="Enter Description"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Quantity</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.quantity}
//                                             placeholder="Enter Quantity"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Unit Price</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.unitPrice}
//                                             placeholder="Single Product Price"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })}
//                                         />
//                                     </div>
//                                 </div>
//                             </form>
//                             {/* Items Table Display (Restored original styling) */}
//                             {billDetails.items.length > 0 && (
//                                 <div className="overflow-x-scroll w-full py-5">
//                                     <div className="w-full min-w-[50rem]">
//                                         <table className="w-full">
//                                             <tbody className="w-full">
//                                                 {/* Table Header Row */}
//                                                 <tr className="bg-gray-200 font-bold">
//                                                     <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td>
//                                                     <td className="px-3 w-[5%] text-center"></td>
//                                                 </tr>

//                                                 {billDetails.items.map((item, index) => (
//                                                     <tr key={index} className="odd:bg-white even:bg-gray-100">
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
//                                                         <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
//                                                         <td className="px-3">
//                                                             <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs" onClick={() => handleItem(item)}>Delete</p>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* 4. GST Info */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
//                             <div className="flex items-center justify-start gap-5 mt-3">
//                                 <label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>SGST</label>
//                                 <label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>CGST</label>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-3">
//                             {/* Save/Update Button */}
//                             <button
//                                 onClick={handleSaveOrUpdate}
//                                 disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
//                                 className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? 'Processing...' : isEditing ? 'Update' : 'Save'}
//                             </button>
                            
//                             {/* NEW: Delete Button (Visible only in Editing mode) */}
//                             {isEditing && (
//                                 <button
//                                     onClick={handleDelete}
//                                     disabled={loading}
//                                     className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {loading ? 'Deleting...' : 'Delete'}
//                                 </button>
//                             )}
                            
//                             <button
//                                 onClick={handleDownloadPDF}
//                                 disabled={loading || !billDetails.quotationNumber}
//                                 className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Download PDF
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Print Trigger Button (Restored original style, replaced ReactToPrint with manual print) */}
//                 <button 
//                     onClick={handlePrint}
//                     className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 print:hidden"
//                 >
//                     Print Receipt
//                 </button>

//                 {/* --- PDF/Print PREVIEW Area --- */}
//                 <div className="w-full bg-white flex items-center justify-center">
//                     <div className="overflow-x-scroll w-full xl:w-[60rem]">
//                         <div ref={printRef} className="flex items-center justify-center flex-col w-[60rem] bg-white text-black">
                            
//                             {/* Header Row */}
//                             <div className="flex items-center justify-start flex-row h-[15rem]">
//                                 <div className="h-full w-[20rem] border border-black">
//                                     <div className="flex items-center justify-center h-[30%]">
//                                         <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
//                                     </div>
//                                     <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                                         <p className="font-semibold text-lg">Bill to:</p>
//                                         {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                                         <p>{billDetails.billTO}</p>
//                                         <p>{billDetails.customerAddress}</p>
//                                         {/* Display associated quotation number in print view */}
//                                         {invoice && billDetails.associatedQuotationNumber && (
//                                             <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="h-full w-[40rem] border-l-0 border border-black flex flex-col justify-between">
//                                     <div className="p-5 flex items-center justify-between">
//                                         <div className="w-[70%] text-sm">
//                                             <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                                             <p className="font-medium">DESIGN BLOCKS</p>
//                                             <p className="font-semibold text-lg pt-2">Address:</p>
//                                             <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                                         </div>
//                                         <img src="https://designblocks.in/img/DB.png" alt="Design Blocks Logo" className="w-[20%]" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO" }}/>
//                                     </div>
//                                     <div className="flex items-center justify-between flex-row h-10 px-5 border-t border-black text-sm">
//                                         <div>
//                                             <p className="font-semibold text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal text-base">{billDetails.quotationNumber}</span></p>
//                                         </div>
//                                         <div>
//                                             <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="h-10 w-full border-x border-black"></div>
                            
//                             {/* Items Table */}
//                             <table className="w-[60rem] text-sm">
//                                 <thead>
//                                     <tr className="h-10 bg-gray-100 font-bold">
//                                         <td className="border border-black text-center w-[5%]">Item</td>
//                                         <td className="border border-black text-center w-[30rem]">Description</td>
//                                         <td className="border border-black text-center w-[10%]">Quantity</td>
//                                         <td className="border border-black text-center w-[15%]">Unit Price (Rs.)</td>
//                                         <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="border border-black">
//                                     {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
//                                         <tr key={key} className="h-10 border-b border-gray-300">
//                                             <td className="text-center border border-black">{key + 1}.</td>
//                                             <td className="px-2 border border-black">{items.description}</td>
//                                             <td className="px-2 border border-black text-center">{items.quantity}</td>
//                                             <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
//                                             <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
//                                         </tr>
//                                     )) : (
//                                         <tr className="h-20">
//                                             <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
//                                         </tr>
//                                     )}

//                                     {/* Taxable Value Row */}
//                                     <tr className="border border-black h-10 bg-yellow-50">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                                         <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                                     </tr>
//                                     <tr className="h-1"></tr> {/* Spacer */}
                                    
//                                     {/* GST Rows */}
//                                     {sgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3} className="border border-black text-center"></td>
//                                             <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{SGST}</td>
//                                         </tr>
//                                     )}
//                                     {cgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3} className="border border-black text-center"></td>
//                                             <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{CGST}</td>
//                                         </tr>
//                                     )}
                                    
//                                     {/* Final Invoice Value */}
//                                     {(cgst || sgst) && (
//                                         <>
//                                             <tr className="border border-black h-10 bg-blue-100">
//                                                 <td colSpan={3}></td>
//                                                 <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
//                                                 <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                                             </tr>
//                                         </>
//                                     )}

//                                     {/* In Words */}
//                                     <tr className="border border-black h-10">
//                                         <td colSpan={5} className="px-2">
//                                             <span className="font-semibold">In Words: </span>
//                                             <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                                         </td>
//                                     </tr>
                                    
//                                     {/* Bank Details & Signature */}
//                                     <tr>
//                                         <td colSpan={5} className="p-2 border-t border-black text-xs">
//                                             <div className="flex items-start justify-between">
//                                                 <div className="w-1/2">
//                                                     <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                                                     <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                                                     <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                                                     <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                                                 </div>
//                                                 <div className="w-1/2 text-right pt-6">
//                                                     <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-center mt-3 font-semibold">Thank You</div>
//                                         </td>
//                                     </tr>

//                                     {/* Quotation Terms and Conditions */}
//                                     {quotation && (
//                                         <tr>
//                                             <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                                                 <div className="text-sm">
//                                                     <p className="font-semibold mb-1">Terms and Conditions.</p>
//                                                     <p>Quotation prices are valid for 20 days from the date of issue.</p>
//                                                     <p>Any increase in project scope will result in an additional cost.</p>
//                                                 </div>
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


// import React, { useState, useRef, useEffect } from "react";
// // External libraries "to-words" and "react-to-print" removed due to sandbox environment constraints.

// function App() {
//     const date = new Date();
//     // Simplified Number to Words Converter (Replaces 'to-words' library)
//     const numberToWords = (num) => {
//         if (num === 0) return 'Zero';

//         const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//         const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//         const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//         const scales = ['', 'Thousand', 'Million'];

//         const convertChunk = (n) => {
//             if (n === 0) return '';
//             if (n < 10) return units[n];
//             if (n < 20) return teens[n - 10];
//             if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
//             return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertChunk(n % 100) : '');
//         };

//         let words = '';
//         let i = 0;
        
//         // Handle rounding and separation of integer/decimal parts
//         const roundedNum = parseFloat(num.toFixed(2));
//         const [intPart, fracPart] = roundedNum.toString().split('.');

//         let integer = parseInt(intPart);
//         const fractional = fracPart ? parseInt(fracPart) : 0;
        
//         if (integer > 999999999) return 'Value too large'; // Safety limit

//         while (integer > 0) {
//             const chunk = integer % 1000;
//             if (chunk !== 0) {
//                 let chunkWords = convertChunk(chunk);
//                 words = chunkWords + (scales[i] ? ' ' + scales[i] : '') + ' ' + words;
//             }
//             integer = Math.floor(integer / 1000);
//             i++;
//         }
//         words = words.trim();

//         if (fractional > 0) {
//             words += (words ? ' and ' : '') + convertChunk(fractional) + ' Paisa';
//         }

//         return words.trim();
//     };

//     const [quotation, setQuotation] = useState(true);
//     const [invoice, setInvoice] = useState(false);
//     const [sgst, setSGST] = useState(false);
//     const [cgst, setCGST] = useState(false);
//     const printRef = useRef(null);
//     const [taxableValue, setTaxableValue] = useState(0);
//     const [invoiceValue, setInvoiceValue] = useState(0);
//     const [SGST, setSGSTValue] = useState(0);
//     const [CGST, setCGSTValue] = useState(0);
//     const [searchNumber, setSearchNumber] = useState("");
//     const [loading, setLoading] = useState(false);
    
//     // State to track if the current form represents an existing document loaded for editing
//     const [isEditing, setIsEditing] = useState(false); 
    
//     // State to hold the original quote number if we load one (separate from billDetails.quotationNumber which holds the current doc number)
//     const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);

//     // Track if an item is currently being edited
//     const [isItemEditing, setIsItemEditing] = useState(false);
//     // Store the original item object reference being edited
//     const [editingItemOriginal, setEditingItemOriginal] = useState(null); 

//     // Using simple alert as a placeholder for showNotification
//     const showNotification = (message, type) => {
//         alert(`${type.toUpperCase()}: ${message}`);
//     };

//     const [billDetails, setBillDetails] = useState({
//         billTO: "",
//         customerAddress: "",
//         customerGSTIN: "",
//         quotationNumber: "", // This holds the current document number (either Q-xxx or I-xxx)
//         associatedQuotationNumber: "", // Holds the quotation number if converting to invoice (used for Section 1 input)
//         items: [],
//     });

//     const [tableItems, setTableItems] = useState({
//         description: "",
//         quantity: "",
//         unitPrice: "",
//     });

//     // Generate unique number on component mount or when switching between invoice/quotation
//     useEffect(() => {
//         // Clear form fields and reset editing state when switching modes
//         setBillDetails(prev => ({
//             ...prev,
//             billTO: "",
//             customerAddress: "",
//             customerGSTIN: "",
//             items: [],
//             associatedQuotationNumber: "", 
//         }));
//         setSGST(false);
//         setCGST(false);
//         setTaxableValue(0);
//         setInvoiceValue(0);
//         setOriginalQuotationNumber(null);
//         setSearchNumber("");
//         setIsEditing(false); // Reset document editing state on mode change
//         setIsItemEditing(false); // Reset item editing state
//         setEditingItemOriginal(null);
        
//         generateUniqueNumber();
//     }, [invoice, quotation]);

//     // Generate unique invoice/quotation number
//     const generateUniqueNumber = async () => {
//         try {
//             const url = quotation
//                 ? "http://localhost:5000/api/quotation/generate"
//                 : "http://localhost:5000/api/invoice/generate";

//             const response = await fetch(url);
//             const data = await response.json();

//             if (data.success) {
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
//                 }));
//             }
//         } catch (error) {
//                 // Number generation is critical, alert user if server is down
//             console.error("Number generation failed", error);
//             showNotification("Error connecting to backend for number generation.", 'error');
//         }
//     };

//     // Calculation effect
//     useEffect(() => {
//         const newTaxableValue = billDetails.items.reduce((acc, item) => {
//             const quantity = Number(item.quantity) || 0;
//             const unitPrice = Number(item.unitPrice) || 0;
//             return acc + quantity * unitPrice;
//         }, 0);
        
//         const gstRate = 0.09;
//         const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//         const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;
        
//         const totalValue = newTaxableValue + currentSGST + currentCGST;

//         setSGSTValue(currentSGST.toFixed(2));
//         setCGSTValue(currentCGST.toFixed(2));
//         setTaxableValue(newTaxableValue);
//         setInvoiceValue(totalValue);
//     }, [billDetails.items, cgst, sgst]);


//     // Handles adding a new item
//     const handleAddItem = (e) => {
//         e.preventDefault();
//         // Reset item editing state if we are adding a new item
//         setIsItemEditing(false);
//         setEditingItemOriginal(null);

//         // Ensure that quantity and unitPrice are treated as numbers when adding
//         setBillDetails({
//             ...billDetails,
//             items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice), id: Date.now() }], // Add unique ID for tracking
//         });
//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//     };

//     // Handles clicking an item in the table to load it for editing
//     const handleEditItem = (item) => {
//         // Load the item's details into the input fields
//         setTableItems({ 
//             description: item.description, 
//             quantity: item.quantity, 
//             unitPrice: item.unitPrice 
//         });
//         // Set state to indicate editing mode and store the original item reference
//         setIsItemEditing(true);
//         setEditingItemOriginal(item); 
//     };

//     // Handles updating the edited item in the list
//     const handleUpdateItem = (e) => {
//         e.preventDefault();
        
//         if (!editingItemOriginal) return;

//         // Find the index of the original item in the array
//         const index = billDetails.items.findIndex(item => item === editingItemOriginal);

//         if (index > -1) {
//             const updatedItems = [...billDetails.items];
//             // Replace the old item with the new, edited item values
//             updatedItems[index] = {
//                 ...updatedItems[index], // Keep original ID if present
//                 description: tableItems.description,
//                 quantity: Number(tableItems.quantity),
//                 unitPrice: Number(tableItems.unitPrice)
//             };

//             setBillDetails({ ...billDetails, items: updatedItems });
//         }

//         // Reset item form state
//         setTableItems({ description: "", quantity: "", unitPrice: "" });
//         setIsItemEditing(false);
//         setEditingItemOriginal(null);
//     };


//     const handleItem = (item) => {
//         let removedArray = billDetails.items.filter(e => e !== item);
//         setBillDetails({ ...billDetails, items: removedArray });
//     };

//     // --- Handle Update Logic ---
//     const handleUpdate = async () => {
//         try {
//             setLoading(true);

//             const documentNumber = billDetails.quotationNumber;
//             const urlPath = invoice ? "invoice/update" : "quotation/update";

//             const body = {
//                 [invoice ? "invoiceNumber" : "quotationNumber"]: documentNumber, 
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 invoiceValue: invoiceValue,
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null, 
//             };
            
//             const url = `http://localhost:5000/api/${urlPath}`;

//             const res = await fetch(url, {
//                 method: "PUT", // Use PUT for updating
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 showNotification(`${invoice ? "Invoice" : "Quotation"} #${documentNumber} updated successfully!`, 'success');
//             } else {
//                 showNotification(`Update Error: ${data.message || data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error(err);
//             showNotification("Unexpected error during update.", 'error');
//         } finally {
//             setLoading(false);
//         }
//     };
//     // --- END Handle Update Logic ---


//     // Save/Update Handler
//     const handleSaveOrUpdate = () => {
//         if (isEditing) {
//             handleUpdate();
//         } else {
//             handleSave();
//         }
//     };

//     // Save invoice/quotation to backend
//     const handleSave = async () => {
//         try {
//             setLoading(true);

//             const body = {
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 invoiceValue: invoiceValue,
//                 invoiceNumber: billDetails.quotationNumber,
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null, 
//             };
            
//             // Adjust body keys based on mode for POST request
//             const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
//             delete finalBody.invoiceNumber; 

//             const url = quotation
//                 ? "http://localhost:5000/api/quotation/save"
//                 : "http://localhost:5000/api/invoice/save";

//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(finalBody)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//                 showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
//                 // After successful save, update state to the saved document number and enter editing mode
//                 setIsEditing(true); 
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: savedNumber,
//                 }));
//             } else {
//                 showNotification(`Save Error: ${data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error(err);
//             showNotification("Unexpected error during save.", 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // --- Handle Delete Logic ---
//     const handleDelete = async () => {
//         const docType = invoice ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;
        
//         if (!documentNumber || !isEditing) {
//             showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
//             return;
//         }

//         const confirmDelete = window.confirm(`Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`);
//         if (!confirmDelete) return;

//         try {
//             setLoading(true);
//             const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
//             const url = `http://localhost:5000/api/${urlPath}`;

//             const response = await fetch(url, { method: "DELETE" });
//             const data = await response.json();

//             if (response.ok && data.success) {
//                 showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
//                 // Reset form state after successful deletion
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
//                 }));
//                 setSGST(false);
//                 setCGST(false);
//                 setIsEditing(false);
//                 generateUniqueNumber(); // Generate a new number for a clean start
//             } else {
//                 showNotification(`Delete Error: ${data.message || data.error}`, 'error');
//             }
//         } catch (err) {
//             console.error('Error deleting data:', err);
//             showNotification('Error deleting data. Check server connection.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };
//     // --- END Handle Delete Logic ---


//     // Fetch invoice/quotation by number (Refactored to accept argument)
//     const handleSearch = async (docNumber) => {
//         // Ensure docNumber is the actual value from the input fields
//         if (typeof docNumber === 'object' || !docNumber) {
//              // If called without argument from the main button, docNumber defaults to searchNumber
//             docNumber = searchNumber;
//         }

//         if (!docNumber) {
//             showNotification("Please enter a document number to search.", 'info');
//             return;
//         }

//         try {
//             setLoading(true);
//             setIsEditing(false); // Assume fresh load initially

//             // --- Primary goal: Check for Quotation for pre-fill/conversion ---
//             const quoteUrl = `http://localhost:5000/api/quotation/fetch/${docNumber}`;
//             let response = await fetch(quoteUrl);
//             let result = await response.json();

//             if (response.ok && result.quotation) {
//                 const quote = result.quotation;

//                 // 1. Populate the form with all quotation details
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: quote.billTO || "",
//                     customerAddress: quote.customerAddress || "",
//                     customerGSTIN: quote.customerGSTIN || "",
//                     items: quote.items || [],
//                     associatedQuotationNumber: docNumber, // Set the number that was just searched
//                 }));
//                 // Set GST flags and derived values
//                 setSGST(quote.sgst || false);
//                 setCGST(quote.cgst || false);
//                 setOriginalQuotationNumber(quote.quotationNumber);

//                 // 3. Update document number based on current mode
//                 if (invoice) {
//                     // Current mode is Invoice: Keep the new auto-generated Invoice number (Conversion workflow)
//                     setIsEditing(false);
//                     setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber })); // Ensure associated number is set
//                     showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//                 } else {
//                     // Current mode is Quotation: Overwrite with the fetched quote number for editing/resaving
//                     setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//                     setIsEditing(true); // Enable editing/update mode
//                     showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//                 }
//                 return; // Exit successfully
//             }

//             // --- Secondary goal: If quote search failed, check for existing Invoice ---
//             else if (invoice || !quotation) {
//                 const invoiceUrl = `http://localhost:5000/api/invoice/fetch/${docNumber}`;
//                 response = await fetch(invoiceUrl);
//                 result = await response.json();

//                 if (response.ok && result.invoice) {
//                     const inv = result.invoice;
//                     // Load Invoice details
//                     setBillDetails(prev => ({ 
//                         ...prev,
//                         billTO: inv.billTO || "",
//                         customerAddress: inv.customerAddress || "",
//                         customerGSTIN: inv.customerGSTIN || "",
//                         quotationNumber: inv.invoiceNumber,
//                         items: inv.items || [],
//                         associatedQuotationNumber: inv.originalQuotationNumber || '', // Load associated number if present
//                     }));
//                     setSGST(inv.sgst || false);
//                     setCGST(inv.cgst || false);
//                     setOriginalQuotationNumber(inv.originalQuotationNumber || null);
                    
//                     setIsEditing(true); // Enable editing/update mode
//                     showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
//                     return; // Exit successfully
//                 }
//             }
            
//             // If no document was found, reset to new document mode
//             setIsEditing(false);
//             setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
//             generateUniqueNumber();
//             showNotification(`Document #${docNumber} not found in either Quotations or Invoices.`, 'error');

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             showNotification('Error fetching data. Check server connection.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

    
//     // Manual Print Function (Replaces ReactToPrint)
//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="flex items-center justify-center">
//             <script src="https://cdn.tailwindcss.com"></script>
//             <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
//                 <div className="w-full flex items-center justify-center">
//                     <div className="font-sans w-full lg:w-[50rem]">
//                         <div className="pb-5 text-3xl">
//                             <p className="font-bold text-blue-500">
//                                 Design <span className="text-green-400">Blocks</span>
//                             </p>
//                         </div>

//                         {/* Search Section (Main Search) */}
//                         <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//                             <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
//                                 Search Invoice/Quotation
//                             </p>
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Invoice/Quotation Number"
//                                     className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md flex-1"
//                                     value={searchNumber}
//                                     onChange={(e) => setSearchNumber(e.target.value)}
//                                 />
//                                 <button
//                                     onClick={() => handleSearch(searchNumber)}
//                                     disabled={loading}
//                                     className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                                 >
//                                     {loading ? 'Searching...' : 'Search'}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Mode Switch */}
//                         <div className="flex items-center justify-start gap-5 mb-5">
//                             <div className={`cursor-pointer px-4 py-1 ${quotation ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(true); setInvoice(false); }}>Quotation</div>
//                             <div className={`cursor-pointer px-4 py-1 ${invoice ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(false); setInvoice(true); }}>Invoice</div>
//                         </div>

//                         {/* 1. Document Details Section */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 1. {invoice ? "Invoice" : "Quotation"} Details
//                             </p>
//                             <div className="flex items-center justify-start flex-wrap gap-3">
//                                 <h1>{invoice ? "Invoice" : "Quotation"} Number</h1>
//                                 <input
//                                     type="text"
//                                     value={billDetails.quotationNumber}
//                                     placeholder={`Auto-generated`}
//                                     className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100"
//                                     readOnly
//                                 />
                                
//                                 {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
//                                 {invoice && (
//                                     <div className="flex items-center gap-3 mt-3">
//                                         <h1>Quotation Number</h1>
//                                         <div className="flex items-center border border-blue-500 rounded shadow-md">
//                                             <input
//                                                 type="text"
//                                                 // Using billDetails.associatedQuotationNumber state
//                                                 value={billDetails.associatedQuotationNumber}
//                                                 placeholder={`Enter Q-Number to load`}
//                                                 className="outline-none rounded-l px-2 py-1 flex-1"
//                                                 onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
//                                             />
//                                             <button
//                                                 // Section 1 search button: Passes the specific associated quote number
//                                                 onClick={() => handleSearch(billDetails.associatedQuotationNumber)} 
//                                                 disabled={loading}
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-r h-full hover:bg-blue-600 disabled:opacity-50"
//                                             >
//                                                 Load
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* 2. Recipient Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                                 2. Recipient Details
//                             </p>
//                             <div className="flex items-start justify-start flex-wrap gap-3">
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Bill TO</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Biller Details"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.billTO}
//                                         onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Address</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Biller Address"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.customerAddress}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1>Customer GSTIN</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Customer GSTIN"
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                         value={billDetails.customerGSTIN}
//                                         onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })}
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* 3. Items Section */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                             {/* Use handleUpdateItem if editing an item, else handleAddItem */}
//                             <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
//                                 <div className="flex flex-row items-center justify-between w-full pb-3">
//                                     <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>
//                                     <div className="flex gap-3">
//                                         {isItemEditing && (
//                                             <button type="button" onClick={() => {
//                                                 setIsItemEditing(false);
//                                                 setEditingItemOriginal(null);
//                                                 setTableItems({ description: "", quantity: "", unitPrice: "" });
//                                             }} className="bg-yellow-500 px-3 py-2 rounded-md text-white shadow-md hover:bg-yellow-600">
//                                                 Cancel Edit
//                                             </button>
//                                         )}
//                                         <button type="submit" className={`px-3 py-2 rounded-md text-green-950 shadow-md ${isItemEditing ? 'bg-orange-400 hover:bg-orange-500' : 'bg-green-400 hover:bg-green-500'}`}>
//                                             {isItemEditing ? 'Update Item' : 'Add'}
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center justify-start flex-wrap gap-3">
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Description</h1>
//                                         <input
//                                             type="text"
//                                             required
//                                             value={tableItems.description}
//                                             placeholder="Enter Description"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Quantity</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.quantity}
//                                             placeholder="Enter Quantity"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })}
//                                         />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1>Unit Price</h1>
//                                         <input
//                                             type="number"
//                                             required
//                                             value={tableItems.unitPrice}
//                                             placeholder="Single Product Price"
//                                             className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                             onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })}
//                                         />
//                                     </div>
//                                 </div>
//                             </form>
                            
//                             {/* Items Table Display (Restored original styling) */}
//                             {billDetails.items.length > 0 && (
//                                 <div className="overflow-x-scroll w-full py-5">
//                                     <div className="w-full min-w-[50rem]">
//                                         <table className="w-full">
//                                             <tbody className="w-full">
//                                                 {/* Table Header Row */}
//                                                 <tr className="bg-gray-200 font-bold">
//                                                     <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td>
//                                                     <td className="px-3 w-[5%] text-center">Action</td>
//                                                 </tr>

//                                                 {billDetails.items.map((item, index) => (
//                                                     <tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}>
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
//                                                         <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
//                                                         <td className="px-3">
//                                                             <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs inline-block" onClick={(e) => { e.stopPropagation(); handleItem(item); }}>Delete</p>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* 4. GST Info */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
//                             <div className="flex items-center justify-start gap-5 mt-3">
//                                 <label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>SGST</label>
//                                 <label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>CGST</label>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-3">
//                             {/* Save/Update Button */}
//                             <button
//                                 onClick={handleSaveOrUpdate}
//                                 disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
//                                 className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? 'Processing...' : isEditing ? 'Update' : 'Save'}
//                             </button>
                            
//                             {/* Delete Button (Visible only in Editing mode) */}
//                             {isEditing && (
//                                 <button
//                                     onClick={handleDelete}
//                                     disabled={loading}
//                                     className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {loading ? 'Deleting...' : 'Delete'}
//                                 </button>
//                             )}
                            
//                             {/* <button
//                                 onClick={handleDownloadPDF}
//                                 disabled={loading || !billDetails.quotationNumber}
//                                 className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Download PDF
//                             </button> */}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Print Trigger Button (Restored original style, replaced ReactToPrint with manual print) */}
//                 <button 
//                     onClick={handlePrint}
//                     className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 print:hidden"
//                 >
//                     Print Receipt
//                 </button>

//                 {/* --- PDF/Print PREVIEW Area --- */}
//                 <div className="w-full bg-white flex items-center justify-center">
//                     <div className="overflow-x-scroll w-full xl:w-[60rem]">
//                         <div ref={printRef} className="flex items-center justify-center flex-col w-[60rem] bg-white text-black">
                            
//                             {/* Header Row */}
//                             <div className="flex items-center justify-start flex-row h-[15rem]">
//                                 <div className="h-full w-[20rem] border border-black">
//                                     <div className="flex items-center justify-center h-[30%]">
//                                         <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
//                                     </div>
//                                     <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                                         <p className="font-semibold text-lg">Bill to:</p>
//                                         {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                                         <p>{billDetails.billTO}</p>
//                                         <p>{billDetails.customerAddress}</p>
//                                         {/* Display associated quotation number in print view */}
//                                         {invoice && billDetails.associatedQuotationNumber && (
//                                             <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="h-full w-[40rem] border-l-0 border border-black flex flex-col justify-between">
//                                     <div className="p-5 flex items-center justify-between">
//                                         <div className="w-[70%] text-sm">
//                                             <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                                             <p className="font-medium">DESIGN BLOCKS</p>
//                                             <p className="font-semibold text-lg pt-2">Address:</p>
//                                             <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                                         </div>
//                                         <img src="https://designblocks.in/img/DB.png" alt="Design Blocks Logo" className="w-[20%]" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO" }}/>
//                                     </div>
//                                     <div className="flex items-center justify-between flex-row h-10 px-5 border-t border-black text-sm">
//                                         <div>
//                                             <p className="font-semibold text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal text-base">{billDetails.quotationNumber}</span></p>
//                                         </div>
//                                         <div>
//                                             <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="h-10 w-full border-x border-black"></div>
                            
//                             {/* Items Table */}
//                             <table className="w-[60rem] text-sm">
//                                 <thead>
//                                     <tr className="h-10 bg-gray-100 font-bold">
//                                         <td className="border border-black text-center w-[5%]">Item</td>
//                                         <td className="border border-black text-center w-[30rem]">Description</td>
//                                         <td className="border border-black text-center w-[10%]">Quantity</td>
//                                         <td className="border border-black text-center w-[15%]">Unit Price (Rs.)</td>
//                                         <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="border border-black">
//                                     {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
//                                         <tr 
//                                             key={key} 
//                                             className="h-10 border-b border-gray-300 cursor-pointer hover:bg-blue-50 transition duration-150" 
//                                             onClick={() => handleEditItem(items)} // Add edit functionality here
//                                         >
//                                             <td className="text-center border border-black">{key + 1}.</td>
//                                             <td className="px-2 border border-black">{items.description}</td>
//                                             <td className="px-2 border border-black text-center">{items.quantity}</td>
//                                             <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
//                                             <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
//                                         </tr>
//                                     )) : (
//                                         <tr className="h-20">
//                                             <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
//                                         </tr>
//                                     )}

//                                     {/* Taxable Value Row */}
//                                     <tr className="border border-black h-10 bg-yellow-50">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                                         <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                                     </tr>
//                                     <tr className="h-1"></tr> {/* Spacer */}
                                    
//                                     {/* GST Rows */}
//                                     {sgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3} className="border border-black text-center"></td>
//                                             <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{SGST}</td>
//                                         </tr>
//                                     )}
//                                     {cgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3} className="border border-black text-center"></td>
//                                             <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{CGST}</td>
//                                         </tr>
//                                     )}
                                    
//                                     {/* Final Invoice Value */}
//                                     {(cgst || sgst) && (
//                                         <>
//                                             <tr className="border border-black h-10 bg-blue-100">
//                                                 <td colSpan={3}></td>
//                                                 <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
//                                                 <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                                             </tr>
//                                         </>
//                                     )}

//                                     {/* In Words */}
//                                     <tr className="border border-black h-10">
//                                         <td colSpan={5} className="px-2">
//                                             <span className="font-semibold">In Words: </span>
//                                             <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                                         </td>
//                                     </tr>
                                    
//                                     {/* Bank Details & Signature */}
//                                     <tr>
//                                         <td colSpan={5} className="p-2 border-t border-black text-xs">
//                                             <div className="flex items-start justify-between">
//                                                 <div className="w-1/2">
//                                                     <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                                                     <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                                                     <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                                                     <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                                                 </div>
//                                                 <div className="w-1/2 text-right pt-6">
//                                                     <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-center mt-3 font-semibold">Thank You</div>
//                                         </td>
//                                     </tr>

//                                     {/* Quotation Terms and Conditions */}
//                                     {quotation && (
//                                         <tr>
//                                             <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                                                 <div className="text-sm">
//                                                     <p className="font-semibold mb-1">Terms and Conditions.</p>
//                                                     <p>Quotation prices are valid for 20 days from the date of issue.</p>
//                                                     <p>Any increase in project scope will result in an additional cost.</p>
//                                                 </div>
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



import React, { useState, useRef, useEffect } from "react";
// External libraries "to-words" and "react-to-print" removed due to sandbox environment constraints.

function App() {
    // --- UPDATE 1: Define the Base URL Here ---
    // You should use an Environment Variable here in a real project (see section below), 
    // but for now, we hardcode the Render URL as requested:
    const BASE_URL = import.meta.env.VITE_API_URL;

    const date = new Date();
    // Simplified Number to Words Converter (Replaces 'to-words' library)
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
        
        // Handle rounding and separation of integer/decimal parts
        const roundedNum = parseFloat(num.toFixed(2));
        const [intPart, fracPart] = roundedNum.toString().split('.');

        let integer = parseInt(intPart);
        const fractional = fracPart ? parseInt(fracPart) : 0;
        
        if (integer > 999999999) return 'Value too large'; // Safety limit

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
            words += (words ? ' and ' : '') + convertChunk(fractional) + ' Paisa';
        }

        return words.trim();
    };

    const [quotation, setQuotation] = useState(true);
    const [invoice, setInvoice] = useState(false);
    const [sgst, setSGST] = useState(false);
    const [cgst, setCGST] = useState(false);
    const printRef = useRef(null);
    const [taxableValue, setTaxableValue] = useState(0);
    const [invoiceValue, setInvoiceValue] = useState(0);
    const [SGST, setSGSTValue] = useState(0);
    const [CGST, setCGSTValue] = useState(0);
    const [searchNumber, setSearchNumber] = useState("");
    const [loading, setLoading] = useState(false);
    
    // State to track if the current form represents an existing document loaded for editing
    const [isEditing, setIsEditing] = useState(false); 
    
    // State to hold the original quote number if we load one (separate from billDetails.quotationNumber which holds the current doc number)
    const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);

    // Track if an item is currently being edited
    const [isItemEditing, setIsItemEditing] = useState(false);
    // Store the original item object reference being edited
    const [editingItemOriginal, setEditingItemOriginal] = useState(null); 

    // Using simple alert as a placeholder for showNotification
    const showNotification = (message, type) => {
        alert(`${type.toUpperCase()}: ${message}`);
    };

    const [billDetails, setBillDetails] = useState({
        billTO: "",
        customerAddress: "",
        customerGSTIN: "",
        quotationNumber: "", // This holds the current document number (either Q-xxx or I-xxx)
        associatedQuotationNumber: "", // Holds the quotation number if converting to invoice (used for Section 1 input)
        items: [],
    });

    const [tableItems, setTableItems] = useState({
        description: "",
        quantity: "",
        unitPrice: "",
    });

    // Generate unique number on component mount or when switching between invoice/quotation
    useEffect(() => {
        // Clear form fields and reset editing state when switching modes
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
        setIsEditing(false); // Reset document editing state on mode change
        setIsItemEditing(false); // Reset item editing state
        setEditingItemOriginal(null);
        
        generateUniqueNumber();
    }, [invoice, quotation]);

    // Generate unique invoice/quotation number
    const generateUniqueNumber = async () => {
        try {
            // --- UPDATE 2: Use BASE_URL ---
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
                // Number generation is critical, alert user if server is down
            console.error("Number generation failed", error);
            showNotification("Error connecting to backend for number generation.", 'error');
        }
    };

    // Calculation effect
    useEffect(() => {
        const newTaxableValue = billDetails.items.reduce((acc, item) => {
            const quantity = Number(item.quantity) || 0;
            const unitPrice = Number(item.unitPrice) || 0;
            return acc + quantity * unitPrice;
        }, 0);
        
        const gstRate = 0.09;
        const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
        const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;
        
        const totalValue = newTaxableValue + currentSGST + currentCGST;

        setSGSTValue(currentSGST.toFixed(2));
        setCGSTValue(currentCGST.toFixed(2));
        setTaxableValue(newTaxableValue);
        setInvoiceValue(totalValue);
    }, [billDetails.items, cgst, sgst]);


    // Handles adding a new item
    const handleAddItem = (e) => {
        e.preventDefault();
        // Reset item editing state if we are adding a new item
        setIsItemEditing(false);
        setEditingItemOriginal(null);

        // Ensure that quantity and unitPrice are treated as numbers when adding
        setBillDetails({
            ...billDetails,
            items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice), id: Date.now() }], // Add unique ID for tracking
        });
        setTableItems({ description: "", quantity: "", unitPrice: "" });
    };

    // Handles clicking an item in the table to load it for editing
    const handleEditItem = (item) => {
        // Load the item's details into the input fields
        setTableItems({ 
            description: item.description, 
            quantity: item.quantity, 
            unitPrice: item.unitPrice 
        });
        // Set state to indicate editing mode and store the original item reference
        setIsItemEditing(true);
        setEditingItemOriginal(item); 
    };

    // Handles updating the edited item in the list
    const handleUpdateItem = (e) => {
        e.preventDefault();
        
        if (!editingItemOriginal) return;

        // Find the index of the original item in the array
        const index = billDetails.items.findIndex(item => item === editingItemOriginal);

        if (index > -1) {
            const updatedItems = [...billDetails.items];
            // Replace the old item with the new, edited item values
            updatedItems[index] = {
                ...updatedItems[index], // Keep original ID if present
                description: tableItems.description,
                quantity: Number(tableItems.quantity),
                unitPrice: Number(tableItems.unitPrice)
            };

            setBillDetails({ ...billDetails, items: updatedItems });
        }

        // Reset item form state
        setTableItems({ description: "", quantity: "", unitPrice: "" });
        setIsItemEditing(false);
        setEditingItemOriginal(null);
    };


    const handleItem = (item) => {
        let removedArray = billDetails.items.filter(e => e !== item);
        setBillDetails({ ...billDetails, items: removedArray });
    };

    // --- Handle Update Logic ---
    const handleUpdate = async () => {
        try {
            setLoading(true);

            const documentNumber = billDetails.quotationNumber;
            const urlPath = invoice ? "invoice/update" : "quotation/update";
            
            // --- UPDATE 3: Use BASE_URL ---
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
                SGSTAmount: SGST,
                CGSTAmount: CGST,
                invoiceValue: invoiceValue,
                originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null, 
            };
            
            // --- URL was defined above ---
            const res = await fetch(url, {
                method: "PUT", // Use PUT for updating
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (data.success) {
                showNotification(`${invoice ? "Invoice" : "Quotation"} #${documentNumber} updated successfully!`, 'success');
            } else {
                showNotification(`Update Error: ${data.message || data.error}`, 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification("Unexpected error during update.", 'error');
        } finally {
            setLoading(false);
        }
    };
    // --- END Handle Update Logic ---


    // Save/Update Handler
    const handleSaveOrUpdate = () => {
        if (isEditing) {
            handleUpdate();
        } else {
            handleSave();
        }
    };

    // Save invoice/quotation to backend
    const handleSave = async () => {
        try {
            setLoading(true);

            const body = {
                billTO: billDetails.billTO,
                customerAddress: billDetails.customerAddress,
                customerGSTIN: billDetails.customerGSTIN,
                items: billDetails.items,
                sgst: sgst,
                cgst: cgst,
                taxableValue: taxableValue,
                SGSTAmount: SGST,
                CGSTAmount: CGST,
                invoiceValue: invoiceValue,
                invoiceNumber: billDetails.quotationNumber,
                originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null, 
            };
            
            // Adjust body keys based on mode for POST request
            const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
            delete finalBody.invoiceNumber; 

            // --- UPDATE 4: Use BASE_URL ---
            const url = quotation
                ? `${BASE_URL}/api/quotation/save`
                : `${BASE_URL}/api/invoice/save`;

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalBody)
            });

            const data = await res.json();

            if (data.success) {
                const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
                showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
                // After successful save, update state to the saved document number and enter editing mode
                setIsEditing(true); 
                setBillDetails(prev => ({
                    ...prev,
                    quotationNumber: savedNumber,
                }));
            } else {
                showNotification(`Save Error: ${data.error}`, 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification("Unexpected error during save.", 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- Handle Delete Logic ---
    const handleDelete = async () => {
        const docType = invoice ? "Invoice" : "Quotation";
        const documentNumber = billDetails.quotationNumber;
        
        if (!documentNumber || !isEditing) {
            showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`);
        if (!confirmDelete) return;

        try {
            setLoading(true);
            const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
            
            // --- UPDATE 5: Use BASE_URL ---
            const url = `${BASE_URL}/api/${urlPath}`;

            const response = await fetch(url, { method: "DELETE" });
            const data = await response.json();

            if (response.ok && data.success) {
                showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
                // Reset form state after successful deletion
                setBillDetails(prev => ({
                    ...prev,
                    billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
                }));
                setSGST(false);
                setCGST(false);
                setIsEditing(false);
                generateUniqueNumber(); // Generate a new number for a clean start
            } else {
                showNotification(`Delete Error: ${data.message || data.error}`, 'error');
            }
        } catch (err) {
            console.error('Error deleting data:', err);
            showNotification('Error deleting data. Check server connection.', 'error');
        } finally {
            setLoading(false);
        }
    };
    // --- END Handle Delete Logic ---


    // Fetch invoice/quotation by number (Refactored to accept argument)
    const handleSearch = async (docNumber) => {
        // Ensure docNumber is the actual value from the input fields
        if (typeof docNumber === 'object' || !docNumber) {
             // If called without argument from the main button, docNumber defaults to searchNumber
            docNumber = searchNumber;
        }

        if (!docNumber) {
            showNotification("Please enter a document number to search.", 'info');
            return;
        }

        try {
            setLoading(true);
            setIsEditing(false); // Assume fresh load initially

            // --- Primary goal: Check for Quotation for pre-fill/conversion ---
            // --- UPDATE 6: Use BASE_URL ---
            const quoteUrl = `${BASE_URL}/api/quotation/fetch/${docNumber}`;
            let response = await fetch(quoteUrl);
            let result = await response.json();

            if (response.ok && result.quotation) {
                const quote = result.quotation;

                // 1. Populate the form with all quotation details
                setBillDetails(prev => ({
                    ...prev,
                    billTO: quote.billTO || "",
                    customerAddress: quote.customerAddress || "",
                    customerGSTIN: quote.customerGSTIN || "",
                    items: quote.items || [],
                    associatedQuotationNumber: docNumber, // Set the number that was just searched
                }));
                // Set GST flags and derived values
                setSGST(quote.sgst || false);
                setCGST(quote.cgst || false);
                setOriginalQuotationNumber(quote.quotationNumber);

                // 3. Update document number based on current mode
                if (invoice) {
                    // Current mode is Invoice: Keep the new auto-generated Invoice number (Conversion workflow)
                    setIsEditing(false);
                    setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber })); // Ensure associated number is set
                    showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
                } else {
                    // Current mode is Quotation: Overwrite with the fetched quote number for editing/resaving
                    setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
                    setIsEditing(true); // Enable editing/update mode
                    showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
                }
                return; // Exit successfully
            }

            // --- Secondary goal: If quote search failed, check for existing Invoice ---
            else if (invoice || !quotation) {
                // --- UPDATE 7: Use BASE_URL ---
                const invoiceUrl = `${BASE_URL}/api/invoice/fetch/${docNumber}`;
                response = await fetch(invoiceUrl);
                result = await response.json();

                if (response.ok && result.invoice) {
                    const inv = result.invoice;
                    // Load Invoice details
                    setBillDetails(prev => ({ 
                        ...prev,
                        billTO: inv.billTO || "",
                        customerAddress: inv.customerAddress || "",
                        customerGSTIN: inv.customerGSTIN || "",
                        quotationNumber: inv.invoiceNumber,
                        items: inv.items || [],
                        associatedQuotationNumber: inv.originalQuotationNumber || '', // Load associated number if present
                    }));
                    setSGST(inv.sgst || false);
                    setCGST(inv.cgst || false);
                    setOriginalQuotationNumber(inv.originalQuotationNumber || null);
                    
                    setIsEditing(true); // Enable editing/update mode
                    showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
                    return; // Exit successfully
                }
            }
            
            // If no document was found, reset to new document mode
            setIsEditing(false);
            setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
            generateUniqueNumber();
            showNotification(`Document #${docNumber} not found in either Quotations or Invoices.`, 'error');

        } catch (error) {
            console.error('Error fetching data:', error);
            showNotification('Error fetching data. Check server connection.', 'error');
        } finally {
            setLoading(false);
        }
    };

    
    // Manual Print Function (Replaces ReactToPrint)
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex items-center justify-center">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
                <div className="w-full flex items-center justify-center">
                    <div className="font-sans w-full lg:w-[50rem]">
                        <div className="pb-5 text-3xl">
                            <p className="font-bold text-blue-500">
                                Design <span className="text-green-400">Blocks</span>
                            </p>
                        </div>

                        {/* Search Section (Main Search) */}
                        <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
                            <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
                                Search Invoice/Quotation
                            </p>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter Invoice/Quotation Number"
                                    className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md flex-1"
                                    value={searchNumber}
                                    onChange={(e) => setSearchNumber(e.target.value)}
                                />
                                <button
                                    onClick={() => handleSearch(searchNumber)}
                                    disabled={loading}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
                                >
                                    {loading ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </div>

                        {/* Mode Switch */}
                        <div className="flex items-center justify-start gap-5 mb-5">
                            <div className={`cursor-pointer px-4 py-1 ${quotation ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(true); setInvoice(false); }}>Quotation</div>
                            <div className={`cursor-pointer px-4 py-1 ${invoice ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(false); setInvoice(true); }}>Invoice</div>
                        </div>

                        {/* 1. Document Details Section */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
                            <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                                1. {invoice ? "Invoice" : "Quotation"} Details
                            </p>
                            <div className="flex items-center justify-start flex-wrap gap-3">
                                <h1>{invoice ? "Invoice" : "Quotation"} Number</h1>
                                <input
                                    type="text"
                                    value={billDetails.quotationNumber}
                                    placeholder={`Auto-generated`}
                                    className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100"
                                    readOnly
                                />
                                
                                {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
                                {invoice && (
                                    <div className="flex items-center gap-3 mt-3">
                                        <h1>Quotation Number</h1>
                                        <div className="flex items-center border border-blue-500 rounded shadow-md">
                                            <input
                                                type="text"
                                                // Using billDetails.associatedQuotationNumber state
                                                value={billDetails.associatedQuotationNumber}
                                                placeholder={`Enter Q-Number to load`}
                                                className="outline-none rounded-l px-2 py-1 flex-1"
                                                onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
                                            />
                                            <button
                                                // Section 1 search button: Passes the specific associated quote number
                                                onClick={() => handleSearch(billDetails.associatedQuotationNumber)} 
                                                disabled={loading}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-r h-full hover:bg-blue-600 disabled:opacity-50"
                                            >
                                                Load
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Recipient Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                                2. Recipient Details
                            </p>
                            <div className="flex items-start justify-start flex-wrap gap-3">
                                <div className="flex items-start justify-center flex-col gap-2">
                                    <h1>Bill TO</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter Biller Details"
                                        className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
                                        value={billDetails.billTO}
                                        onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-start justify-center flex-col gap-2">
                                    <h1>Address</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter Biller Address"
                                        className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
                                        value={billDetails.customerAddress}
                                        onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-start justify-center flex-col gap-2">
                                    <h1>Customer GSTIN</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter Customer GSTIN"
                                        className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
                                        value={billDetails.customerGSTIN}
                                        onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Items Section */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
                            {/* Use handleUpdateItem if editing an item, else handleAddItem */}
                            <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
                                <div className="flex flex-row items-center justify-between w-full pb-3">
                                    <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>
                                    <div className="flex gap-3">
                                        {isItemEditing && (
                                            <button type="button" onClick={() => {
                                                setIsItemEditing(false);
                                                setEditingItemOriginal(null);
                                                setTableItems({ description: "", quantity: "", unitPrice: "" });
                                            }} className="bg-yellow-500 px-3 py-2 rounded-md text-white shadow-md hover:bg-yellow-600">
                                                Cancel Edit
                                            </button>
                                        )}
                                        <button type="submit" className={`px-3 py-2 rounded-md text-green-950 shadow-md ${isItemEditing ? 'bg-orange-400 hover:bg-orange-500' : 'bg-green-400 hover:bg-green-500'}`}>
                                            {isItemEditing ? 'Update Item' : 'Add'}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start flex-wrap gap-3">
                                    <div className="flex items-start justify-center flex-col gap-2">
                                        <h1>Description</h1>
                                        <input
                                            type="text"
                                            required
                                            value={tableItems.description}
                                            placeholder="Enter Description"
                                            className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
                                            onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex items-start justify-center flex-col gap-2">
                                        <h1>Quantity</h1>
                                        <input
                                            type="number"
                                            required
                                            value={tableItems.quantity}
                                            placeholder="Enter Quantity"
                                            className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
                                            onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex items-start justify-center flex-col gap-2">
                                        <h1>Unit Price</h1>
                                        <input
                                            type="number"
                                            required
                                            value={tableItems.unitPrice}
                                            placeholder="Single Product Price"
                                            className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
                                            onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </form>
                            
                            {/* Items Table Display (Restored original styling) */}
                            {billDetails.items.length > 0 && (
                                <div className="overflow-x-scroll w-full py-5">
                                    <div className="w-full min-w-[50rem]">
                                        <table className="w-full">
                                            <tbody className="w-full">
                                                {/* Table Header Row */}
                                                <tr className="bg-gray-200 font-bold">
                                                    <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td>
                                                    <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td>
                                                    <td className="px-3 w-[5%] text-center">Action</td>
                                                </tr>

                                                {billDetails.items.map((item, index) => (
                                                    <tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}>
                                                        <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
                                                        <td className="border border-blue-500 px-3 py-2">{item.description}</td>
                                                        <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
                                                        <td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                                                        <td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
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
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
                            <div className="flex items-center justify-start gap-5 mt-3">
                                <label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>SGST</label>
                                <label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>CGST</label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {/* Save/Update Button */}
                            <button
                                onClick={handleSaveOrUpdate}
                                disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : isEditing ? 'Update' : 'Save'}
                            </button>
                            
                            {/* Delete Button (Visible only in Editing mode) */}
                            {isEditing && (
                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            )}
                            
                            {/* <button
                                onClick={handleDownloadPDF}
                                disabled={loading || !billDetails.quotationNumber}
                                className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Download PDF
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Print Trigger Button (Restored original style, replaced ReactToPrint with manual print) */}
                <button 
                    onClick={handlePrint}
                    className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 print:hidden"
                >
                    Print Receipt
                </button>

                {/* --- PDF/Print PREVIEW Area --- */}
                <div className="w-full bg-white flex items-center justify-center">
                    <div className="overflow-x-scroll w-full xl:w-[60rem]">
                        <div ref={printRef} className="flex items-center justify-center flex-col w-[60rem] bg-white text-black">
                            
                            {/* Header Row */}
                            <div className="flex items-center justify-start flex-row h-[15rem]">
                                <div className="h-full w-[20rem] border border-black">
                                    <div className="flex items-center justify-center h-[30%]">
                                        <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
                                    </div>
                                    <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
                                        <p className="font-semibold text-lg">Bill to:</p>
                                        {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
                                        <p>{billDetails.billTO}</p>
                                        <p>{billDetails.customerAddress}</p>
                                        {/* Display associated quotation number in print view */}
                                        {invoice && billDetails.associatedQuotationNumber && (
                                            <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
                                        )}
                                    </div>
                                </div>
                                <div className="h-full w-[40rem] border-l-0 border border-black flex flex-col justify-between">
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="w-[70%] text-sm">
                                            <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
                                            <p className="font-medium">DESIGN BLOCKS</p>
                                            <p className="font-semibold text-lg pt-2">Address:</p>
                                            <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
                                        </div>
                                        <img src="https://designblocks.in/img/DB.png" alt="Design Blocks Logo" className="w-[20%]" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO" }}/>
                                    </div>
                                    <div className="flex items-center justify-between flex-row h-10 px-5 border-t border-black text-sm">
                                        <div>
                                            <p className="font-semibold text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal text-base">{billDetails.quotationNumber}</span></p>
                                        </div>
                                        <div>
                                            <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="h-10 w-full border-x border-black"></div>
                            
                            {/* Items Table */}
                            <table className="w-[60rem] text-sm">
                                <thead>
                                    <tr className="h-10 bg-gray-100 font-bold">
                                        <td className="border border-black text-center w-[5%]">Item</td>
                                        <td className="border border-black text-center w-[30rem]">Description</td>
                                        <td className="border border-black text-center w-[10%]">Quantity</td>
                                        <td className="border border-black text-center w-[15%]">Unit Price (Rs.)</td>
                                        <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
                                    </tr>
                                </thead>
                                <tbody className="border border-black">
                                    {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
                                        <tr 
                                            key={key} 
                                            className="h-10 border-b border-gray-300 cursor-pointer hover:bg-blue-50 transition duration-150" 
                                            onClick={() => handleEditItem(items)} // Add edit functionality here
                                        >
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

                                    {/* Taxable Value Row */}
                                    <tr className="border border-black h-10 bg-yellow-50">
                                        <td colSpan={3}></td>
                                        <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
                                        <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
                                    </tr>
                                    <tr className="h-1"></tr> {/* Spacer */}
                                    
                                    {/* GST Rows */}
                                    {sgst && (
                                        <tr className="h-8 border border-black">
                                            <td colSpan={3} className="border border-black text-center"></td>
                                            <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
                                            <td className="border border-black px-2 text-right font-medium">{SGST}</td>
                                        </tr>
                                    )}
                                    {cgst && (
                                        <tr className="h-8 border border-black">
                                            <td colSpan={3} className="border border-black text-center"></td>
                                            <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
                                            <td className="border border-black px-2 text-right font-medium">{CGST}</td>
                                        </tr>
                                    )}
                                    
                                    {/* Final Invoice Value */}
                                    {(cgst || sgst) && (
                                        <>
                                            <tr className="border border-black h-10 bg-blue-100">
                                                <td colSpan={3}></td>
                                                <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
                                                <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* In Words */}
                                    <tr className="border border-black h-10">
                                        <td colSpan={5} className="px-2">
                                            <span className="font-semibold">In Words: </span>
                                            <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
                                        </td>
                                    </tr>
                                    
                                    {/* Bank Details & Signature */}
                                    <tr>
                                        <td colSpan={5} className="p-2 border-t border-black text-xs">
                                            <div className="flex items-start justify-between">
                                                <div className="w-1/2">
                                                    <p className="font-semibold text-sm">BANK DETAILS:-</p>
                                                    <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
                                                    <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
                                                    <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
                                                </div>
                                                <div className="w-1/2 text-right pt-6">
                                                    <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
                                                </div>
                                            </div>
                                            <div className="text-center mt-3 font-semibold">Thank You</div>
                                        </td>
                                    </tr>

                                    {/* Quotation Terms and Conditions */}
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
        </div>
    );
}

export default App;
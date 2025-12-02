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



// import React, { useState, useRef, useEffect } from "react";

// import ReactToPrint from "react-to-print";
// function App() {

//   const BASE_URL = `https://invoice-dbinvoice-backend.onrender.com`;

//   const date = new Date();
//   // Simplified Number to Words Converter (Replaces 'to-words' library)
//   const numberToWords = (num) => {
//     if (num === 0) return 'Zero';

//     const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const scales = ['', 'Thousand', 'Million'];

//     const convertChunk = (n) => {
//       if (n === 0) return '';
//       if (n < 10) return units[n];
//       if (n < 20) return teens[n - 10];
//       if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
//       return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertChunk(n % 100) : '');
//     };

//     let words = '';
//     let i = 0;

//     const roundedNum = parseFloat(num.toFixed(2));
//     const [intPart, fracPart] = roundedNum.toString().split('.');

//     let integer = parseInt(intPart);
//     const fractional = fracPart ? parseInt(fracPart) : 0;

//     if (integer > 999999999) return 'Value too large'; // Safety limit

//     while (integer > 0) {
//       const chunk = integer % 1000;
//       if (chunk !== 0) {
//         let chunkWords = convertChunk(chunk);
//         words = chunkWords + (scales[i] ? ' ' + scales[i] : '') + ' ' + words;
//       }
//       integer = Math.floor(integer / 1000);
//       i++;
//     }
//     words = words.trim();

//     if (fractional > 0) {
//       words += (words ? ' and ' : '') + convertChunk(fractional) + ' Paisa';
//     }

//     return words.trim();
//   };

//   const [quotation, setQuotation] = useState(true);
//   const [invoice, setInvoice] = useState(false);
//   const [sgst, setSGST] = useState(false);
//   const [cgst, setCGST] = useState(false);
//   const printRef = useRef(null);
//   const [taxableValue, setTaxableValue] = useState(0);
//   const [invoiceValue, setInvoiceValue] = useState(0);
//   const [SGST, setSGSTValue] = useState(0);
//   const [CGST, setCGSTValue] = useState(0);
//   const [searchNumber, setSearchNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   // State to track if the current form represents an existing document loaded for editing
//   const [isEditing, setIsEditing] = useState(false);

//   // State to hold the original quote number if we load one (separate from billDetails.quotationNumber which holds the current doc number)
//   const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);

//   // Track if an item is currently being edited
//   const [isItemEditing, setIsItemEditing] = useState(false);
//   // Store the original item object reference being edited
//   const [editingItemOriginal, setEditingItemOriginal] = useState(null);

//   // Using simple alert as a placeholder for showNotification
//   const showNotification = (message, type) => {
//     alert(`${type.toUpperCase()}: ${message}`);
//   };

//   const [billDetails, setBillDetails] = useState({
//     billTO: "",
//     customerAddress: "",
//     customerGSTIN: "",
//     quotationNumber: "", 
//     associatedQuotationNumber: "", 
//     items: [],
//   });

//   const [tableItems, setTableItems] = useState({
//     description: "",
//     quantity: "",
//     unitPrice: "",
//   });


//   useEffect(() => {
//     setBillDetails(prev => ({
//       ...prev,
//       billTO: "",
//       customerAddress: "",
//       customerGSTIN: "",
//       items: [],
//       associatedQuotationNumber: "",
//     }));
//     setSGST(false);
//     setCGST(false);
//     setTaxableValue(0);
//     setInvoiceValue(0);
//     setOriginalQuotationNumber(null);
//     setSearchNumber("");
//     setIsEditing(false); // Reset document editing state on mode change
//     setIsItemEditing(false); // Reset item editing state
//     setEditingItemOriginal(null);

//     generateUniqueNumber();
//   }, [invoice, quotation]);

//   // Generate unique invoice/quotation number
//   const generateUniqueNumber = async () => {
//     try {
//       // --- UPDATE 2: Use BASE_URL ---
//       const url = quotation
//         ? `${BASE_URL}/api/quotation/generate`
//         : `${BASE_URL}/api/invoice/generate`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.success) {
//         setBillDetails(prev => ({
//           ...prev,
//           quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
//         }));
//       }
//     } catch (error) {
//       // Number generation is critical, alert user if server is down
//       console.error("Number generation failed", error);
//       showNotification("Error connecting to backend for number generation.", 'error');
//     }
//   };

//   // Calculation effect
//   useEffect(() => {
//     const newTaxableValue = billDetails.items.reduce((acc, item) => {
//       const quantity = Number(item.quantity) || 0;
//       const unitPrice = Number(item.unitPrice) || 0;
//       return acc + quantity * unitPrice;
//     }, 0);

//     const gstRate = 0.09;
//     const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//     const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;

//     const totalValue = newTaxableValue + currentSGST + currentCGST;

//     setSGSTValue(currentSGST.toFixed(2));
//     setCGSTValue(currentCGST.toFixed(2));
//     setTaxableValue(newTaxableValue);
//     setInvoiceValue(totalValue);
//   }, [billDetails.items, cgst, sgst]);


//   // Handles adding a new item
//   const handleAddItem = (e) => {
//     e.preventDefault();
//     // Reset item editing state if we are adding a new item
//     setIsItemEditing(false);
//     setEditingItemOriginal(null);

//     // Ensure that quantity and unitPrice are treated as numbers when adding
//     setBillDetails({
//       ...billDetails,
//       items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice), id: Date.now() }], // Add unique ID for tracking
//     });
//     setTableItems({ description: "", quantity: "", unitPrice: "" });
//   };

//   // Handles clicking an item in the table to load it for editing
//   const handleEditItem = (item) => {
//     // Load the item's details into the input fields
//     setTableItems({
//       description: item.description,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice
//     });
//     // Set state to indicate editing mode and store the original item reference
//     setIsItemEditing(true);
//     setEditingItemOriginal(item);
//   };

//   // Handles updating the edited item in the list
//   const handleUpdateItem = (e) => {
//     e.preventDefault();

//     if (!editingItemOriginal) return;

//     // Find the index of the original item in the array
//     const index = billDetails.items.findIndex(item => item === editingItemOriginal);

//     if (index > -1) {
//       const updatedItems = [...billDetails.items];
//       // Replace the old item with the new, edited item values
//       updatedItems[index] = {
//         ...updatedItems[index], // Keep original ID if present
//         description: tableItems.description,
//         quantity: Number(tableItems.quantity),
//         unitPrice: Number(tableItems.unitPrice)
//       };

//       setBillDetails({ ...billDetails, items: updatedItems });
//     }

//     // Reset item form state
//     setTableItems({ description: "", quantity: "", unitPrice: "" });
//     setIsItemEditing(false);
//     setEditingItemOriginal(null);
//   };


//   const handleItem = (item) => {
//     let removedArray = billDetails.items.filter(e => e !== item);
//     setBillDetails({ ...billDetails, items: removedArray });
//   };

//   // --- Handle Update Logic ---
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);

//       const documentNumber = billDetails.quotationNumber;
//       const urlPath = invoice ? "invoice/update" : "quotation/update";

//       // --- UPDATE 3: Use BASE_URL ---
//       const url = `${BASE_URL}/api/${urlPath}`;

//       const body = {
//         [invoice ? "invoiceNumber" : "quotationNumber"]: documentNumber,
//         billTO: billDetails.billTO,
//         customerAddress: billDetails.customerAddress,
//         customerGSTIN: billDetails.customerGSTIN,
//         items: billDetails.items,
//         sgst: sgst,
//         cgst: cgst,
//         taxableValue: taxableValue,
//         SGSTAmount: SGST,
//         CGSTAmount: CGST,
//         invoiceValue: invoiceValue,
//         originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//       };

//       // --- URL was defined above ---
//       const res = await fetch(url, {
//         method: "PUT", // Use PUT for updating
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body)
//       });

//       const data = await res.json();

//       if (data.success) {
//         showNotification(`${invoice ? "Invoice" : "Quotation"} #${documentNumber} updated successfully!`, 'success');
//       } else {
//         showNotification(`Update Error: ${data.message || data.error}`, 'error');
//       }
//     } catch (err) {
//       console.error(err);
//       showNotification("Unexpected error during update.", 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//   // --- END Handle Update Logic ---


//   // Save/Update Handler
//   const handleSaveOrUpdate = () => {
//     if (isEditing) {
//       handleUpdate();
//     } else {
//       handleSave();
//     }
//   };

//   // Save invoice/quotation to backend
//   const handleSave = async () => {
//     try {
//       setLoading(true);

//       const body = {
//         billTO: billDetails.billTO,
//         customerAddress: billDetails.customerAddress,
//         customerGSTIN: billDetails.customerGSTIN,
//         items: billDetails.items,
//         sgst: sgst,
//         cgst: cgst,
//         taxableValue: taxableValue,
//         SGSTAmount: SGST,
//         CGSTAmount: CGST,
//         invoiceValue: invoiceValue,
//         invoiceNumber: billDetails.quotationNumber,
//         originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//       };

//       // Adjust body keys based on mode for POST request
//       const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
//       delete finalBody.invoiceNumber;

//       // --- UPDATE 4: Use BASE_URL ---
//       const url = quotation
//         ? `${BASE_URL}/api/quotation/save`
//         : `${BASE_URL}/api/invoice/save`;

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(finalBody)
//       });

//       const data = await res.json();

//       if (data.success) {
//         const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//         showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
//         // After successful save, update state to the saved document number and enter editing mode
//         setIsEditing(true);
//         setBillDetails(prev => ({
//           ...prev,
//           quotationNumber: savedNumber,
//         }));
//       } else {
//         showNotification(`Save Error: ${data.error}`, 'error');
//       }
//     } catch (err) {
//       console.error(err);
//       showNotification("Unexpected error during save.", 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handle Delete Logic ---
//   const handleDelete = async () => {
//     const docType = invoice ? "Invoice" : "Quotation";
//     const documentNumber = billDetails.quotationNumber;

//     if (!documentNumber || !isEditing) {
//       showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
//       return;
//     }

//     const confirmDelete = window.confirm(`Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`);
//     if (!confirmDelete) return;

//     try {
//       setLoading(true);
//       const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;

//       // --- UPDATE 5: Use BASE_URL ---
//       const url = `${BASE_URL}/api/${urlPath}`;

//       const response = await fetch(url, { method: "DELETE" });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
//         // Reset form state after successful deletion
//         setBillDetails(prev => ({
//           ...prev,
//           billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
//         }));
//         setSGST(false);
//         setCGST(false);
//         setIsEditing(false);
//         generateUniqueNumber(); // Generate a new number for a clean start
//       } else {
//         showNotification(`Delete Error: ${data.message || data.error}`, 'error');
//       }
//     } catch (err) {
//       console.error('Error deleting data:', err);
//       showNotification('Error deleting data. Check server connection.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//   // --- END Handle Delete Logic ---


//   // Fetch invoice/quotation by number (Refactored to accept argument)
//   const handleSearch = async (docNumber) => {
//     // Ensure docNumber is the actual value from the input fields
//     if (typeof docNumber === 'object' || !docNumber) {
//       // If called without argument from the main button, docNumber defaults to searchNumber
//       docNumber = searchNumber;
//     }

//     if (!docNumber) {
//       showNotification("Please enter a document number to search.", 'info');
//       return;
//     }

//     try {
//       setLoading(true);
//       setIsEditing(false); // Assume fresh load initially

//       // --- Primary goal: Check for Quotation for pre-fill/conversion ---
//       // --- UPDATE 6: Use BASE_URL ---
//       const quoteUrl = `${BASE_URL}/api/quotation/fetch/${docNumber}`;
//       let response = await fetch(quoteUrl);
//       let result = await response.json();

//       if (response.ok && result.quotation) {
//         const quote = result.quotation;

//         // 1. Populate the form with all quotation details
//         setBillDetails(prev => ({
//           ...prev,
//           billTO: quote.billTO || "",
//           customerAddress: quote.customerAddress || "",
//           customerGSTIN: quote.customerGSTIN || "",
//           items: quote.items || [],
//           associatedQuotationNumber: docNumber, // Set the number that was just searched
//         }));
//         // Set GST flags and derived values
//         setSGST(quote.sgst || false);
//         setCGST(quote.cgst || false);
//         setOriginalQuotationNumber(quote.quotationNumber);

//         // 3. Update document number based on current mode
//         if (invoice) {
//           // Current mode is Invoice: Keep the new auto-generated Invoice number (Conversion workflow)
//           setIsEditing(false);
//           setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber })); // Ensure associated number is set
//           showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//         } else {
//           // Current mode is Quotation: Overwrite with the fetched quote number for editing/resaving
//           setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//           setIsEditing(true); // Enable editing/update mode
//           showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//         }
//         return; // Exit successfully
//       }

//       // --- Secondary goal: If quote search failed, check for existing Invoice ---
//       else if (invoice || !quotation) {
//         // --- UPDATE 7: Use BASE_URL ---
//         const invoiceUrl = `${BASE_URL}/api/invoice/fetch/${docNumber}`;
//         response = await fetch(invoiceUrl);
//         result = await response.json();

//         if (response.ok && result.invoice) {
//           const inv = result.invoice;
//           // Load Invoice details
//           setBillDetails(prev => ({
//             ...prev,
//             billTO: inv.billTO || "",
//             customerAddress: inv.customerAddress || "",
//             customerGSTIN: inv.customerGSTIN || "",
//             quotationNumber: inv.invoiceNumber,
//             items: inv.items || [],
//             associatedQuotationNumber: inv.originalQuotationNumber || '', // Load associated number if present
//           }));
//           setSGST(inv.sgst || false);
//           setCGST(inv.cgst || false);
//           setOriginalQuotationNumber(inv.originalQuotationNumber || null);

//           setIsEditing(true); // Enable editing/update mode
//           showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
//           return; // Exit successfully
//         }
//       }

//       // If no document was found, reset to new document mode
//       setIsEditing(false);
//       setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
//       generateUniqueNumber();
//       showNotification(`Document #${docNumber} not found in either Quotations or Invoices.`, 'error');

//     } catch (error) {
//       console.error('Error fetching data:', error);
//       showNotification('Error fetching data. Check server connection.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="flex items-center justify-center">
//       <script src="https://cdn.tailwindcss.com"></script>
//       <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
//         <div className="w-full flex items-center justify-center">
//           <div className="font-sans w-full lg:w-[50rem]">
//             <div className="pb-5 text-3xl">
//               <p className="font-bold text-blue-500">
//                 Design <span className="text-green-400">Blocks</span>
//               </p>
//             </div>

//             {/* Search Section (Main Search) */}
//             {/*                         <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//                             <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
//                                 Search Invoice/Quotation
//                             </p>
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Invoice/Quotation Number"
//                                     className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md flex-1"
//                                     value={searchNumber}
//                                     onChange={(e) => setSearchNumber(e.target.value)}
//                                 />
//                                 <button
//                                     onClick={() => handleSearch(searchNumber)}
//                                     disabled={loading}
//                                     className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                                 >
//                                     {loading ? 'Searching...' : 'Search'}
//                                 </button>
//                             </div>
//                         </div> */}

//             <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//               <p className="pb-3 text-xl font-semibold uppercase text-purple-600">
//                 Search Invoice/Quotation
//               </p>
//               <div className="flex flex-col sm:flex-row items-stretch gap-3">
//                 <input
//                   type="text"
//                   placeholder="Enter Invoice/Quotation Number"
//                   className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full"
//                   value={searchNumber}
//                   onChange={(e) => setSearchNumber(e.target.value)}
//                 />
//                 <button
//                   onClick={() => handleSearch(searchNumber)}
//                   disabled={loading}
//                   className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                 >
//                   {loading ? 'Searching...' : 'Search'}
//                 </button>
//               </div>
//             </div>

//             {/* Mode Switch */}
//             <div className="flex items-center justify-start gap-5 mb-5">
//               <div className={`cursor-pointer px-4 py-1 ${quotation ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(true); setInvoice(false); }}>Quotation</div>
//               <div className={`cursor-pointer px-4 py-1 ${invoice ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} onClick={() => { setQuotation(false); setInvoice(true); }}>Invoice</div>
//             </div>

//             {/* 1. Document Details Section */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//               <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                 1. {invoice ? "Invoice" : "Quotation"} Details
//               </p>
//               <div className="flex items-center justify-start flex-wrap gap-3">
//                 <h1>{invoice ? "Invoice" : "Quotation"} Number</h1>
//                 <input
//                   type="text"
//                   value={billDetails.quotationNumber}
//                   placeholder={`Auto-generated`}
//                   className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100"
//                   readOnly
//                 />

//                 {/* Quotation Number Input for Invoice Linking (VISIBLE ONLY IN INVOICE MODE) */}
//                 {invoice && (
//                   <div className="flex items-center gap-3 mt-3">
//                     <h1>Quotation Number</h1>
//                     <div className="flex items-center border border-blue-500 rounded shadow-md">
//                       <input
//                         type="text"
//                         // Using billDetails.associatedQuotationNumber state
//                         value={billDetails.associatedQuotationNumber}
//                         placeholder={`Enter Q-Number to load`}
//                         className="outline-none rounded-l px-2 py-1 flex-1"
//                         onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
//                       />
//                       <button
//                         // Section 1 search button: Passes the specific associated quote number
//                         onClick={() => handleSearch(billDetails.associatedQuotationNumber)}
//                         disabled={loading}
//                         className="bg-blue-500 text-white px-3 py-1 rounded-r h-full hover:bg-blue-600 disabled:opacity-50"
//                       >
//                         Load
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* 2. Recipient Details */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//               <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
//                 2. Recipient Details
//               </p>
//               <div className="flex items-start justify-start flex-wrap gap-3">
//                 <div className="flex items-start justify-center flex-col gap-2">
//                   <h1>Bill TO</h1>
//                   <input
//                     type="text"
//                     placeholder="Enter Biller Details"
//                     className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                     value={billDetails.billTO}
//                     onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })}
//                   />
//                 </div>
//                 <div className="flex items-start justify-center flex-col gap-2">
//                   <h1>Address</h1>
//                   <input
//                     type="text"
//                     placeholder="Enter Biller Address"
//                     className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                     value={billDetails.customerAddress}
//                     onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })}
//                   />
//                 </div>
//                 <div className="flex items-start justify-center flex-col gap-2">
//                   <h1>Customer GSTIN</h1>
//                   <input
//                     type="text"
//                     placeholder="Enter Customer GSTIN"
//                     className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                     value={billDetails.customerGSTIN}
//                     onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* 3. Items Section */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//               {/* Use handleUpdateItem if editing an item, else handleAddItem */}
//               <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
//                 <div className="flex flex-row items-center justify-between w-full pb-3">
//                   <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>
//                   <div className="flex gap-3">
//                     {isItemEditing && (
//                       <button type="button" onClick={() => {
//                         setIsItemEditing(false);
//                         setEditingItemOriginal(null);
//                         setTableItems({ description: "", quantity: "", unitPrice: "" });
//                       }} className="bg-yellow-500 px-3 py-2 rounded-md text-white shadow-md hover:bg-yellow-600">
//                         Cancel Edit
//                       </button>
//                     )}
//                     <button type="submit" className={`px-3 py-2 rounded-md text-green-950 shadow-md ${isItemEditing ? 'bg-orange-400 hover:bg-orange-500' : 'bg-green-400 hover:bg-green-500'}`}>
//                       {isItemEditing ? 'Update Item' : 'Add'}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-start flex-wrap gap-3">
//                   <div className="flex items-start justify-center flex-col gap-2">
//                     <h1>Description</h1>
//                     <input
//                       type="text"
//                       required
//                       value={tableItems.description}
//                       placeholder="Enter Description"
//                       className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                       onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })}
//                     />
//                   </div>
//                   <div className="flex items-start justify-center flex-col gap-2">
//                     <h1>Quantity</h1>
//                     <input
//                       type="number"
//                       required
//                       value={tableItems.quantity}
//                       placeholder="Enter Quantity"
//                       className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                       onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })}
//                     />
//                   </div>
//                   <div className="flex items-start justify-center flex-col gap-2">
//                     <h1>Unit Price</h1>
//                     <input
//                       type="number"
//                       required
//                       value={tableItems.unitPrice}
//                       placeholder="Single Product Price"
//                       className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                       onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })}
//                     />
//                   </div>
//                 </div>
//               </form>

//               {/* Items Table Display (Restored original styling) */}
//               {billDetails.items.length > 0 && (
//                 <div className="overflow-x-scroll w-full py-5">
//                   <div className="w-full min-w-[50rem]">
//                     <table className="w-full">
//                       <tbody className="w-full">
//                         {/* Table Header Row */}
//                         <tr className="bg-gray-200 font-bold">
//                           <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
//                           <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
//                           <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
//                           <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td>
//                           <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td>
//                           <td className="px-3 w-[5%] text-center">Action</td>
//                         </tr>

//                         {billDetails.items.map((item, index) => (
//                           <tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}>
//                             <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
//                             <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                             <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
//                             <td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
//                             <td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
//                             <td className="px-3">
//                               <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs inline-block" onClick={(e) => { e.stopPropagation(); handleItem(item); }}>Delete</p>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* 4. GST Info */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//               <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
//               <div className="flex items-center justify-start gap-5 mt-3">
//                 <label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>SGST</label>
//                 <label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>CGST</label>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               {/* Save/Update Button */}
//               <button
//                 onClick={handleSaveOrUpdate}
//                 disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
//                 className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Processing...' : isEditing ? 'Update' : 'Save'}
//               </button>

//               {/* Delete Button (Visible only in Editing mode) */}
//               {isEditing && (
//                 <button
//                   onClick={handleDelete}
//                   disabled={loading}
//                   className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Deleting...' : 'Delete'}
//                 </button>
//               )}

//               {/* <button
//                                 onClick={handleDownloadPDF}
//                                 disabled={loading || !billDetails.quotationNumber}
//                                 className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Download PDF
//                             </button> */}
//             </div>
//           </div>
//         </div>

//         {/* Print Trigger Button (Restored original style, replaced ReactToPrint with manual print) */}
//         <ReactToPrint
//           trigger={() => (
//             <button className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5">
//               Print Receipt
//             </button>
//           )}
//           content={() => printRef.current}
//           pageStyle="@page { size: A4 portrait; margin: 20mm; } body { margin: 20px; }"
//         />

//         {/* --- PDF/Print PREVIEW Area --- */}
//       <div className="w-full bg-white flex items-center justify-center">
//         <div className="w-full xl:w-[60rem]">
//           <div ref={printRef} className="flex flex-col w-[60rem] bg-white text-black">

//             {/* Header Row */}
//             <div className="flex flex-row h-[15rem]">
//               <div className="h-full w-[20rem] border border-black">
//                 <div className="flex items-center justify-center h-[30%]">
//                   <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
//                 </div>
//                 <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                   <p className="font-semibold text-lg">Bill to:</p>
//                   {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                   <p>{billDetails.billTO}</p>
//                   <p>{billDetails.customerAddress}</p>
//                   {invoice && billDetails.associatedQuotationNumber && (
//                     <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
//                   )}
//                 </div>
//               </div>

//               <div className="h-full w-[40rem] border border-black flex flex-col justify-between">
//                 <div className="p-5 flex items-center justify-between">
//                   <div className="w-[70%] text-sm">
//                     <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                     <p className="font-medium">DESIGN BLOCKS</p>
//                     <p className="font-semibold text-lg pt-2">Address:</p>
//                     <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                   </div>
//                   <div className="w-[100px] h-[100px] flex items-center justify-center">
//                     <img
//                       src="https://designblocks.in/img/DB.png"
//                       alt="Design Blocks Logo"
//                       className="w-full h-auto object-contain"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-between h-10 px-5 border-t border-black text-sm">
//                   <p className="font-semibold text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal">{billDetails.quotationNumber}</span></p>
//                   <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
//                 </div>
//               </div>
//             </div>

//             <div className="h-10 w-full border-x border-black"></div>

//             {/* Items Table */}
//             <table className="w-[60rem] text-sm">
//               <thead>
//                 <tr className="h-10 bg-gray-100 font-bold">
//                   <td className="border border-black text-center w-[5%]">Item</td>
//                   <td className="border border-black text-center w-[30rem]">Description</td>
//                   <td className="border border-black text-center w-[10%]">Quantity</td>
//                   <td className="border border-black text-center w-[15%]">Unit Price (Rs.)</td>
//                   <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
//                 </tr>
//               </thead>
//               <tbody className="border border-black">
//                 {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
//                   <tr key={key} className="h-10">
//                     <td className="text-center border border-black">{key + 1}.</td>
//                     <td className="px-2 border border-black">{items.description}</td>
//                     <td className="px-2 border border-black text-center">{items.quantity}</td>
//                     <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
//                     <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
//                   </tr>
//                 )) : (
//                   <tr className="h-20">
//                     <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
//                   </tr>
//                 )}

//                 {/* Totals */}
//                 <tr className="border border-black h-10 bg-yellow-50">
//                   <td colSpan={3}></td>
//                   <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                   <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                 </tr>

//                 {sgst && (
//                   <tr className="h-8 border border-black">
//                     <td colSpan={3}></td>
//                     <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                     <td className="border border-black px-2 text-right font-medium">{SGST}</td>
//                   </tr>
//                 )}
//                 {cgst && (
//                   <tr className="h-8 border border-black">
//                     <td colSpan={3}></td>
//                     <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                     <td className="border border-black px-2 text-right font-medium">{CGST}</td>
//                   </tr>
//                 )}

//                 {(cgst || sgst) && (
//                   <tr className="border border-black h-10 bg-blue-100">
//                     <td colSpan={3}></td>
//                     <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
//                     <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                   </tr>
//                 )}

//                 <tr className="border border-black h-10">
//                   <td colSpan={5} className="px-2">
//                     <span className="font-semibold">In Words: </span>
//                     <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                   </td>
//                 </tr>

//                 {/* Bank Details & Signature */}
//                 <tr>
//                   <td colSpan={5} className="p-2 border-t border-black text-xs">
//                     <div className="flex justify-between">
//                       <div className="w-1/2">
//                         <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                         <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                         <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                         <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                       </div>
//                       <div className="w-1/2 text-right pt-6">
//                         <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                       </div>
//                     </div>
//                     <div className="text-center mt-3 font-semibold">Thank You</div>
//                   </td>
//                 </tr>

//     {quotation && (
//                   <tr>
//                     <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                       <div className="text-sm">
//                         <p className="font-semibold mb-1">Terms and Conditions.</p>
//                         <p>Quotation prices are valid for 20 days from the date of issue.</p>
//                         <p>Any increase in project scope will result in an additional cost.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useRef, useEffect, useCallback } from "react";
// // Removed: import ReactToPrint from "react-to-print";
// import { 
//   User, 
//   Lock, 
//   LogOut, 
//   FileText, 
//   Receipt, 
//   Trash2, 
//   Edit, 
//   AlertTriangle, 
//   CheckCircle, 
//   X, 
//   Loader 
// } from 'lucide-react';

// // --- CONFIGURATION ---
// const BASE_URL = `https://invoice-dbinvoice-backend.onrender.com`;

// // --- Custom Modal Component (Replaces alert() and window.confirm()) ---
// const Modal = ({ state, onClose, onConfirm }) => {
//   if (!state.isVisible) return null;

//   const isConfirm = state.type === 'CONFIRM';

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 font-sans hide-on-print">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
//         {/* Header */}
//         <div className={`flex items-center p-4 ${isConfirm ? 'bg-red-500' : 'bg-indigo-600'} text-white`}>
//           {isConfirm ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
//           <h3 className="ml-3 text-lg font-semibold">
//             {isConfirm ? 'Confirm Action' : 'Notification'}
//           </h3>
//           <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 text-gray-700">
//           <p>{state.message}</p>
//         </div>

//         {/* Footer */}
//         <div className={`p-4 border-t flex ${isConfirm ? 'justify-between' : 'justify-end'}`}>
//           {isConfirm && (
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//           )}
//           <button
//             onClick={() => {
//               if (isConfirm && onConfirm) {
//                 onConfirm();
//               }
//               onClose();
//             }}
//             className={`px-4 py-2 rounded-lg transition font-medium ${isConfirm ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
//           >
//             {isConfirm ? 'Delete' : 'OK'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // --- Admin Panel Component (Integrated into App.jsx) ---
// const AdminPanel = ({ onLogout }) => {
//   // --- View Model: State ---
//   const [activeTab, setActiveTab] = useState('invoices');
//   const [invoices, setInvoices] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [editItem, setEditItem] = useState(null); 
//   const [editValue, setEditValue] = useState('');

//   // Modal State for Alert/Confirm replacements
//   const [modalState, setModalState] = useState({
//     isVisible: false,
//     message: '',
//     type: 'ALERT', // 'ALERT' or 'CONFIRM'
//     onConfirm: null,
//   });

//   // Function to show the custom modal
//   const showModal = useCallback((message, type = 'ALERT', callback = null) => {
//     setModalState({
//       isVisible: true,
//       message,
//       type,
//       onConfirm: callback,
//     });
//   }, []);

//   const closeModal = useCallback(() => {
//     setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
//   }, []);


//   // --- View Model: Data Fetching Logic ---
//   const fetchData = useCallback(async (token) => {
//     setLoading(true);
//     setError('');
//     try {
//       // URL UPDATED
//       const response = await fetch(`${BASE_URL}/api/admin/${activeTab}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch: ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         if (activeTab === 'invoices') {
//           setInvoices(data.invoices);
//         } else {
//           setQuotations(data.quotations);
//         }
//       } else {
//         setError(data.error || 'Unknown error during fetch.');
//       }
//     } catch (err) {
//       console.error('Fetch Error:', err);
//       setError('Failed to fetch data. Please check connection and token.');
//     } finally {
//       setLoading(false);
//     }
//   }, [activeTab]);

//   // Initial Data Fetch Effect
//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       fetchData(token);
//     } else {
//       setError("Unauthorized access. Admin token missing.");
//     }
//   }, [activeTab, fetchData]);


//   // --- View Model: Action Handlers (CRUD) ---

//   const performDelete = async (type, number, token) => {
//     setLoading(true);
//     setError('');

//     try {
//       // URL UPDATED
//       const response = await fetch(
//         `${BASE_URL}/api/admin/${type.toLowerCase()}/${number}`,
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
//         showModal(`${type} #${number} deleted successfully`, 'ALERT');
//         fetchData(token);
//       } else {
//         showModal(data.error || 'Delete failed', 'ALERT');
//       }
//     } catch (err) {
//       showModal('Connection error: Failed to reach API.', 'ALERT');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = (type, number) => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       showModal("Authentication token missing. Cannot perform delete.", 'ALERT');
//       return;
//     }

//     // Open a confirmation modal instead of window.confirm
//     showModal(
//       `Are you sure you want to permanently delete ${type} #${number}? This action cannot be undone.`, 
//       'CONFIRM', 
//       () => performDelete(type, number, token)
//     );
//   };

//   const handleEdit = (item) => {
//     setEditItem(item);
//     // Use invoiceValue for consistency, default to 0 if not present
//     const value = item.invoiceValue !== undefined ? item.invoiceValue : item.quotationValue !== undefined ? item.quotationValue : 0;
//     setEditValue(value);
//   };

//   const saveEdit = async () => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       showModal("Authentication token missing. Cannot save changes.", 'ALERT');
//       return;
//     }

//     const type = activeTab === 'invoices' ? 'invoice' : 'quotation';
//     const number = editItem.invoiceNumber || editItem.quotationNumber;

//     setLoading(true);

//     try {
//       // URL UPDATED
//       const response = await fetch(
//         `${BASE_URL}/api/admin/${type}/${number}`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           // Only sending the value to be updated
//           body: JSON.stringify({ 
//             [`${type}Value`]: parseFloat(editValue) 
//           }) 
//         }
//       );

//       const data = await response.json();
//       if (data.success) {
//         showModal(`${type} #${number} updated successfully!`, 'ALERT');
//         setEditItem(null);
//         fetchData(token);
//       } else {
//         showModal(data.error || 'Update failed', 'ALERT');
//       }
//     } catch (err) {
//       showModal('Connection error: Failed to update value.', 'ALERT');
//     } finally {
//       setLoading(false);
//     }
//   };


//   // --- View Model: Derived State ---
//   const currentData = activeTab === 'invoices' ? invoices : quotations;

//   // Calculate total value based only on invoices (as quotations are estimates)
//   const totalValue = invoices.reduce( 
//     (sum, item) => sum + (item.invoiceValue || 0),
//     0
//   );

//   // --- View ---
//   return (
//     <div className="min-h-screen bg-gray-100 font-sans hide-on-print">
//       <Modal 
//         state={modalState} 
//         onClose={closeModal} 
//         onConfirm={modalState.onConfirm} 
//       />

//       {/* Header */}
//       <header className="bg-indigo-700 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-extrabold tracking-tight">Admin Dashboard</h1>
//           <button
//             onClick={onLogout}
//             className="flex items-center space-x-2 bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-gray-200 transition duration-150 ease-in-out"
//           >
//             <LogOut size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {error && (
//             <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-sm border-l-4 border-red-500 shadow-md flex items-center">
//                <AlertTriangle size={20} className="mr-3 flex-shrink-0" />
//                <p className="font-medium">{error}</p>
//             </div>
//         )}

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition">
//             <p className="text-gray-500 text-sm font-medium uppercase">Total Invoices</p>
//             <p className="text-3xl font-bold text-gray-900 mt-1">{invoices.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition">
//             <p className="text-gray-500 text-sm font-medium uppercase">Total Quotations</p>
//             <p className="text-3xl font-bold text-gray-900 mt-1">{quotations.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition">
//             <p className="text-gray-500 text-sm font-medium uppercase">Total Invoice Value</p>
//             <p className="text-3xl font-bold text-gray-900 mt-1">₹{totalValue.toFixed(2)}</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex bg-white rounded-xl shadow-lg p-1 mb-8">
//           <button
//             onClick={() => setActiveTab('invoices')}
//             className={`flex-1 py-3 rounded-lg text-lg font-semibold transition duration-200 ${
//               activeTab === 'invoices'
//                 ? 'bg-indigo-600 text-white shadow-md'
//                 : 'text-gray-600 hover:bg-gray-50'
//             } flex items-center justify-center space-x-2`}
//           >
//             <Receipt size={20} />
//             <span>Invoices</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('quotations')}
//             className={`flex-1 py-3 rounded-lg text-lg font-semibold transition duration-200 ${
//               activeTab === 'quotations'
//                 ? 'bg-indigo-600 text-white shadow-md'
//                 : 'text-gray-600 hover:bg-gray-50'
//             } flex items-center justify-center space-x-2`}
//           >
//             <FileText size={20} />
//             <span>Quotations</span>
//           </button>
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
//           {loading ? (
//             <div className="text-center py-20">
//               <Loader size={48} className="text-indigo-600 animate-spin mx-auto mb-4" />
//               <p className="text-gray-600 font-medium text-lg">Loading data...</p>
//             </div>
//           ) : currentData.length === 0 ? (
//             <div className="text-center py-20 bg-gray-50 rounded-xl">
//               <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
//                 {activeTab === 'invoices' ? (
//                   <Receipt className="text-indigo-400" size={40} />
//                 ) : (
//                   <FileText className="text-indigo-400" size={40} />
//                 )}
//               </div>
//               <p className="text-gray-600 font-bold text-xl">
//                 No {activeTab} found
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Your {activeTab} records will appear here after creation.
//               </p>
//             </div>
//           ) : (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
//                     Number
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
//                     Bill To
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
//                     Address
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
//                     GSTIN
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider">
//                     Value
//                   </th>
//                   <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {currentData.map((item) => (
//                   <tr
//                     key={item.invoiceNumber || item.quotationNumber}
//                     className="hover:bg-indigo-50 transition duration-150"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-3 py-1 bg-indigo-700 text-white text-sm font-bold rounded-full">
//                         {item.invoiceNumber || item.quotationNumber}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm font-medium text-gray-900">
//                         {item.billTO}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-600 max-w-xs truncate" title={item.customerAddress}>
//                         {item.customerAddress}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm font-mono text-gray-700">
//                         {item.customerGSTIN || 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-right whitespace-nowrap">
//                       {editItem &&
//                       (editItem.invoiceNumber === item.invoiceNumber ||
//                         editItem.quotationNumber === item.quotationNumber) ? (
//                         <input
//                           type="number"
//                           value={editValue}
//                           min="0"
//                           step="0.01"
//                           onChange={(e) => setEditValue(e.target.value)}
//                           className="w-28 border-2 border-indigo-300 rounded-lg px-3 py-1 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
//                           placeholder="New Value"
//                         />
//                       ) : (
//                         <span className="text-sm font-bold text-green-600">
//                           ₹{(item.invoiceValue || item.quotationValue || 0).toFixed(2)}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-center whitespace-nowrap">
//                       <span className="text-xs text-gray-500">
//                         {new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-center whitespace-nowrap">
//                       <div className="flex gap-2 justify-center">
//                         {editItem &&
//                         (editItem.invoiceNumber === item.invoiceNumber ||
//                           editItem.quotationNumber === item.quotationNumber) ? (
//                           <>
//                             <button
//                               onClick={saveEdit}
//                               disabled={loading}
//                               className="bg-green-600 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-700 text-sm font-medium transition disabled:opacity-50"
//                             >
//                               Save
//                             </button>
//                             <button
//                               onClick={() => { setEditItem(null); setEditValue(''); }}
//                               disabled={loading}
//                               className="bg-gray-400 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-500 text-sm font-medium transition disabled:opacity-50"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => handleEdit(item)}
//                               className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 text-sm flex items-center gap-1 font-medium transition"
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
//                               className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 text-sm flex items-center gap-1 font-medium transition"
//                             >
//                               <Trash2 size={14} /> Delete
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };


// // --- Main App Component ---
// function App() {
//   // --- AUTHENTICATION STATE ---
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(""); // 'admin' or 'employee'
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [authLoading, setAuthLoading] = useState(false);

//   // --- MODAL STATE FOR APP COMPONENT ---
//   const [modalState, setModalState] = useState({
//     isVisible: false,
//     message: '',
//     type: 'ALERT',
//     onConfirm: null,
//   });

//   const showModal = useCallback((message, type = 'ALERT', callback = null) => {
//     setModalState({
//       isVisible: true,
//       message,
//       type,
//       onConfirm: callback,
//     });
//   }, []);

//   const closeModal = useCallback(() => {
//     setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
//   }, []);

//   // Custom notification function to replace alert()
//   const showNotification = (message, type) => {
//     showModal(message, 'ALERT');
//   };

//   // --- INITIAL LOAD CHECK ---
//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     const role = localStorage.getItem('userRole');
//     if (token) {
//       setIsAuthenticated(true);
//       setUserRole(role || "employee"); // Default to employee if role is missing
//     }
//   }, []);

//   // --- LOGIN HANDLER ---
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setAuthLoading(true);
//     try {
//       // URL UPDATED from localhost to BASE_URL
//       const response = await fetch(`${BASE_URL}/api/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Save Token and Role
//         localStorage.setItem('adminToken', data.token);
//         localStorage.setItem('userRole', data.role);

//         setIsAuthenticated(true);
//         setUserRole(data.role); 
//       } else {
//         // Replaced alert()
//         showModal(data.error || "Invalid Credentials", 'ALERT'); 
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       // Replaced alert()
//       showModal("Login failed. Check server connection.", 'ALERT'); 
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   // --- LOGOUT HANDLER ---
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('userRole');
//     setIsAuthenticated(false);
//     setUserRole("");
//     setUsername("");
//     setPassword("");
//   };

//   // --- INVOICE GENERATOR STATE & LOGIC ---
//   const date = new Date();

//   const numberToWords = (num) => {
//     if (num === 0) return 'Zero';
//     const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const scales = ['', 'Thousand', 'Million'];

//     const convertChunk = (n) => {
//       if (n === 0) return '';
//       if (n < 10) return units[n];
//       if (n < 20) return teens[n - 10];
//       if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
//       return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertChunk(n % 100) : '');
//     };

//     let words = '';
//     let i = 0;
//     const roundedNum = parseFloat(num.toFixed(2));
//     const [intPart, fracPart] = roundedNum.toString().split('.');
//     let integer = parseInt(intPart);
//     const fractional = fracPart ? parseInt(fracPart) : 0;

//     if (integer > 999999999) return 'Value too large';

//     while (integer > 0) {
//       const chunk = integer % 1000;
//       if (chunk !== 0) {
//         let chunkWords = convertChunk(chunk);
//         words = chunkWords + (scales[i] ? ' ' + scales[i] : '') + ' ' + words;
//       }
//       integer = Math.floor(integer / 1000);
//       i++;
//     }
//     words = words.trim();
//     if (fractional > 0) {
//       // Convert fractional part (e.g., 50 for 0.50)
//       let fractionalWords = convertChunk(fractional);
//       // Ensure only valid words are added, use a different separator for Paisa if integer part is present
//       words += (words ? ' and ' : '') + fractionalWords + ' Paisa';
//     }
//     return words.trim();
//   };

//   const [quotation, setQuotation] = useState(true);
//   const [invoice, setInvoice] = useState(false);
//   const [sgst, setSGST] = useState(false);
//   const [cgst, setCGST] = useState(false);
//   const printRef = useRef(null);
//   const [taxableValue, setTaxableValue] = useState(0);
//   const [invoiceValue, setInvoiceValue] = useState(0);
//   const [SGST, setSGSTValue] = useState(0);
//   const [CGST, setCGSTValue] = useState(0);
//   const [searchNumber, setSearchNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [originalQuotationNumber, setOriginalQuotationNumber] = useState(null);
//   const [isItemEditing, setIsItemEditing] = useState(false);
//   const [editingItemOriginal, setEditingItemOriginal] = useState(null);

//   // User's original implementation of showNotification (using alert), replaced with modal call
//   /* const showNotification = (message, type) => {
//     alert(`${type.toUpperCase()}: ${message}`);
//   }; */

//   const [billDetails, setBillDetails] = useState({
//     billTO: "",
//     customerAddress: "",
//     customerGSTIN: "",
//     quotationNumber: "",
//     associatedQuotationNumber: "",
//     items: [],
//   });

//   const [tableItems, setTableItems] = useState({
//     description: "",
//     quantity: "",
//     unitPrice: "",
//   });

//   const generateUniqueNumber = useCallback(async () => {
//     try {
//       // URL UPDATED
//       const url = quotation
//         ? `${BASE_URL}/api/quotation/generate`
//         : `${BASE_URL}/api/invoice/generate`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.success) {
//         setBillDetails(prev => ({
//           ...prev,
//           quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
//         }));
//       }
//     } catch (error) {
//       console.error("Number generation failed", error);
//     }
//   }, [quotation]);

//   // Reset form when Employee logs in
//   useEffect(() => {
//     if (isAuthenticated && userRole === 'employee') {
//         setBillDetails(prev => ({
//         ...prev,
//         billTO: "",
//         customerAddress: "",
//         customerGSTIN: "",
//         items: [],
//         associatedQuotationNumber: "",
//         }));
//         setSGST(false);
//         setCGST(false);
//         setTaxableValue(0);
//         setInvoiceValue(0);
//         setOriginalQuotationNumber(null);
//         setSearchNumber("");
//         setIsEditing(false); 
//         setIsItemEditing(false); 
//         setEditingItemOriginal(null);

//         generateUniqueNumber();
//     }
//   }, [invoice, quotation, isAuthenticated, userRole, generateUniqueNumber]);

//   useEffect(() => {
//     const newTaxableValue = billDetails.items.reduce((acc, item) => {
//       const quantity = Number(item.quantity) || 0;
//       const unitPrice = Number(item.unitPrice) || 0;
//       return acc + quantity * unitPrice;
//     }, 0);

//     const gstRate = 0.09;
//     const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//     const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;
//     const totalValue = newTaxableValue + currentSGST + currentCGST;

//     setSGSTValue(currentSGST.toFixed(2));
//     setCGSTValue(currentCGST.toFixed(2));
//     setTaxableValue(newTaxableValue);
//     setInvoiceValue(totalValue);
//   }, [billDetails.items, cgst, sgst]);

//   const handleAddItem = (e) => {
//     e.preventDefault();
//     setIsItemEditing(false);
//     setEditingItemOriginal(null);
//     setBillDetails({
//       ...billDetails,
//       items: [...billDetails.items, { ...tableItems, quantity: Number(tableItems.quantity), unitPrice: Number(tableItems.unitPrice), id: Date.now() }], 
//     });
//     setTableItems({ description: "", quantity: "", unitPrice: "" });
//   };

//   const handleEditItem = (item) => {
//     setTableItems({
//       description: item.description,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice
//     });
//     setIsItemEditing(true);
//     setEditingItemOriginal(item);
//   };

//   const handleUpdateItem = (e) => {
//     e.preventDefault();
//     if (!editingItemOriginal) return;
//     const index = billDetails.items.findIndex(item => item === editingItemOriginal);
//     if (index > -1) {
//       const updatedItems = [...billDetails.items];
//       updatedItems[index] = {
//         ...updatedItems[index], 
//         description: tableItems.description,
//         quantity: Number(tableItems.quantity),
//         unitPrice: Number(tableItems.unitPrice)
//       };
//       setBillDetails({ ...billDetails, items: updatedItems });
//     }
//     setTableItems({ description: "", quantity: "", unitPrice: "" });
//     setIsItemEditing(false);
//     setEditingItemOriginal(null);
//   };

//   const handleItem = (item) => {
//     let removedArray = billDetails.items.filter(e => e !== item);
//     setBillDetails({ ...billDetails, items: removedArray });
//   };

//   // --- API OPERATIONS (Protected with Token) ---

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const documentNumber = billDetails.quotationNumber;
//       const urlPath = invoice ? "invoice/update" : "quotation/update";
//       // URL UPDATED
//       const url = `${BASE_URL}/api/${urlPath}`;
//       const token = localStorage.getItem('adminToken'); // Get Token

//       const body = {
//         [invoice ? "invoiceNumber" : "quotationNumber"]: documentNumber,
//         billTO: billDetails.billTO,
//         customerAddress: billDetails.customerAddress,
//         customerGSTIN: billDetails.customerGSTIN,
//         items: billDetails.items,
//         sgst: sgst,
//         cgst: cgst,
//         taxableValue: taxableValue,
//         SGSTAmount: SGST,
//         CGSTAmount: CGST,
//         invoiceValue: invoiceValue,
//         originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//       };

//       const res = await fetch(url, {
//         method: "PUT", 
//         headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` // Send Token
//         },
//         body: JSON.stringify(body)
//       });

//       const data = await res.json();

//       if (data.success) {
//         showNotification(`${invoice ? "Invoice" : "Quotation"} #${documentNumber} updated successfully!`, 'success');
//       } else {
//         showNotification(`Update Error: ${data.message || data.error}`, 'error');
//       }
//     } catch (err) {
//       console.error(err);
//       showNotification("Unexpected error during update.", 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveOrUpdate = () => {
//     if (isEditing) handleUpdate();
//     else handleSave();
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('adminToken'); // Get Token

//       const body = {
//         billTO: billDetails.billTO,
//         customerAddress: billDetails.customerAddress,
//         customerGSTIN: billDetails.customerGSTIN,
//         items: billDetails.items,
//         sgst: sgst,
//         cgst: cgst,
//         taxableValue: taxableValue,
//         SGSTAmount: SGST,
//         CGSTAmount: CGST,
//         invoiceValue: invoiceValue,
//         invoiceNumber: billDetails.quotationNumber,
//         originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//       };

//       const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
//       delete finalBody.invoiceNumber;

//       // URL UPDATED
//       const url = quotation
//         ? `${BASE_URL}/api/quotation/save`
//         : `${BASE_URL}/api/invoice/save`;

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` // Send Token
//         },
//         body: JSON.stringify(finalBody)
//       });

//       const data = await res.json();

//       if (data.success) {
//         const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//         showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
//         setIsEditing(true);
//         setBillDetails(prev => ({
//           ...prev,
//           quotationNumber: savedNumber,
//         }));
//       } else {
//         showNotification(`Save Error: ${data.error}`, 'error');
//       }
//     } catch (err) {
//       console.error(err);
//       showNotification("Unexpected error during save.", 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const performActualDelete = async () => {
//     const docType = invoice ? "Invoice" : "Quotation";
//     const documentNumber = billDetails.quotationNumber;
//     const token = localStorage.getItem('adminToken'); // Get Token

//     try {
//       setLoading(true);
//       const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
//       // URL UPDATED
//       const url = `${BASE_URL}/api/${urlPath}`;

//       const response = await fetch(url, { 
//           method: "DELETE",
//           headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` // Send Token
//           },
//       });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
//         setBillDetails(prev => ({
//           ...prev,
//           billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
//         }));
//         setSGST(false);
//         setCGST(false);
//         setIsEditing(false);
//         generateUniqueNumber(); 
//       } else {
//         showNotification(`Delete Error: ${data.message || data.error}`, 'error');
//       }
//     } catch (err) {
//       console.error('Error deleting data:', err);
//       showNotification('Error deleting data. Check server connection.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = () => {
//     const docType = invoice ? "Invoice" : "Quotation";
//     const documentNumber = billDetails.quotationNumber;

//     if (!documentNumber || !isEditing) {
//       showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
//       return;
//     }

//     // Replaced window.confirm with custom modal
//     showModal(
//       `Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`,
//       'CONFIRM',
//       performActualDelete
//     );
//   };

//   const handleSearch = async (docNumber) => {
//     if (typeof docNumber === 'object' || !docNumber) docNumber = searchNumber;
//     if (!docNumber) {
//       showNotification("Please enter a document number to search.", 'info');
//       return;
//     }

//     try {
//       setLoading(true);
//       setIsEditing(false); 

//       // Try searching for quotation first
//       // URL UPDATED
//       const quoteUrl = `${BASE_URL}/api/quotation/fetch/${docNumber}`;
//       let response = await fetch(quoteUrl);
//       let result = await response.json();

//       if (response.ok && result.quotation) {
//         const quote = result.quotation;
//         setBillDetails(prev => ({
//           ...prev,
//           billTO: quote.billTO || "",
//           customerAddress: quote.customerAddress || "",
//           customerGSTIN: quote.customerGSTIN || "",
//           items: quote.items || [],
//           associatedQuotationNumber: docNumber, 
//         }));
//         setSGST(quote.sgst || false);
//         setCGST(quote.cgst || false);
//         setOriginalQuotationNumber(quote.quotationNumber);

//         if (invoice) {
//           setIsEditing(false);
//           setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber })); 
//           showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//         } else {
//           setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//           setIsEditing(true); 
//           showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//         }
//         return; 
//       }

//       // If quotation not found, or if we are in invoice mode, try searching for invoice
//       if (invoice || !quotation) {
//         // URL UPDATED
//         const invoiceUrl = `${BASE_URL}/api/invoice/fetch/${docNumber}`;
//         response = await fetch(invoiceUrl);
//         result = await response.json();

//         if (response.ok && result.invoice) {
//           const inv = result.invoice;
//           setBillDetails(prev => ({
//             ...prev,
//             billTO: inv.billTO || "",
//             customerAddress: inv.customerAddress || "",
//             customerGSTIN: inv.customerGSTIN || "",
//             quotationNumber: inv.invoiceNumber,
//             items: inv.items || [],
//             associatedQuotationNumber: inv.originalQuotationNumber || '', 
//           }));
//           setSGST(inv.sgst || false);
//           setCGST(inv.cgst || false);
//           setOriginalQuotationNumber(inv.originalQuotationNumber || null);

//           setIsEditing(true); 
//           showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
//           return; 
//         }
//       }

//       setIsEditing(false);
//       setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
//       generateUniqueNumber();
//       showNotification(`Document #${docNumber} not found.`, 'error');

//     } catch (error) {
//       console.error('Error fetching data:', error);
//       showNotification('Error fetching data. Check server connection.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   //            MAIN RENDERING LOGIC
//   // ============================================

//   // 1. Not Authenticated -> Show Login Page
//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
//         {/* Modal component added */}
//         <Modal 
//           state={modalState} 
//           onClose={closeModal} 
//           onConfirm={modalState.onConfirm} 
//         />
//         <script src="https://cdn.tailwindcss.com"></script>
//         <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
//           <div className="text-center mb-8">
//              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                <Lock className="text-blue-600" size={32} />
//              </div>
//              <h2 className="text-2xl font-bold text-gray-800">Design Blocks Login</h2>
//              <p className="text-gray-500 text-sm mt-2">Sign in to continue</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="text-gray-400" size={18} />
//                 </div>
//                 <input 
//                   type="text" 
//                   required
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter username"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="text-gray-400" size={18} />
//                 </div>
//                 <input 
//                   type="password" 
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter password"
//                 />
//               </div>
//             </div>

//             <button 
//               type="submit" 
//               disabled={authLoading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {authLoading ? (
//                  <Loader size={20} className="animate-spin mr-2" />
//               ) : "Sign In"}
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // 2. Authenticated as ADMIN -> Show Admin Panel
//   if (userRole === "admin") {
//     return <AdminPanel onLogout={handleLogout} />;
//   }

//   // 3. Authenticated as EMPLOYEE -> Show Invoice Generator
//   // (Visible ONLY to employees)
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
//       <Modal 
//         state={modalState} 
//         onClose={closeModal} 
//         onConfirm={modalState.onConfirm} 
//       />

//       {/* Print-specific styles to hide UI elements when printing */}
//       <style>
//         {`
//           @media print {
//             .hide-on-print {
//               display: none !important;
//             }
//             .printable-content {
//               width: 100% !important; 
//               margin: 0 !important;
//               box-shadow: none !important;
//               border: none !important;
//               font-size: 10pt; /* Smaller font for print density */
//             }
//             .w-\\[60rem\\] {
//                 width: 100% !important;
//             }
//           }
//         `}
//       </style>

//       <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 w-full relative">

//         {/* Logout Button (Employee View) - hide-on-print */}
//         <div className="absolute top-5 right-5 hide-on-print">
//            <button 
//              onClick={handleLogout}
//              className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors shadow-md"
//            >
//              <LogOut size={18} />
//              Logout
//            </button>
//         </div>

//         {/* --- INVOICE GENERATOR UI - hide-on-print --- */}
//         <div className="w-full flex items-center justify-center hide-on-print">
//           <div className="font-sans w-full lg:w-[50rem]">
//             <div className="pb-5 text-3xl">
//               <p className="font-bold text-blue-500">
//                 Design <span className="text-green-400">Blocks</span>
//               </p>
//             </div>

//             {/* Search */}
//             <div className="border-2 border-purple-400 rounded-lg p-5 bg-purple-50 mb-5">
//               <p className="pb-3 text-xl font-semibold uppercase text-purple-600">Search Invoice/Quotation</p>
//               <div className="flex flex-col sm:flex-row items-stretch gap-3">
//                 <input type="text" placeholder="Enter Invoice/Quotation Number" className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} />
//                 <button 
//                   onClick={() => handleSearch(searchNumber)} 
//                   disabled={loading} 
//                   className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                 >
//                   {loading ? 'Searching...' : 'Search'}
//                 </button>
//               </div>
//             </div>

//             {/* Mode Switch */}
//             <div className="flex items-center justify-start gap-5 mb-5">
//               <div 
//                 className={`cursor-pointer px-4 py-1 ${quotation ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} 
//                 onClick={() => { setQuotation(true); setInvoice(false); }}
//               >
//                 Quotation
//               </div>
//               <div 
//                 className={`cursor-pointer px-4 py-1 ${invoice ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} 
//                 onClick={() => { setQuotation(false); setInvoice(true); }}
//               >
//                 Invoice
//               </div>
//             </div>

//             {/* Document Details */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//               <p className="pb-3 text-xl font-semibold uppercase text-blue-600">1. {invoice ? "Invoice" : "Quotation"} Details</p>
//               <div className="flex items-center justify-start flex-wrap gap-3">
//                 <h1>{invoice ? "Invoice" : "Quotation"} Number</h1>
//                 <input type="text" value={billDetails.quotationNumber} placeholder={`Auto-generated`} className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100" readOnly />
//                 {invoice && (
//                   <div className="flex items-center gap-3 mt-3">
//                     <h1>Quotation Number</h1>
//                     <div className="flex items-center border border-blue-500 rounded shadow-md">
//                       <input type="text" value={billDetails.associatedQuotationNumber} placeholder={`Enter Q-Number to load`} className="outline-none rounded-l px-2 py-1 flex-1" onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })} />
//                       <button 
//                         onClick={() => handleSearch(billDetails.associatedQuotationNumber)} 
//                         disabled={loading} 
//                         className="bg-blue-500 text-white px-3 py-1 rounded-r h-full hover:bg-blue-600 disabled:opacity-50"
//                       >
//                         Load
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Recipient Details */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//               <p className="pb-3 text-xl font-semibold uppercase text-blue-600">2. Recipient Details</p>
//               <div className="flex items-start justify-start flex-wrap gap-3">
//                 <div className="flex items-start justify-center flex-col gap-2"><h1>Bill TO</h1><input type="text" placeholder="Enter Biller Details" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.billTO} onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })} /></div>
//                 <div className="flex items-start justify-center flex-col gap-2"><h1>Address</h1><input type="text" placeholder="Enter Biller Address" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.customerAddress} onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })} /></div>
//                 <div className="flex items-start justify-center flex-col gap-2"><h1>Customer GSTIN</h1><input type="text" placeholder="Enter Customer GSTIN" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.customerGSTIN} onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })} /></div>
//               </div>
//             </div>

//             {/* Items */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//               <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
//                 <div className="flex flex-row items-center justify-between w-full pb-3"><p className="text-xl font-semibold uppercase text-blue-600">3. Items</p><div className="flex gap-3">{isItemEditing && (<button type="button" onClick={() => { setIsItemEditing(false); setEditingItemOriginal(null); setTableItems({ description: "", quantity: "", unitPrice: "" }); }} className="bg-yellow-500 px-3 py-2 rounded-md text-white shadow-md hover:bg-yellow-600">Cancel Edit</button>)}<button type="submit" className={`px-3 py-2 rounded-md text-green-950 shadow-md ${isItemEditing ? 'bg-orange-400 hover:bg-orange-500' : 'bg-green-400 hover:bg-green-500'}`}>{isItemEditing ? 'Update Item' : 'Add'}</button></div></div>
//                 <div className="flex items-center justify-start flex-wrap gap-3">
//                   <div className="flex items-start justify-center flex-col gap-2"><h1>Description</h1><input type="text" required value={tableItems.description} placeholder="Enter Description" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })} /></div>
//                   <div className="flex items-start justify-center flex-col gap-2"><h1>Quantity</h1><input type="number" required value={tableItems.quantity} placeholder="Enter Quantity" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })} /></div>
//                   <div className="flex items-start justify-center flex-col gap-2"><h1>Unit Price</h1><input type="number" required value={tableItems.unitPrice} placeholder="Single Product Price" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })} /></div>
//                 </div>
//               </form>
//               {billDetails.items.length > 0 && (
//                 <div className="overflow-x-scroll w-full py-5"><div className="w-full min-w-[50rem]"><table className="w-full"><tbody className="w-full"><tr className="bg-gray-200 font-bold"><td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td><td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td><td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td><td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td><td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td><td className="px-3 w-[5%] text-center">Action</td></tr>{billDetails.items.map((item, index) => (<tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}><td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td><td className="border border-blue-500 px-3 py-2">{item.description}</td><td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td><td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td><td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td><td className="px-3"><p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs inline-block" onClick={(e) => { e.stopPropagation(); handleItem(item); }}>Delete</p></td></tr>))}</tbody></table></div></div>
//               )}
//             </div>

//             {/* GST & Buttons */}
//             <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50"><p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p><div className="flex items-center justify-start gap-5 mt-3"><label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>SGST</label><label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>CGST</label></div></div>
//             <div className="flex gap-3">
//               <button 
//                 onClick={handleSaveOrUpdate} 
//                 disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress} 
//                 className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Processing...' : isEditing ? 'Update' : 'Save'}
//               </button>
//               {isEditing && (
//                 <button 
//                   onClick={handleDelete} 
//                   disabled={loading} 
//                   className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Deleting...' : 'Delete'}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Print Button */}
//         {/* Replaced ReactToPrint with standard window.print() and a standard button */}
//         <button 
//           onClick={() => window.print()}
//           className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 hide-on-print"
//         >
//           Print Receipt
//         </button>

//         {/* Hidden Print Area */}
//         <div className="w-full bg-white flex items-center justify-center">
//         <div className="w-full xl:w-[60rem]">
//           <div ref={printRef} className="flex flex-col w-[60rem] bg-white text-black printable-content">

//             {/* Header Row */}
//             <div className="flex flex-row h-[15rem]">
//               <div className="h-full w-[20rem] border border-black">
//                 <div className="flex items-center justify-center h-[30%]">
//                   <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
//                 </div>
//                 <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                   <p className="font-semibold text-lg">Bill to:</p>
//                   {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                   <p>{billDetails.billTO}</p>
//                   <p>{billDetails.customerAddress}</p>
//                   {invoice && billDetails.associatedQuotationNumber && (
//                     <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
//                   )}
//                 </div>
//               </div>

//               <div className="h-full w-[40rem] border border-black flex flex-col justify-between">
//                 <div className="p-5 flex items-center justify-between">
//                   <div className="w-[70%] text-sm">
//                     <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                     <p className="font-medium">DESIGN BLOCKS</p>
//                     <p className="font-semibold text-lg pt-2">Address:</p>
//                     <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                   </div>
//                   <div className="w-[100px] h-[100px] flex items-center justify-center">
//                     <img
//                       src="https://designblocks.in/img/DB.png"
//                       alt="Design Blocks Logo"
//                       className="w-full h-auto object-contain"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-between h-10 px-5 border-t border-black text-sm">
//                   <p className="font-semibold text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal">{billDetails.quotationNumber}</span></p>
//                   <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
//                 </div>
//               </div>
//             </div>

//             <div className="h-10 w-full border-x border-black"></div>

//             {/* Items Table */}
//             <table className="w-[60rem] text-sm">
//               <thead>
//                 <tr className="h-10 bg-gray-100 font-bold">
//                   <td className="border border-black text-center w-[5%]">Item</td>
//                   <td className="border border-black text-center w-[30rem]">Description</td>
//                   <td className="border border-black text-center w-[10%]">Quantity</td>
//                   <td className="border border-black text-center w-[15%]">Unit Price (Rs.)</td>
//                   <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
//                 </tr>
//               </thead>
//               <tbody className="border border-black">
//                 {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
//                   <tr key={key} className="h-10">
//                     <td className="text-center border border-black">{key + 1}.</td>
//                     <td className="px-2 border border-black">{items.description}</td>
//                     <td className="px-2 border border-black text-center">{items.quantity}</td>
//                     <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
//                     <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
//                   </tr>
//                 )) : (
//                   <tr className="h-20">
//                     <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
//                   </tr>
//                 )}

//                 {/* Totals */}
//                 <tr className="border border-black h-10 bg-yellow-50">
//                   <td colSpan={3}></td>
//                   <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                   <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                 </tr>

//                 {sgst && (
//                   <tr className="h-8 border border-black">
//                     <td colSpan={3}></td>
//                     <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                     <td className="border border-black px-2 text-right font-medium">{SGST}</td>
//                   </tr>
//                 )}
//                 {cgst && (
//                   <tr className="h-8 border border-black">
//                     <td colSpan={3}></td>
//                     <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                     <td className="border border-black px-2 text-right font-medium">{CGST}</td>
//                   </tr>
//                 )}

//                 {(cgst || sgst) && (
//                   <tr className="border border-black h-10 bg-blue-100">
//                     <td colSpan={3}></td>
//                     <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
//                     <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                   </tr>
//                 )}

//                 <tr className="border border-black h-10">
//                   <td colSpan={5} className="px-2">
//                     <span className="font-semibold">In Words: </span>
//                     <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                   </td>
//                 </tr>

//                 {/* Bank Details & Signature */}
//                 <tr>
//                   <td colSpan={5} className="p-2 border-t border-black text-xs">
//                     <div className="flex justify-between">
//                       <div className="w-1/2">
//                         <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                         <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                         <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                         <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                       </div>
//                       <div className="w-1/2 text-right pt-6">
//                         <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                         <p className="mt-6 text-gray-500">(Authorized Signatory)</p>
//                       </div>
//                     </div>
//                     <div className="text-center mt-3 font-semibold">Thank You</div>
//                   </td>
//                 </tr>

//                 {quotation && (
//                   <tr>
//                     <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                       <div className="text-sm">
//                         <p className="font-semibold mb-1">Terms and Conditions.</p>
//                         <p>Quotation prices are valid for 20 days from the date of issue.</p>
//                         <p>Any increase in project scope will result in an additional cost.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default App;




// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { 
//     User, 
//     Lock, 
//     LogOut, 
//     FileText, 
//     Receipt, 
//     Trash2, 
//     Edit, 
//     AlertTriangle, 
//     CheckCircle, 
//     X, 
//     Loader,
//     PlusSquare,
//     Home,
//     ClipboardList
// } from 'lucide-react';
// import AdminPanel from "./AdminPanel"; // Assuming AdminPanel.jsx exists
// import ReactToPrint from "react-to-print"; 

// // --- CONFIGURATION ---
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


// // --- Custom Modal Component (Replaces alert() and window.confirm()) ---
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
//                         {isConfirm ? 'Confirm' : 'OK'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // --- Main App Component ---
// function App() {
//     // --- AUTHENTICATION STATE ---
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [userRole, setUserRole] = useState(""); 
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [authLoading, setAuthLoading] = useState(false);

//     // --- MODAL STATE ---
//     const [modalState, setModalState] = useState({
//         isVisible: false,
//         message: '',
//         type: 'ALERT',
//         onConfirm: null,
//     });

//     const showModal = useCallback((message, type = 'ALERT', callback = null) => {
//         setModalState({
//             isVisible: true,
//             message,
//             type,
//             onConfirm: callback,
//         });
//     }, []);

//     const closeModal = useCallback(() => {
//         setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
//     }, []);

//     const showNotification = (message, type) => {
//         showModal(message, 'ALERT');
//     };

//     // --- Invoice Generator State (Employee View) ---
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
//     const [loading, setLoading] = useState(false);
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
//         documentDate: new Date().toISOString().split('T')[0],
//     });

//     const [tableItems, setTableItems] = useState({
//         description: "",
//         quantity: "",
//         unitPrice: "",
//     });
//     // --- END Invoice Generator State ---

//     // --- Invoice Generator Handlers ---

//  const generateUniqueNumber = useCallback(async () => {
//     const token = localStorage.getItem('adminToken');   // 🔑 get token
//     if (!token) {
//         console.error("No token found. Cannot generate number.");
//         return;
//     }

//     try {
//         const url = quotation
//             ? `${BASE_URL}/api/quotation/generate`
//             : `${BASE_URL}/api/invoice/generate`;

//         const response = await fetch(url, {
//             headers: {
//                 "Authorization": `Bearer ${token}`,      // ✅ attach token
//                 "Content-Type": "application/json"
//             }
//         });

//         const data = await response.json();

//         if (data.success) {
//             setBillDetails(prev => ({
//                 ...prev,
//                 quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
//             }));
//         } else {
//             console.error("Number generation failed:", data.error || data.message);
//         }
//     } catch (error) {
//         console.error("Number generation failed", error);
//     }
// }, [quotation]);


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

//     const handleUpdate = async () => {
//         const token = localStorage.getItem('adminToken'); 
//         if (!token) { showNotification("Authentication token missing. Cannot update.", 'error'); return; }

//         try {
//             setLoading(true);
//             const documentNumber = billDetails.quotationNumber;
//             const urlPath = invoice ? "invoice/update" : "quotation/update";
//             const url = `${BASE_URL}/api/${urlPath}`;

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

//     const handleSaveOrUpdate = () => {
//         if (isEditing) handleUpdate();
//         else handleSave();
//     };

//     const handleSave = async () => {
//         const token = localStorage.getItem('adminToken');
//         if (!token) { showNotification("Authentication token missing. Cannot save.", 'error'); return; }

//         try {
//             setLoading(true);

//              const body = {
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst,
//                 cgst,
//                 taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 invoiceValue, // ✅ always send invoiceValue
//                 invoiceNumber: billDetails.quotationNumber,
//                 originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//                 documentDate: billDetails.documentDate, // ✅ send date
//             };

//             const finalBody = quotation ? { ...body, quotationNumber: body.invoiceNumber } : body;
//             delete finalBody.invoiceNumber;

//             const url = quotation
//                 ? `${BASE_URL}/api/quotation/save`
//                 : `${BASE_URL}/api/invoice/save`;

//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: { 
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` 
//                 },
//                 body: JSON.stringify(finalBody)
//             });

//             const data = await res.json();

//             if (data.success) {
//                 const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//                 showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
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

//     const performActualDelete = async () => {
//         const docType = invoice ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;
//         const token = localStorage.getItem('adminToken'); 

//         try {
//             setLoading(true);
//             const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
//             const url = `${BASE_URL}/api/${urlPath}`;

//             const response = await fetch(url, { 
//                 method: "DELETE",
//                 headers: { 
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` 
//                 },
//             });
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

//     const handleDelete = () => {
//         const docType = invoice ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;

//         if (!documentNumber || !isEditing) {
//             showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
//             return;
//         }

//         showModal(
//             `Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`,
//             'CONFIRM',
//             performActualDelete
//         );
//     };

// const handleSearch = async (docNumber) => {
//     if (typeof docNumber === 'object' || !docNumber) docNumber = searchNumber;
//     if (!docNumber) {
//         showNotification("Please enter a document number to search.", 'info');
//         return;
//     }

//     try {
//         setLoading(true);
//         setIsEditing(false); 

//         const token = localStorage.getItem('adminToken');   // ✅ get token
//         if (!token) {
//             showNotification("Authentication token missing. Cannot search.", 'error');
//             return;
//         }

//         // --- Try searching for quotation first ---
//         const quoteUrl = `${BASE_URL}/api/quotation/fetch/${docNumber}`;
//         let response = await fetch(quoteUrl, {
//             headers: { "Authorization": `Bearer ${token}` }   // ✅ attach token
//         });
//         let result = await response.json();

//         if (response.ok && result.quotation) {
//             const quote = result.quotation;
//             setBillDetails(prev => ({
//                 ...prev,
//                 billTO: quote.billTO || "",
//                 customerAddress: quote.customerAddress || "",
//                 customerGSTIN: quote.customerGSTIN || "",
//                 items: quote.items || [],
//                 associatedQuotationNumber: docNumber, 
//             }));
//             setSGST(quote.sgst || false);
//             setCGST(quote.cgst || false);
//             setOriginalQuotationNumber(quote.quotationNumber);

//             if (invoice) {
//                 setIsEditing(false);
//                 setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber })); 
//                 showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//             } else {
//                 setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//                 setIsEditing(true); 
//                 showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//             }
//             return; 
//         }

//         // --- If quotation not found, or if we are in invoice mode, try searching for invoice ---
//         if (invoice || !quotation) {
//             const invoiceUrl = `${BASE_URL}/api/invoice/fetch/${docNumber}`;
//             response = await fetch(invoiceUrl, {
//                 headers: { "Authorization": `Bearer ${token}` }   // ✅ attach token
//             });
//             result = await response.json();

//             if (response.ok && result.invoice) {
//                 const inv = result.invoice;
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: inv.billTO || "",
//                     customerAddress: inv.customerAddress || "",
//                     customerGSTIN: inv.customerGSTIN || "",
//                     quotationNumber: inv.invoiceNumber,
//                     items: inv.items || [],
//                     associatedQuotationNumber: inv.originalQuotationNumber || '', 
//                 }));
//                 setSGST(inv.sgst || false);
//                 setCGST(inv.cgst || false);
//                 setOriginalQuotationNumber(inv.originalQuotationNumber || null);

//                 setIsEditing(true); 
//                 showNotification(`Invoice #${docNumber} details loaded for editing.`, 'success');
//                 return; 
//             }
//         }

//         setIsEditing(false);
//         setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "" }));
//         generateUniqueNumber();
//         showNotification(`Document #${docNumber} not found.`, 'error');

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         showNotification('Error fetching data. Check server connection.', 'error');
//     } finally {
//         setLoading(false);
//     }
// };


//     // --- END Invoice Generator Handlers ---
//     // --- Authentication Handlers ---

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setAuthLoading(true);
//         try {
//             const response = await fetch(`${BASE_URL}/api/admin/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password })
//             });

//             const data = await response.json();

//             if (data.success) {
//                 localStorage.setItem('adminToken', data.token);
//                 localStorage.setItem('userRole', data.role);

//                 setIsAuthenticated(true);
//                 setUserRole(data.role); 
//             } else {
//                 showModal(data.error || "Invalid Credentials", 'ALERT'); 
//             }
//         } catch (error) {
//             console.error("Login Error:", error);
//             showModal("Login failed. Check server connection.", 'ALERT'); 
//         } finally {
//             setAuthLoading(false);
//         }
//     };

//     const handleLogout = useCallback(() => {
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('userRole');
//         setIsAuthenticated(false);
//         setUserRole("");
//         setUsername("");
//         setPassword("");
//     }, []);
//     // --- END Authentication Handlers ---

//     // --- Effects for Employee Logic ---

//     // 1. Initial Load Check
//     useEffect(() => {
//         const token = localStorage.getItem('adminToken');
//         const role = localStorage.getItem('userRole');
//         if (token) {
//             setIsAuthenticated(true);
//             setUserRole(role || "employee"); 
//         }
//     }, []);

//     // 2. Invoice Generator Calculations
//     useEffect(() => {
//         if (isAuthenticated && userRole === 'employee') {
//             const newTaxableValue = billDetails.items.reduce((acc, item) => {
//                 const quantity = Number(item.quantity) || 0;
//                 const unitPrice = Number(item.unitPrice) || 0;
//                 return acc + quantity * unitPrice;
//             }, 0);

//             const gstRate = 0.09;
//             const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//             const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;
//             const totalValue = newTaxableValue + currentSGST + currentCGST;

//             setSGSTValue(currentSGST.toFixed(2));
//             setCGSTValue(currentCGST.toFixed(2));
//             setTaxableValue(newTaxableValue);
//             setInvoiceValue(totalValue);
//         }
//     }, [billDetails.items, cgst, sgst, isAuthenticated, userRole]);


//     // 3. Reset form on mode change
//     useEffect(() => {
//          if (isAuthenticated && userRole === 'employee') {
//             setBillDetails(prev => ({
//                 ...prev,
//                 billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
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
//     }, [invoice, quotation, isAuthenticated, userRole, generateUniqueNumber]);

//     // --- RENDER LOGIC ---

//     // 1. Not Authenticated -> Show Login Page
//     if (!isAuthenticated) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
//                 <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
//                 <script src="https://cdn.tailwindcss.com"></script>
//                 <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
//                     <div className="text-center mb-8">
//                         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <Lock className="text-blue-600" size={32} />
//                         </div>
//                         <h2 className="text-2xl font-bold text-gray-800">Design Blocks Login</h2>
//                         <p className="text-gray-500 text-sm mt-2">Sign in to continue</p>
//                     </div>

//                     <form onSubmit={handleLogin} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <User className="text-gray-400" size={18} />
//                                 </div>
//                                 <input 
//                                     type="text" 
//                                     required
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     placeholder="Enter username"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="text-gray-400" size={18} />
//                                 </div>
//                                 <input 
//                                     type="password" 
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     placeholder="Enter password"
//                                 />
//                             </div>
//                         </div>

//                         <button 
//                             type="submit" 
//                             disabled={authLoading}
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                         >
//                             {authLoading ? (
//                                 <Loader size={20} className="animate-spin mr-2" />
//                             ) : "Sign In"}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         );
//     }

//     // 2. Authenticated as ADMIN -> Show Admin Panel (Delegated to AdminPanel.jsx)
//     if (userRole === "admin") {
//         return (
//             <div className="min-h-screen w-full">
//                  <script src="https://cdn.tailwindcss.com"></script>
//                  <AdminPanel onLogout={handleLogout} />
//             </div>
//         );
//     }

//     // 3. Authenticated as EMPLOYEE -> Show Invoice Generator UI (Restored Logic)
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
//             <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
//             <script src="https://cdn.tailwindcss.com"></script>

//             {/* Print-specific styles to hide UI elements when printing */}
//             <style>
//                 {`
//                     @media print {
//                         .hide-on-print {
//                             display: none !important;
//                         }
//                         .printable-content {
//                             width: 100% !important; 
//                             margin: 0 !important;
//                             box-shadow: none !important;
//                             border: none !important;
//                             font-size: 10pt; /* Smaller font for print density */
//                         }
//                         .w-\\[60rem\\] {
//                             width: 100% !important;
//                         }
//                     }
//                 `}
//             </style>

//             <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 w-full relative">

//                 {/* Logout Button (Employee View) - hide-on-print */}
//                 <div className="absolute top-5 right-5 hide-on-print">
//                     <button 
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors shadow-md"
//                     >
//                         <LogOut size={18} />
//                         Logout
//                     </button>
//                 </div>

//                 {/* --- INVOICE GENERATOR UI - hide-on-print --- */}
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
//                             <p className="pb-3 text-xl font-semibold uppercase text-purple-600">Search Invoice/Quotation</p>
//                             <div className="flex flex-col sm:flex-row items-stretch gap-3">
//                                 <input type="text" placeholder="Enter Invoice/Quotation Number" className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} />
//                                 <button 
//                                     onClick={() => handleSearch(searchNumber)} 
//                                     disabled={loading} 
//                                     className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                                 >
//                                     {loading ? 'Searching...' : 'Search'}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Mode Switch */}
//                         <div className="flex items-center justify-start gap-5 mb-5">
//                             <div 
//                                 className={`cursor-pointer px-4 py-1 ${quotation ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} 
//                                 onClick={() => { setQuotation(true); setInvoice(false); }}
//                             >
//                                 Quotation
//                             </div>
//                             <div 
//                                 className={`cursor-pointer px-4 py-1 ${invoice ? "bg-green-400" : "bg-transparent"} border-2 border-green-400 rounded`} 
//                                 onClick={() => { setQuotation(false); setInvoice(true); }}
//                             >
//                                 Invoice
//                             </div>
//                         </div>

//                         {/* Document Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">1. {invoice ? "Invoice" : "Quotation"} Details</p>
//                             <div className="flex items-center justify-start flex-wrap gap-3">
//                                 <h1>{invoice ? "Invoice" : "Quotation"} Number</h1>
//                                 <input type="text" value={billDetails.quotationNumber} placeholder={`Auto-generated`} className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100" readOnly />
//                                 {invoice && (
//                                     <div className="flex items-center gap-3 mt-3">
//                                         <h1>Quotation Number</h1>
//                                         <div className="flex items-center border border-blue-500 rounded shadow-md">
//                                             <input type="text" value={billDetails.associatedQuotationNumber} placeholder={`Enter Q-Number to load`} className="outline-none rounded-l px-2 py-1 flex-1" onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })} />
//                                             <button 
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

//                         {/* Recipient Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">2. Recipient Details</p>
//                             <div className="flex items-start justify-start flex-wrap gap-3">
//                                 <div className="flex items-start justify-center flex-col gap-2"><h1>Bill TO</h1><input type="text" placeholder="Enter Biller Details" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.billTO} onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })} /></div>
//                                 <div className="flex items-start justify-center flex-col gap-2"><h1>Address</h1><input type="text" placeholder="Enter Biller Address" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.customerAddress} onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })} /></div>
//                                 <div className="flex items-start justify-center flex-col gap-2"><h1>Customer GSTIN</h1><input type="text" placeholder="Enter Customer GSTIN" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.customerGSTIN} onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })} /></div>
//                             </div>
//                         </div>

//                         {/* Items */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                             <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
//                                 <div className="flex flex-row items-center justify-between w-full pb-3"><p className="text-xl font-semibold uppercase text-blue-600">3. Items</p><div className="flex gap-3">{isItemEditing && (<button type="button" onClick={() => { setIsItemEditing(false); setEditingItemOriginal(null); setTableItems({ description: "", quantity: "", unitPrice: "" }); }} className="bg-yellow-500 px-3 py-2 rounded-md text-white shadow-md hover:bg-yellow-600">Cancel Edit</button>)}<button type="submit" className={`px-3 py-2 rounded-md text-green-950 shadow-md ${isItemEditing ? 'bg-orange-400 hover:bg-orange-500' : 'bg-green-400 hover:bg-green-500'}`}>{isItemEditing ? 'Update Item' : 'Add'}</button></div></div>
//                                 <div className="flex items-center justify-start flex-wrap gap-3">
//                                     <div className="flex items-start justify-center flex-col gap-2"><h1>Description</h1><input type="text" required value={tableItems.description} placeholder="Enter Description" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })} /></div>
//                                     <div className="flex items-start justify-center flex-col gap-2"><h1>Quantity</h1><input type="number" required value={tableItems.quantity} placeholder="Enter Quantity" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })} /></div>
//                                     <div className="flex items-start justify-center flex-col gap-2"><h1>Unit Price</h1><input type="number" required value={tableItems.unitPrice} placeholder="Single Product Price" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })} /></div>
//                                 </div>
//                             </form>
//                             {billDetails.items.length > 0 && (
//                                 <div className="overflow-x-scroll w-full py-5"><div className="w-full min-w-[50rem]"><table className="w-full"><tbody className="w-full"><tr className="bg-gray-200 font-bold"><td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td><td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td><td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td><td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price</td><td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price</td><td className="px-3 w-[5%] text-center">Action</td></tr>{billDetails.items.map((item, index) => (<tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}><td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td><td className="border border-blue-500 px-3 py-2">{item.description}</td><td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td><td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td><td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td><td className="px-3"><p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs inline-block" onClick={(e) => { e.stopPropagation(); handleItem(item); }}>Delete</p></td></tr>))}</tbody></table></div></div>
//                             )}
//                         </div>

//                         {/* GST & Buttons */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50"><p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p><div className="flex items-center justify-start gap-5 mt-3"><label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>SGST</label><label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-400" : "bg-green-400"} px-5 py-1 rounded duration-300 cursor-pointer`}>CGST</label></div></div>
//                         <div className="flex gap-3">
//                             <button 
//                                 onClick={handleSaveOrUpdate} 
//                                 disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress} 
//                                 className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? 'Processing...' : isEditing ? 'Update' : 'Save'}
//                             </button>
//                             {isEditing && (
//                                 <button 
//                                     onClick={handleDelete} 
//                                     disabled={loading} 
//                                     className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {loading ? 'Deleting...' : 'Delete'}
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Print Button */}
//                 <ReactToPrint
//                     trigger={() => (
//                         <button className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 hide-on-print">
//                             Print Receipt
//                         </button>
//                     )}
//                     content={() => printRef.current}
//                     pageStyle="@page { size: A4 portrait; margin: 20mm; } body { margin: 20px; }"
//                 />

//                 {/* Hidden Print Area */}
//                 <div className="w-full bg-white flex items-center justify-center">
//                     <div className="w-full xl:w-[60rem]">
//                         <div ref={printRef} className="flex flex-col w-[60rem] bg-white text-black printable-content">

//                             {/* Header Row */}
//                             <div className="flex flex-row h-[15rem]">
//                                 <div className="h-full w-[20rem] border border-black">
//                                     <div className="flex items-center justify-center h-[30%]">
//                                         <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
//                                     </div>
//                                     <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                                         <p className="font-semibold text-lg">Bill to:</p>
//                                         {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                                         <p>{billDetails.billTO}</p>
//                                         <p>{billDetails.customerAddress}</p>
//                                         {invoice && billDetails.associatedQuotationNumber && (
//                                             <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="h-full w-[40rem] border border-black flex flex-col justify-between">
//                                     <div className="p-5 flex items-center justify-between">
//                                         <div className="w-[70%] text-sm">
//                                             <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                                             <p className="font-medium">DESIGN BLOCKS</p>
//                                             <p className="font-semibold text-lg pt-2">Address:</p>
//                                             <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                                         </div>
//                                         <div className="w-[100px] h-[100px] flex items-center justify-center">
//                                             <img
//                                                 src="https://designblocks.in/img/DB.png"
//                                                 alt="Design Blocks Logo"
//                                                 onError={(e) => {
//                                                     e.target.onerror = null;
//                                                     e.target.src = "https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO";
//                                                 }}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="flex justify-between h-10 px-5 border-t border-black text-sm">
//                                         <p className="font-semibold text-lg">{invoice ? "Invoice" : "Quotation"} No: <span className="font-normal">{billDetails.quotationNumber}</span></p>
//                                         <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
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
//                                         <tr key={key} className="h-10">
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

//                                     {/* Totals */}
//                                     <tr className="border border-black h-10 bg-yellow-50">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                                         <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                                     </tr>

//                                     {sgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3}></td>
//                                             <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{SGST}</td>
//                                         </tr>
//                                     )}
//                                     {cgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3}></td>
//                                             <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{CGST}</td>
//                                         </tr>
//                                     )}

//                                     {(cgst || sgst) && (
//                                         <tr className="border border-black h-10 bg-blue-100">
//                                             <td colSpan={3}></td>
//                                             <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">Invoice Value</td>
//                                             <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                                         </tr>
//                                     )}

//                                     <tr className="border border-black h-10">
//                                         <td colSpan={5} className="px-2">
//                                             <span className="font-semibold">In Words: </span>
//                                             <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                                         </td>
//                                     </tr>

//                                     {/* Bank Details & Signature */}
//                                     <tr>
//                                         <td colSpan={5} className="p-2 border-t border-black text-xs">
//                                             <div className="flex justify-between">
//                                                 <div className="w-1/2">
//                                                     <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                                                     <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                                                     <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
//                                                     <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
//                                                 </div>
//                                                 <div className="w-1/2 text-right pt-6">
//                                                     <p className="text-sm">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
//                                                     <p className="mt-6 text-gray-500">(Authorized Signatory)</p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-center mt-3 font-semibold">Thank You</div>
//                                         </td>
//                                     </tr>

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
// // Removed: import AdminPanel from "./AdminPanel"; 
// // Removed: import ReactToPrint from "react-to-print"; 

// // --- CONFIGURATION ---
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


// // --- Custom Modal Component (Replaces alert() and window.confirm()) ---
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
//                         {isConfirm ? 'Confirm' : 'OK'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // --- Main App Component ---
// function App() {
//     // --- AUTHENTICATION STATE ---
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [userRole, setUserRole] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [authLoading, setAuthLoading] = useState(false);

//     // --- MODAL STATE ---
//     const [modalState, setModalState] = useState({
//         isVisible: false,
//         message: '',
//         type: 'ALERT',
//         onConfirm: null,
//     });

//     const showModal = useCallback((message, type = 'ALERT', callback = null) => {
//         setModalState({
//             isVisible: true,
//             message,
//             type,
//             onConfirm: callback,
//         });
//     }, []);

//     const closeModal = useCallback(() => {
//         setModalState({ isVisible: false, message: '', type: 'ALERT', onConfirm: null });
//     }, []);

//     const showNotification = (message, type) => {
//         showModal(message, 'ALERT');
//     };

//     // --- Invoice Generator State (Employee View) ---
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
//     const [loading, setLoading] = useState(false);
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
//     // --- END Invoice Generator State ---

//     // --- Invoice Generator Handlers ---

//     const generateUniqueNumber = useCallback(async () => {
//         const token = localStorage.getItem('adminToken');   // 🔑 get token
//         if (!token) {
//             console.error("No token found. Cannot generate number.");
//             return;
//         }

//         try {
//             const url = quotation
//                 ? `${BASE_URL}/api/quotation/generate`
//                 : `${BASE_URL}/api/invoice/generate`;

//             const response = await fetch(url, {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,      // ✅ attach token
//                     "Content-Type": "application/json"
//                 }
//             });

//             const data = await response.json();

//             if (data.success) {
//                 setBillDetails(prev => ({
//                     ...prev,
//                     quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
//                 }));
//             } else {
//                 console.error("Number generation failed:", data.error || data.message);
//             }
//         } catch (error) {
//             console.error("Number generation failed", error);
//         }
//     }, [quotation]);


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
//         // Use object reference for finding index as per the original component style
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

//     const handleItem = (itemToDelete) => {
//         let removedArray = billDetails.items.filter(e => e !== itemToDelete);
//         setBillDetails({ ...billDetails, items: removedArray });
//     };

//     const handleUpdate = async () => {
//         const token = localStorage.getItem('adminToken');
//         if (!token) { showNotification("Authentication token missing. Cannot update.", 'error'); return; }

//         try {
//             setLoading(true);
//             const documentNumber = billDetails.quotationNumber;
//             const docKey = invoice ? "invoiceNumber" : "quotationNumber";
//             const valueKey = invoice ? "invoiceValue" : "quotationValue"; // Dynamic key for value
//             const urlPath = invoice ? "invoice/update" : "quotation/update";
//             const url = `${BASE_URL}/api/${urlPath}`;

//             const body = {
//                 [docKey]: documentNumber,
//                 billTO: billDetails.billTO,
//                 customerAddress: billDetails.customerAddress,
//                 customerGSTIN: billDetails.customerGSTIN,
//                 items: billDetails.items,
//                 sgst: sgst,
//                 cgst: cgst,
//                 taxableValue: taxableValue,
//                 SGSTAmount: SGST,
//                 CGSTAmount: CGST,
//                 [valueKey]: invoiceValue, // Use dynamic key to send as quotationValue if needed
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

//     const handleSaveOrUpdate = () => {
//         if (isEditing) handleUpdate();
//         else handleSave();
//     };

// const handleSave = async () => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) { 
//         showNotification("Authentication token missing. Cannot save.", 'error'); 
//         return; 
//     }

//     try {
//         setLoading(true);

//         const docKey = quotation ? "quotationNumber" : "invoiceNumber";
//         const valueKey = quotation ? "quotationValue" : "invoiceValue";

//         // ✅ Ensure documentDate is always valid before sending
//         const safeDocumentDate = billDetails.documentDate 
//             ? billDetails.documentDate 
//             : new Date().toISOString().split("T")[0];

//         const body = {
//             billTO: billDetails.billTO,
//             customerAddress: billDetails.customerAddress,
//             customerGSTIN: billDetails.customerGSTIN,
//             items: billDetails.items,
//             sgst,
//             cgst,
//             taxableValue,
//             SGSTAmount: SGST,
//             CGSTAmount: CGST,
//             [valueKey]: invoiceValue,
//             [docKey]: billDetails.quotationNumber,
//             originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
//             // documentDate: safeDocumentDate,
//             documentDate: billDetails.documentDate || new Date().toISOString().split("T")[0],
//         };

//         console.log("📤 Sending payload:", body); // Debug log

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
//             const savedNumber = data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
//             showNotification(`${quotation ? "Quotation" : "Invoice"} saved successfully → ${savedNumber}`, 'success');
//             setIsEditing(true);
//             setBillDetails(prev => ({
//                 ...prev,
//                 quotationNumber: savedNumber,
//                 documentDate: safeDocumentDate // ✅ Keep it in state too
//             }));
//         } else {
//             showNotification(`Save Error: ${data.error}`, 'error');
//         }
//     } catch (err) {
//         console.error(err);
//         showNotification("Unexpected error during save.", 'error');
//     } finally {
//         setLoading(false);
//     }
// };


//     const performActualDelete = async () => {
//         const docType = invoice ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;
//         const token = localStorage.getItem('adminToken');

//         try {
//             setLoading(true);
//             const urlPath = invoice ? `invoice/delete/${documentNumber}` : `quotation/delete/${documentNumber}`;
//             const url = `${BASE_URL}/api/${urlPath}`;

//             const response = await fetch(url, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//             });
//             const data = await response.json();

//             if (response.ok && data.success) {
//                 showNotification(`${docType} #${documentNumber} deleted successfully!`, 'success');
//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
//                     documentDate: new Date().toISOString().split("T")[0],
//                 }));
//                 setSGST(false);
//                 setCGST(false);
//                 setIsEditing(false);
//                 generateUniqueNumber();
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

//     const handleDelete = () => {
//         const docType = invoice ? "Invoice" : "Quotation";
//         const documentNumber = billDetails.quotationNumber;

//         if (!documentNumber || !isEditing) {
//             showNotification(`Cannot delete. No existing ${docType} loaded.`, 'info');
//             return;
//         }

//         showModal(
//             `Are you sure you want to delete ${docType} #${documentNumber}? This action cannot be undone.`,
//             'CONFIRM',
//             performActualDelete
//         );
//     };

//     const handleSearch = async (docNumber) => {
//         if (typeof docNumber === 'object' || !docNumber) docNumber = searchNumber;
//         if (!docNumber) {
//             showNotification("Please enter a document number to search.", 'info');
//             return;
//         }

//         try {
//             setLoading(true);
//             setIsEditing(false);

//             const token = localStorage.getItem('adminToken');   // ✅ get token
//             if (!token) {
//                 showNotification("Authentication token missing. Cannot search.", 'error');
//                 return;
//             }

//             // --- Try searching for quotation first ---
//             const quoteUrl = `${BASE_URL}/api/quotation/fetch/${docNumber}`;
//             let response = await fetch(quoteUrl, {
//                 headers: { "Authorization": `Bearer ${token}` }   // ✅ attach token
//             });
//             let result = await response.json();

//             if (response.ok && result.quotation) {
//                 const quote = result.quotation;

//                 // --- FIX: Load saved date if available, otherwise fall back to initial date/today ---
//                 const fetchedDate = quote.documentDate
//                     ? quote.documentDate
//                     : new Date().toISOString().split("T")[0];

//                 setBillDetails(prev => ({
//                     ...prev,
//                     billTO: quote.billTO || "",
//                     customerAddress: quote.customerAddress || "",
//                     customerGSTIN: quote.customerGSTIN || "",
//                     items: quote.items || [],
//                     associatedQuotationNumber: docNumber,
//                     documentDate: quote.documentDate || new Date().toISOString().split("T")[0],
//                 }));
//                 setSGST(quote.sgst || false);
//                 setCGST(quote.cgst || false);
//                 setOriginalQuotationNumber(quote.quotationNumber);

//                 if (invoice) {
//                     setIsEditing(false);
//                     generateUniqueNumber(); // Generate a new invoice number
//                     setBillDetails(prev => ({ ...prev, associatedQuotationNumber: docNumber }));
//                     showNotification(`Quotation #${docNumber} details loaded. Ready to create Invoice #${billDetails.quotationNumber}.`, 'success');
//                 } else {
//                     setBillDetails(prev => ({ ...prev, quotationNumber: quote.quotationNumber, associatedQuotationNumber: "" }));
//                     setIsEditing(true);
//                     showNotification(`Quotation #${docNumber} details loaded for editing.`, 'success');
//                 }
//                 return;
//             }

//             // --- If quotation not found, or if we are in invoice mode, try searching for invoice ---
//             if (invoice || !quotation) {
//                 const invoiceUrl = `${BASE_URL}/api/invoice/fetch/${docNumber}`;
//                 response = await fetch(invoiceUrl, {
//                     headers: { "Authorization": `Bearer ${token}` }   // ✅ attach token
//                 });
//                 result = await response.json();

//                 if (response.ok && result.invoice) {
//                     const inv = result.invoice;

//                     // --- FIX: Load saved date if available, otherwise fall back to initial date/today ---
//                     const fetchedDate = inv.documentDate
//                         ? inv.documentDate
//                         : new Date().toISOString().split("T")[0];

//                     setBillDetails(prev => ({
//                         ...prev,
//                         billTO: inv.billTO || "",
//                         customerAddress: inv.customerAddress || "",
//                         customerGSTIN: inv.customerGSTIN || "",
//                         quotationNumber: inv.invoiceNumber,
//                         items: inv.items || [],
//                         documentDate: fetchedDate, // Load date
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

//             setIsEditing(false);
//             setBillDetails(prev => ({ ...prev, associatedQuotationNumber: "", documentDate: new Date().toISOString().split("T")[0] })); // Reset date on not found
//             generateUniqueNumber();
//             showNotification(`Document #${docNumber} not found.`, 'error');

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             showNotification('Error fetching data. Check server connection.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };


//     // --- END Invoice Generator Handlers ---
//     // --- Authentication Handlers ---

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setAuthLoading(true);
//         try {
//             const response = await fetch(`${BASE_URL}/api/admin/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password })
//             });

//             const data = await response.json();

//             if (data.success) {
//                 localStorage.setItem('adminToken', data.token);
//                 localStorage.setItem('userRole', data.role);

//                 setIsAuthenticated(true);
//                 setUserRole(data.role);
//             } else {
//                 showModal(data.error || "Invalid Credentials", 'ALERT');
//             }
//         } catch (error) {
//             console.error("Login Error:", error);
//             showModal("Login failed. Check server connection.", 'ALERT');
//         } finally {
//             setAuthLoading(false);
//         }
//     };

//     const handleLogout = useCallback(() => {
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('userRole');
//         setIsAuthenticated(false);
//         setUserRole("");
//         setUsername("");
//         setPassword("");
//     }, []);
//     // --- END Authentication Handlers ---

//     // --- Effects for Employee Logic ---

//     // 1. Initial Load Check
//     useEffect(() => {
//         const token = localStorage.getItem('adminToken');
//         const role = localStorage.getItem('userRole');
//         if (token) {
//             setIsAuthenticated(true);
//             setUserRole(role || "employee");
//         }
//     }, []);

//     // 2. Invoice Generator Calculations
//     useEffect(() => {
//         if (isAuthenticated && userRole === 'employee') {
//             const newTaxableValue = billDetails.items.reduce((acc, item) => {
//                 const quantity = Number(item.quantity) || 0;
//                 const unitPrice = Number(item.unitPrice) || 0;
//                 return acc + quantity * unitPrice;
//             }, 0);

//             const gstRate = 0.09;
//             const currentSGST = sgst ? (newTaxableValue * gstRate) : 0;
//             const currentCGST = cgst ? (newTaxableValue * gstRate) : 0;
//             const totalValue = newTaxableValue + currentSGST + currentCGST;

//             setSGSTValue(currentSGST.toFixed(2));
//             setCGSTValue(currentCGST.toFixed(2));
//             setTaxableValue(newTaxableValue);
//             setInvoiceValue(totalValue);
//         }
//     }, [billDetails.items, cgst, sgst, isAuthenticated, userRole]);


//     // 3. Reset form on mode change
//     useEffect(() => {
//         if (isAuthenticated && userRole === 'employee') {
//             setBillDetails(prev => ({
//                 ...prev,
//                 billTO: "", customerAddress: "", customerGSTIN: "", items: [], associatedQuotationNumber: "",
//                 documentDate: new Date().toISOString().split("T")[0], // Reset date
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
//     }, [invoice, quotation, isAuthenticated, userRole, generateUniqueNumber]);

//     // --- RENDER LOGIC ---

//     // 1. Not Authenticated -> Show Login Page
//     if (!isAuthenticated) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
//                 <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
//                 <script src="https://cdn.tailwindcss.com"></script>
//                 <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
//                     <div className="text-center mb-8">
//                         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <Lock className="text-blue-600" size={32} />
//                         </div>
//                         <h2 className="text-2xl font-bold text-gray-800">Design Blocks Login</h2>
//                         <p className="text-gray-500 text-sm mt-2">Sign in to continue</p>
//                     </div>

//                     <form onSubmit={handleLogin} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <User className="text-gray-400" size={18} />
//                                 </div>
//                                 <input
//                                     type="text"
//                                     required
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     placeholder="Enter username"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="text-gray-400" size={18} />
//                                 </div>
//                                 <input
//                                     type="password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     placeholder="Enter password"
//                                 />
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={authLoading}
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                         >
//                             {authLoading ? (
//                                 <Loader size={20} className="animate-spin mr-2" />
//                             ) : "Sign In"}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         );
//     }

//     // 2. Authenticated as ADMIN -> Show Admin Panel (Delegated to AdminPanel.jsx)
//     if (userRole === "admin") {
//         return (
//             <div className="min-h-screen w-full">
//                 <script src="https://cdn.tailwindcss.com"></script>
//                 <AdminPanel onLogout={handleLogout} />
//             </div>
//         );
//     }

//     // 3. Authenticated as EMPLOYEE -> Show Invoice Generator UI (Restored Logic)
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
//             <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
//             {/* Tailwind CSS import (Included for HTML output consistency, though React usually assumes it's bundled) */}
//             <script src="https://cdn.tailwindcss.com"></script>

//             {/* Print-specific styles to hide UI elements when printing */}
//             <style>
//                 {`
//                     @media print {
//                         .hide-on-print {
//                             display: none !important;
//                         }
//                         .printable-content {
//                             width: 100% !important; 
//                             margin: 0 !important;
//                             box-shadow: none !important;
//                             border: none !important;
//                             font-size: 10pt; /* Smaller font for print density */
//                         }
//                         .w-\\[60rem\\] {
//                             width: 100% !important;
//                         }
//                     }
//                 `}
//             </style>

//             <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 w-full relative">

//                 {/* Logout Button (Employee View) - hide-on-print */}
//                 <div className="absolute top-5 right-5 hide-on-print">
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors shadow-md"
//                     >
//                         <LogOut size={18} />
//                         Logout
//                     </button>
//                 </div>

//                 {/* --- INVOICE GENERATOR UI - hide-on-print --- */}
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
//                             <p className="pb-3 text-xl font-semibold uppercase text-purple-600">Search Invoice/Quotation</p>
//                             <div className="flex flex-col sm:flex-row items-stretch gap-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Invoice/Quotation Number"
//                                     className="outline-none rounded px-3 py-2 border border-purple-500 shadow-md w-full"
//                                     value={searchNumber}
//                                     onChange={(e) => setSearchNumber(e.target.value)}
//                                 />
//                                 <button
//                                     onClick={() => handleSearch(searchNumber)}
//                                     disabled={loading}
//                                     className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 disabled:opacity-50"
//                                 >
//                                     {loading ? <Loader size={20} className="animate-spin" /> : 'Search'}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Mode Switch */}
//                         <div className="flex items-center justify-start gap-5 mb-5">
//                             <div
//                                 className={`cursor-pointer px-4 py-1 font-semibold transition-colors duration-200 ${quotation ? "bg-green-400 text-green-900 shadow-md" : "bg-transparent text-gray-700"} border-2 border-green-400 rounded-lg`}
//                                 onClick={() => { setQuotation(true); setInvoice(false); }}
//                             >
//                                 Quotation
//                             </div>
//                             <div
//                                 className={`cursor-pointer px-4 py-1 font-semibold transition-colors duration-200 ${invoice ? "bg-green-400 text-green-900 shadow-md" : "bg-transparent text-gray-700"} border-2 border-green-400 rounded-lg`}
//                                 onClick={() => { setQuotation(false); setInvoice(true); }}
//                             >
//                                 Invoice
//                             </div>
//                         </div>

//                         {/* Document Details */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
//                             <p className="pb-3 text-xl font-semibold uppercase text-blue-600">1. {invoice ? "Invoice" : "Quotation"} Details</p>
//                             <div className="flex flex-wrap items-center justify-start gap-3">
//                                 <h1 className="font-medium text-gray-700">{invoice ? "Invoice" : "Quotation"} Number</h1>
//                                 <input type="text" value={billDetails.quotationNumber} placeholder={`Auto-generated`} className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md bg-gray-100" readOnly />

//                                 {/* Date Input */}
//                                 <div className="flex items-center gap-3">
//                                     <h1 className="font-medium text-gray-700">Date</h1>
//                                     <input
//                                         type="date"
//                                         value={billDetails.documentDate}
//                                         onChange={(e) => setBillDetails({ ...billDetails, documentDate: e.target.value })}
//                                         className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md"
//                                     />
//                                 </div>

//                                 {invoice && (
//                                     <div className="flex flex-wrap items-center gap-3">
//                                         <h1 className="font-medium text-gray-700">Quotation Number</h1>
//                                         <div className="flex items-center border border-blue-500 rounded-lg shadow-md">
//                                             <input
//                                                 type="text"
//                                                 value={billDetails.associatedQuotationNumber}
//                                                 placeholder={`Enter Q-Number to load`}
//                                                 className="outline-none rounded-l-lg px-2 py-1 flex-1"
//                                                 onChange={(e) => setBillDetails({ ...billDetails, associatedQuotationNumber: e.target.value })}
//                                             />
//                                             <button
//                                                 onClick={() => handleSearch(billDetails.associatedQuotationNumber)}
//                                                 disabled={loading}
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-r-lg h-full hover:bg-blue-600 disabled:opacity-50"
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
//                             <div className="flex items-start justify-start flex-wrap gap-5">
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1 className="font-medium text-gray-700">Bill TO</h1>
//                                     <input type="text" placeholder="Enter Biller Details" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.billTO} onChange={(e) => setBillDetails({ ...billDetails, billTO: e.target.value })} />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1 className="font-medium text-gray-700">Address</h1>
//                                     <input type="text" placeholder="Enter Biller Address" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.customerAddress} onChange={(e) => setBillDetails({ ...billDetails, customerAddress: e.target.value })} />
//                                 </div>
//                                 <div className="flex items-start justify-center flex-col gap-2">
//                                     <h1 className="font-medium text-gray-700">Customer GSTIN</h1>
//                                     <input type="text" placeholder="Enter Customer GSTIN" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" value={billDetails.customerGSTIN} onChange={(e) => setBillDetails({ ...billDetails, customerGSTIN: e.target.value })} />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Items */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
//                             <form className="flex items-start justify-start flex-col" onSubmit={isItemEditing ? handleUpdateItem : handleAddItem}>
//                                 <div className="flex flex-row items-center justify-between w-full pb-3">
//                                     <p className="text-xl font-semibold uppercase text-blue-600">3. Items</p>
//                                     <div className="flex gap-3">
//                                         {isItemEditing && (
//                                             <button
//                                                 type="button"
//                                                 onClick={() => { setIsItemEditing(false); setEditingItemOriginal(null); setTableItems({ description: "", quantity: "", unitPrice: "" }); }}
//                                                 className="bg-yellow-500 px-3 py-2 rounded-md text-white shadow-md hover:bg-yellow-600 transition-colors"
//                                             >
//                                                 Cancel Edit
//                                             </button>
//                                         )}
//                                         <button
//                                             type="submit"
//                                             className={`px-3 py-2 rounded-md text-white shadow-md transition-colors ${isItemEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
//                                         >
//                                             {isItemEditing ? 'Update Item' : 'Add'}
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center justify-start flex-wrap gap-5">
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1 className="font-medium text-gray-700">Description</h1>
//                                         <input type="text" required value={tableItems.description} placeholder="Enter Description" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, description: e.target.value })} />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1 className="font-medium text-gray-700">Quantity</h1>
//                                         <input type="number" required value={tableItems.quantity} placeholder="Enter Quantity" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, quantity: e.target.value })} />
//                                     </div>
//                                     <div className="flex items-start justify-center flex-col gap-2">
//                                         <h1 className="font-medium text-gray-700">Unit Price</h1>
//                                         <input type="number" required value={tableItems.unitPrice} placeholder="Single Product Price" className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md" onChange={(e) => setTableItems({ ...tableItems, unitPrice: e.target.value })} />
//                                     </div>
//                                 </div>
//                             </form>
//                             {billDetails.items.length > 0 && (
//                                 <div className="overflow-x-scroll w-full py-5">
//                                     <div className="w-full min-w-[50rem]">
//                                         <table className="w-full">
//                                             <tbody className="w-full">
//                                                 <tr className="bg-gray-200 font-bold">
//                                                     <td className="border border-blue-500 px-3 py-2 w-[5%] text-center">#</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[45%]">Description</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-center">Qty</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Unit Price (Rs.)</td>
//                                                     <td className="border border-blue-500 px-3 py-2 w-[15%] text-right">Total Price (Rs.)</td>
//                                                     <td className="px-3 w-[5%] text-center">Action</td>
//                                                 </tr>
//                                                 {billDetails.items.map((item, index) => (
//                                                     <tr key={item.id} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-blue-100 transition duration-150" onClick={() => handleEditItem(item)}>
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{index + 1}</td>
//                                                         <td className="border border-blue-500 px-3 py-2">{item.description}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-center">{item.quantity}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
//                                                         <td className="border border-blue-500 px-3 py-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
//                                                         <td className="px-3">
//                                                             <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white text-xs inline-block hover:bg-red-600 transition" onClick={(e) => { e.stopPropagation(); handleItem(item); }}>
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

//                         {/* GST & Buttons */}
//                         <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
//                             <p className="text-xl font-semibold uppercase text-blue-600">4. GST Info</p>
//                             <div className="flex items-center justify-start gap-5 mt-3">
//                                 <label onClick={() => setSGST(!sgst)} className={`${sgst ? "bg-red-500 text-white" : "bg-green-500 text-white"} px-5 py-2 rounded-lg duration-300 cursor-pointer shadow-md font-semibold hover:opacity-80 transition-opacity`}>
//                                     SGST {sgst ? 'ON' : 'OFF'}
//                                 </label>
//                                 <label onClick={() => setCGST(!cgst)} className={`${cgst ? "bg-red-500 text-white" : "bg-green-500 text-white"} px-5 py-2 rounded-lg duration-300 cursor-pointer shadow-md font-semibold hover:opacity-80 transition-opacity`}>
//                                     CGST {cgst ? 'ON' : 'OFF'}
//                                 </label>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={handleSaveOrUpdate}
//                                 disabled={loading || billDetails.items.length === 0 || !billDetails.billTO || !billDetails.customerAddress}
//                                 className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 {loading ? <Loader size={20} className="animate-spin" /> : (isEditing ? 'Update' : 'Save')}
//                             </button>
//                             {isEditing && (
//                                 <button
//                                     onClick={handleDelete}
//                                     disabled={loading}
//                                     className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                 >
//                                     {loading ? <Loader size={20} className="animate-spin" /> : 'Delete'}
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Print Button - Using window.print() */}
//                 <button
//                     onClick={() => window.print()}
//                     className="text-white bg-red-500 font-medium px-4 py-2 rounded mb-5 mt-5 hide-on-print"
//                 >
//                     Print Receipt
//                 </button>

//                 {/* Hidden Print Area */}
//                 <div className="w-full bg-white flex items-center justify-center">
//                     <div className="w-full xl:w-[60rem]">
//                         <div ref={printRef} className="flex flex-col w-[60rem] bg-white text-black printable-content">

//                             {/* Header Row */}
//                             <div className="flex flex-row h-[15rem]">
//                                 <div className="h-full w-[20rem] border border-black">
//                                     <div className="flex items-center justify-center h-[30%]">
//                                         <p className="text-center font-bold text-2xl">{invoice ? "Invoice" : "Quotation"}</p>
//                                     </div>
//                                     <div className="h-[70%] border-t border-black px-5 py-2 text-sm">
//                                         <p className="font-semibold text-lg">Bill to:</p>
//                                         {billDetails.customerGSTIN && <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>}
//                                         <p>{billDetails.billTO}</p>
//                                         <p>{billDetails.customerAddress}</p>
//                                         {invoice && billDetails.associatedQuotationNumber && (
//                                             <p className="mt-2 text-xs">Quotation Ref: <span className="font-semibold">{billDetails.associatedQuotationNumber}</span></p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="h-full w-[40rem] border border-black flex flex-col justify-between">
//                                     <div className="p-5 flex items-center justify-between">
//                                         <div className="w-[70%] text-sm">
//                                             <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
//                                             <p className="font-medium">DESIGN BLOCKS</p>
//                                             <p className="font-semibold text-lg pt-2">Address:</p>
//                                             <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
//                                         </div>
//                                         <div className="w-[100px] h-[100px] flex items-center justify-center">
//                                             <img
//                                                 src="https://designblocks.in/img/DB.png"
//                                                 alt="Design Blocks Logo"
//                                                 onError={(e) => {
//                                                     e.target.onerror = null;
//                                                     e.target.src = "https://placehold.co/100x100/A0B9FF/000?text=DB+LOGO";
//                                                 }}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <label className="font-semibold">Document Date</label>
//                                         <input
//                                             type="date"
//                                             value={billDetails.documentDate}
//                                             onChange={(e) =>
//                                                 setBillDetails({ ...billDetails, documentDate: e.target.value })
//                                             }
//                                             className="border px-2 py-1 rounded"
//                                         />
//                                     </div>

//                                 </div>
//                             </div>

//                             <div className="h-10 w-full border-x border-black"></div>

//                             {/* Items Table */}
//                             <table className="w-[60rem] text-sm table-fixed">
//                                 <thead>
//                                     <tr className="h-10 bg-gray-100 font-bold">
//                                         <td className="border border-black text-center w-[5%]">Item</td>
//                                         <td className="border border-black text-center w-[45%]">Description</td>
//                                         <td className="border border-black text-center w-[10%]">Quantity</td>
//                                         <td className="border border-black text-center w-[20%]">Unit Price (Rs.)</td>
//                                         <td className="border border-black text-center w-[20%]">Total Price (Rs.)</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="border border-black">
//                                     {billDetails.items.length > 0 ? billDetails.items.map((items, key) => (
//                                         <tr key={items.id} className="h-10">
//                                             <td className="text-center border border-black">{key + 1}.</td>
//                                             <td className="px-2 border border-black whitespace-normal">{items.description}</td>
//                                             <td className="px-2 border border-black text-center">{items.quantity}</td>
//                                             <td className="px-2 border border-black text-right">{Number(items.unitPrice).toFixed(2)}</td>
//                                             <td className="px-2 border border-black text-right">{(items.quantity * items.unitPrice).toFixed(2)}</td>
//                                         </tr>
//                                     )) : (
//                                         <tr className="h-20">
//                                             <td colSpan={5} className="text-center text-gray-500 border border-black">No items added.</td>
//                                         </tr>
//                                     )}


//                                     {/* Totals */}
//                                     <tr className="border border-black h-10 bg-yellow-50">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-red-700 font-semibold border border-black text-right">Taxable Value</td>
//                                         <td className="px-2 border border-black text-right font-medium">{taxableValue.toFixed(2)}</td>
//                                     </tr>

//                                     {sgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3}></td>
//                                             <td className="px-2 border border-black font-semibold text-right">SGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{SGST}</td>
//                                         </tr>
//                                     )}
//                                     {cgst && (
//                                         <tr className="h-8 border border-black">
//                                             <td colSpan={3}></td>
//                                             <td className="px-2 border border-black font-semibold text-right">CGST @ 9.00%</td>
//                                             <td className="border border-black px-2 text-right font-medium">{CGST}</td>
//                                         </tr>
//                                     )}

//                                     {/* Grand Total Row */}
//                                     <tr className="border border-black h-10 bg-blue-100">
//                                         <td colSpan={3}></td>
//                                         <td className="px-2 text-blue-700 font-bold border border-black text-right text-base">
//                                             {invoice ? "Invoice Value" : "Quotation Value"}
//                                         </td>
//                                         <td className="px-2 border border-black text-right font-extrabold text-base">{invoiceValue.toFixed(2)}</td>
//                                     </tr>

//                                     <tr className="border border-black h-10">
//                                         <td colSpan={5} className="px-2">
//                                             <span className="font-semibold">In Words: </span>
//                                             <span className="italic">{numberToWords(invoiceValue > 0 ? invoiceValue : taxableValue)} Only.</span>
//                                         </td>
//                                     </tr>

//                                     {/* Bank Details & Signature */}
//                                     <tr>
//                                         <td colSpan={5} className="p-2 border-t border-black text-xs">
//                                             <div className="flex justify-between">
//                                                 <div className="w-1/2">
//                                                     <p className="font-semibold text-sm">BANK DETAILS:-</p>
//                                                     <p>UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM</p>
//                                                     <p>
//                                                         <span className="font-semibold">A/C NUMBER-</span> 753601010050187;
//                                                         <span className="font-semibold"> IFSC:</span> UBIN0810746
//                                                     </p>
//                                                     <p>
//                                                         <span className="font-semibold">UPI ID:</span> designblocks@ybl
//                                                     </p>
//                                                 </div>
//                                                 <div className="w-1/2 text-right pt-6">
//                                                     <p className="text-sm">
//                                                         For <span className="uppercase font-bold mr-10">Design Blocks</span>
//                                                     </p>
//                                                     <p className="mt-6 text-gray-500">(Authorized Signatory)</p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-center mt-3 font-semibold text-sm">Thank You</div>
//                                         </td>
//                                     </tr>

//                                     {quotation && (
//                                         <tr>
//                                             <td colSpan={5} className="p-2 border border-black bg-yellow-50 text-xs">
//                                                 <div className="text-sm">
//                                                     <p className="font-semibold mb-1">Terms & Conditions</p>
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
        associatedQuotationNumber: "",
        documentDate: new Date().toISOString().split("T")[0],
        items: [],
    });

    const [tableItems, setTableItems] = useState({
        description: "",
        quantity: "",
        unitPrice: "",
    });
        // --- Generate Unique Number ---
    const generateUniqueNumber = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

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
                    quotationNumber: quotation ? data.quotationNumber : data.invoiceNumber
                }));
            }
        } catch (error) {
            console.error("Number generation failed", error);
        }
    }, [quotation]);


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


    // --- SAVE (Updated for new loader state saveLoading) ---
    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showModal("Authentication missing.", "ALERT");
            return;
        }

        try {
            setSaveLoading(true);   // ⭐ ONLY Save button loads

            const docKey = quotation ? "quotationNumber" : "invoiceNumber";
            const valueKey = quotation ? "quotationValue" : "invoiceValue";

            const safeDate =
                billDetails.documentDate || new Date().toISOString().split("T")[0];

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
                [docKey]: billDetails.quotationNumber,
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
                const savedNumber =
                    data.invoice?.invoiceNumber || data.quotation?.quotationNumber;
                showModal(`${quotation ? "Quotation" : "Invoice"} saved → ${savedNumber}`);

                setIsEditing(true);
                setBillDetails(prev => ({
                    ...prev,
                    quotationNumber: savedNumber,
                    documentDate: safeDate
                }));
            } else {
                showModal(`Save Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            showModal("Save failed.");
        } finally {
            setSaveLoading(false);  // ⭐ END Save loader
        }
    };


    // --- UPDATE (Updated for saveLoading not global loading) ---
    const handleUpdate = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showModal("Authentication missing.", "ALERT");
            return;
        }

        try {
            setSaveLoading(true);  // ⭐ Only Save/Update button loads

            const documentNumber = billDetails.quotationNumber;
            const docKey = invoice ? "invoiceNumber" : "quotationNumber";
            const valueKey = invoice ? "invoiceValue" : "quotationValue";
            const url = `${BASE_URL}/api/${invoice ? "invoice/update" : "quotation/update"}`;

            const body = {
                [docKey]: documentNumber,
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
                originalQuotationNumber: invoice ? billDetails.associatedQuotationNumber : null,
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
            } else {
                showModal(`Update Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            showModal("Update failed.");
        } finally {
            setSaveLoading(false);  // ⭐ END update loader
        }
    };


    // --- DELETE (Updated for deleteLoading) ---
    const performActualDelete = async () => {
        const docType = invoice ? "Invoice" : "Quotation";
        const documentNumber = billDetails.quotationNumber;
        const token = localStorage.getItem('authToken');

        try {
            setDeleteLoading(true);   // ⭐ Only Delete button loads

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
                }));

                setSGST(false);
                setCGST(false);
                setIsEditing(false);
                generateUniqueNumber();
            } else {
                showModal(`Delete Error: ${data.error}`);
            }
        } catch (err) {
            console.error('Error deleting data:', err);
            showModal('Delete failed.');
        } finally {
            setDeleteLoading(false);  // ⭐ END Delete loader
        }
    };


    const handleDelete = () => {
        const docType = invoice ? "Invoice" : "Quotation";
        const documentNumber = billDetails.quotationNumber;

        if (!documentNumber || !isEditing) {
            showModal(`Cannot delete. No existing ${docType}.`);
            return;
        }

        showModal(
            `Are you sure you want to delete ${docType} #${documentNumber}?`,
            "CONFIRM",
            performActualDelete
        );
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

            // Search Quotation First
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
                showModal(`Quotation #${docNumber} loaded successfully.`);
                return;
            }

            // If not quotation, search invoice
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
                    quotationNumber: inv.invoiceNumber,
                    items: inv.items || [],
                    documentDate: inv.documentDate || new Date().toISOString().split("T")[0],
                    associatedQuotationNumber: inv.originalQuotationNumber || "",
                }));

                setSGST(inv.sgst);
                setCGST(inv.cgst);

                setIsEditing(true);
                showModal(`Invoice #${docNumber} loaded successfully.`);
                return;
            }

            // Not found
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
            setSGSTValue(sgstAmt.toFixed(2));
            setCGSTValue(cgstAmt.toFixed(2));
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
            }));

            setSGST(false);
            setCGST(false);
            setTaxableValue(0);
            setInvoiceValue(0);
            setOriginalQuotationNumber(null);
            setSearchNumber("");
            setIsEditing(false);

            generateUniqueNumber();
        }
    }, [invoice, quotation, isAuthenticated, userRole, generateUniqueNumber]);


    // ----------------- LOGIN SCREEN -----------------
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <Modal state={modalState} onClose={closeModal} onConfirm={modalState.onConfirm} />
                <script src="https://cdn.tailwindcss.com"></script>

                <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-blue-600" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Design Blocks Login</h2>
                        <p className="text-gray-500 text-sm mt-2">Sign in to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="text-gray-400" size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400" size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center"
                        >
                            {authLoading ? <Loader size={20} className="animate-spin mr-2" /> : "Sign In"}
                        </button>
                    </form>
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

                            <div className="flex flex-wrap gap-3">
                                <h1 className="font-medium">Number</h1>
                                <input
                                    type="text"
                                    value={billDetails.quotationNumber}
                                    readOnly
                                    className="outline-none rounded px-2 py-1 border border-blue-500 bg-gray-100"
                                />

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
                                        <h1 className="font-medium">Quotation Number</h1>

                                        <div className="flex border border-blue-500 rounded-lg shadow-md">
                                            <input
                                                type="text"
                                                value={billDetails.associatedQuotationNumber}
                                                placeholder="Enter Q-No"
                                                onChange={(e) =>
                                                    setBillDetails({
                                                        ...billDetails,
                                                        associatedQuotationNumber: e.target.value
                                                    })
                                                }
                                                className="outline-none rounded-l-lg px-2 py-1"
                                            />
                                            <button
                                                onClick={() => handleSearch(billDetails.associatedQuotationNumber)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-r-lg"
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
                                            className={`px-3 py-2 rounded text-white shadow-md ${
                                                isItemEditing
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
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {saveLoading ? (
                                    <Loader size={20} className="animate-spin" />
                                ) : isEditing ? (
                                    "Update"
                                ) : (
                                    "Save"
                                )}
                            </button>

                            {/* DELETE BUTTON */}
                            {isEditing && (
                                <button
                                    onClick={handleDelete}
                                    disabled={deleteLoading}
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 disabled:opacity-50"
                                >
                                    {deleteLoading ? (
                                        <Loader size={20} className="animate-spin" />
                                    ) : (
                                        "Delete"
                                    )}
                                </button>
                            )}
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
                                            {invoice ? "Invoice" : "Quotation"}
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
                                                <div className="w-1/2 text-right pt-6">
                                                    <p className="text-sm">
                                                        For <span className="font-bold mr-10">DESIGN BLOCKS</span>
                                                    </p>
                                                    <p className="mt-6 text-gray-500">(Authorized Signatory)</p>
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




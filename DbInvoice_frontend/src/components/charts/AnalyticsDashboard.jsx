// import React from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts";

// export default function AnalyticsDashboard({ chartData }) {
//   if (!chartData || !chartData.monthlyData) {
//     return (
//       <p className="text-center text-gray-500 py-10">
//         No analytics data available.
//       </p>
//     );
//   }

//   const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//       <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
//         📊 Analytics & Reports
//       </h2>

//       <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
//         <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
//           Monthly Performance (Revenue vs Documents)
//         </h3>

//         <div className="w-full h-[280px] sm:h-[320px] md:h-[350px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={chartData.monthlyData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//               <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" tick={{ fontSize: 12 }} />
//               <YAxis yAxisId="right" orientation="right" stroke="#F59E0B"
//                 tickFormatter={(value) => `₹${value}`} tick={{ fontSize: 12 }} />
//               <Tooltip formatter={(value, name) =>
//                 name.includes("Value") || name.includes("Revenue")
//                   ? formatCurrency(value)
//                   : value
//               }/>
//               <Legend wrapperStyle={{ fontSize: "12px" }} />

//               <Bar yAxisId="left" dataKey="invoices" fill="#4F46E5"
//                    name="Invoices (Count)" radius={[4,4,0,0]} />

//               <Bar yAxisId="left" dataKey="quotations" fill="#10B981"
//                    name="Quotations (Count)" radius={[4,4,0,0]} />

//               <Bar yAxisId="right" dataKey="totalValue" fill="#F59E0B"
//                    name="Invoice Revenue (₹)" radius={[4,4,0,0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-10 border border-gray-100">
//         <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
//           Weekly Revenue Trend
//         </h3>

//         <div className="w-full h-[260px] sm:h-[280px] md:h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData.weeklyData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="week" tick={{ fontSize: 12 }} />
//               <YAxis tickFormatter={(value)=> value>=1000?`₹${value}`:value}
//                      tick={{fontSize:12}} />

//               <Tooltip formatter={(value,name)=>
//                 name.includes("Value") ? formatCurrency(value) : value
//               }/>

//               <Legend wrapperStyle={{ fontSize:"12px" }}/>

//               <Line type="monotone" dataKey="invoices"
//                     stroke="#4F46E5" strokeWidth={3}
//                     dot={{r:5}} name="Invoices Issued"/>

//               <Line type="monotone" dataKey="quotations"
//                     stroke="#10B981" strokeWidth={2}
//                     strokeDasharray="5 5"
//                     name="Quotations Created"/>

//               <Line type="monotone" dataKey="totalValue"
//                     stroke="#F59E0B" strokeWidth={4}
//                     dot={{r:6,fill:"#F59E0B"}}
//                     name="Net Revenue (₹)"/>
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function AnalyticsDashboard({ chartData }) {
  if (!chartData || !chartData.monthlyData) {
    return (
      <p className="text-center text-gray-500 py-10">
        No analytics data available.
      </p>
    );
  }

  const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        📊 Analytics & Reports
      </h2>

      {/* 📅 Monthly Overview */}
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">

        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Monthly Performance (Revenue vs Documents)
        </h3>

        <div className="w-full h-[280px] sm:h-[320px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#4F46E5"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#F59E0B"
                tickFormatter={(value) => `₹${value}`}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value, name) =>
                  name.includes("Value") || name.includes("Revenue")
                    ? formatCurrency(value)
                    : value
                }
              />

              <Legend wrapperStyle={{ fontSize: "12px" }} />

              <Bar
                yAxisId="left"
                dataKey="invoices"
                fill="#4F46E5"
                name="Invoices (Count)"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                yAxisId="left"
                dataKey="quotations"
                fill="#10B981"
                name="Quotations (Count)"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                yAxisId="right"
                dataKey="totalValue"
                fill="#F59E0B"
                name="Invoice Revenue (₹)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📆 Weekly Overview */}
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-10 border border-gray-100">

        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Weekly Revenue Trend
        </h3>

        <div className="w-full h-[260px] sm:h-[280px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="week"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tickFormatter={(value) =>
                  value >= 1000 ? `₹${value}` : value
                }
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value, name) =>
                  name.includes("Value")
                    ? formatCurrency(value)
                    : value
                }
              />

              <Legend wrapperStyle={{ fontSize: "12px" }} />

              <Line
                type="monotone"
                dataKey="invoices"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ r: 5 }}
                name="Invoices Issued"
              />

              <Line
                type="monotone"
                dataKey="quotations"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Quotations Created"
              />

              <Line
                type="monotone"
                dataKey="totalValue"
                stroke="#F59E0B"
                strokeWidth={4}
                dot={{ r: 6, fill: "#F59E0B" }}
                name="Net Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}


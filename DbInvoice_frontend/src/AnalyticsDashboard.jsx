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

  // Senior Dev Tip: Tooltip lo values ni formatting chesthe look baguntundi
  const formatCurrency = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Analytics & Reports
      </h2>

      {/* 📅 Monthly Overview */}
      <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Monthly Performance (Revenue vs Documents)
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />

            {/* Left Axis: Counts (Invoices/Quotations) */}
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              stroke="#4F46E5" 
              label={{ value: 'Count', angle: -90, position: 'insideLeft' }} 
            />

            {/* Right Axis: Actual Revenue (Invoices Only) */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#F59E0B" 
              tickFormatter={(value) => `₹${value}`}
              label={{ value: 'Revenue', angle: 90, position: 'insideRight' }} 
            />

            <Tooltip formatter={(value, name) => name.includes("Value") || name.includes("Revenue") ? formatCurrency(value) : value} />
            <Legend />

            <Bar yAxisId="left" dataKey="invoices" fill="#4F46E5" name="Invoices (Count)" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="quotations" fill="#10B981" name="Quotations (Count)" radius={[4, 4, 0, 0]} />

            {/* ✅ Ikkada totalValue backend nundi kevalam Invoices sum ga vasthondi */}
            <Bar yAxisId="right" dataKey="totalValue" fill="#F59E0B" name="Invoice Revenue (₹)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📆 Weekly Overview */}
      <div className="bg-white rounded-xl shadow-xl p-6 mb-10 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Weekly Revenue Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.weeklyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" />
            
            {/* Same Y-Axis logic for line chart if needed, 
                but keeping it simple as per your current UI */}
            <YAxis tickFormatter={(value) => value >= 1000 ? `₹${value}` : value} />
            
            <Tooltip formatter={(value, name) => name.includes("Value") ? formatCurrency(value) : value} />
            <Legend />
            
            <Line
              type="monotone"
              dataKey="invoices"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 6 }}
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
              dot={{ r: 8, fill: "#F59E0B" }}
              name="Net Revenue (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
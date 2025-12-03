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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Analytics & Reports
      </h2>

      {/* 📅 Monthly Overview */}
      <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Monthly Bills Overview
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="invoices" fill="#4F46E5" name="Invoices" />
            <Bar dataKey="quotations" fill="#10B981" name="Quotations" />
            <Bar dataKey="totalValue" fill="#F59E0B" name="Total Value (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📆 Weekly Overview */}
      <div className="bg-white rounded-xl shadow-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Weekly Bills Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="invoices"
              stroke="#4F46E5"
              name="Invoices"
            />
            <Line
              type="monotone"
              dataKey="quotations"
              stroke="#10B981"
              name="Quotations"
            />
            <Line
              type="monotone"
              dataKey="totalValue"
              stroke="#F59E0B"
              name="Total Value (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

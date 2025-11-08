"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 2000, expenses: 9800 },
  { month: "Apr", revenue: 2780, expenses: 3908 },
  { month: "May", revenue: 1890, expenses: 4800 },
  { month: "Jun", revenue: 2390, expenses: 3800 },
];

const categoryData = [
  { name: "Software", value: 400, color: "#3b82f6" },
  { name: "Hardware", value: 300, color: "#8b5cf6" },
  { name: "Services", value: 300, color: "#10b981" },
  { name: "Other", value: 200, color: "#f59e0b" },
];

const vendorData = [
  { vendor: "Acme Corp", spend: 12000 },
  { vendor: "TechSolutions", spend: 8500 },
  { vendor: "Global Inc", spend: 9200 },
  { vendor: "DataCo", spend: 7800 },
];

export function ChartGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Vendor Spending</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vendorData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="vendor" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Bar dataKey="spend" fill="#3b82f6" name="Spend ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";

const data = [
  { month: "Jan", invoiceCount: 20, totalSpend: 4200 },
  { month: "Feb", invoiceCount: 35, totalSpend: 7200 },
  { month: "Mar", invoiceCount: 82, totalSpend: 15800 },
  { month: "Apr", invoiceCount: 45, totalSpend: 9500 },
  { month: "May", invoiceCount: 28, totalSpend: 5800 },
  { month: "Jun", invoiceCount: 52, totalSpend: 11200 },
  { month: "Jul", invoiceCount: 68, totalSpend: 14100 },
  { month: "Aug", invoiceCount: 38, totalSpend: 7800 },
  { month: "Sep", invoiceCount: 45, totalSpend: 9200 },
  { month: "Oct", invoiceCount: 47, totalSpend: 8679.25 },
  { month: "Nov", invoiceCount: 32, totalSpend: 6500 },
  { month: "Dec", invoiceCount: 25, totalSpend: 5100 },
];

export function InvoiceVolumeTrendChart() {
  return (
    <div className="bg-card rounded-lg border p-6" data-testid="chart-invoice-volume-trend">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground" data-testid="text-chart-title">
          Invoice Volume + Value Trend
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Invoice count and total spend over 12 months.
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => 
                value > 1000 ? `€ ${value.toLocaleString()}` : value
              }
            />
            <Bar 
              dataKey="invoiceCount" 
              fill="hsl(var(--chart-1) / 0.15)" 
              radius={[4, 4, 0, 0]}
            />
            <Area
              type="monotone"
              dataKey="totalSpend"
              fill="hsl(var(--chart-1) / 0.2)"
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="totalSpend"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">October 2025</span>
          <div className="space-y-1 text-right">
            <div className="text-sm">
              <span className="text-muted-foreground">Invoice count: </span>
              <span className="font-semibold text-foreground">47</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Total Spend: </span>
              <span className="font-semibold text-primary">€ 8,679.25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

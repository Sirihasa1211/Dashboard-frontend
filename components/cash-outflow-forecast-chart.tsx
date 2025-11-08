"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

const forecastData = [
  { range: "0-7 days", amount: 15000 },
  { range: "8-30 days", amount: 25000 },
  { range: "31-60 days", amount: 18000 },
  { range: "60+ days", amount: 42000 },
];

export function CashOutflowForecastChart() {
  return (
    <div className="bg-card rounded-lg border p-6" data-testid="chart-cash-outflow-forecast">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground" data-testid="text-chart-title">
          Cash Outflow Forecast
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Expected payment obligations grouped by due date ranges.
        </p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="range" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {forecastData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 3 ? "hsl(var(--chart-1))" : `hsl(var(--chart-1) / ${0.3 + (index * 0.2)})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

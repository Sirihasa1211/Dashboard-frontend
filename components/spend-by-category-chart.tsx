"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const categoryData = [
  { category: "Operations", value: 1000, color: "hsl(var(--chart-1))" },
  { category: "Marketing", value: 7250, color: "hsl(var(--chart-4))" },
  { category: "Facilities", value: 1000, color: "hsl(var(--chart-2))" },
];

export function SpendByCategoryChart() {
  return (
    <div className="bg-card rounded-lg border p-6" data-testid="chart-spend-by-category">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground" data-testid="text-chart-title">
          Spend by Category
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Distribution of spending across different categories.
        </p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value, entry: any) => (
                <span className="text-sm text-foreground">
                  {value} <span className="text-muted-foreground">€{entry.payload.value.toLocaleString()}</span>
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

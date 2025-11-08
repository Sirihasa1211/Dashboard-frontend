"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const vendorData = [
  { vendor: "AcmeCorp", spend: 8679.25, percentage: 43 },
  { vendor: "Test Solutions", spend: 7200, percentage: 36 },
  { vendor: "PrimeVendors", spend: 5800, percentage: 29 },
  { vendor: "DeltaServices", spend: 4100, percentage: 20 },
  { vendor: "OmegaLtd", spend: 2500, percentage: 12 },
  { vendor: "Global Supply", spend: 1800, percentage: 9 },
  { vendor: "OmegaInc", spend: 1200, percentage: 6 },
  { vendor: "OmegaLimited", spend: 800, percentage: 4 },
];

export function SpendByVendorChart() {
  return (
    <div className="bg-card rounded-lg border p-6" data-testid="chart-spend-by-vendor">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground" data-testid="text-chart-title">
          Spend by Vendor (Top 10)
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Vendor spend with cumulative percentage distribution.
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={vendorData} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <YAxis 
              type="category"
              dataKey="vendor" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="spend" radius={[0, 4, 4, 0]}>
              {vendorData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? "hsl(var(--chart-1))" : `hsl(var(--chart-2) / ${1 - (index * 0.1)})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Global Supply</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-primary">€ 8,679.25</div>
            <div className="text-xs text-muted-foreground">Vendor Spend:</div>
          </div>
        </div>
      </div>
    </div>
  );
}

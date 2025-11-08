import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface VendorSpendChartProps {
  data: Array<{
    vendor: string;
    spend: number;
  }>;
}

export function VendorSpendChart({ data }: VendorSpendChartProps) {
  return (
    <Card data-testid="card-vendor-spend">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Spend by Vendor (Top 10)</CardTitle>
        <p className="text-sm text-muted-foreground">Vendor spend with cumulative percentage distribution</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
            <YAxis 
              dataKey="vendor" 
              type="category" 
              width={120}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value) => `€${Number(value).toLocaleString()}`}
            />
            <Bar dataKey="spend" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

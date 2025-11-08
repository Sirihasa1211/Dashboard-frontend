import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface InvoiceTrendChartProps {
  data: Array<{
    month: string;
    invoiceCount: number;
    totalValue: number;
  }>;
}

export function InvoiceTrendChart({ data }: InvoiceTrendChartProps) {
  return (
    <Card data-testid="card-invoice-trend">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Invoice Volume + Value Trend</CardTitle>
        <p className="text-sm text-muted-foreground">Invoice count and total spend over 12 months</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="invoiceCount" 
              stroke="hsl(var(--chart-1))" 
              name="Invoice Count"
              strokeWidth={2}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="totalValue" 
              stroke="hsl(var(--chart-2))" 
              name="Total Value (€)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

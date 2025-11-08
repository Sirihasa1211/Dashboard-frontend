import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CashOutflowChartProps {
  data: Array<{
    date: string;
    amount: number;
  }>;
}

export function CashOutflowChart({ data }: CashOutflowChartProps) {
  return (
    <Card data-testid="card-cash-outflow">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Cash Outflow Forecast</CardTitle>
        <p className="text-sm text-muted-foreground">Expected payment obligations grouped by due date ranges</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value) => `€${Number(value).toLocaleString()}`}
            />
            <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

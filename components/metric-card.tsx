"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  trend: "up" | "down";
  sparklineData: number[];
  testId?: string;
}

export function MetricCard({ 
  title, 
  subtitle, 
  value, 
  change, 
  trend, 
  sparklineData,
  testId 
}: MetricCardProps) {
  const chartData = sparklineData.map((value, index) => ({ value, index }));
  
  return (
    <div className="bg-card rounded-lg border p-6" data-testid={testId}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground" data-testid={`text-${testId}-title`}>
            {title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5" data-testid={`text-${testId}-subtitle`}>
            {subtitle}
          </p>
        </div>
        <div className="h-12 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={trend === "up" ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-foreground" data-testid={`text-${testId}-value`}>
          {value}
        </h3>
        
        <div className={`flex items-center gap-1 text-sm font-medium ${
          trend === "up" ? "text-success" : "text-destructive"
        }`} data-testid={`text-${testId}-change`}>
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {change}
        </div>
      </div>
    </div>
  );
}

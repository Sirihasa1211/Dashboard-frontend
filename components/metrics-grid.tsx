import { TrendingUp, DollarSign, FileText, Users } from "lucide-react";
import { MetricCard } from "./metric-card";

export function MetricsGrid() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+15.3%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Total Invoices",
      value: "1,284",
      change: "-4.2%",
      trend: "down" as const,
      icon: FileText,
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "+2.4%",
      trend: "up" as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}

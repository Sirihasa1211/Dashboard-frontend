import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export function MetricCard({ title, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <p
          className={cn(
            "text-xs font-medium mt-1",
            trend === "up" ? "text-green-600" : "text-red-600"
          )}
        >
          {change} from last month
        </p>
      </div>
    </div>
  );
}

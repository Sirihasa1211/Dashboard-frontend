import { MetricCard } from '../metric-card';
import { Euro } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="p-8 bg-background">
      <MetricCard
        title="Total Spend (YTD)"
        value="€12,679.25"
        trend={{ value: 12.5, label: "from last month", isPositive: true }}
        icon={<Euro className="h-5 w-5" />}
      />
    </div>
  );
}

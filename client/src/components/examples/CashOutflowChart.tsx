import { CashOutflowChart } from '../cash-outflow-chart';

const mockData = [
  { date: "1-7 days", amount: 4500 },
  { date: "8-15 days", amount: 5200 },
  { date: "15-30 days", amount: 6800 },
  { date: "30+ days", amount: 7500 },
];

export default function CashOutflowChartExample() {
  return (
    <div className="p-8 bg-background">
      <CashOutflowChart data={mockData} />
    </div>
  );
}

import { InvoiceTrendChart } from '../invoice-trend-chart';

const mockData = [
  { month: "Jan", invoiceCount: 30, totalValue: 4209.33 },
  { month: "Feb", invoiceCount: 35, totalValue: 4750.25 },
  { month: "Mar", invoiceCount: 42, totalValue: 5100.50 },
  { month: "Apr", invoiceCount: 38, totalValue: 4890.75 },
  { month: "May", invoiceCount: 45, totalValue: 5350.00 },
  { month: "Jun", invoiceCount: 40, totalValue: 4980.25 },
];

export default function InvoiceTrendChartExample() {
  return (
    <div className="p-8 bg-background">
      <InvoiceTrendChart data={mockData} />
    </div>
  );
}

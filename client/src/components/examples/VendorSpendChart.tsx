import { VendorSpendChart } from '../vendor-spend-chart';

const mockData = [
  { vendor: "Phorix GmbH", spend: 736784 },
  { vendor: "Amazon", spend: 580000 },
  { vendor: "Two Inflow", spend: 520000 },
  { vendor: "Salesforce", spend: 490000 },
  { vendor: "Netherlands", spend: 450000 },
];

export default function VendorSpendChartExample() {
  return (
    <div className="p-8 bg-background">
      <VendorSpendChart data={mockData} />
    </div>
  );
}

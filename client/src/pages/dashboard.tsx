import { Euro, FileText, Upload, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { InvoiceTrendChart } from "@/components/invoice-trend-chart";
import { VendorSpendChart } from "@/components/vendor-spend-chart";
import { CategorySpendChart } from "@/components/category-spend-chart";
import { CashOutflowChart } from "@/components/cash-outflow-chart";
import { InvoicesTable } from "@/components/invoices-table";

// todo: remove mock functionality - Mock data for demonstration
const mockInvoiceTrend = [
  { month: "Jan", invoiceCount: 30, totalValue: 4209.33 },
  { month: "Feb", invoiceCount: 35, totalValue: 4750.25 },
  { month: "Mar", invoiceCount: 42, totalValue: 5100.50 },
  { month: "Apr", invoiceCount: 38, totalValue: 4890.75 },
  { month: "May", invoiceCount: 45, totalValue: 5350.00 },
  { month: "Jun", invoiceCount: 40, totalValue: 4980.25 },
  { month: "Jul", invoiceCount: 48, totalValue: 5620.33 },
  { month: "Aug", invoiceCount: 43, totalValue: 5230.50 },
  { month: "Sep", invoiceCount: 50, totalValue: 5890.75 },
  { month: "Oct", invoiceCount: 47, totalValue: 5540.00 },
  { month: "Nov", invoiceCount: 32, totalValue: 4679.25 },
  { month: "Dec", invoiceCount: 28, totalValue: 4200.00 },
];

const mockVendorSpend = [
  { vendor: "Phorix GmbH", spend: 736784 },
  { vendor: "Amazon", spend: 580000 },
  { vendor: "Two Inflow", spend: 520000 },
  { vendor: "Salesforce", spend: 490000 },
  { vendor: "Netherlands", spend: 450000 },
  { vendor: "Google", spend: 420000 },
  { vendor: "China", spend: 380000 },
  { vendor: "Global Supply", spend: 340000 },
  { vendor: "SAP", spend: 310000 },
  { vendor: "Oracle", spend: 280000 },
];

const mockCategorySpend = [
  { category: "Operations", value: 51000 },
  { category: "Marketing", value: 37250 },
  { category: "Facilities", value: 21500 },
];

const mockCashOutflow = [
  { date: "1-7 days", amount: 4500 },
  { date: "8-15 days", amount: 5200 },
  { date: "15-30 days", amount: 6800 },
  { date: "30+ days", amount: 7500 },
  { date: "60+ days", amount: 8200 },
];

const mockInvoices = [
  {
    id: "1",
    vendor: "Phorix GmbH",
    date: new Date("2025-08-19"),
    invoiceNumber: "19.08.2025",
    amount: 736784.02,
    status: "validated" as const,
  },
  {
    id: "2",
    vendor: "Phorix GmbH",
    date: new Date("2025-08-19"),
    invoiceNumber: "19.08.2025",
    amount: 736784.02,
    status: "validated" as const,
  },
  {
    id: "3",
    vendor: "Phorix GmbH",
    date: new Date("2025-08-19"),
    invoiceNumber: "19.08.2025",
    amount: 736784.02,
    status: "validated" as const,
  },
  {
    id: "4",
    vendor: "Phorix GmbH",
    date: new Date("2025-08-19"),
    invoiceNumber: "19.08.2025",
    amount: 736784.02,
    status: "processed" as const,
  },
  {
    id: "5",
    vendor: "Phorix GmbH",
    date: new Date("2025-08-19"),
    invoiceNumber: "19.08.2025",
    amount: 736784.02,
    status: "pending" as const,
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Spend (YTD)"
            value="€12,679.25"
            trend={{ value: 12.5, label: "from last month", isPositive: true }}
            icon={<Euro className="h-5 w-5" />}
          />
          <MetricCard
            title="Total Invoices Processed"
            value="64"
            trend={{ value: 8.2, label: "from last month", isPositive: true }}
            icon={<FileText className="h-5 w-5" />}
          />
          <MetricCard
            title="Documents Uploaded"
            value="17"
            trend={{ value: -3.1, label: "from last month", isPositive: false }}
            icon={<Upload className="h-5 w-5" />}
          />
          <MetricCard
            title="Average Invoice Value"
            value="€2,455.00"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <InvoiceTrendChart data={mockInvoiceTrend} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VendorSpendChart data={mockVendorSpend} />
          <CategorySpendChart data={mockCategorySpend} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <CashOutflowChart data={mockCashOutflow} />
        </div>

        <InvoicesTable invoices={mockInvoices} />
      </div>
    </div>
  );
}

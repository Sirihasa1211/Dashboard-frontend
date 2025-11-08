import { Euro, FileText, Upload, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/metric-card";
import { InvoiceTrendChart } from "@/components/invoice-trend-chart";
import { VendorSpendChart } from "@/components/vendor-spend-chart";
import { CategorySpendChart } from "@/components/category-spend-chart";
import { CashOutflowChart } from "@/components/cash-outflow-chart";
import { InvoicesTable } from "@/components/invoices-table";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardMetrics {
  totalSpend: number;
  totalInvoices: number;
  documentsUploaded: number;
  averageInvoiceValue: number;
}

interface VendorSpend {
  vendor: string;
  spend: number;
}

interface InvoiceTrend {
  month: string;
  invoiceCount: number;
  totalValue: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  invoiceTotal: string | null;
  status: string;
  vendorId: string | null;
}

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

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: vendorSpend, isLoading: vendorSpendLoading } = useQuery<VendorSpend[]>({
    queryKey: ["/api/dashboard/vendor-spend"],
  });

  const { data: invoiceTrend, isLoading: trendLoading } = useQuery<InvoiceTrend[]>({
    queryKey: ["/api/dashboard/invoice-trend"],
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/dashboard/invoices"],
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const transformedInvoices = invoices?.map((inv) => ({
    id: inv.id,
    vendor: inv.vendorId || "Unknown",
    date: inv.invoiceDate ? new Date(inv.invoiceDate) : new Date(),
    invoiceNumber: inv.invoiceNumber || "N/A",
    amount: parseFloat(inv.invoiceTotal || "0"),
    status: inv.status as "pending" | "processed" | "validated",
  })) || [];

  return (
    <div className="flex-1 overflow-auto" data-testid="page-dashboard">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </>
          ) : (
            <>
              <MetricCard
                title="Total Spend (YTD)"
                value={formatCurrency(metrics?.totalSpend || 0)}
                icon={<Euro className="h-5 w-5" />}
                data-testid="metric-total-spend"
              />
              <MetricCard
                title="Total Invoices Processed"
                value={String(metrics?.totalInvoices || 0)}
                icon={<FileText className="h-5 w-5" />}
                data-testid="metric-total-invoices"
              />
              <MetricCard
                title="Documents Uploaded"
                value={String(metrics?.documentsUploaded || 0)}
                icon={<Upload className="h-5 w-5" />}
                data-testid="metric-documents-uploaded"
              />
              <MetricCard
                title="Average Invoice Value"
                value={formatCurrency(metrics?.averageInvoiceValue || 0)}
                icon={<TrendingUp className="h-5 w-5" />}
                data-testid="metric-average-invoice"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {trendLoading ? (
            <Skeleton className="h-96" />
          ) : (
            <InvoiceTrendChart data={invoiceTrend || []} />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vendorSpendLoading ? (
            <Skeleton className="h-96" />
          ) : (
            <VendorSpendChart data={vendorSpend || []} />
          )}
          <CategorySpendChart data={mockCategorySpend} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <CashOutflowChart data={mockCashOutflow} />
        </div>

        {invoicesLoading ? (
          <Skeleton className="h-96" />
        ) : (
          <InvoicesTable invoices={transformedInvoices} />
        )}
      </div>
    </div>
  );
}

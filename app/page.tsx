import { Sidebar } from "@/components/sidebar";
import { MetricsGrid } from "@/components/metrics-grid";
import { ChartGrid } from "@/components/chart-grid";
import { InvoicesTable } from "@/components/invoices-table";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your key metrics and data insights
            </p>
          </div>
          
          <MetricsGrid />
          <ChartGrid />
          <InvoicesTable />
        </div>
      </main>
    </div>
  );
}

"use client";

import { MetricCard } from "@/components/metric-card";
import { InvoiceVolumeTrendChart } from "@/components/invoice-volume-trend-chart";
import { SpendByVendorChart } from "@/components/spend-by-vendor-chart";
import { SpendByCategoryChart } from "@/components/spend-by-category-chart";
import { CashOutflowForecastChart } from "@/components/cash-outflow-forecast-chart";
import { InvoicesByVendorTable } from "@/components/invoices-by-vendor-table";

const sparklineData1 = [8, 12, 15, 10, 14, 18, 16, 20, 18, 22];
const sparklineData2 = [5, 8, 10, 12, 15, 13, 16, 18, 16, 20];
const sparklineData3 = [20, 18, 15, 12, 10, 8, 7, 5, 4, 3];
const sparklineData4 = [10, 12, 11, 14, 16, 18, 20, 19, 22, 24];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Spend"
          subtitle="(YTD)"
          value="€ 12,679.25"
          change="+8.2% from last month"
          trend="up"
          sparklineData={sparklineData1}
          testId="metric-total-spend"
        />
        
        <MetricCard
          title="Total Invoices Processed"
          subtitle=""
          value="64"
          change="+8.2% from last month"
          trend="up"
          sparklineData={sparklineData2}
          testId="metric-invoices-processed"
        />
        
        <MetricCard
          title="Documents Uploaded"
          subtitle="This Month"
          value="17"
          change="-8 less from last month"
          trend="down"
          sparklineData={sparklineData3}
          testId="metric-documents-uploaded"
        />
        
        <MetricCard
          title="Average Invoice Value"
          subtitle=""
          value="€ 2,455,00"
          change="+8.2% from last month"
          trend="up"
          sparklineData={sparklineData4}
          testId="metric-avg-invoice-value"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InvoiceVolumeTrendChart />
        <SpendByVendorChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpendByCategoryChart />
        <CashOutflowForecastChart />
        <InvoicesByVendorTable />
      </div>
    </div>
  );
}

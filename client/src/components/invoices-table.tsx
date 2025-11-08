import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { format } from "date-fns";

interface Invoice {
  id: string;
  vendor: string;
  date: Date;
  invoiceNumber: string;
  amount: number;
  status: "validated" | "pending" | "processed";
}

interface InvoicesTableProps {
  invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "validated":
        return "bg-chart-2 text-white";
      case "pending":
        return "bg-chart-4 text-white";
      case "processed":
        return "bg-chart-1 text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card data-testid="card-invoices-table">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-lg font-medium">Invoices by Vendor</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              data-testid="input-search-invoices"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Vendor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    # Invoices
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Net Value
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Invoice #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInvoices.map((invoice) => (
                  <tr 
                    key={invoice.id} 
                    className="hover-elevate"
                    data-testid={`row-invoice-${invoice.id}`}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{invoice.vendor}</td>
                    <td className="px-4 py-3 text-sm font-mono">1</td>
                    <td className="px-4 py-3 text-sm font-mono" data-testid={`text-amount-${invoice.id}`}>
                      €{invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {format(invoice.date, "dd.MM.yyyy")}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono">{invoice.invoiceNumber}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(invoice.status)} data-testid={`badge-status-${invoice.id}`}>
                        {invoice.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

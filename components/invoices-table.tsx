interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
}

const invoices: Invoice[] = [
  { id: "INV-001", vendor: "Acme Corp", amount: 1250, status: "paid", date: "2024-01-15" },
  { id: "INV-002", vendor: "TechSolutions", amount: 850, status: "pending", date: "2024-01-20" },
  { id: "INV-003", vendor: "Global Inc", amount: 2100, status: "paid", date: "2024-01-22" },
  { id: "INV-004", vendor: "DataCo", amount: 950, status: "overdue", date: "2024-01-10" },
  { id: "INV-005", vendor: "CloudServe", amount: 1500, status: "pending", date: "2024-01-25" },
];

export function InvoicesTable() {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Recent Invoices</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Track and manage your latest invoices
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {invoice.vendor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  ${invoice.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

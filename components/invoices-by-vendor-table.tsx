"use client";

const invoiceData = [
  { vendor: "Phunix GmbH", date: "19.08.2025", amount: "€ 736.78.44,00" },
  { vendor: "Phunix GmbH", date: "19.08.2025", amount: "€ 736.78.44,00" },
  { vendor: "Phunix GmbH", date: "19.08.2025", amount: "€ 736.78.44,00" },
  { vendor: "Phunix GmbH", date: "19.08.2025", amount: "€ 736.78.44,00" },
  { vendor: "Phunix GmbH", date: "19.08.2025", amount: "€ 736.78.44,00" },
  { vendor: "Phunix GmbH", date: "19.08.2025", amount: "€ 736.78.44,00" },
  { vendor: "Phunix GmbH", date: "19.08.2025", amount: "€ 736.78.44,00" },
];

export function InvoicesByVendorTable() {
  return (
    <div className="bg-card rounded-lg border p-6" data-testid="table-invoices-by-vendor">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground" data-testid="text-table-title">
          Invoices by Vendor
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Top vendors by invoice count and net value.
        </p>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left text-xs font-semibold text-muted-foreground pb-3" data-testid="text-header-vendor">
                Vendor
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground pb-3" data-testid="text-header-invoices">
                # Invoices
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground pb-3" data-testid="text-header-net-value">
                Net Value
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice, index) => (
              <tr 
                key={index} 
                className="border-b last:border-0"
                data-testid={`row-invoice-${index}`}
              >
                <td className="py-3 text-sm text-foreground" data-testid={`text-vendor-${index}`}>
                  {invoice.vendor}
                </td>
                <td className="py-3 text-sm text-muted-foreground" data-testid={`text-date-${index}`}>
                  {invoice.date}
                </td>
                <td className="py-3 text-sm text-right font-medium text-foreground" data-testid={`text-amount-${index}`}>
                  {invoice.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { InvoicesTable } from '../invoices-table';

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
    vendor: "Amazon",
    date: new Date("2025-08-18"),
    invoiceNumber: "18.08.2025",
    amount: 580000.00,
    status: "processed" as const,
  },
  {
    id: "3",
    vendor: "Two Inflow",
    date: new Date("2025-08-17"),
    invoiceNumber: "17.08.2025",
    amount: 520000.00,
    status: "pending" as const,
  },
];

export default function InvoicesTableExample() {
  return (
    <div className="p-8 bg-background">
      <InvoicesTable invoices={mockInvoices} />
    </div>
  );
}

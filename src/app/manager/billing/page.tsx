"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate } from "@/lib/utils";
import { invoices } from "@/lib/dummy-data/invoices";
import { Invoice } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CreditCard, CheckCircle, AlertTriangle, DollarSign, Download } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const agingReport = [
  { range: "0–30 days", amount: 85000, client: "Mahindra Logistics", color: "#16A34A", width: "50%" },
  { range: "31–60 days", amount: 124000, client: "Reliance Industries", color: "#D97706", width: "75%" },
  { range: "60–90 days", amount: 85000, client: "Tata Steel", color: "#FF6B00", width: "50%" },
  { range: "90+ days", amount: 30000, client: "Asian Paints", color: "#DC2626", width: "25%" },
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoiceList, setInvoiceList] = useState(invoices);

  const tabs = ["All Invoices", "Overdue", "Pending", "Paid"];

  const filteredInvoices = invoiceList.filter((inv) => {
    if (activeTab === "All Invoices" || activeTab === "All") return true;
    return inv.status === activeTab;
  });

  const totalBilled = invoiceList.reduce((s, i) => s + i.amount, 0);
  const collected = invoiceList.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = totalBilled - collected;
  const overdue60 = invoiceList.filter(i => i.status === "Overdue" && i.daysOutstanding >= 60).reduce((s, i) => s + i.amount, 0);

  const handleMarkPaid = () => {
    if (selectedInvoice) {
      setInvoiceList(prev => prev.map(inv => inv.id === selectedInvoice.id ? { ...inv, status: "Paid" as const, daysOutstanding: 0 } : inv));
      toast.success(`${selectedInvoice.invoiceNumber} marked as paid!`);
      setConfirmDialogOpen(false);
    }
  };

  const columns: ColumnDef<Invoice>[] = [
    { accessorKey: "invoiceNumber", header: "Invoice No.", cell: ({ row }) => <span className="font-mono text-xs font-semibold">{row.original.invoiceNumber}</span> },
    { accessorKey: "lrNumber", header: "LR No.", cell: ({ row }) => <span className="font-mono text-xs">{row.original.lrNumber}</span> },
    { accessorKey: "clientName", header: "Client", cell: ({ row }) => <span className="text-xs max-w-[140px] truncate block">{row.original.clientName}</span> },
    { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-xs">{formatDate(row.original.date)}</span> },
    { accessorKey: "dueDate", header: "Due Date", cell: ({ row }) => <span className="text-xs">{formatDate(row.original.dueDate)}</span> },
    { accessorKey: "amount", header: "Amount", cell: ({ row }) => <span className="font-mono text-xs font-semibold">{formatCurrency(row.original.amount)}</span> },
    { accessorKey: "daysOutstanding", header: "Days Out.", cell: ({ row }) => <span className="font-mono text-xs">{row.original.daysOutstanding}d</span> },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button onClick={() => toast.success(`📄 ${row.original.invoiceNumber}.pdf downloaded`)} className="p-1.5 rounded-lg hover:bg-primary-light transition-colors" title="Download"><Download className="h-4 w-4 text-primary" /></button>
          {row.original.status !== "Paid" && (
            <button onClick={() => { setSelectedInvoice(row.original); setConfirmDialogOpen(true); }} className="text-xs font-medium text-success border border-success rounded-full px-2.5 py-1 hover:bg-success/15 transition-colors">Paid</button>
          )}
          {row.original.status === "Overdue" && (
            <button onClick={() => toast.success(`Reminder sent to ${row.original.clientName}`)} className="text-xs font-medium text-primary hover:text-primary-dark">Remind</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Billing & Invoices" />

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
        <StatCard title="Total Billed" value={formatCurrency(totalBilled)} icon={CreditCard} iconBg="bg-[#FF6B00]" badgeText={`${invoiceList.length} invoices`} />
        <StatCard title="Collected" value={formatCurrency(collected)} icon={CheckCircle} iconBg="bg-[#16A34A]" badgeText="On track" />
        <StatCard title="Outstanding" value={formatCurrency(outstanding)} icon={DollarSign} iconBg="bg-[#D97706]" badgeText={`${invoiceList.filter(i => i.status !== "Paid").length} pending`} />
        <StatCard title="Overdue (60d+)" value={formatCurrency(overdue60)} icon={AlertTriangle} iconBg="bg-[#DC2626]" badgeText="Needs attention" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-muted border border-border p-1 w-fit">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-card text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredInvoices} searchable searchPlaceholder="Search invoices..." />

      {/* Aging Report */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-text-primary mb-4">Outstanding Invoice Aging</h2>
        <div className="space-y-4">
          {agingReport.map((item) => (
            <div key={item.range} className="flex items-center gap-4">
              <div className="w-28 text-xs font-medium text-text-secondary shrink-0">{item.range}</div>
              <div className="flex-1">
                <div className="h-8 rounded-lg flex items-center px-3" style={{ backgroundColor: `${item.color}15`, width: item.width }}>
                  <span className="text-xs font-semibold whitespace-nowrap" style={{ color: item.color }}>{formatCurrency(item.amount)} — {item.client}</span>
                </div>
              </div>
              <button onClick={() => toast.success(`Reminder sent to ${item.client}`)} className="text-xs font-medium text-primary hover:text-primary-dark shrink-0">Follow Up</button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Payment</DialogTitle></DialogHeader>
          <p className="text-sm text-text-secondary">Mark <span className="font-semibold text-text-primary">{selectedInvoice?.invoiceNumber}</span> ({formatCurrency(selectedInvoice?.amount || 0)}) as paid?</p>
          <DialogFooter className="gap-2">
            <button onClick={() => setConfirmDialogOpen(false)} className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text-secondary hover:bg-muted">Cancel</button>
            <button onClick={handleMarkPaid} className="rounded-full bg-success px-5 py-2 text-sm font-medium text-white hover:bg-success/80 active:scale-95 transition-all">Mark as Paid</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

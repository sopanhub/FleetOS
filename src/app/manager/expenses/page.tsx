"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate } from "@/lib/utils";
import { expenses } from "@/lib/dummy-data/expenses";
import { Expense } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Receipt, Fuel, Plus } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EXPENSE_TYPE_COLORS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Expense breakdown data
const expenseBreakdown = [
  { type: "Diesel", amount: 121200 },
  { type: "Toll", amount: 11000 },
  { type: "Driver Batta", amount: 8500 },
  { type: "Loading", amount: 3000 },
  { type: "Repair", amount: 8200 },
  { type: "Tyre", amount: 4500 },
  { type: "Misc", amount: 2800 },
];

const columns: ColumnDef<Expense>[] = [
  { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-xs">{formatDate(row.original.date)}</span> },
  { accessorKey: "lrNumber", header: "Trip / LR No.", cell: ({ row }) => <span className="font-mono text-xs font-medium">{row.original.lrNumber}</span> },
  { accessorKey: "vehicleNumber", header: "Vehicle", cell: ({ row }) => <span className="font-mono text-xs">{row.original.vehicleNumber}</span> },
  { accessorKey: "driverName", header: "Driver", cell: ({ row }) => <span className="text-xs">{row.original.driverName}</span> },
  {
    accessorKey: "type",
    header: "Expense Type",
    cell: ({ row }) => {
      const colors = EXPENSE_TYPE_COLORS[row.original.type] || { bg: "bg-gray-100", text: "text-gray-700" };
      const getDarkClasses = (bg: string) => {
        const parts = bg.split("-");
        if (parts.length >= 2) {
          const color = parts[1];
          if (color === "gray" || color === "zinc" || color === "slate") {
            return "dark:bg-zinc-800/40 dark:text-zinc-400";
          }
          return `dark:bg-${color}-950/40 dark:text-${color}-400`;
        }
        return "dark:bg-zinc-800/40 dark:text-zinc-400";
      };
      return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text} ${getDarkClasses(colors.bg)}`}>
          {row.original.type}
        </span>
      );
    },
  },
  { accessorKey: "amount", header: "Amount", cell: ({ row }) => <span className="font-mono text-xs font-semibold text-text-primary">{formatCurrency(row.original.amount)}</span> },
  { id: "receipt", header: "Receipt", cell: ({ row }) => row.original.receipt ? <button className="text-xs text-primary font-medium hover:text-primary-dark">View</button> : <span className="text-xs text-text-muted">—</span> },
  { accessorKey: "addedBy", header: "Added By", cell: ({ row }) => <span className="text-xs text-text-secondary">{row.original.addedBy}</span> },
];

export default function ExpensesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const dieselCost = expenses.filter(e => e.type === "Diesel").reduce((sum, e) => sum + e.amount, 0);
  const otherCost = totalExpenses - dieselCost;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        actions={
          <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-1.5 rounded-full bg-[#FF6B00] px-5 py-2 text-sm font-medium text-white hover:bg-[#CC5500] active:scale-95 transition-all">
            <Plus className="h-4 w-4" /> Add Expense
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Expenses This Month" value={formatCurrency(totalExpenses)} icon={Receipt} iconBg="bg-[#FF6B00]" badgeText={`${expenses.length} entries`} />
        <StatCard title="Diesel Cost" value={formatCurrency(dieselCost)} trend={`${Math.round((dieselCost / totalExpenses) * 100)}%`} icon={Fuel} iconBg="bg-[#D97706]" badgeText="Largest category" />
        <StatCard title="Other Expenses" value={formatCurrency(otherCost)} icon={Receipt} iconBg="bg-[#2563EB]" badgeText="Toll, Batta, Repair etc." />
      </div>

      {/* Table */}
      <DataTable columns={columns} data={expenses} searchable searchPlaceholder="Search by trip, vehicle, or driver..." />

      {/* Chart */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-text-primary mb-4">Expense Breakdown</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={expenseBreakdown}>
            <XAxis dataKey="type" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(value: unknown) => formatCurrency(Number(value))} contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)" }} />
            <Bar dataKey="amount" fill="#FF6B00" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Add Expense Sheet */}
      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl">
          <SheetHeader><SheetTitle className="text-text-primary">Add Expense</SheetTitle></SheetHeader>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Expense added successfully!"); setIsAddOpen(false); }} className="space-y-6 mt-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Select Trip</label>
                  <Select><SelectTrigger className="rounded-xl border-border"><SelectValue placeholder="Search by LR number..." /></SelectTrigger>
                    <SelectContent>{["LR/2025/001","LR/2025/002","LR/2025/003","LR/2025/004","LR/2025/005"].map(lr => <SelectItem key={lr} value={lr}>{lr}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Expense Type</label>
                  <Select><SelectTrigger className="rounded-xl border-border"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>{["Diesel","Toll","Driver Batta","Loading Charges","Repair","Tyre","Misc"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Amount (₹)</label>
                  <input type="number" placeholder="Enter amount" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Notes</label>
                  <textarea placeholder="Optional notes..." rows={4} className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary resize-none" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-dashed border-border bg-background p-6 text-center">
              <p className="text-sm text-text-muted">📎 Drop receipt here or click to upload</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border pb-12">
              <button type="button" onClick={() => setIsAddOpen(false)} className="flex-1 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark active:scale-95 transition-all">Submit Expense</button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

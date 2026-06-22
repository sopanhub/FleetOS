"use client";

import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { trips } from "@/lib/dummy-data/trips";
import { Route as RouteIcon, FileCheck, Wallet, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Kanban columns
const kanbanColumns = [
  { title: "Created", color: "#FF6B00", status: "Created" },
  { title: "In Transit", color: "#2563EB", status: "In Transit" },
  { title: "Delivered", color: "#16A34A", status: "Delivered" },
  { title: "Billed", color: "#666666", status: "Billed" },
];

// Driver advance data
const driverAdvances = [
  { name: "Ramesh Jadhav", initials: "RJ", given: 15000, spent: 12400, balance: 2600, owesCompany: true },
  { name: "Suresh Patil", initials: "SP", given: 25000, spent: 28500, balance: -3500, owesCompany: false },
  { name: "Arun Deshmukh", initials: "AD", given: 12000, spent: 11800, balance: 200, owesCompany: true },
  { name: "Vijay More", initials: "VM", given: 15000, spent: 16200, balance: -1200, owesCompany: false },
];

// Billing queue
const billingQueue = [
  { client: "Flipkart Supply Chain", lr: "LR/2025/005", amount: 45000 },
  { client: "Reliance Industries Ltd", lr: "LR/2025/013", amount: 82000 },
  { client: "Asian Paints Pvt Ltd", lr: "LR/2025/010", amount: 18000 },
];

// Reminders
const reminders = [
  { id: 1, dot: "bg-red-500", entity: "MH04 AB 1234", message: "Insurance expires in 3 days" },
  { id: 2, dot: "bg-yellow-500", entity: "Ramesh Jadhav", message: "License expires in 12 days" },
  { id: 3, dot: "bg-yellow-500", entity: "MH12 EF 9012", message: "Service due in 800 km" },
  { id: 4, dot: "bg-green-500", entity: "MH46 GH 3456", message: "Permit renewed ✓" },
  { id: 5, dot: "bg-red-500", entity: "MH04 CD 5678", message: "Fitness cert expires in 5 days" },
];

export default function ManagerDashboard() {
  const router = useRouter();

  const tripsByStatus = (status: string) =>
    trips.filter((t) => t.status === status);

  const recentTrips = trips.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">
          Good morning, Priya 👋
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Active Trips Today" value="9" icon={RouteIcon} iconBg="bg-primary" badgeText="4 vehicles on road" />
        <StatCard title="Pending PODs" value="3" icon={FileCheck} iconBg="bg-[#D97706]" badgeText="Awaiting confirmation" />
        <StatCard title="Driver Advance Pending" value="₹47,200" icon={Wallet} iconBg="bg-danger" badgeText="3 drivers pending settle" />
        <StatCard title="Invoices to Generate" value="5" icon={FileText} iconBg="bg-[#2563EB]" badgeText="POD received" />
      </div>

      {/* Live Trip Board */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-text-primary">Live Trip Board</h2>
          <button
            onClick={() => router.push("/manager/trips")}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            Create New Trip
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => {
            const colTrips = tripsByStatus(col.status);
            return (
              <div key={col.status} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
                  <h3 className="text-sm font-semibold text-text-primary">{col.title}</h3>
                  <span className="text-xs text-text-muted">({colTrips.length})</span>
                </div>
                <div className="space-y-2">
                  {colTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="rounded-xl border border-border bg-background p-3 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          {trip.vehicleNumber}
                        </span>
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
                      </div>
                      <p className="text-xs text-text-secondary">{trip.driverName}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {trip.from} → {trip.to}
                      </p>
                      <p className="text-xs font-mono font-medium text-text-primary mt-1">
                        {formatCurrency(trip.freight)}
                      </p>
                    </div>
                  ))}
                  {colTrips.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border p-4 text-center">
                      <p className="text-xs text-text-muted">No trips</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3: Recent LR + Driver Advance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent LR / Trips */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Recent LR / Trips</h2>
            <Link href="/manager/trips" className="text-sm text-primary font-medium hover:text-primary-dark">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-text-secondary uppercase pb-2">LR No.</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase pb-2">Route</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase pb-2">Vehicle</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase pb-2">Status</th>
                  <th className="text-right text-xs font-medium text-text-secondary uppercase pb-2">Freight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentTrips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-primary-light transition-colors">
                    <td className="py-2.5 font-mono text-xs font-medium">{trip.lrNumber}</td>
                    <td className="py-2.5 text-xs text-text-secondary">{trip.from} → {trip.to}</td>
                    <td className="py-2.5 font-mono text-xs">{trip.vehicleNumber}</td>
                    <td className="py-2.5"><StatusBadge status={trip.status} /></td>
                    <td className="py-2.5 text-right font-mono text-xs font-medium">{formatCurrency(trip.freight)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Driver Advance Ledger */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-text-primary mb-4">Driver Advance Ledger</h2>
          <div className="space-y-3">
            {driverAdvances.map((driver) => (
              <div
                key={driver.name}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary text-xs font-semibold">
                  {driver.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{driver.name}</p>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-xs text-text-muted">Given: {formatCurrency(driver.given)}</span>
                    <span className="text-xs text-text-muted">Spent: {formatCurrency(driver.spent)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-mono font-semibold ${driver.balance >= 0 ? "text-success" : "text-danger"}`}>
                    {driver.balance >= 0 ? "" : "-"}{formatCurrency(Math.abs(driver.balance))}
                  </p>
                  <span className="text-xs text-text-muted">Balance</span>
                </div>
                <button className="text-xs font-medium text-primary border border-primary rounded-full px-3 py-1 hover:bg-primary-light transition-colors">
                  Settle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Reminders + Billing Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Reminders */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Upcoming Reminders</h2>
          </div>
          <div className="space-y-3">
            {reminders.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-muted/50 transition-colors">
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.dot}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-text-primary">{item.entity}</span>
                  <span className="text-sm text-text-secondary"> — {item.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Queue */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-text-primary mb-1">Ready to Invoice</h2>
          <p className="text-xs text-text-muted mb-4">POD received — click to generate bill</p>
          <div className="space-y-3">
            {billingQueue.map((item) => (
              <div
                key={item.lr}
                className="flex items-center justify-between rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.client}</p>
                  <p className="text-xs text-text-muted font-mono mt-0.5">{item.lr} · {formatCurrency(item.amount)}</p>
                </div>
                <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white hover:bg-primary-dark active:scale-95 transition-all">
                  Generate Invoice
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

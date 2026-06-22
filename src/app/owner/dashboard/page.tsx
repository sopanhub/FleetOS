"use client";

import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency } from "@/lib/utils";
import { trips } from "@/lib/dummy-data/trips";
import { ColumnDef } from "@tanstack/react-table";
import { Trip } from "@/types";
import {
  IndianRupee,
  Truck,
  AlertCircle,
  TrendingUp,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";

// Vehicle P&L data
const vehiclePLData = [
  { name: "AB 1234", revenue: 248000, cost: 156800 },
  { name: "CD 5678", revenue: 372000, cost: 224000 },
  { name: "EF 9012", revenue: 190000, cost: 124000 },
  { name: "GH 3456", revenue: 136000, cost: 84000 },
  { name: "JK 7890", revenue: 290000, cost: 178000 },
  { name: "LM 2345", revenue: 224000, cost: 142000 },
  { name: "NP 6789", revenue: 68000, cost: 56000 },
  { name: "QR 0123", revenue: 90000, cost: 64000 },
];

// Fleet status data
const fleetStatusData = [
  { name: "Active", value: 4, color: "#FF6B00" },
  { name: "In Transit", value: 2, color: "#2563EB" },
  { name: "In Maintenance", value: 1, color: "#D97706" },
  { name: "Idle", value: 1, color: "#AAAAAA" },
];

// Aging report data
const agingData = [
  { range: "0–30 days", amount: 85000, count: 2, color: "#16A34A", client: "Mahindra Logistics" },
  { range: "31–60 days", amount: 124000, count: 1, color: "#D97706", client: "Reliance Industries" },
  { range: "60+ days", amount: 115000, count: 1, color: "#DC2626", client: "Asian Paints / Tata Steel" },
];

// Reminders
const reminders = [
  { id: 1, dot: "bg-red-500", entity: "MH04 AB 1234", message: "Insurance expires in 3 days", urgent: true },
  { id: 2, dot: "bg-yellow-500", entity: "Ramesh Jadhav", message: "License expires in 12 days", urgent: false },
  { id: 3, dot: "bg-yellow-500", entity: "MH12 EF 9012", message: "Service due in 800 km", urgent: false },
  { id: 4, dot: "bg-green-500", entity: "MH46 GH 3456", message: "Permit renewed ✓", urgent: false },
  { id: 5, dot: "bg-red-500", entity: "MH04 CD 5678", message: "Fitness cert expires in 5 days", urgent: true },
];

// Recent trips columns
const recentTripsColumns: ColumnDef<Trip>[] = [
  { accessorKey: "lrNumber", header: "LR No.", cell: ({ row }) => <span className="font-mono text-sm font-medium text-text-primary">{row.original.lrNumber}</span> },
  { accessorKey: "vehicleNumber", header: "Vehicle", cell: ({ row }) => <span className="font-mono text-xs text-text-primary">{row.original.vehicleNumber}</span> },
  { accessorKey: "driverName", header: "Driver", cell: ({ row }) => <span className="text-text-primary">{row.original.driverName}</span> },
  { id: "route", header: "Route", cell: ({ row }) => <span className="text-text-secondary">{row.original.from} → {row.original.to}</span> },
  { accessorKey: "clientName", header: "Client", cell: ({ row }) => <span className="max-w-[140px] truncate block text-text-primary">{row.original.clientName}</span> },
  { accessorKey: "freight", header: "Freight", cell: ({ row }) => <span className="font-mono text-text-primary">{formatCurrency(row.original.freight)}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <button className="flex items-center gap-1 rounded-full border border-primary px-3 py-1 text-xs font-medium text-primary hover:bg-primary-light transition-colors">
        <Eye className="h-3 w-3" /> View
      </button>
    ),
  },
];

export default function OwnerDashboard() {
  const recentTrips = trips.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">
          Good morning, Rajesh 👋
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

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Total Revenue This Month"
          value="₹14,82,500"
          trend="+12% vs last month"
          trendUp={true}
          icon={IndianRupee}
          iconBg="bg-primary"
          badgeText="23 trips completed"
        />
        <StatCard
          title="Fleet Utilization"
          value="87%"
          trend="+5%"
          trendUp={true}
          icon={Truck}
          iconBg="bg-success"
          badgeText="7 of 8 vehicles active"
        />
        <StatCard
          title="Outstanding Dues"
          value="₹3,24,000"
          trend="4 invoices overdue"
          icon={AlertCircle}
          iconBg="bg-danger"
          badgeText="Oldest: 62 days"
        />
        <StatCard
          title="Net Profit (Est.)"
          value="₹2,18,400"
          trend="+8.2% margin"
          trendUp={true}
          icon={TrendingUp}
          iconBg="bg-[#2563EB]"
          badgeText="After all costs"
        />
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Vehicle-wise P&L */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Vehicle-wise P&L</h2>
            <div className="flex gap-1 rounded-xl bg-muted p-1">
              {["This Month", "Last 3M", "This Year"].map((period, i) => (
                <button
                  key={period}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    i === 0
                      ? "bg-background text-primary shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={vehiclePLData} barCategoryGap="20%">
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip
                formatter={(value: unknown) => formatCurrency(Number(value))}
                contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)" }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="revenue" name="Revenue" fill="#FF6B00" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" name="Total Cost" fill="#52525b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fleet Status Ring */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-text-primary mb-4">Fleet Status</h2>
          <div className="relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={fleetStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {fleetStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: "-10px" }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">8</p>
                <p className="text-xs text-text-secondary">Vehicles</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {fleetStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-text-secondary">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Aging Report + Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Aging Report */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Aging Report — Quick View</h2>
            <Link href="/owner/reports" className="text-sm text-primary font-medium hover:text-primary-dark">
              View Full Report
            </Link>
          </div>
          <div className="space-y-3">
            {agingData.map((item) => (
              <div key={item.range} className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-text-secondary shrink-0">{item.range}</div>
                <div className="flex-1">
                  <div className="h-7 rounded-lg flex items-center px-3" style={{ backgroundColor: `${item.color}18`, width: `${Math.min(100, (item.amount / 130000) * 100)}%` }}>
                    <span className="text-xs font-semibold" style={{ color: item.color }}>
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-text-muted shrink-0">({item.count})</span>
                <button className="text-xs text-primary font-medium hover:text-primary-dark shrink-0">
                  Follow Up
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Reminders & Alerts</h2>
            <Link href="/owner/settings" className="text-sm text-primary font-medium hover:text-primary-dark">
              Manage
            </Link>
          </div>
          <div className="space-y-3">
            {reminders.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-muted/50 transition-colors"
              >
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.dot}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-text-primary">{item.entity}</span>
                  <span className="text-sm text-text-secondary"> — {item.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Trips */}
      <div>
        <DataTable
          columns={recentTripsColumns}
          data={recentTrips}
          pageSize={5}
          showPagination={false}
          footerText={`Showing 5 of ${trips.length} trips`}
          footerLink={{ label: "View All →", onClick: () => {} }}
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatCurrency } from "@/lib/utils";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Fleet P&L Data
const fleetPL = [
  { vehicle: "MH04 AB 1234", trips: 14, revenue: 496000, diesel: 168000, maintenance: 42000, tyre: 24000, other: 28000, totalCost: 262000, netProfit: 234000, margin: 47.2, perKm: 16.8 },
  { vehicle: "MH04 CD 5678", trips: 10, revenue: 744000, diesel: 280000, maintenance: 65000, tyre: 36000, other: 42000, totalCost: 423000, netProfit: 321000, margin: 43.1, perKm: 15.2 },
  { vehicle: "MH12 EF 9012", trips: 12, revenue: 380000, diesel: 135000, maintenance: 38000, tyre: 22000, other: 18000, totalCost: 213000, netProfit: 167000, margin: 43.9, perKm: 14.9 },
  { vehicle: "MH46 GH 3456", trips: 16, revenue: 272000, diesel: 96000, maintenance: 28000, tyre: 16000, other: 15000, totalCost: 155000, netProfit: 117000, margin: 43.0, perKm: 13.6 },
  { vehicle: "MH14 JK 7890", trips: 8, revenue: 580000, diesel: 210000, maintenance: 52000, tyre: 32000, other: 38000, totalCost: 332000, netProfit: 248000, margin: 42.8, perKm: 15.8 },
  { vehicle: "MH04 LM 2345", trips: 11, revenue: 448000, diesel: 158000, maintenance: 45000, tyre: 20000, other: 22000, totalCost: 245000, netProfit: 203000, margin: 45.3, perKm: 15.1 },
  { vehicle: "MH12 NP 6789", trips: 6, revenue: 136000, diesel: 52000, maintenance: 18000, tyre: 10000, other: 8000, totalCost: 88000, netProfit: 48000, margin: 35.3, perKm: 19.2 },
  { vehicle: "MH46 QR 0123", trips: 4, revenue: 180000, diesel: 72000, maintenance: 22000, tyre: 14000, other: 12000, totalCost: 120000, netProfit: 60000, margin: 33.3, perKm: 17.5 },
];

const totalRow = {
  trips: fleetPL.reduce((s, r) => s + r.trips, 0),
  revenue: fleetPL.reduce((s, r) => s + r.revenue, 0),
  diesel: fleetPL.reduce((s, r) => s + r.diesel, 0),
  maintenance: fleetPL.reduce((s, r) => s + r.maintenance, 0),
  tyre: fleetPL.reduce((s, r) => s + r.tyre, 0),
  other: fleetPL.reduce((s, r) => s + r.other, 0),
  totalCost: fleetPL.reduce((s, r) => s + r.totalCost, 0),
  netProfit: fleetPL.reduce((s, r) => s + r.netProfit, 0),
};

const chartData = fleetPL.map(r => ({
  name: r.vehicle.split(" ").slice(1).join(" "),
  revenue: r.revenue,
  cost: r.totalCost,
}));

const donutData = [
  { name: "Diesel", value: totalRow.diesel, color: "#FF6B00" },
  { name: "Driver", value: Math.round(totalRow.totalCost * 0.12), color: "#2563EB" },
  { name: "Maintenance", value: totalRow.maintenance, color: "#D97706" },
  { name: "Tyre", value: totalRow.tyre, color: "#16A34A" },
  { name: "Other", value: totalRow.other, color: "#AAAAAA" },
];

const costPerKmData = fleetPL.map(r => ({
  vehicle: r.vehicle.split(" ").slice(1).join(" "),
  costPerKm: r.perKm,
})).sort((a, b) => b.costPerKm - a.costPerKm);

const topCategories = [
  { category: "Diesel", total: totalRow.diesel, pct: 50, vsPrev: "+8%" },
  { category: "Maintenance", total: totalRow.maintenance, pct: 15, vsPrev: "-3%" },
  { category: "Tyre", total: totalRow.tyre, pct: 10, vsPrev: "+12%" },
  { category: "Driver", total: Math.round(totalRow.totalCost * 0.12), pct: 12, vsPrev: "+2%" },
  { category: "Other", total: totalRow.other, pct: 13, vsPrev: "-1%" },
];

const rankings = [...fleetPL].sort((a, b) => b.netProfit - a.netProfit);

export default function ReportsPage() {
  const [period, setPeriod] = useState("This Month");

  const handleDownload = () => {
    toast.info("📊 Fleet_Report_Jan2025.pdf is being generated...");
    setTimeout(() => toast.success("✅ Report downloaded!"), 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & P&L Analysis"
        actions={
          <button onClick={handleDownload} className="flex items-center gap-1.5 rounded-full bg-[#FF6B00] px-5 py-2 text-sm font-medium text-white hover:bg-[#CC5500] active:scale-95 transition-all">
            <Download className="h-4 w-4" /> Download Report
          </button>
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1 rounded-xl bg-muted p-1 border border-border">
          {["This Month", "Last 3 Months", "This Year", "Custom"].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${period === p ? "bg-card text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: P&L Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-x-auto">
        <div className="p-5 border-b border-border">
          <h2 className="text-base font-semibold text-text-primary">Fleet P&L Summary</h2>
        </div>
        <table className="w-full min-w-[900px]">
          <thead><tr className="bg-muted/40 border-b border-border">
            {["Vehicle", "Trips", "Revenue", "Diesel", "Maint.", "Tyre", "Other", "Total Cost", "Net Profit", "Margin%", "₹/km"].map(h => (
              <th key={h} className="text-left text-xs font-medium text-text-secondary uppercase px-3 py-3 whitespace-nowrap">{h}</th>
            ))}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {fleetPL.map((row, i) => (
              <tr key={row.vehicle} className={`${i % 2 === 1 ? "bg-muted/10" : "bg-card"} hover:bg-primary-light transition-colors`}>
                <td className="px-3 py-3 text-xs font-mono font-semibold text-text-primary">{row.vehicle}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{row.trips}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(row.revenue)}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(row.diesel)}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(row.maintenance)}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(row.tyre)}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(row.other)}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(row.totalCost)}</td>
                <td className={`px-3 py-3 text-xs font-mono font-semibold ${row.netProfit >= 0 ? "text-success" : "text-danger"}`}>{formatCurrency(row.netProfit)}</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">{row.margin}%</td>
                <td className="px-3 py-3 text-xs font-mono text-text-primary">₹{row.perKm}</td>
              </tr>
            ))}
            <tr className="bg-primary-light font-bold">
              <td className="px-3 py-3 text-xs font-semibold text-text-primary">TOTAL</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{totalRow.trips}</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(totalRow.revenue)}</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(totalRow.diesel)}</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(totalRow.maintenance)}</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(totalRow.tyre)}</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(totalRow.other)}</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{formatCurrency(totalRow.totalCost)}</td>
              <td className="px-3 py-3 text-xs font-mono font-semibold text-success">{formatCurrency(totalRow.netProfit)}</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">{((totalRow.netProfit / totalRow.revenue) * 100).toFixed(1)}%</td>
              <td className="px-3 py-3 text-xs font-mono text-text-primary">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-4">Revenue vs Cost by Vehicle</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(1)}L`} />
              <Tooltip formatter={(v: unknown) => formatCurrency(Number(v))} contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--text-primary)" }} />
              <Legend iconType="circle" iconSize={8} />
              <Bar dataKey="revenue" name="Revenue" fill="#FF6B00" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" name="Cost" fill="var(--border)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {donutData.map(e => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: unknown) => formatCurrency(Number(v))} contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--text-primary)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {donutData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-text-secondary">{d.name} {Math.round((d.value / donutData.reduce((s, x) => s + x.value, 0)) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-4">Cost per Kilometer by Vehicle</h3>
          <div className="space-y-3">
            {costPerKmData.map((item) => (
              <div key={item.vehicle} className="flex items-center gap-3">
                <span className="text-xs font-mono w-20 shrink-0 text-text-primary">{item.vehicle}</span>
                <div className="flex-1 relative">
                  <div className="h-6 rounded-lg bg-primary-light" style={{ width: `${(item.costPerKm / 20) * 100}%` }}>
                    <span className="absolute left-2 top-0.5 text-xs font-semibold text-primary">₹{item.costPerKm}/km</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-px flex-1 bg-danger opacity-30" />
              <span className="text-xs text-danger font-medium">Industry avg: ₹18/km</span>
              <div className="h-px flex-1 bg-danger opacity-30" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-4">Top Expense Categories</h3>
          <table className="w-full">
            <thead><tr className="border-b border-border">
              {["Category", "Total ₹", "% of Total", "vs Last Month"].map(h => <th key={h} className="text-left text-xs font-medium text-text-secondary uppercase pb-2">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {topCategories.map(c => (
                <tr key={c.category} className="hover:bg-primary-light transition-colors">
                  <td className="py-2.5 text-sm font-medium text-text-primary">{c.category}</td>
                  <td className="py-2.5 text-xs font-mono text-text-primary">{formatCurrency(c.total)}</td>
                  <td className="py-2.5 text-xs text-text-secondary">{c.pct}%</td>
                  <td className={`py-2.5 text-xs font-medium ${c.vsPrev.startsWith("+") ? "text-danger" : "text-success"}`}>{c.vsPrev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Vehicle Performance Ranking */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-text-primary mb-4">Vehicle Performance Ranking</h2>
        <div className="space-y-3">
          {rankings.map((v, i) => {
            const maxProfit = rankings[0].netProfit;
            const badgeColors = ["bg-yellow-400 text-yellow-900", "bg-gray-300 text-gray-800", "bg-orange-300 text-orange-900"];
            return (
              <div key={v.vehicle} className="flex items-center gap-4 rounded-xl p-3 hover:bg-muted transition-colors">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i < 3 ? badgeColors[i] : "bg-muted text-text-secondary"}`}>
                  {i + 1}
                </div>
                <span className="text-sm font-mono font-semibold w-36 text-text-primary">{v.vehicle}</span>
                <div className="flex-1">
                  <div className="h-5 rounded-lg bg-primary" style={{ width: `${(v.netProfit / maxProfit) * 100}%`, opacity: 1 - i * 0.08 }} />
                </div>
                <div className="text-right shrink-0 w-32">
                  <p className="text-sm font-mono font-semibold text-success">{formatCurrency(v.netProfit)}</p>
                  <p className="text-xs text-text-muted">{v.margin}% margin</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

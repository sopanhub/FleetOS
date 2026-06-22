"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { vehicles } from "@/lib/dummy-data/vehicles";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/shared/StatCard";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { IndianRupee, Receipt, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Dummy data
const monthlyData = [
  { month: "Aug", revenue: 85000, expenses: 52000 },
  { month: "Sep", revenue: 112000, expenses: 68000 },
  { month: "Oct", revenue: 98000, expenses: 71000 },
  { month: "Nov", revenue: 134000, expenses: 82000 },
  { month: "Dec", revenue: 145000, expenses: 89000 },
  { month: "Jan", revenue: 124000, expenses: 78400 },
];

const maintenanceLog = [
  { date: "2025-01-10", type: "Oil Change", odometer: 124000, cost: 3500, notes: "Full synthetic oil", workshop: "Patil Auto, Pune" },
  { date: "2024-12-20", type: "Tyre Replacement", odometer: 122500, cost: 12000, notes: "Front left MRF", workshop: "MRF Zone, Mumbai" },
  { date: "2024-11-15", type: "Brake Service", odometer: 120800, cost: 5500, notes: "Brake pad replacement", workshop: "Patil Auto, Pune" },
  { date: "2024-10-05", type: "AC Repair", odometer: 118200, cost: 8000, notes: "Compressor fix", workshop: "Cool Tech, Mumbai" },
  { date: "2024-09-12", type: "Engine Tune-up", odometer: 116000, cost: 6500, notes: "Full tune-up", workshop: "Patil Auto, Pune" },
  { date: "2024-08-20", type: "Oil Change", odometer: 114500, cost: 3200, notes: "Regular service", workshop: "Quick Lube, Nashik" },
  { date: "2024-07-10", type: "Tyre Replacement", odometer: 112000, cost: 11000, notes: "Rear axle tyres", workshop: "Apollo Zone, Pune" },
  { date: "2024-06-05", type: "Brake Service", odometer: 110200, cost: 4800, notes: "Disc replacement", workshop: "Patil Auto, Pune" },
];

const tires = [
  { position: "Front Left", brand: "MRF", purchaseDate: "2024-12-20", cost: 12000, kmRun: 2060, costPerKm: 5.83, active: true },
  { position: "Front Right", brand: "CEAT", purchaseDate: "2024-08-15", cost: 11500, kmRun: 10060, costPerKm: 1.14, active: true },
  { position: "Rear Left 1", brand: "Apollo", purchaseDate: "2024-07-10", cost: 11000, kmRun: 12560, costPerKm: 0.88, active: true },
  { position: "Rear Right 1", brand: "Apollo", purchaseDate: "2024-07-10", cost: 11000, kmRun: 12560, costPerKm: 0.88, active: true },
  { position: "Rear Left 2", brand: "MRF", purchaseDate: "2024-09-20", cost: 12500, kmRun: 8560, costPerKm: 1.46, active: true },
  { position: "Rear Right 2", brand: "CEAT", purchaseDate: "2024-10-05", cost: 11200, kmRun: 7360, costPerKm: 1.52, active: true },
];

const documents = [
  { name: "Registration Certificate", validUntil: "2028-06-15", daysLeft: 1242, status: "Valid" },
  { name: "Fitness Certificate (FC)", validUntil: "2025-06-15", daysLeft: 148, status: "Valid" },
  { name: "Insurance", validUntil: "2025-01-28", daysLeft: 3, status: "Expiring Soon" },
  { name: "Pollution Certificate", validUntil: "2025-03-20", daysLeft: 54, status: "Valid" },
  { name: "Permit", validUntil: "2025-12-31", daysLeft: 340, status: "Valid" },
  { name: "Road Tax", validUntil: "2026-03-31", daysLeft: 430, status: "Valid" },
];

const driverHistory = [
  { dateRange: "Nov 2024 – Present", name: "Ramesh Jadhav", trips: 14, distance: 3200, incidents: 0 },
  { dateRange: "Jul – Oct 2024", name: "Sanjay Bhosale", trips: 18, distance: 4500, incidents: 1 },
  { dateRange: "Jan – Jun 2024", name: "Vijay More", trips: 28, distance: 7200, incidents: 0 },
];

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicle = vehicles.find((v) => v.id === params.id) || vehicles[0];
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = ["Overview", "Maintenance Log", "Tire Tracker", "Documents", "Driver History"];
  const totalMaintCost = maintenanceLog.reduce((s, m) => s + m.cost, 0);

  return (
    <div className="space-y-6">
      {/* Back link + Header */}
      <div>
        <Link href="/manager/fleet" className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark mb-3">
          <ArrowLeft className="h-4 w-4" /> Back to Fleet
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold font-mono text-text-primary">{vehicle.registrationNumber}</h1>
          <span className="rounded-full bg-muted border border-border px-3 py-1 text-xs font-medium text-text-secondary">{vehicle.type}</span>
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => {
          const tabKey = tab === "Overview" ? "overview" : tab === "Maintenance Log" ? "maintenance" : tab === "Tire Tracker" ? "tires" : tab === "Documents" ? "documents" : "drivers";
          return (
            <button key={tab} onClick={() => setActiveTab(tabKey)} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tabKey ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-text-primary"}`}>
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Revenue" value={formatCurrency(vehicle.revenueThisMonth * 6)} icon={IndianRupee} iconBg="bg-primary" badgeText="Last 6 months" />
            <StatCard title="Total Expenses" value={formatCurrency(vehicle.expensesThisMonth * 6)} icon={Receipt} iconBg="bg-danger" badgeText="Last 6 months" />
            <StatCard title="Net P&L" value={formatCurrency((vehicle.revenueThisMonth - vehicle.expensesThisMonth) * 6)} trendUp={true} trend="+12% margin" icon={TrendingUp} iconBg="bg-success" badgeText="Profitable" />
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-base font-semibold text-text-primary mb-4">Monthly Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: unknown) => formatCurrency(Number(v))} contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)" }} />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--primary)" }} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="var(--text-muted)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--text-muted)" }} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab: Maintenance Log */}
      {activeTab === "maintenance" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-muted/50 border-b border-border">
                {["Date", "Type", "Odometer", "Cost", "Notes", "Workshop"].map(h => <th key={h} className="text-left text-xs font-medium text-text-secondary uppercase px-4 py-3">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {maintenanceLog.map((m, i) => (
                  <tr key={i} className={`${i % 2 === 1 ? "bg-muted/20" : ""} hover:bg-primary-light transition-colors`}>
                    <td className="px-4 py-3 text-xs text-text-primary">{formatDate(m.date)}</td>
                    <td className="px-4 py-3 text-xs font-medium text-text-primary">{m.type}</td>
                    <td className="px-4 py-3 text-xs font-mono text-text-primary">{formatNumber(m.odometer)} km</td>
                    <td className="px-4 py-3 text-xs font-mono font-semibold text-text-primary">{formatCurrency(m.cost)}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{m.notes}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{m.workshop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <span className="text-sm font-semibold text-text-primary">Total Maintenance Cost: <span className="font-mono text-danger">{formatCurrency(totalMaintCost)}</span></span>
          </div>
        </div>
      )}

      {/* Tab: Tire Tracker */}
      {activeTab === "tires" && (
        <div className="space-y-6">
          <h3 className="text-base font-semibold text-text-primary">Active Tires on Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tires.map((tire) => (
              <div key={tire.position} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold text-text-primary mb-2">{tire.position}</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-text-secondary">Brand</span><span className="font-medium text-text-primary">{tire.brand}</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Purchased</span><span className="text-text-primary">{formatDate(tire.purchaseDate)}</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Cost</span><span className="font-mono text-text-primary">{formatCurrency(tire.cost)}</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">KM Run</span><span className="font-mono text-text-primary">{formatNumber(tire.kmRun)} km</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Cost/KM</span><span className="font-mono font-semibold text-primary">₹{tire.costPerKm.toFixed(2)}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Documents */}
      {activeTab === "documents" && (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-muted/50 border-b border-border">
              {["Document", "Valid Until", "Days Left", "Status", "Action"].map(h => <th key={h} className="text-left text-xs font-medium text-text-secondary uppercase px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {documents.map((doc) => (
                <tr key={doc.name} className="hover:bg-primary-light transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{doc.name}</td>
                  <td className="px-4 py-3 text-xs text-text-primary">{doc.validUntil}</td>
                  <td className="px-4 py-3"><span className={`font-mono text-xs font-semibold ${doc.daysLeft <= 7 ? "text-danger" : doc.daysLeft <= 30 ? "text-warning" : "text-success"}`}>{doc.daysLeft} days</span></td>
                  <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
                  <td className="px-4 py-3"><button className="text-xs font-medium text-primary hover:text-primary-dark">Update</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Driver History */}
      {activeTab === "drivers" && (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-muted/50 border-b border-border">
              {["Date Range", "Driver Name", "Trips", "Distance", "Incidents"].map(h => <th key={h} className="text-left text-xs font-medium text-text-secondary uppercase px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {driverHistory.map((d, i) => (
                <tr key={i} className="hover:bg-primary-light transition-colors">
                  <td className="px-4 py-3 text-xs text-text-primary">{d.dateRange}</td>
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{d.name}</td>
                  <td className="px-4 py-3 text-xs font-mono text-text-primary">{d.trips}</td>
                  <td className="px-4 py-3 text-xs font-mono text-text-primary">{formatNumber(d.distance)} km</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold ${d.incidents > 0 ? "text-danger" : "text-success"}`}>{d.incidents}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

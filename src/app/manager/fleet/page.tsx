"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { vehicles } from "@/lib/dummy-data/vehicles";
import { Truck, Navigation, Wrench, ParkingCircle } from "lucide-react";
import Link from "next/link";

export default function FleetPage() {
  const onRoad = vehicles.filter(v => v.status === "Active" || v.status === "In Transit").length;
  const inMaint = vehicles.filter(v => v.status === "In Maintenance").length;
  const available = vehicles.filter(v => v.status === "Idle").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Fleet & Vehicles" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Vehicles" value="8" icon={Truck} iconBg="bg-[#FF6B00]" badgeText="All fleet" />
        <StatCard title="On Road" value={String(onRoad)} icon={Navigation} iconBg="bg-[#16A34A]" badgeText="Active + In Transit" />
        <StatCard title="In Maintenance" value={String(inMaint)} icon={Wrench} iconBg="bg-[#D97706]" badgeText="1 vehicle" />
        <StatCard title="Available" value={String(available)} icon={ParkingCircle} iconBg="bg-[#2563EB]" badgeText="Ready to dispatch" />
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold font-mono text-text-primary">{vehicle.registrationNumber}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex rounded-full bg-muted border border-border px-2.5 py-0.5 text-xs font-medium text-text-secondary">{vehicle.type}</span>
                  <StatusBadge status={vehicle.status} />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Driver assigned:</span>
                <span className="font-medium text-text-primary">{vehicle.driverAssigned}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Last trip:</span>
                <span className="text-text-primary">{vehicle.lastTrip}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Odometer:</span>
                <span className="font-mono text-text-primary">{formatNumber(vehicle.odometer)} km</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-background border border-border mb-4">
              <div className="text-center">
                <p className="text-xs text-text-muted">Trips</p>
                <p className="text-sm font-semibold text-text-primary">{vehicle.tripsThisMonth}</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-xs text-text-muted">Revenue</p>
                <p className="text-sm font-semibold font-mono text-success">{formatCurrency(vehicle.revenueThisMonth)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-muted">Expenses</p>
                <p className="text-sm font-semibold font-mono text-danger">{formatCurrency(vehicle.expensesThisMonth)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/manager/fleet/${vehicle.id}`} className="flex-1 text-center rounded-full border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary-light transition-colors">
                View Details
              </Link>
              <button className="flex-1 rounded-full border border-border px-4 py-2 text-xs font-medium text-text-secondary hover:bg-muted transition-colors">
                Log Maintenance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

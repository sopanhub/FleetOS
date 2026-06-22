"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { vehicles } from "@/lib/dummy-data/vehicles";
import { Vehicle } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Truck, Navigation, Wrench, ParkingCircle } from "lucide-react";

const columns: ColumnDef<Vehicle>[] = [
  { accessorKey: "registrationNumber", header: "Vehicle No.", cell: ({ row }) => <span className="font-mono text-sm font-semibold text-text-primary">{row.original.registrationNumber}</span> },
  { accessorKey: "type", header: "Type", cell: ({ row }) => <span className="text-xs rounded-full bg-muted text-text-secondary border border-border px-2.5 py-0.5">{row.original.type}</span> },
  { accessorKey: "driverAssigned", header: "Driver", cell: ({ row }) => <span className="text-xs text-text-primary">{row.original.driverAssigned}</span> },
  { accessorKey: "odometer", header: "Odometer", cell: ({ row }) => <span className="font-mono text-xs text-text-primary">{formatNumber(row.original.odometer)} km</span> },
  { accessorKey: "tripsThisMonth", header: "Trips", cell: ({ row }) => <span className="font-mono text-xs text-text-primary">{row.original.tripsThisMonth}</span> },
  { accessorKey: "revenueThisMonth", header: "Revenue", cell: ({ row }) => <span className="font-mono text-xs text-success">{formatCurrency(row.original.revenueThisMonth)}</span> },
  { accessorKey: "expensesThisMonth", header: "Expenses", cell: ({ row }) => <span className="font-mono text-xs text-danger">{formatCurrency(row.original.expensesThisMonth)}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
];

export default function OwnerFleetPage() {
  const onRoad = vehicles.filter(v => v.status === "Active" || v.status === "In Transit").length;
  const inMaint = vehicles.filter(v => v.status === "In Maintenance").length;
  const avail = vehicles.filter(v => v.status === "Idle").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Fleet & Vehicles" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Vehicles" value="8" icon={Truck} iconBg="bg-[#FF6B00]" badgeText="Full fleet" />
        <StatCard title="On Road" value={String(onRoad)} icon={Navigation} iconBg="bg-[#16A34A]" badgeText="Active + In Transit" />
        <StatCard title="In Maintenance" value={String(inMaint)} icon={Wrench} iconBg="bg-[#D97706]" badgeText="Under repair" />
        <StatCard title="Available" value={String(avail)} icon={ParkingCircle} iconBg="bg-[#2563EB]" badgeText="Ready to dispatch" />
      </div>
      <DataTable columns={columns} data={vehicles} searchable searchPlaceholder="Search vehicles..." />
    </div>
  );
}

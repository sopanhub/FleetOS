"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate } from "@/lib/utils";
import { trips } from "@/lib/dummy-data/trips";
import { ColumnDef } from "@tanstack/react-table";
import { Trip } from "@/types";
import { Download, Eye, Printer, Plus } from "lucide-react";
import { toast } from "sonner";

const columns: ColumnDef<Trip>[] = [
  { accessorKey: "lrNumber", header: "LR No.", cell: ({ row }) => <span className="font-mono text-xs font-semibold">{row.original.lrNumber}</span> },
  { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-xs">{formatDate(row.original.date)}</span> },
  { id: "from", header: "From", cell: ({ row }) => <span className="text-xs">{row.original.from}</span> },
  { id: "to", header: "To", cell: ({ row }) => <span className="text-xs">{row.original.to}</span> },
  { accessorKey: "vehicleNumber", header: "Vehicle", cell: ({ row }) => <span className="font-mono text-xs">{row.original.vehicleNumber}</span> },
  { id: "consignor", header: "Consignor", cell: ({ row }) => <span className="text-xs max-w-[120px] truncate block">{row.original.consignor || "—"}</span> },
  { id: "consignee", header: "Consignee", cell: ({ row }) => <span className="text-xs max-w-[120px] truncate block">{row.original.consignee || "—"}</span> },
  { accessorKey: "weight", header: "Weight (MT)", cell: ({ row }) => <span className="font-mono text-xs">{row.original.weight || "—"} MT</span> },
  { accessorKey: "freight", header: "Freight", cell: ({ row }) => <span className="font-mono text-xs">{formatCurrency(row.original.freight)}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <button onClick={() => toast.success(`📄 ${row.original.lrNumber}.pdf downloaded`)} className="p-1.5 rounded-lg hover:bg-primary-light transition-colors" title="Download PDF">
          <Download className="h-4 w-4 text-primary" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="View">
          <Eye className="h-4 w-4 text-text-muted" />
        </button>
        <button onClick={() => toast.info(`🖨️ Printing ${row.original.lrNumber}...`)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Print">
          <Printer className="h-4 w-4 text-text-muted" />
        </button>
      </div>
    ),
  },
];

export default function LorryReceiptsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Lorry Receipts (LR)"
        actions={
          <div className="flex gap-2">
            <button onClick={() => toast.success("📦 Downloading all LRs...")} className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text-secondary hover:bg-muted transition-colors flex items-center gap-1.5">
              <Download className="h-4 w-4" /> Download All
            </button>
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark active:scale-95 transition-all flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Create LR
            </button>
          </div>
        }
      />
      <DataTable columns={columns} data={trips} searchable searchPlaceholder="Search by LR number, vehicle, or route..." />
    </div>
  );
}

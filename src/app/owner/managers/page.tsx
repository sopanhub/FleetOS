"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { formatDate } from "@/lib/utils";
import { managers } from "@/lib/dummy-data/managers";
import { vehicles } from "@/lib/dummy-data/vehicles";
import { Manager } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Users, UserCheck, Truck as TruckIcon, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Copy } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function ManagersPage() {
  const [managerList, setManagerList] = useState(managers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [sendWhatsApp, setSendWhatsApp] = useState(false);

  const generatedPassword = "Fl33t@2025";

  const handleDelete = () => {
    if (selectedManager) {
      setManagerList((prev) => prev.filter((m) => m.id !== selectedManager.id));
      toast.success(`${selectedManager.name} removed`);
      setDeleteDialogOpen(false);
    }
  };

  const handleToggleStatus = (id: string) => {
    setManagerList((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === "Active" ? "Inactive" as const : "Active" as const } : m
      )
    );
    toast.success("Manager status updated");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Manager created successfully!");
    if (sendWhatsApp) toast.info("📱 Credentials sent via WhatsApp");
    setIsCreateOpen(false);
  };

  const activeManagers = managerList.filter((m) => m.status === "Active").length;
  const totalAssigned = managerList.reduce((s, m) => s + m.assignedVehicles.length, 0);

  const columns: ColumnDef<Manager>[] = [
    {
      id: "avatar",
      header: "",
      cell: ({ row }) => {
        const initials = row.original.name.split(" ").map((n) => n[0]).join("").toUpperCase();
        return <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary text-xs font-semibold">{initials}</div>;
      },
    },
    { accessorKey: "name", header: "Name", cell: ({ row }) => <span className="text-sm font-medium">{row.original.name}</span> },
    { accessorKey: "email", header: "Email", cell: ({ row }) => <span className="text-xs text-text-secondary">{row.original.email}</span> },
    { accessorKey: "phone", header: "Phone", cell: ({ row }) => <span className="text-xs font-mono">{row.original.phone}</span> },
    { accessorKey: "dateCreated", header: "Joined", cell: ({ row }) => <span className="text-xs">{formatDate(row.original.dateCreated)}</span> },
    {
      id: "vehicles",
      header: "Vehicles Assigned",
      cell: ({ row }) => (
        <span className="text-xs">{row.original.assignedVehicles.length} vehicles</span>
      ),
    },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-primary-light transition-colors" title="Edit"><Pencil className="h-4 w-4 text-primary" /></button>
          <button
            onClick={() => handleToggleStatus(row.original.id)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            title="Toggle status"
          >
            {row.original.status === "Active" ? <ToggleRight className="h-4 w-4 text-success" /> : <ToggleLeft className="h-4 w-4 text-text-muted" />}
          </button>
          <button
            onClick={() => { setSelectedManager(row.original); setDeleteDialogOpen(true); }}
            className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-danger" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Managers"
        actions={
          <button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-1.5 rounded-full bg-[#FF6B00] px-5 py-2 text-sm font-medium text-white hover:bg-[#CC5500] active:scale-95 transition-all">
            <Plus className="h-4 w-4" /> Add Manager
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Managers" value={String(managerList.length)} icon={Users} iconBg="bg-[#FF6B00]" badgeText="All managers" />
        <StatCard title="Active" value={String(activeManagers)} icon={UserCheck} iconBg="bg-[#16A34A]" badgeText="Currently active" />
        <StatCard title="Vehicles Assigned" value={`${totalAssigned} total`} icon={TruckIcon} iconBg="bg-[#2563EB]" badgeText="Across all managers" />
      </div>

      <DataTable columns={columns} data={managerList} />

      {/* Create Manager Sheet */}
      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl">
          <SheetHeader><SheetTitle>Create New Manager</SheetTitle></SheetHeader>
          <form onSubmit={handleCreate} className="space-y-5 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Full Name</label>
                <input type="text" placeholder="Enter full name" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Email Address</label>
                <input type="email" placeholder="email@fleetos.com" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Password (auto-generated)</label>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={generatedPassword} className="flex-1 px-3 py-2 rounded-xl border border-border bg-muted text-sm font-mono text-text-primary" />
                  <button type="button" onClick={() => { navigator.clipboard.writeText(generatedPassword); toast.success("Password copied!"); }} className="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
                    <Copy className="h-4 w-4 text-text-secondary" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">Assign Vehicles</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto rounded-xl border border-border p-3 bg-background">
                {vehicles.map((v) => (
                  <label key={v.id} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox />
                    <span className="text-sm font-mono text-text-primary">{v.registrationNumber.split(" ").slice(1).join(" ")}</span>
                    <span className="text-[10px] text-text-muted">({v.type})</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted p-3">
              <span className="text-sm text-text-secondary">Send credentials via WhatsApp</span>
              <button
                type="button"
                onClick={() => setSendWhatsApp(!sendWhatsApp)}
                className="relative"
              >
                {sendWhatsApp ? <ToggleRight className="h-6 w-6 text-primary" /> : <ToggleLeft className="h-6 w-6 text-text-muted" />}
              </button>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setIsCreateOpen(false)} className="flex-1 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-muted">Cancel</button>
              <button type="submit" className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/80 active:scale-95 transition-all">Create Manager & Send Credentials</button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Manager</DialogTitle></DialogHeader>
          <p className="text-sm text-text-secondary">
            Are you sure? This will revoke <span className="font-semibold text-text-primary">{selectedManager?.name}&apos;s</span> access.
          </p>
          <DialogFooter className="gap-2">
            <button onClick={() => setDeleteDialogOpen(false)} className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text-secondary hover:bg-muted">Cancel</button>
            <button onClick={handleDelete} className="rounded-full bg-danger px-5 py-2 text-sm font-medium text-white hover:bg-danger/80 active:scale-95 transition-all">Delete Manager</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

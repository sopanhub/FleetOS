"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate } from "@/lib/utils";
import { trips } from "@/lib/dummy-data/trips";
import { vehicles, routes, drivers, clients } from "@/lib/dummy-data/vehicles";
import { Trip } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Eye, Pencil, MoreVertical, Download, CheckCircle2, Clock, Circle } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TripsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [vehicleFilter, setVehicleFilter] = useState("All");

  // Form state
  const [formClient, setFormClient] = useState("");
  const [formFrom, setFormFrom] = useState("");
  const [formTo, setFormTo] = useState("");
  const [formVehicle, setFormVehicle] = useState("");
  const [formDriver, setFormDriver] = useState("");

  const matchedRoute = routes.find(r => r.from === formFrom && r.to === formTo);

  const filteredTrips = trips.filter((t) => {
    if (statusFilter !== "All" && t.status !== statusFilter) return false;
    if (vehicleFilter !== "All" && t.vehicleId !== vehicleFilter) return false;
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Trip created successfully! LR/2025/016 generated.");
    setIsCreateOpen(false);
  };

  const columns: ColumnDef<Trip>[] = [
    { accessorKey: "lrNumber", header: "LR No.", cell: ({ row }) => <span className="font-mono text-xs font-semibold">{row.original.lrNumber}</span> },
    { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-xs">{formatDate(row.original.date)}</span> },
    { accessorKey: "vehicleNumber", header: "Vehicle", cell: ({ row }) => <span className="font-mono text-xs">{row.original.vehicleNumber}</span> },
    { accessorKey: "driverName", header: "Driver", cell: ({ row }) => <span className="text-xs">{row.original.driverName}</span> },
    { accessorKey: "clientName", header: "Client", cell: ({ row }) => <span className="text-xs max-w-[120px] truncate block">{row.original.clientName}</span> },
    { id: "route", header: "Route", cell: ({ row }) => <span className="text-xs">{row.original.from} → {row.original.to}</span> },
    { accessorKey: "freight", header: "Freight (₹)", cell: ({ row }) => <span className="font-mono text-xs">{formatCurrency(row.original.freight)}</span> },
    { accessorKey: "advance", header: "Advance", cell: ({ row }) => <span className="font-mono text-xs">{formatCurrency(row.original.advance)}</span> },
    { accessorKey: "totalExpenses", header: "Expenses", cell: ({ row }) => <span className="font-mono text-xs">{formatCurrency(row.original.totalExpenses)}</span> },
    { accessorKey: "netAmount", header: "Net", cell: ({ row }) => (
      <span className={`font-mono text-xs font-semibold ${row.original.netAmount < 0 ? "text-[#DC2626]" : "text-[#16A34A]"}`}>
        {formatCurrency(row.original.netAmount)}
      </span>
    )},
    { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setSelectedTrip(row.original); setIsDetailOpen(true); }} className="p-1.5 rounded-lg hover:bg-primary-light transition-colors"><Eye className="h-4 w-4 text-primary" /></button>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Pencil className="h-4 w-4 text-text-muted" /></button>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><MoreVertical className="h-4 w-4 text-text-muted" /></button>
        </div>
      ),
    },
  ];

  // Timeline for trip detail
  const getTimeline = (trip: Trip) => [
    { label: "Trip Created", date: trip.date, status: "completed" as const },
    { label: "Departed", date: trip.departureDate, status: trip.status !== "Created" ? "completed" as const : "pending" as const },
    { label: "Delivered", date: trip.deliveryDate, status: trip.deliveryDate ? "completed" as const : "pending" as const },
    { label: "POD Received", date: undefined, status: trip.podReceived ? "completed" as const : "pending" as const },
    { label: "Invoice Generated", date: undefined, status: trip.status === "Billed" || trip.status === "Completed" ? "completed" as const : "waiting" as const },
  ];

  // Dummy expenses for detail view
  const tripExpenses = [
    { type: "Diesel", amount: 8500, date: "2025-01-13", notes: "HP Pump, Panvel" },
    { type: "Toll", amount: 1200, date: "2025-01-13", notes: "Expressway" },
    { type: "Driver Batta", amount: 1500, date: "2025-01-13", notes: "" },
    { type: "Loading Charges", amount: 3000, date: "2025-01-14", notes: "Mumbai dock" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trips"
        actions={
          <button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark active:scale-95 transition-all">
            <Plus className="h-4 w-4" /> Create New Trip
          </button>
        }
      />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Search by LR, vehicle, driver, client..."
            className="w-full pl-4 pr-4 py-2 rounded-xl border border-border bg-muted text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary"
          />
        </div>
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "All")}>
          <SelectTrigger className="w-[150px] rounded-xl border-border"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Created">Created</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Billed">Billed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={vehicleFilter} onValueChange={(val) => setVehicleFilter(val || "All")}>
          <SelectTrigger className="w-[180px] rounded-xl border-border"><SelectValue placeholder="Vehicle" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Vehicles</SelectItem>
            {vehicles.map((v) => (<SelectItem key={v.id} value={v.id}>{v.registrationNumber}</SelectItem>))}
          </SelectContent>
        </Select>
        <button onClick={() => { setStatusFilter("All"); setVehicleFilter("All"); }} className="text-sm text-primary font-medium hover:text-primary-dark">Clear Filters</button>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredTrips} pageSize={10} searchable={false} />

      {/* Create Trip Sheet */}
      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="w-full sm:max-w-2xl lg:max-w-3xl">
          <SheetHeader>
            <SheetTitle>Create New Trip</SheetTitle>
            <p className="text-sm text-text-secondary">Fill details to generate LR automatically</p>
          </SheetHeader>
          <form onSubmit={handleCreate} className="space-y-6 mt-6 pb-8">
            {/* Section 1: Trip & Route Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">
                1. Trip & Route Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Client</label>
                  <Select value={formClient} onValueChange={(val) => setFormClient(val || "")}>
                    <SelectTrigger className="rounded-xl border-border"><SelectValue placeholder="Select client" /></SelectTrigger>
                    <SelectContent>{clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Departure Date</label>
                  <input type="date" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">From City</label>
                  <Select value={formFrom} onValueChange={(val) => setFormFrom(val || "")}>
                    <SelectTrigger className="rounded-xl border-border"><SelectValue placeholder="From" /></SelectTrigger>
                    <SelectContent>{["Mumbai","Pune","Nashik","Nagpur","Aurangabad","Kolhapur","Surat","Solapur"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">To City</label>
                  <Select value={formTo} onValueChange={(val) => setFormTo(val || "")}>
                    <SelectTrigger className="rounded-xl border-border"><SelectValue placeholder="To" /></SelectTrigger>
                    <SelectContent>{["Mumbai","Pune","Nashik","Nagpur","Aurangabad","Kolhapur","Surat","Solapur","Hyderabad"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              
              {matchedRoute && (
                <div className="rounded-xl bg-primary-light/50 px-4 py-2.5 text-xs text-primary border border-primary/20 flex justify-between items-center">
                  <span>Distance: <strong>{matchedRoute.distance} km</strong></span>
                  <span>Rate: <strong>₹{matchedRoute.ratePerKm}/km</strong></span>
                  <span>Est. Freight: <strong>₹{matchedRoute.distance * matchedRoute.ratePerKm}</strong></span>
                </div>
              )}
            </div>

            {/* Section 2: Vehicle & Driver Assignment */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">
                2. Vehicle & Driver Assignment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Vehicle</label>
                  <Select value={formVehicle} onValueChange={(val) => setFormVehicle(val || "")}>
                    <SelectTrigger className="rounded-xl border-border"><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                    <SelectContent>{vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.registrationNumber} — {v.type}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Driver</label>
                  <Select value={formDriver} onValueChange={(val) => setFormDriver(val || "")}>
                    <SelectTrigger className="rounded-xl border-border"><SelectValue placeholder="Select driver" /></SelectTrigger>
                    <SelectContent>{drivers.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 3: Financial Details */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">
                3. Financial Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Freight Charge (₹)</label>
                  <input type="number" defaultValue={matchedRoute ? matchedRoute.distance * matchedRoute.ratePerKm : ""} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Party Advance (₹)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Trip Advance to Driver (₹)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 px-4 py-3 border border-border mt-2 flex justify-between items-center">
                <span className="text-sm text-text-secondary">LR Number will be generated automatically:</span>
                <span className="font-mono font-bold text-[#FF6B00] bg-[#FFF0E5] px-3 py-1 rounded-lg text-sm border border-[#FF6B00]/20">LR/2025/016</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border pb-12">
              <button type="button" onClick={() => setIsCreateOpen(false)} className="flex-1 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark active:scale-95 transition-all">Create Trip & Generate LR</button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Trip Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl lg:max-w-3xl">
          {selectedTrip && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <SheetTitle className="font-mono text-text-primary">{selectedTrip.lrNumber}</SheetTitle>
                  <StatusBadge status={selectedTrip.status} />
                </div>
              </SheetHeader>

              <div className="space-y-6 mt-6 pb-12">
                {/* Info grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-border pb-4">
                  <div><p className="text-xs text-text-muted">Vehicle</p><p className="text-sm font-medium font-mono text-text-primary">{selectedTrip.vehicleNumber}</p></div>
                  <div><p className="text-xs text-text-muted">Driver</p><p className="text-sm font-medium text-text-primary">{selectedTrip.driverName}</p></div>
                  <div><p className="text-xs text-text-muted">Client</p><p className="text-sm font-medium text-text-primary">{selectedTrip.clientName}</p></div>
                  <div><p className="text-xs text-text-muted">Route</p><p className="text-sm font-medium text-text-primary">{selectedTrip.from} → {selectedTrip.to}</p></div>
                  <div><p className="text-xs text-text-muted">Date</p><p className="text-sm font-medium text-text-primary">{formatDate(selectedTrip.date)}</p></div>
                  <div><p className="text-xs text-text-muted">Distance</p><p className="text-sm font-medium text-text-primary">{selectedTrip.distance} km</p></div>
                </div>

                {/* Financial summary */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-primary-light p-4 text-center border border-primary/20">
                    <p className="text-xs text-text-secondary">Freight</p>
                    <p className="text-lg font-semibold font-mono text-primary">{formatCurrency(selectedTrip.freight)}</p>
                  </div>
                  <div className="rounded-xl bg-danger/10 p-4 text-center border border-danger/20">
                    <p className="text-xs text-text-secondary">Total Expenses</p>
                    <p className="text-lg font-semibold font-mono text-danger">{formatCurrency(selectedTrip.totalExpenses)}</p>
                  </div>
                  <div className="rounded-xl bg-success/10 p-4 text-center border border-success/20">
                    <p className="text-xs text-text-secondary">Net Profit</p>
                    <p className="text-lg font-semibold font-mono text-success">{formatCurrency(selectedTrip.netAmount)}</p>
                  </div>
                </div>

                {/* Expense log */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-text-primary">Expense Log</h3>
                    <button className="text-xs text-primary font-medium hover:text-primary-dark">+ Add Expense</button>
                  </div>
                  <div className="rounded-xl border border-border overflow-hidden bg-background">
                    <table className="w-full">
                      <thead><tr className="bg-muted/50 border-b border-border">
                        <th className="text-left text-xs font-medium text-text-secondary uppercase px-3 py-2">Type</th>
                        <th className="text-left text-xs font-medium text-text-secondary uppercase px-3 py-2">Amount</th>
                        <th className="text-left text-xs font-medium text-text-secondary uppercase px-3 py-2">Date</th>
                        <th className="text-left text-xs font-medium text-text-secondary uppercase px-3 py-2">Notes</th>
                      </tr></thead>
                      <tbody className="divide-y divide-border">
                        {tripExpenses.map((exp, i) => (
                          <tr key={i} className="hover:bg-primary-light transition-colors">
                            <td className="px-3 py-2 text-xs font-medium text-text-primary">{exp.type}</td>
                            <td className="px-3 py-2 text-xs font-mono text-text-primary">{formatCurrency(exp.amount)}</td>
                            <td className="px-3 py-2 text-xs text-text-secondary">{formatDate(exp.date)}</td>
                            <td className="px-3 py-2 text-xs text-text-muted">{exp.notes || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Trip Timeline</h3>
                  <div className="space-y-0">
                    {getTimeline(selectedTrip).map((step, i) => (
                      <div key={i} className="flex items-start gap-3 relative">
                        <div className="flex flex-col items-center">
                          {step.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                          ) : step.status === "pending" ? (
                            <Clock className="h-5 w-5 text-warning shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-border shrink-0" />
                          )}
                          {i < getTimeline(selectedTrip).length - 1 && (
                            <div className="w-px h-6 bg-border" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className={`text-sm font-medium ${step.status === "completed" ? "text-text-primary" : "text-text-muted"}`}>{step.label}</p>
                          <p className="text-xs text-text-muted">{step.date ? formatDate(step.date) : step.status === "pending" ? "Pending" : "Waiting"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  <button className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primary-dark active:scale-95 transition-all">Mark POD Received</button>
                  <button className="rounded-full border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary-light transition-all">Generate Invoice</button>
                  <button onClick={() => toast.success("📄 LR downloaded!")} className="rounded-full border border-border px-4 py-2 text-xs font-medium text-text-secondary hover:bg-muted transition-all flex items-center gap-1">
                    <Download className="h-3 w-3" /> Download LR PDF
                  </button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

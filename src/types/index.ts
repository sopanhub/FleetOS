// ─── Core Types ───────────────────────────────────────────
export type TripStatus = "Created" | "In Transit" | "Delivered" | "Billed" | "Completed";
export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";
export type VehicleStatus = "Active" | "In Transit" | "In Maintenance" | "Idle";
export type ExpenseType = "Diesel" | "Toll" | "Driver Batta" | "Loading Charges" | "Repair" | "Tyre" | "Misc";
export type ManagerStatus = "Active" | "Inactive";
export type ReminderPriority = "Critical" | "Upcoming" | "Resolved";
export type UserRole = "owner" | "manager";

// ─── Vehicle ──────────────────────────────────────────────
export interface Vehicle {
  id: string;
  registrationNumber: string;
  type: "20ft Container" | "32ft Trailer" | "LCV (Mini Truck)";
  status: VehicleStatus;
  driverAssigned: string;
  lastTrip: string;
  odometer: number;
  tripsThisMonth: number;
  revenueThisMonth: number;
  expensesThisMonth: number;
  insuranceExpiry: string;
  fitnessExpiry: string;
  permitExpiry: string;
  pollutionExpiry: string;
}

// ─── Driver ───────────────────────────────────────────────
export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: "Active" | "On Trip" | "Off Duty";
}

// ─── Client ───────────────────────────────────────────────
export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstNumber: string;
}

// ─── Route ────────────────────────────────────────────────
export interface Route {
  id: string;
  from: string;
  to: string;
  distance: number;
  ratePerKm: number;
}

// ─── Trip ─────────────────────────────────────────────────
export interface Trip {
  id: string;
  lrNumber: string;
  date: string;
  vehicleId: string;
  vehicleNumber: string;
  driverId: string;
  driverName: string;
  clientId: string;
  clientName: string;
  from: string;
  to: string;
  distance: number;
  freight: number;
  advance: number;
  totalExpenses: number;
  netAmount: number;
  status: TripStatus;
  departureDate: string;
  deliveryDate?: string;
  podReceived: boolean;
  weight?: number;
  consignor?: string;
  consignee?: string;
}

// ─── Expense ──────────────────────────────────────────────
export interface Expense {
  id: string;
  date: string;
  tripId: string;
  lrNumber: string;
  vehicleId: string;
  vehicleNumber: string;
  driverName: string;
  type: ExpenseType;
  amount: number;
  receipt: boolean;
  addedBy: string;
  notes?: string;
}

// ─── Invoice ──────────────────────────────────────────────
export interface Invoice {
  id: string;
  invoiceNumber: string;
  lrNumber: string;
  clientId: string;
  clientName: string;
  date: string;
  dueDate: string;
  amount: number;
  daysOutstanding: number;
  status: InvoiceStatus;
}

// ─── Manager ──────────────────────────────────────────────
export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateCreated: string;
  status: ManagerStatus;
  assignedVehicles: string[];
  avatar?: string;
}

// ─── Reminder ─────────────────────────────────────────────
export interface Reminder {
  id: string;
  category: "vehicle" | "driver" | "service";
  entityName: string;
  message: string;
  dueDate: string;
  daysRemaining: number;
  priority: ReminderPriority;
  resolved: boolean;
}

// ─── Maintenance ──────────────────────────────────────────
export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: string;
  odometer: number;
  cost: number;
  notes: string;
  workshop: string;
}

// ─── Tire ─────────────────────────────────────────────────
export interface Tire {
  id: string;
  vehicleId: string;
  position: string;
  brand: string;
  purchaseDate: string;
  cost: number;
  kmRun: number;
  costPerKm: number;
  active: boolean;
}

// ─── Document ─────────────────────────────────────────────
export interface VehicleDocument {
  id: string;
  vehicleId: string;
  name: string;
  validUntil: string;
  daysLeft: number;
  status: "Valid" | "Expiring Soon" | "Expired";
}

// ─── Timeline Step ────────────────────────────────────────
export interface TimelineStep {
  label: string;
  date?: string;
  status: "completed" | "pending" | "waiting";
}

// ─── Date Range ───────────────────────────────────────────
export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

// ─── User ─────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

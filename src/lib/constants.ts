export const APP_NAME = "FleetOS";

export const TRIP_STATUSES = ["Created", "In Transit", "Delivered", "Billed", "Completed"] as const;
export const INVOICE_STATUSES = ["Paid", "Pending", "Overdue", "Draft"] as const;
export const VEHICLE_STATUSES = ["Active", "In Transit", "In Maintenance", "Idle"] as const;
export const EXPENSE_TYPES = ["Diesel", "Toll", "Driver Batta", "Loading Charges", "Repair", "Tyre", "Misc"] as const;

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Active: { bg: "bg-green-100", text: "text-green-700" },
  "In Transit": { bg: "bg-blue-100", text: "text-blue-700" },
  Delivered: { bg: "bg-blue-100", text: "text-blue-700" },
  Billed: { bg: "bg-gray-100", text: "text-gray-700" },
  Completed: { bg: "bg-green-100", text: "text-green-700" },
  Created: { bg: "bg-orange-100", text: "text-orange-700" },
  Paid: { bg: "bg-green-100", text: "text-green-700" },
  Pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Overdue: { bg: "bg-red-100", text: "text-red-700" },
  Draft: { bg: "bg-gray-100", text: "text-gray-700" },
  "In Maintenance": { bg: "bg-yellow-100", text: "text-yellow-700" },
  Idle: { bg: "bg-gray-100", text: "text-gray-600" },
  Inactive: { bg: "bg-gray-100", text: "text-gray-600" },
  Valid: { bg: "bg-green-100", text: "text-green-700" },
  "Expiring Soon": { bg: "bg-yellow-100", text: "text-yellow-700" },
  Expired: { bg: "bg-red-100", text: "text-red-700" },
};

export const EXPENSE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Diesel: { bg: "bg-orange-100", text: "text-orange-700" },
  Toll: { bg: "bg-blue-100", text: "text-blue-700" },
  "Driver Batta": { bg: "bg-purple-100", text: "text-purple-700" },
  Repair: { bg: "bg-red-100", text: "text-red-700" },
  Tyre: { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Loading Charges": { bg: "bg-green-100", text: "text-green-700" },
  Misc: { bg: "bg-gray-100", text: "text-gray-700" },
};

export const CITIES = [
  "Mumbai",
  "Pune",
  "Nashik",
  "Nagpur",
  "Aurangabad",
  "Kolhapur",
  "Surat",
  "Solapur",
  "Hyderabad",
  "Bangalore",
];

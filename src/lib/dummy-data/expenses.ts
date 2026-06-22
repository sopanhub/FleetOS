import { Expense } from "@/types";

export const expenses: Expense[] = [
  { id: "e1", date: "2025-01-13", tripId: "t1", lrNumber: "LR/2025/001", vehicleId: "v1", vehicleNumber: "MH04 AB 1234", driverName: "Ramesh Jadhav", type: "Diesel", amount: 8500, receipt: true, addedBy: "Priya Sharma", notes: "HP Petrol Pump, Panvel" },
  { id: "e2", date: "2025-01-13", tripId: "t1", lrNumber: "LR/2025/001", vehicleId: "v1", vehicleNumber: "MH04 AB 1234", driverName: "Ramesh Jadhav", type: "Toll", amount: 1200, receipt: true, addedBy: "Priya Sharma", notes: "Mumbai-Pune Expressway" },
  { id: "e3", date: "2025-01-13", tripId: "t1", lrNumber: "LR/2025/001", vehicleId: "v1", vehicleNumber: "MH04 AB 1234", driverName: "Ramesh Jadhav", type: "Driver Batta", amount: 1500, receipt: false, addedBy: "Priya Sharma" },
  { id: "e4", date: "2025-01-14", tripId: "t1", lrNumber: "LR/2025/001", vehicleId: "v1", vehicleNumber: "MH04 AB 1234", driverName: "Ramesh Jadhav", type: "Loading Charges", amount: 3000, receipt: true, addedBy: "Priya Sharma", notes: "Loading at Mumbai dock" },
  { id: "e5", date: "2025-01-15", tripId: "t2", lrNumber: "LR/2025/002", vehicleId: "v2", vehicleNumber: "MH04 CD 5678", driverName: "Suresh Patil", type: "Diesel", amount: 25000, receipt: true, addedBy: "Amit Patil", notes: "IOCL Pump, Pune" },
  { id: "e6", date: "2025-01-15", tripId: "t2", lrNumber: "LR/2025/002", vehicleId: "v2", vehicleNumber: "MH04 CD 5678", driverName: "Suresh Patil", type: "Toll", amount: 3800, receipt: true, addedBy: "Amit Patil", notes: "Pune-Nagpur Highway" },
  { id: "e7", date: "2025-01-15", tripId: "t2", lrNumber: "LR/2025/002", vehicleId: "v2", vehicleNumber: "MH04 CD 5678", driverName: "Suresh Patil", type: "Driver Batta", amount: 3500, receipt: false, addedBy: "Amit Patil" },
  { id: "e8", date: "2025-01-16", tripId: "t2", lrNumber: "LR/2025/002", vehicleId: "v2", vehicleNumber: "MH04 CD 5678", driverName: "Suresh Patil", type: "Repair", amount: 8200, receipt: true, addedBy: "Amit Patil", notes: "Tyre puncture repair near Wardha" },
  { id: "e9", date: "2025-01-11", tripId: "t3", lrNumber: "LR/2025/003", vehicleId: "v3", vehicleNumber: "MH12 EF 9012", driverName: "Mahesh Shinde", type: "Diesel", amount: 9200, receipt: true, addedBy: "Priya Sharma" },
  { id: "e10", date: "2025-01-11", tripId: "t3", lrNumber: "LR/2025/003", vehicleId: "v3", vehicleNumber: "MH12 EF 9012", driverName: "Mahesh Shinde", type: "Toll", amount: 800, receipt: true, addedBy: "Priya Sharma" },
  { id: "e11", date: "2025-01-17", tripId: "t4", lrNumber: "LR/2025/004", vehicleId: "v4", vehicleNumber: "MH46 GH 3456", driverName: "Arun Deshmukh", type: "Diesel", amount: 12000, receipt: true, addedBy: "Priya Sharma" },
  { id: "e12", date: "2025-01-17", tripId: "t4", lrNumber: "LR/2025/004", vehicleId: "v4", vehicleNumber: "MH46 GH 3456", driverName: "Arun Deshmukh", type: "Toll", amount: 1600, receipt: true, addedBy: "Priya Sharma" },
  { id: "e13", date: "2025-01-09", tripId: "t5", lrNumber: "LR/2025/005", vehicleId: "v5", vehicleNumber: "MH14 JK 7890", driverName: "Vijay More", type: "Diesel", amount: 18000, receipt: true, addedBy: "Amit Patil" },
  { id: "e14", date: "2025-01-09", tripId: "t5", lrNumber: "LR/2025/005", vehicleId: "v5", vehicleNumber: "MH14 JK 7890", driverName: "Vijay More", type: "Toll", amount: 2400, receipt: true, addedBy: "Amit Patil" },
  { id: "e15", date: "2025-01-10", tripId: "t5", lrNumber: "LR/2025/005", vehicleId: "v5", vehicleNumber: "MH14 JK 7890", driverName: "Vijay More", type: "Driver Batta", amount: 2500, receipt: false, addedBy: "Amit Patil" },
  { id: "e16", date: "2025-01-07", tripId: "t7", lrNumber: "LR/2025/007", vehicleId: "v1", vehicleNumber: "MH04 AB 1234", driverName: "Ramesh Jadhav", type: "Diesel", amount: 22000, receipt: true, addedBy: "Priya Sharma" },
  { id: "e17", date: "2025-01-07", tripId: "t7", lrNumber: "LR/2025/007", vehicleId: "v1", vehicleNumber: "MH04 AB 1234", driverName: "Ramesh Jadhav", type: "Tyre", amount: 4500, receipt: true, addedBy: "Priya Sharma", notes: "Front left tyre replaced" },
  { id: "e18", date: "2025-01-19", tripId: "t6", lrNumber: "LR/2025/006", vehicleId: "v6", vehicleNumber: "MH04 LM 2345", driverName: "Santosh Kamble", type: "Diesel", amount: 14000, receipt: true, addedBy: "Sneha Raut" },
  { id: "e19", date: "2025-01-12", tripId: "t13", lrNumber: "LR/2025/013", vehicleId: "v8", vehicleNumber: "MH46 QR 0123", driverName: "Pravin Gaikwad", type: "Diesel", amount: 24000, receipt: true, addedBy: "Amit Patil" },
  { id: "e20", date: "2025-01-12", tripId: "t13", lrNumber: "LR/2025/013", vehicleId: "v8", vehicleNumber: "MH46 QR 0123", driverName: "Pravin Gaikwad", type: "Misc", amount: 2800, receipt: false, addedBy: "Amit Patil", notes: "Parking & food allowance" },
];

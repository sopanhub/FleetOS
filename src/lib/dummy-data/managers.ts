import { Manager } from "@/types";

export const managers: Manager[] = [
  {
    id: "m1",
    name: "Priya Sharma",
    email: "priya@fleetos.com",
    phone: "+91 98765 43210",
    dateCreated: "2025-01-12",
    status: "Active",
    assignedVehicles: ["v1", "v2", "v3"],
  },
  {
    id: "m2",
    name: "Amit Patil",
    email: "amit@fleetos.com",
    phone: "+91 98765 43220",
    dateCreated: "2024-11-05",
    status: "Active",
    assignedVehicles: ["v4", "v5", "v6", "v7"],
  },
  {
    id: "m3",
    name: "Sneha Raut",
    email: "sneha@fleetos.com",
    phone: "+91 98765 43230",
    dateCreated: "2024-12-20",
    status: "Inactive",
    assignedVehicles: ["v8"],
  },
];

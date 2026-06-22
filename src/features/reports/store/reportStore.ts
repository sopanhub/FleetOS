"use client";

import { create } from "zustand";

interface ReportStore {
  period: string;
  vehicleFilter: string;
  setPeriod: (period: string) => void;
  setVehicleFilter: (vehicleId: string) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  period: "This Month",
  vehicleFilter: "All",
  setPeriod: (period) => set({ period }),
  setVehicleFilter: (vehicleId) => set({ vehicleFilter: vehicleId }),
}));

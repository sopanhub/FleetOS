"use client";

import { create } from "zustand";
import { Vehicle } from "@/types";
import { vehicles as dummyVehicles } from "@/lib/dummy-data/vehicles";

interface FleetStore {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  activeTab: string;
  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setActiveTab: (tab: string) => void;
}

export const useFleetStore = create<FleetStore>((set) => ({
  vehicles: dummyVehicles,
  selectedVehicle: null,
  activeTab: "overview",
  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

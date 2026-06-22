"use client";

import { create } from "zustand";
import { Trip, DateRange } from "@/types";
import { trips as dummyTrips } from "@/lib/dummy-data/trips";

interface TripStore {
  trips: Trip[];
  selectedTrip: Trip | null;
  filters: {
    search: string;
    status: string;
    vehicleId: string;
    dateRange: DateRange;
  };
  isCreateSheetOpen: boolean;
  isDetailSheetOpen: boolean;
  setTrips: (trips: Trip[]) => void;
  setSelectedTrip: (trip: Trip | null) => void;
  setFilter: (key: string, value: string) => void;
  setDateRange: (range: DateRange) => void;
  clearFilters: () => void;
  openCreateSheet: () => void;
  closeCreateSheet: () => void;
  openDetailSheet: (trip: Trip) => void;
  closeDetailSheet: () => void;
  addTrip: (trip: Trip) => void;
  updateTripStatus: (id: string, status: Trip["status"]) => void;
}

const defaultFilters = {
  search: "",
  status: "All",
  vehicleId: "All",
  dateRange: { from: undefined, to: undefined } as DateRange,
};

export const useTripStore = create<TripStore>((set) => ({
  trips: dummyTrips,
  selectedTrip: null,
  filters: defaultFilters,
  isCreateSheetOpen: false,
  isDetailSheetOpen: false,
  setTrips: (trips) => set({ trips }),
  setSelectedTrip: (trip) => set({ selectedTrip: trip }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  setDateRange: (range) =>
    set((state) => ({
      filters: { ...state.filters, dateRange: range },
    })),
  clearFilters: () => set({ filters: defaultFilters }),
  openCreateSheet: () => set({ isCreateSheetOpen: true }),
  closeCreateSheet: () => set({ isCreateSheetOpen: false }),
  openDetailSheet: (trip) =>
    set({ selectedTrip: trip, isDetailSheetOpen: true }),
  closeDetailSheet: () =>
    set({ selectedTrip: null, isDetailSheetOpen: false }),
  addTrip: (trip) => set((state) => ({ trips: [trip, ...state.trips] })),
  updateTripStatus: (id, status) =>
    set((state) => ({
      trips: state.trips.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}));

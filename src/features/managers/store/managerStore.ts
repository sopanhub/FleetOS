"use client";

import { create } from "zustand";
import { Manager } from "@/types";
import { managers as dummyManagers } from "@/lib/dummy-data/managers";

interface ManagerStore {
  managers: Manager[];
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  selectedManager: Manager | null;
  setManagers: (managers: Manager[]) => void;
  addManager: (manager: Manager) => void;
  updateManager: (id: string, data: Partial<Manager>) => void;
  deleteManager: (id: string) => void;
  toggleStatus: (id: string) => void;
  openCreateSheet: () => void;
  closeCreateSheet: () => void;
  openEditSheet: (manager: Manager) => void;
  closeEditSheet: () => void;
}

export const useManagerStore = create<ManagerStore>((set) => ({
  managers: dummyManagers,
  isCreateSheetOpen: false,
  isEditSheetOpen: false,
  selectedManager: null,
  setManagers: (managers) => set({ managers }),
  addManager: (manager) =>
    set((state) => ({ managers: [...state.managers, manager] })),
  updateManager: (id, data) =>
    set((state) => ({
      managers: state.managers.map((m) =>
        m.id === id ? { ...m, ...data } : m
      ),
    })),
  deleteManager: (id) =>
    set((state) => ({
      managers: state.managers.filter((m) => m.id !== id),
    })),
  toggleStatus: (id) =>
    set((state) => ({
      managers: state.managers.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Active" ? "Inactive" as const : "Active" as const }
          : m
      ),
    })),
  openCreateSheet: () => set({ isCreateSheetOpen: true }),
  closeCreateSheet: () => set({ isCreateSheetOpen: false }),
  openEditSheet: (manager) =>
    set({ selectedManager: manager, isEditSheetOpen: true }),
  closeEditSheet: () =>
    set({ selectedManager: null, isEditSheetOpen: false }),
}));

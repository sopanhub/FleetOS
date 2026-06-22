"use client";

import { create } from "zustand";
import { Expense } from "@/types";
import { expenses as dummyExpenses } from "@/lib/dummy-data/expenses";

interface ExpenseStore {
  expenses: Expense[];
  isAddSheetOpen: boolean;
  filters: { search: string; type: string; vehicleId: string };
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  openAddSheet: () => void;
  closeAddSheet: () => void;
  setFilter: (key: string, value: string) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: dummyExpenses,
  isAddSheetOpen: false,
  filters: { search: "", type: "All", vehicleId: "All" },
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),
  openAddSheet: () => set({ isAddSheetOpen: true }),
  closeAddSheet: () => set({ isAddSheetOpen: false }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
}));

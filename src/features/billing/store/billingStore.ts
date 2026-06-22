"use client";

import { create } from "zustand";
import { Invoice } from "@/types";
import { invoices as dummyInvoices } from "@/lib/dummy-data/invoices";

interface BillingStore {
  invoices: Invoice[];
  activeTab: string;
  setInvoices: (invoices: Invoice[]) => void;
  setActiveTab: (tab: string) => void;
  markAsPaid: (id: string) => void;
}

export const useBillingStore = create<BillingStore>((set) => ({
  invoices: dummyInvoices,
  activeTab: "All",
  setInvoices: (invoices) => set({ invoices }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  markAsPaid: (id) =>
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === id ? { ...inv, status: "Paid" as const, daysOutstanding: 0 } : inv
      ),
    })),
}));

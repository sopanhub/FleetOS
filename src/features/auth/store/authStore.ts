"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const dummyUsers: Record<UserRole, User> = {
  owner: {
    id: "u1",
    name: "Rajesh Kumar",
    email: "rajesh@fleetos.com",
    role: "owner",
  },
  manager: {
    id: "u2",
    name: "Priya Sharma",
    email: "priya@fleetos.com",
    role: "manager",
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,
      login: (role: UserRole) =>
        set({
          user: dummyUsers[role],
          isAuthenticated: true,
          role,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          role: null,
        }),
      switchRole: (role: UserRole) =>
        set({
          user: dummyUsers[role],
          role,
        }),
    }),
    {
      name: "fleetos-auth",
    }
  )
);

"use client";

import { ManagerSidebar } from "@/components/layout/ManagerSidebar";
import { TopBar } from "@/components/layout/TopBar";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ManagerSidebar />
      <div className="ml-60">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

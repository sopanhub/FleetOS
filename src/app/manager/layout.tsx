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
      <div className="lg:ml-60 ml-0 pb-24 lg:pb-0">
        <TopBar />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

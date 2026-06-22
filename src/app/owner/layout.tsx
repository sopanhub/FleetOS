"use client";

import { OwnerSidebar } from "@/components/layout/OwnerSidebar";
import { TopBar } from "@/components/layout/TopBar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <OwnerSidebar />
      <div className="ml-60">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

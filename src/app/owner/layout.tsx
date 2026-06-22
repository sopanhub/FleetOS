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
      <div className="lg:ml-60 ml-0 pb-24 lg:pb-0">
        <TopBar />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

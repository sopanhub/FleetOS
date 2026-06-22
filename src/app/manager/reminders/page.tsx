"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Plus, Truck, User, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type ReminderItem = {
  id: string;
  icon: "vehicle" | "driver" | "service";
  entity: string;
  message: string;
  dueDate: string;
  daysRemaining: number;
  priority: "critical" | "upcoming" | "resolved";
};

const reminders: ReminderItem[] = [
  { id: "r1", icon: "vehicle", entity: "MH04 AB 1234", message: "Insurance Certificate expires", dueDate: "2025-01-28", daysRemaining: 3, priority: "critical" },
  { id: "r2", icon: "vehicle", entity: "MH04 CD 5678", message: "Fitness Certificate expires", dueDate: "2025-01-30", daysRemaining: 5, priority: "critical" },
  { id: "r3", icon: "driver", entity: "Ramesh Jadhav", message: "Driving License expires", dueDate: "2025-02-06", daysRemaining: 12, priority: "upcoming" },
  { id: "r4", icon: "service", entity: "MH12 EF 9012", message: "Service due at 99,500 km (800 km left)", dueDate: "2025-02-10", daysRemaining: 16, priority: "upcoming" },
  { id: "r5", icon: "vehicle", entity: "MH46 QR 0123", message: "Pollution Certificate expires", dueDate: "2025-03-30", daysRemaining: 64, priority: "upcoming" },
  { id: "r6", icon: "driver", entity: "Arun Deshmukh", message: "License renewal needed", dueDate: "2025-05-10", daysRemaining: 105, priority: "upcoming" },
  { id: "r7", icon: "vehicle", entity: "MH46 GH 3456", message: "Permit renewed successfully", dueDate: "2025-10-31", daysRemaining: 279, priority: "resolved" },
  { id: "r8", icon: "vehicle", entity: "MH14 JK 7890", message: "Insurance renewed successfully", dueDate: "2025-11-30", daysRemaining: 309, priority: "resolved" },
  { id: "r9", icon: "service", entity: "MH04 LM 2345", message: "Next service in 4,200 km", dueDate: "2025-04-15", daysRemaining: 80, priority: "resolved" },
];

const iconMap = {
  vehicle: Truck,
  driver: User,
  service: Wrench,
};

const sections = [
  { title: "Critical (Expiring in 7 days)", priority: "critical", headerColor: "text-danger", borderColor: "border-l-danger", badgeColor: "bg-danger/15 text-danger" },
  { title: "Upcoming (7–30 days)", priority: "upcoming", headerColor: "text-warning", borderColor: "border-l-warning", badgeColor: "bg-warning/15 text-warning" },
  { title: "Resolved / Upcoming after 30 days", priority: "resolved", headerColor: "text-text-secondary", borderColor: "border-l-border", badgeColor: "bg-muted text-text-secondary" },
];

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reminders & Alerts"
        actions={
          <button className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark active:scale-95 transition-all">
            <Plus className="h-4 w-4" /> Add Manual Reminder
          </button>
        }
      />

      {sections.map((section) => {
        const items = reminders.filter((r) => r.priority === section.priority);
        return (
          <div key={section.priority} className="space-y-3">
            <h2 className={cn("text-sm font-semibold uppercase tracking-wider", section.headerColor)}>
              {section.title}
            </h2>
            <div className="space-y-3">
              {items.map((item) => {
                const IconComp = iconMap[item.icon];
                return (
                  <div
                     key={item.id}
                     className={cn(
                       "flex items-center gap-4 rounded-2xl border border-border border-l-4 bg-card p-4 shadow-sm hover:shadow-md transition-shadow",
                       section.borderColor
                     )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <IconComp className="h-5 w-5 text-text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        {item.entity} — {item.message}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">Due: {item.dueDate}</p>
                    </div>
                    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold shrink-0", section.badgeColor)}>
                      {item.daysRemaining}d
                    </span>
                    {section.priority === "critical" && (
                      <div className="flex gap-2 shrink-0">
                        <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark active:scale-95 transition-all">
                          Renew Now
                        </button>
                        <button className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-muted transition-colors">
                          Mark Resolved
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

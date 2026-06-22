"use client";

import { redirect } from "next/navigation";

export default function TripDetailPage() {
  // Redirect to the trips page — detail is shown in a sheet
  redirect("/manager/trips");
}

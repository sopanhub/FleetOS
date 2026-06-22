"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Truck, Eye, EyeOff, Check, Building2, User } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

export default function LoginPage() {
  const [email, setEmail] = useState("rajesh@fleetos.com");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("owner");
  const { login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    toast.info("Demo mode — all data is sample data", {
      duration: 4000,
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    toast.success(`Signed in as ${selectedRole === "owner" ? "Owner" : "Manager"}`);
    router.push(selectedRole === "owner" ? "/owner/dashboard" : "/manager/dashboard");
  };

  const features = [
    "Track every trip, every rupee, every kilometer in real-time",
    "Manage fleet, drivers, and vehicle documents effortlessly",
    "Generate invoices, LR, and P&L reports instantly",
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Panel — Hero */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#111111] relative overflow-hidden flex-col justify-center px-16">
        {/* Subtle gradient orb */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[#FF6B00]/10 blur-3xl" />
        <div className="absolute bottom-1/4 -left-16 w-64 h-64 rounded-full bg-[#FF6B00]/5 blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B00]">
              <Truck className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">
              Fleet<span className="text-[#FF6B00]">OS</span>
            </span>
          </div>

          {/* Tagline */}
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Track every rupee.
            <br />
            <span className="text-[#FF6B00]">Every kilometer.</span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-md">
            The complete fleet management platform built for Indian transport businesses.
          </p>

          {/* Feature bullets */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] mt-0.5">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6B00]">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#111111]">
              Fleet<span className="text-[#FF6B00]">OS</span>
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#111111] mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-[#666666] mb-8">
            Sign in to your FleetOS account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#F8F8F8] text-sm text-[#111111] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#F8F8F8] text-sm text-[#111111] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#666666] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#EEEEEE] text-[#FF6B00] focus:ring-[#FF6B00]"
                />
                <span className="text-sm text-[#666666]">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#FF6B00] hover:text-[#CC5500] font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Role selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#111111]">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("owner")}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200",
                    selectedRole === "owner"
                      ? "border-[#FF6B00] bg-[#FFF0E5]"
                      : "border-[#EEEEEE] bg-white hover:border-[#AAAAAA]"
                  )}
                >
                  <Building2
                    className={cn(
                      "h-6 w-6",
                      selectedRole === "owner" ? "text-[#FF6B00]" : "text-[#AAAAAA]"
                    )}
                  />
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        selectedRole === "owner" ? "text-[#FF6B00]" : "text-[#111111]"
                      )}
                    >
                      Owner / Admin
                    </p>
                    <p className="text-xs text-[#AAAAAA] mt-0.5">
                      Full access to P&L, fleet, managers
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("manager")}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200",
                    selectedRole === "manager"
                      ? "border-[#FF6B00] bg-[#FFF0E5]"
                      : "border-[#EEEEEE] bg-white hover:border-[#AAAAAA]"
                  )}
                >
                  <User
                    className={cn(
                      "h-6 w-6",
                      selectedRole === "manager" ? "text-[#FF6B00]" : "text-[#AAAAAA]"
                    )}
                  />
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        selectedRole === "manager" ? "text-[#FF6B00]" : "text-[#111111]"
                      )}
                    >
                      Manager
                    </p>
                    <p className="text-xs text-[#AAAAAA] mt-0.5">
                      Operations, trips, billing
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#FF6B00] px-5 py-3 text-sm font-semibold text-white hover:bg-[#CC5500] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#FF6B00]/20"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

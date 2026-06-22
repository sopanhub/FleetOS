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
    <div className="flex min-h-screen bg-white">
      {/* Left Panel — Hero */}
      <div className="hidden lg:flex lg:w-[58%] bg-[#111111] relative flex-col justify-center px-20 z-10">
        {/* Subtle gradient orbs wrapper */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-20 w-[400px] h-[400px] rounded-full bg-[#FF6B00]/15 blur-3xl" />
          <div className="absolute bottom-1/4 -left-16 w-80 h-80 rounded-full bg-[#FF6B00]/5 blur-3xl" />
        </div>

        {/* Wavy Divider SVG */}
        <svg 
          className="absolute right-0 top-0 h-full w-20 text-[#111111] fill-current translate-x-[98%] pointer-events-none z-20 drop-shadow-[15px_0_15px_rgba(0,0,0,0.15)]"
          viewBox="0 0 100 1000" 
          preserveAspectRatio="none"
        >
          <path d="M0,0 C45,120 90,220 50,400 C10,580 85,700 35,850 C15,920 40,960 0,1000 L0,0 Z" />
        </svg>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-16">
            <Truck className="h-14 w-14 text-[#FF6B00] shrink-0" />
            <span className="text-5xl font-extrabold text-white tracking-tight">
              Fleet<span className="text-[#FF6B00]">OS</span>
            </span>
          </div>

          {/* Tagline */}
          <h1 className="text-5xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
            Track every rupee.
            <br />
            <span className="text-[#FF6B00]">Every kilometer.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
            The complete fleet management platform built for Indian transport businesses.
          </p>

          {/* Feature bullets */}
          <div className="space-y-5">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] mt-0.5 shadow-md shadow-[#FF6B00]/20">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-gray-300 text-base leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center bg-[#F5F5F7] lg:bg-white px-4 py-4 sm:py-8 relative overflow-hidden">
        <div className="w-full max-w-md relative z-10 bg-white border border-[#EEEEEE] lg:border-none lg:shadow-none shadow-xl rounded-[2.5rem] overflow-hidden">
          
          {/* Mobile Dark Header with Wavy Cut (hidden on desktop) */}
          <div className="lg:hidden bg-[#111111] pt-10 pb-12 relative flex flex-col items-center justify-center pointer-events-none">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-[#FF6B00] shrink-0" />
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Fleet<span className="text-[#FF6B00]">OS</span>
              </span>
            </div>
            
            {/* Horizontal Wavy Divider */}
            <svg 
              className="absolute bottom-0 left-0 w-full h-8 text-white fill-current translate-y-[2px]"
              viewBox="0 0 1000 100" 
              preserveAspectRatio="none"
            >
              <path d="M0,0 C150,80 350,10 500,50 C650,90 850,20 1000,0 L1000,100 L0,100 Z" />
            </svg>
          </div>

          {/* Form Content Wrapper */}
          <div className="p-5 sm:p-8 lg:p-0 bg-white">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] mb-0.5 sm:mb-1">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mb-5 sm:mb-8">
              Sign in to your FleetOS account
            </p>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
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
    </div>
  );
}

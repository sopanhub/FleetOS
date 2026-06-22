"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "sonner";
import { Save, Building2, Bell, Shield, Key, Copy, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const [credentials, setCredentials] = useState([
    { id: "cred-1", name: "WhatsApp Notification Gateway", clientId: "fl_client_9a2f38d", clientSecret: "fl_sec_d83fa9c8f9218e8a1", level: "Admin", date: "2025-01-10" },
    { id: "cred-2", name: "Third-party GPS Integration", clientId: "fl_client_2b9d88c", clientSecret: "fl_sec_4a8df38fa821ca52f", level: "Read-only", date: "2025-01-14" },
  ]);
  const [newCredName, setNewCredName] = useState("");
  const [newCredLevel, setNewCredLevel] = useState("Manager");
  const [showSecretId, setShowSecretId] = useState<string | null>(null);

  const handleGenerateCred = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCredName.trim()) {
      toast.error("Please enter a name for the credentials");
      return;
    }
    const clientId = `fl_client_${Math.random().toString(36).substring(2, 9)}`;
    const clientSecret = `fl_sec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 10)}`;
    
    const newCred = {
      id: `cred-${Date.now()}`,
      name: newCredName,
      clientId,
      clientSecret,
      level: newCredLevel,
      date: new Date().toISOString().split("T")[0]
    };
    
    setCredentials([newCred, ...credentials]);
    setNewCredName("");
    toast.success("New credentials created! Copy your secret key now.");
  };

  const handleDeleteCred = (id: string) => {
    setCredentials(credentials.filter(c => c.id !== id));
    toast.success("Access credentials revoked successfully.");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" />

      <div className="grid gap-6 max-w-3xl pb-12">
        {/* Company Info */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-primary">Company Information</h2>
              <p className="text-xs text-text-muted">Your business details</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Company Name</label>
                <input defaultValue="Kumar Transport Co." className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">GST Number</label>
                <input defaultValue="27AAACK1234M1Z5" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Business Address</label>
              <input defaultValue="45, Transport Nagar, Vashi, Navi Mumbai – 400703" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Phone</label>
                <input defaultValue="+91 22 2784 5600" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Email</label>
                <input defaultValue="admin@kumartransport.com" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* API & Access Credentials */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-primary">API & Manager Credentials</h2>
              <p className="text-xs text-text-muted">Generate credentials and API tokens for external integrations or manager logins</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerateCred} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-background border border-border">
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase font-bold text-text-secondary mb-1">Credential Description / Name</label>
              <input 
                type="text" 
                placeholder="e.g. GPS Tracking API Key" 
                value={newCredName}
                onChange={(e) => setNewCredName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-text-secondary mb-1">Access Level</label>
              <div className="flex gap-2">
                <Select 
                  value={newCredLevel} 
                  onValueChange={(val) => setNewCredLevel(val || "Manager")}
                >
                  <SelectTrigger className="flex-1 rounded-lg border-border h-[30px] bg-card text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <SelectValue placeholder="Access Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager Access</SelectItem>
                    <SelectItem value="Admin">Full Admin</SelectItem>
                    <SelectItem value="Read-only">Read-only</SelectItem>
                  </SelectContent>
                </Select>
                <button type="submit" className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-white hover:bg-primary-dark shrink-0 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>

          {/* List of keys */}
          <div className="space-y-3">
            {credentials.map((cred) => (
              <div key={cred.id} className="p-4 rounded-xl border border-border hover:border-primary/20 transition-all space-y-3 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">{cred.name}</h4>
                    <p className="text-[10px] text-text-muted">Created on {cred.date} · Level: <span className="font-semibold text-primary">{cred.level}</span></p>
                  </div>
                  <button onClick={() => handleDeleteCred(cred.id)} className="p-1.5 rounded-lg hover:bg-danger/10 text-danger transition-colors" title="Revoke Keys">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-background p-3 rounded-lg border border-border font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-text-muted block">Client ID</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-text-primary truncate">{cred.clientId}</span>
                      <button type="button" onClick={() => { navigator.clipboard.writeText(cred.clientId); toast.success("Client ID copied!"); }} className="p-1 hover:bg-muted rounded">
                        <Copy className="h-3 w-3 text-text-secondary" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text-muted block">Client Secret</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-text-primary truncate">
                        {showSecretId === cred.id ? cred.clientSecret : "••••••••••••••••••••"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => setShowSecretId(showSecretId === cred.id ? null : cred.id)} className="p-1 hover:bg-muted rounded">
                          {showSecretId === cred.id ? <EyeOff className="h-3 w-3 text-text-secondary" /> : <Eye className="h-3 w-3 text-text-secondary" />}
                        </button>
                        <button type="button" onClick={() => { navigator.clipboard.writeText(cred.clientSecret); toast.success("Client Secret copied!"); }} className="p-1 hover:bg-muted rounded">
                          <Copy className="h-3 w-3 text-text-secondary" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-primary">Notification Preferences</h2>
              <p className="text-xs text-text-muted">Configure alert settings</p>
            </div>
          </div>
          <div className="space-y-3">
            {["Document expiry reminders", "Trip status updates", "Invoice payment alerts", "Daily summary email"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl bg-background border border-border p-3">
                <span className="text-sm text-text-primary">{item}</span>
                <Checkbox defaultChecked />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-primary">Security</h2>
              <p className="text-xs text-text-muted">Password and access settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => toast.success("Settings saved!")}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark active:scale-95 transition-all w-fit"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}

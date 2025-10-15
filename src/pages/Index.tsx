import { useState } from "react";
import { Shield, Activity, Zap, Globe, FileCheck, Lock } from "lucide-react";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { ProtectionModule } from "@/components/dashboard/ProtectionModule";
import { ScanButton } from "@/components/dashboard/ScanButton";
import { RecentScans } from "@/components/dashboard/RecentScans";

const Index = () => {
  const [realtimeProtection, setRealtimeProtection] = useState(true);
  const [firewall, setFirewall] = useState(true);
  const [webProtection, setWebProtection] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">SecureGuard Pro</h1>
                <p className="text-xs text-muted-foreground">Advanced Security Suite</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
                Protected
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Threats Blocked"
            value="1,247"
            icon={Shield}
            variant="success"
          />
          <StatusCard
            title="Files Scanned"
            value="45.2K"
            icon={FileCheck}
            variant="default"
          />
          <StatusCard
            title="System Health"
            value="98%"
            icon={Activity}
            variant="success"
          />
          <StatusCard
            title="Security Score"
            value="A+"
            icon={Lock}
            variant="success"
          />
        </div>

        {/* Scan Section and Protection Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <ScanButton />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Protection Status</h3>
            <ProtectionModule
              title="Real-time Protection"
              description="Monitors and blocks threats in real-time"
              icon={Shield}
              enabled={realtimeProtection}
              onToggle={setRealtimeProtection}
            />
            <ProtectionModule
              title="Firewall"
              description="Blocks unauthorized network access"
              icon={Zap}
              enabled={firewall}
              onToggle={setFirewall}
            />
            <ProtectionModule
              title="Web Protection"
              description="Protects against malicious websites"
              icon={Globe}
              enabled={webProtection}
              onToggle={setWebProtection}
            />
          </div>
        </div>

        {/* Recent Scans */}
        <RecentScans />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-muted-foreground">
            SecureGuard Pro © 2025 - Your trusted security partner
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

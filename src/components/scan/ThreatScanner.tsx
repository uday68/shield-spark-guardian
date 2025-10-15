import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Search, Activity, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeScans } from "@/hooks/useRealtimeScans";

export const ThreatScanner = () => {
  const { currentScan } = useRealtimeScans();

  const handleScan = async (scanType: "quick" | "deep") => {
    try {
      toast.loading(`Starting ${scanType} scan...`);
      
      const { data, error } = await supabase.functions.invoke("perform-scan", {
        body: { scanType },
      });

      if (error) throw error;

      toast.success("Scan started!", {
        description: "Monitoring threats in real-time",
      });
    } catch (error) {
      console.error("Scan error:", error);
      toast.error("Scan failed", {
        description: "An error occurred during scanning",
      });
    }
  };

  const isScanning = currentScan?.status === "running";
  const progress = currentScan?.progress || 0;
  const threatsFound = currentScan?.threats_found || 0;

  return (
    <Card className="p-8 shadow-card border-2 border-primary/20 bg-gradient-security">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            {isScanning ? (
              <Activity className="w-8 h-8 text-primary animate-pulse" />
            ) : threatsFound > 0 ? (
              <AlertTriangle className="w-8 h-8 text-warning" />
            ) : (
              <Shield className="w-8 h-8 text-primary" />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">Threat Detection Scanner</h2>
          <p className="text-muted-foreground">
            {isScanning
              ? `${currentScan?.scan_type === "quick" ? "Quick" : "Deep"} scanning in progress...`
              : threatsFound > 0
              ? `${threatsFound} threat(s) detected`
              : "Select scan type to begin"}
          </p>
        </div>

        {/* Progress */}
        {isScanning && (
          <div className="space-y-2 animate-fade-in">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{progress}% Complete</span>
              <span className="text-muted-foreground truncate max-w-[200px]">
                {currentScan?.current_file || ""}
              </span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {currentScan?.files_scanned || 0} files scanned
            </div>
          </div>
        )}

        {/* Scan Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="scan"
            size="lg"
            onClick={() => handleScan("quick")}
            disabled={isScanning}
            className="w-full"
          >
            <Search />
            Quick Scan
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleScan("deep")}
            disabled={isScanning}
            className="w-full"
          >
            <Activity />
            Deep Scan
          </Button>
        </div>

        {/* Algorithm Info */}
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Real-time Detection:</strong> Advanced signature-based and heuristic analysis
            running on Lovable Cloud backend with live database updates.
          </p>
        </div>
      </div>
    </Card>
  );
};

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Search, Activity, AlertTriangle } from "lucide-react";
import { quickScan, deepScan, DetectedThreat, calculateRiskScore } from "@/lib/threatDetection";
import { toast } from "sonner";

interface ThreatScannerProps {
  onThreatsDetected?: (threats: DetectedThreat[]) => void;
}

export const ThreatScanner = ({ onThreatsDetected }: ThreatScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState<"quick" | "deep" | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [threats, setThreats] = useState<DetectedThreat[]>([]);

  const handleScan = async (type: "quick" | "deep") => {
    setIsScanning(true);
    setScanType(type);
    setProgress(0);
    setThreats([]);
    
    try {
      const scanFunction = type === "quick" ? quickScan : deepScan;
      const detectedThreats = await scanFunction((prog, file) => {
        setProgress(prog);
        setCurrentFile(file);
      });
      
      setThreats(detectedThreats);
      
      if (detectedThreats.length > 0) {
        const riskScore = calculateRiskScore(detectedThreats);
        toast.error(`Scan complete: ${detectedThreats.length} threat(s) detected! Risk score: ${riskScore}`, {
          description: "Review and quarantine threats immediately",
        });
        onThreatsDetected?.(detectedThreats);
      } else {
        toast.success("Scan complete: No threats detected", {
          description: "Your system is clean and secure",
        });
      }
    } catch (error) {
      toast.error("Scan failed", {
        description: "An error occurred during scanning",
      });
    } finally {
      setIsScanning(false);
      setScanType(null);
      setCurrentFile("");
    }
  };

  return (
    <Card className="p-8 shadow-card border-2 border-primary/20 bg-gradient-security">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            {isScanning ? (
              <Activity className="w-8 h-8 text-primary animate-pulse" />
            ) : threats.length > 0 ? (
              <AlertTriangle className="w-8 h-8 text-warning" />
            ) : (
              <Shield className="w-8 h-8 text-primary" />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">Threat Detection Scanner</h2>
          <p className="text-muted-foreground">
            {isScanning
              ? `${scanType === "quick" ? "Quick" : "Deep"} scanning in progress...`
              : threats.length > 0
              ? `${threats.length} threat(s) detected`
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
                {currentFile}
              </span>
            </div>
          </div>
        )}

        {/* Threat Summary */}
        {!isScanning && threats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-muted-foreground mb-1">Threats Found</p>
              <p className="text-2xl font-bold text-destructive">{threats.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
              <p className="text-2xl font-bold text-warning">
                {calculateRiskScore(threats)}%
              </p>
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
            <strong>Detection Algorithm:</strong> Uses signature-based and heuristic analysis
            to identify known threats and suspicious behavior patterns in real-time.
          </p>
        </div>
      </div>
    </Card>
  );
};

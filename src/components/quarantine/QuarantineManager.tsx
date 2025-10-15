import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Archive, AlertTriangle, CheckCircle } from "lucide-react";
import { DetectedThreat } from "@/lib/threatDetection";
import { toast } from "sonner";

interface QuarantineManagerProps {
  threats: DetectedThreat[];
  onThreatsUpdate?: (threats: DetectedThreat[]) => void;
}

export const QuarantineManager = ({ threats, onThreatsUpdate }: QuarantineManagerProps) => {
  const [managedThreats, setManagedThreats] = useState<DetectedThreat[]>(threats);

  const handleQuarantine = (threatId: string) => {
    const updated = managedThreats.map((t) =>
      t.id === threatId ? { ...t, status: "quarantined" as const } : t
    );
    setManagedThreats(updated);
    onThreatsUpdate?.(updated);
    toast.success("Threat quarantined", {
      description: "The threat has been isolated safely",
    });
  };

  const handleRemove = (threatId: string) => {
    const updated = managedThreats.map((t) =>
      t.id === threatId ? { ...t, status: "removed" as const } : t
    );
    setManagedThreats(updated);
    onThreatsUpdate?.(updated);
    toast.success("Threat removed", {
      description: "The threat has been permanently deleted",
    });
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: "bg-success/10 text-success border-success/20",
      medium: "bg-warning/10 text-warning border-warning/20",
      high: "bg-destructive/10 text-destructive border-destructive/20",
      critical: "bg-gradient-threat text-destructive-foreground border-destructive",
    };
    return colors[severity as keyof typeof colors] || colors.medium;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "quarantined":
        return <Archive className="w-4 h-4" />;
      case "removed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (managedThreats.length === 0) {
    return (
      <Card className="p-8 shadow-card border-border text-center">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">No Threats Detected</h3>
        <p className="text-muted-foreground">Your system is clean and secure</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Threat Management</h3>
        <Badge variant="destructive" className="text-sm">
          {managedThreats.filter((t) => t.status === "detected").length} Active
        </Badge>
      </div>

      <div className="space-y-3">
        {managedThreats.map((threat) => (
          <div
            key={threat.id}
            className="p-4 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-colors animate-fade-in"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(threat.status)}
                  <h4 className="font-semibold">{threat.name}</h4>
                  <Badge className={getSeverityColor(threat.severity)}>
                    {threat.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Type:</strong> {threat.type}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  <strong>Path:</strong> {threat.filePath}
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Detected:</strong> {threat.detectedAt.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {threat.status === "detected" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuarantine(threat.id)}
                    >
                      <Archive className="w-4 h-4" />
                      Quarantine
                    </Button>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleRemove(threat.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  </>
                )}
                {threat.status === "quarantined" && (
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleRemove(threat.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                )}
                {threat.status === "removed" && (
                  <Badge variant="outline" className="bg-success/10 text-success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Removed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

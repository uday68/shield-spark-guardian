import { Card } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Clock, Loader2 } from "lucide-react";
import { useRealtimeScans } from "@/hooks/useRealtimeScans";
import { formatDistanceToNow } from "date-fns";

export const RecentScans = () => {
  const { scans, loading } = useRealtimeScans();

  if (loading) {
    return (
      <Card className="p-6 shadow-card border-border">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  if (scans.length === 0) {
    return (
      <Card className="p-6 shadow-card border-border">
        <h3 className="text-xl font-bold mb-4">Recent Scans</h3>
        <p className="text-center text-muted-foreground py-8">
          No scans yet. Start your first scan above!
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-card border-border animate-fade-in">
      <h3 className="text-xl font-bold mb-4">Recent Scans</h3>
      <div className="space-y-3">
        {scans.map((scan) => (
          <div
            key={scan.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  scan.status === "running"
                    ? "bg-primary/10 text-primary"
                    : scan.threats_found === 0
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {scan.status === "running" ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : scan.threats_found === 0 ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertTriangle size={20} />
                )}
              </div>
              <div>
                <p className="font-semibold capitalize">
                  {scan.scan_type} Scan
                  {scan.status === "running" && (
                    <span className="ml-2 text-xs text-primary">
                      ({scan.progress}%)
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />
                  {formatDistanceToNow(new Date(scan.started_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {scan.files_scanned.toLocaleString()} files
              </p>
              {scan.threats_found > 0 && (
                <p className="text-xs text-warning">
                  {scan.threats_found} threats found
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

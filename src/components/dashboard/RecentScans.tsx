import { Card } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

const scans = [
  {
    id: 1,
    type: "Quick Scan",
    date: "Today, 2:30 PM",
    status: "clean",
    filesScanned: 45231,
  },
  {
    id: 2,
    type: "Full Scan",
    date: "Yesterday, 11:45 AM",
    status: "threats",
    filesScanned: 123456,
    threatsFound: 3,
  },
  {
    id: 3,
    type: "Quick Scan",
    date: "2 days ago",
    status: "clean",
    filesScanned: 45180,
  },
];

export const RecentScans = () => {
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
                  scan.status === "clean"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {scan.status === "clean" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertTriangle size={20} />
                )}
              </div>
              <div>
                <p className="font-semibold">{scan.type}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />
                  {scan.date}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {scan.filesScanned.toLocaleString()} files
              </p>
              {scan.threatsFound && (
                <p className="text-xs text-warning">
                  {scan.threatsFound} threats found
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "danger";
  loading?: boolean;
}

export const StatusCard = ({ title, value, icon: Icon, variant = "default", loading = false }: StatusCardProps) => {
  const variantStyles = {
    default: "border-border",
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    danger: "border-destructive/30 bg-destructive/5",
  };

  const iconStyles = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  };

  return (
    <Card className={`p-6 shadow-card border-2 ${variantStyles[variant]} animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">
            {loading ? "..." : value}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-card ${iconStyles[variant]}`}>
          <Icon size={28} />
        </div>
      </div>
    </Card>
  );
};

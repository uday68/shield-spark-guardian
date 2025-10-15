import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface ProtectionModuleProps {
  title: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const ProtectionModule = ({
  title,
  description,
  icon: Icon,
  enabled,
  onToggle,
}: ProtectionModuleProps) => {
  return (
    <Card className="p-4 shadow-card border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className={`p-2 rounded-lg ${enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>
      {enabled && (
        <div className="mt-3 flex items-center gap-2 text-xs text-success">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
          Active Protection
        </div>
      )}
    </Card>
  );
};

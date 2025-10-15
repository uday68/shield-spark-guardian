import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export const ScanButton = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScan = () => {
    setIsScanning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setProgress(0);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <Card className="p-8 shadow-card border-2 border-primary/20 bg-gradient-security animate-fade-in">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 animate-pulse-glow">
          {isScanning ? (
            <Loader2 className="w-10 h-10 text-primary animate-rotate" />
          ) : (
            <Shield className="w-10 h-10 text-primary" />
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-2">System Protection</h2>
          <p className="text-muted-foreground">
            {isScanning ? "Scanning your system..." : "Your system is protected"}
          </p>
        </div>

        {isScanning && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{progress}% Complete</p>
          </div>
        )}

        <Button 
          variant="scan" 
          size="lg" 
          onClick={handleScan}
          disabled={isScanning}
          className="w-full max-w-xs"
        >
          {isScanning ? (
            <>
              <Loader2 className="animate-rotate" />
              Scanning...
            </>
          ) : (
            <>
              <Shield />
              Quick Scan
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

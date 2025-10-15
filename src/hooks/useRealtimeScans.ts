import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Scan {
  id: string;
  scan_type: string;
  status: string;
  progress: number;
  files_scanned: number;
  threats_found: number;
  current_file: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

export const useRealtimeScans = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [currentScan, setCurrentScan] = useState<Scan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent scans
    const fetchScans = async () => {
      const { data, error } = await supabase
        .from("scans")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching scans:", error);
      } else {
        setScans(data || []);
        const running = data?.find((s) => s.status === "running");
        setCurrentScan(running || null);
      }
      setLoading(false);
    };

    fetchScans();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("scans_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "scans",
        },
        (payload) => {
          console.log("Scan updated:", payload);
          
          if (payload.eventType === "INSERT") {
            setScans((prev) => [payload.new as Scan, ...prev.slice(0, 4)]);
            if ((payload.new as Scan).status === "running") {
              setCurrentScan(payload.new as Scan);
            }
          } else if (payload.eventType === "UPDATE") {
            setScans((prev) =>
              prev.map((s) => (s.id === payload.new.id ? (payload.new as Scan) : s))
            );
            if ((payload.new as Scan).status === "running") {
              setCurrentScan(payload.new as Scan);
            } else if (currentScan?.id === payload.new.id) {
              setCurrentScan(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { scans, currentScan, loading };
};

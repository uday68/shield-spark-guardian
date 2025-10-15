import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SystemStats {
  id: string;
  threats_blocked: number;
  files_scanned: number;
  system_health: number;
  security_score: string;
  last_scan_at: string | null;
  updated_at: string;
}

export const useSystemStats = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial stats
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("system_stats")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching stats:", error);
      } else {
        setStats(data);
      }
      setLoading(false);
    };

    fetchStats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("system_stats_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "system_stats",
        },
        (payload) => {
          console.log("Stats updated:", payload);
          setStats(payload.new as SystemStats);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading };
};

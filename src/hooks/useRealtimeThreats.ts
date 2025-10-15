import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Threat {
  id: string;
  scan_id: string | null;
  name: string;
  type: string;
  severity: string;
  file_path: string;
  status: string;
  detected_at: string;
  created_at: string;
}

export const useRealtimeThreats = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch threats
    const fetchThreats = async () => {
      const { data, error } = await supabase
        .from("threats")
        .select("*")
        .order("detected_at", { ascending: false });

      if (error) {
        console.error("Error fetching threats:", error);
      } else {
        setThreats(data || []);
      }
      setLoading(false);
    };

    fetchThreats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("threats_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "threats",
        },
        (payload) => {
          console.log("Threat updated:", payload);
          
          if (payload.eventType === "INSERT") {
            setThreats((prev) => [payload.new as Threat, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setThreats((prev) =>
              prev.map((t) => (t.id === payload.new.id ? (payload.new as Threat) : t))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateThreatStatus = async (threatId: string, status: "quarantined" | "removed") => {
    const { error } = await supabase
      .from("threats")
      .update({ status })
      .eq("id", threatId);

    if (error) {
      console.error("Error updating threat:", error);
      throw error;
    }
  };

  return { threats, loading, updateThreatStatus };
};

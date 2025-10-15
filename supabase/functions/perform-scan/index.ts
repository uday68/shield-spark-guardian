import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simulated file system
const simulatedFiles = [
  { path: "C:/Windows/System32/kernel32.dll", content: "safe system file", size: 1024 },
  { path: "C:/Users/Documents/report.pdf", content: "document file", size: 2048 },
  { path: "C:/Program Files/App/main.exe", content: "safe application", size: 4096 },
  { path: "C:/Temp/download.exe", content: "suspicious trojan malicious", size: 512 },
  { path: "C:/Users/Downloads/setup.msi", content: "adware hijack browser", size: 1024 },
  { path: "C:/AppData/temp.dat", content: "safe temporary file", size: 256 },
  { path: "C:/Users/Desktop/invoice.doc", content: "document file", size: 1536 },
  { path: "C:/Windows/explorer.exe", content: "safe system file", size: 2048 },
  { path: "C:/Temp/malware.exe", content: "ransom encrypt crypto", size: 768 },
  { path: "C:/Users/Downloads/keylogger.dll", content: "keylog spyware monitor", size: 512 },
];

// Threat signatures
const threatSignatures = [
  { name: "Win32.GenericTrojan", type: "trojan", severity: "critical", pattern: /trojan|malicious|exploit/i },
  { name: "Adware.BrowserHijacker", type: "adware", severity: "medium", pattern: /adware|hijack|suspicious/i },
  { name: "Spyware.KeyLogger", type: "spyware", severity: "high", pattern: /keylog|spyware|monitor/i },
  { name: "Ransom.CryptoLocker", type: "virus", severity: "critical", pattern: /ransom|encrypt|crypto/i },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scanType } = await req.json();
    console.log(`Starting ${scanType} scan`);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Determine files to scan based on scan type
    const filesToScan = scanType === "quick"
      ? simulatedFiles.filter((f) => 
          f.path.includes("Temp") || f.path.includes("Downloads") || f.path.includes("AppData")
        )
      : simulatedFiles;

    // Create scan record
    const { data: scan, error: scanError } = await supabase
      .from("scans")
      .insert({
        scan_type: scanType,
        status: "running",
        progress: 0,
        files_scanned: 0,
        threats_found: 0,
      })
      .select()
      .single();

    if (scanError) throw scanError;

    console.log("Scan created:", scan.id);

    // Perform scanning in background
    (async () => {
      let filesScanned = 0;
      let threatsFound = 0;

      for (let i = 0; i < filesToScan.length; i++) {
        const file = filesToScan[i];
        
        // Simulate scanning delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        filesScanned++;
        const progress = Math.round(((i + 1) / filesToScan.length) * 100);

        // Check for threats
        for (const signature of threatSignatures) {
          if (signature.pattern.test(file.content)) {
            threatsFound++;
            
            // Insert threat
            await supabase.from("threats").insert({
              scan_id: scan.id,
              name: signature.name,
              type: signature.type,
              severity: signature.severity,
              file_path: file.path,
              status: "detected",
            });
            
            console.log(`Threat detected: ${signature.name} in ${file.path}`);
            break;
          }
        }

        // Update scan progress
        await supabase
          .from("scans")
          .update({
            progress,
            files_scanned: filesScanned,
            threats_found: threatsFound,
            current_file: file.path,
          })
          .eq("id", scan.id);
      }

      // Complete scan
      await supabase
        .from("scans")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", scan.id);

      // Update system stats
      const { data: statsData } = await supabase.from("system_stats").select("id").single();
      if (statsData) {
        await supabase
          .from("system_stats")
          .update({
            files_scanned: filesScanned,
            last_scan_at: new Date().toISOString(),
          })
          .eq("id", statsData.id);
      }

      console.log(`Scan ${scan.id} completed`);
    })();

    return new Response(
      JSON.stringify({ success: true, scanId: scan.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

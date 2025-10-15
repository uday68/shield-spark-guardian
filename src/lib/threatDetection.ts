// Simulated threat detection algorithm
export interface ThreatSignature {
  id: string;
  name: string;
  type: "virus" | "malware" | "trojan" | "spyware" | "adware";
  severity: "low" | "medium" | "high" | "critical";
  pattern: RegExp;
}

export interface DetectedThreat {
  id: string;
  name: string;
  type: string;
  severity: string;
  filePath: string;
  detectedAt: Date;
  status: "detected" | "quarantined" | "removed";
}

// Simulated threat signature database
const threatSignatures: ThreatSignature[] = [
  {
    id: "VIRUS-001",
    name: "Win32.GenericTrojan",
    type: "trojan",
    severity: "critical",
    pattern: /trojan|malicious|exploit/i,
  },
  {
    id: "MALWARE-002",
    name: "Adware.BrowserHijacker",
    type: "adware",
    severity: "medium",
    pattern: /adware|hijack|suspicious/i,
  },
  {
    id: "SPYWARE-003",
    name: "Spyware.KeyLogger",
    type: "spyware",
    severity: "high",
    pattern: /keylog|spyware|monitor/i,
  },
  {
    id: "VIRUS-004",
    name: "Ransom.CryptoLocker",
    type: "virus",
    severity: "critical",
    pattern: /ransom|encrypt|crypto/i,
  },
];

// Simulated file system for scanning
const simulatedFileSystem = [
  { path: "C:/Windows/System32/kernel32.dll", content: "safe system file", size: 1024 },
  { path: "C:/Users/Documents/report.pdf", content: "document file", size: 2048 },
  { path: "C:/Program Files/App/main.exe", content: "safe application", size: 4096 },
  { path: "C:/Temp/download.exe", content: "suspicious trojan malicious", size: 512 },
  { path: "C:/Users/Downloads/setup.msi", content: "adware hijack browser", size: 1024 },
  { path: "C:/AppData/temp.dat", content: "safe temporary file", size: 256 },
  { path: "C:/Users/Desktop/invoice.doc", content: "document file", size: 1536 },
  { path: "C:/Windows/explorer.exe", content: "safe system file", size: 2048 },
];

/**
 * Heuristic scanning algorithm
 * Analyzes file behavior patterns and characteristics
 */
export function heuristicScan(fileContent: string, filePath: string): DetectedThreat | null {
  for (const signature of threatSignatures) {
    if (signature.pattern.test(fileContent)) {
      return {
        id: `THREAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: signature.name,
        type: signature.type,
        severity: signature.severity,
        filePath,
        detectedAt: new Date(),
        status: "detected",
      };
    }
  }
  return null;
}

/**
 * Signature-based scanning algorithm
 * Matches known threat signatures against file database
 */
export function signatureScan(files: typeof simulatedFileSystem): DetectedThreat[] {
  const threats: DetectedThreat[] = [];
  
  for (const file of files) {
    const threat = heuristicScan(file.content, file.path);
    if (threat) {
      threats.push(threat);
    }
  }
  
  return threats;
}

/**
 * Deep scan algorithm with behavior analysis
 * Simulates advanced threat detection
 */
export async function deepScan(
  onProgress: (progress: number, currentFile: string) => void
): Promise<DetectedThreat[]> {
  const threats: DetectedThreat[] = [];
  const totalFiles = simulatedFileSystem.length;
  
  for (let i = 0; i < totalFiles; i++) {
    const file = simulatedFileSystem[i];
    
    // Simulate scanning delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    // Update progress
    const progress = Math.round(((i + 1) / totalFiles) * 100);
    onProgress(progress, file.path);
    
    // Perform heuristic scan
    const threat = heuristicScan(file.content, file.path);
    if (threat) {
      threats.push(threat);
    }
  }
  
  return threats;
}

/**
 * Quick scan algorithm - scans common threat locations
 */
export async function quickScan(
  onProgress: (progress: number, currentFile: string) => void
): Promise<DetectedThreat[]> {
  const commonPaths = simulatedFileSystem.filter(
    (f) => f.path.includes("Temp") || f.path.includes("Downloads") || f.path.includes("AppData")
  );
  
  const threats: DetectedThreat[] = [];
  const totalFiles = commonPaths.length;
  
  for (let i = 0; i < totalFiles; i++) {
    const file = commonPaths[i];
    
    await new Promise((resolve) => setTimeout(resolve, 50));
    
    const progress = Math.round(((i + 1) / totalFiles) * 100);
    onProgress(progress, file.path);
    
    const threat = heuristicScan(file.content, file.path);
    if (threat) {
      threats.push(threat);
    }
  }
  
  return threats;
}

/**
 * Calculate threat risk score
 */
export function calculateRiskScore(threats: DetectedThreat[]): number {
  const severityWeights = {
    low: 1,
    medium: 3,
    high: 7,
    critical: 10,
  };
  
  const totalWeight = threats.reduce((sum, threat) => {
    return sum + (severityWeights[threat.severity as keyof typeof severityWeights] || 0);
  }, 0);
  
  return Math.min(100, totalWeight * 5);
}

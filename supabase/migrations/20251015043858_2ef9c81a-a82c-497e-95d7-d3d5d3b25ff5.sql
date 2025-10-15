-- Create scans table for tracking scan history
CREATE TABLE public.scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_type TEXT NOT NULL CHECK (scan_type IN ('quick', 'deep')),
  status TEXT NOT NULL CHECK (status IN ('running', 'completed', 'failed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  files_scanned INTEGER DEFAULT 0,
  threats_found INTEGER DEFAULT 0,
  current_file TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create threats table for storing detected threats
CREATE TABLE public.threats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID REFERENCES public.scans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('virus', 'malware', 'trojan', 'spyware', 'adware')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  file_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'detected' CHECK (status IN ('detected', 'quarantined', 'removed')),
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system_stats table for real-time monitoring
CREATE TABLE public.system_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  threats_blocked INTEGER DEFAULT 0,
  files_scanned INTEGER DEFAULT 0,
  system_health INTEGER DEFAULT 100 CHECK (system_health >= 0 AND system_health <= 100),
  security_score TEXT DEFAULT 'A+',
  last_scan_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial system stats
INSERT INTO public.system_stats (threats_blocked, files_scanned, system_health, security_score)
VALUES (0, 0, 100, 'A+');

-- Enable Row Level Security
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a demo antivirus app)
CREATE POLICY "Allow public read access to scans" ON public.scans
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to scans" ON public.scans
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to scans" ON public.scans
  FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to threats" ON public.threats
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to threats" ON public.threats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to threats" ON public.threats
  FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to system_stats" ON public.system_stats
  FOR SELECT USING (true);

CREATE POLICY "Allow public update to system_stats" ON public.system_stats
  FOR UPDATE USING (true);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.scans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.threats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_stats;

-- Create function to update system stats after threat detection
CREATE OR REPLACE FUNCTION update_system_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.system_stats
  SET 
    threats_blocked = (SELECT COUNT(*) FROM public.threats WHERE status IN ('quarantined', 'removed')),
    updated_at = now()
  WHERE id = (SELECT id FROM public.system_stats LIMIT 1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to update stats when threats change
CREATE TRIGGER update_stats_on_threat_change
  AFTER INSERT OR UPDATE ON public.threats
  FOR EACH ROW
  EXECUTE FUNCTION update_system_stats();
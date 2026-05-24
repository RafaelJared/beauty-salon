-- ═══════════════════════════════════════════════════
--  LUMIÈRE BEAUTY STUDIO — Supabase Schema
--  Copia y pega esto en el SQL Editor de Supabase
-- ═══════════════════════════════════════════════════

-- 1. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  service     TEXT NOT NULL,
  date        DATE NOT NULL,
  time        TEXT NOT NULL,
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups by date
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments (date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments (status);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT,
  price        TEXT,
  duration     TEXT,
  popular      BOOLEAN DEFAULT FALSE,
  active       BOOLEAN DEFAULT TRUE,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SEED SERVICES
INSERT INTO services (name, description, price, duration, popular, sort_order) VALUES
  ('Tinte de Cabello',   'Coloración profesional con marcas premium.', 'Desde $45', '2–3 horas', TRUE,  1),
  ('Alisado Permanente', 'Keratina, japonés y nanoplastia.',           'Desde $80', '3–4 horas', FALSE, 2),
  ('Planchado',          'Planchado con tratamiento térmico.',          'Desde $20', '45 min',    FALSE, 3),
  ('Ondas Perfectas',    'Ondas románticas o surferas.',               'Desde $25', '1 hora',    FALSE, 4),
  ('Corte de Cabello',   'Corte personalizado + lavado y secado.',     'Desde $30', '1 hora',    TRUE,  5),
  ('Pintado de Uñas',    'Manicure y pedicure. Diseños personalizados.','Desde $15', '45 min',   FALSE, 6);

-- 4. ROW LEVEL SECURITY (optional but recommended)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services     ENABLE ROW LEVEL SECURITY;

-- Allow public read of services
CREATE POLICY "Services are public" ON services
  FOR SELECT USING (active = TRUE);

-- Allow public insert of appointments
CREATE POLICY "Anyone can book" ON appointments
  FOR INSERT WITH CHECK (true);

-- Only service role can read all appointments (admin)
CREATE POLICY "Service role reads all" ON appointments
  FOR SELECT USING (auth.role() = 'service_role');

-- Allow service role to update
CREATE POLICY "Service role updates" ON appointments
  FOR UPDATE USING (auth.role() = 'service_role');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  goal DECIMAL(10,2) NOT NULL,
  raised DECIMAL(10,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donors table
CREATE TABLE IF NOT EXISTS donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appeal_code TEXT,
  year INTEGER,
  appeal_name TEXT,
  structure TEXT,
  giving_category TEXT,
  last_name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip TEXT,
  email TEXT,
  donation_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id),
  campaign_id UUID REFERENCES campaigns(id),
  amount DECIMAL(10,2) NOT NULL,
  frequency TEXT DEFAULT 'one-time',
  status TEXT DEFAULT 'completed',
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to increment campaign amount
CREATE OR REPLACE FUNCTION increment_campaign_amount(
  campaign_id UUID,
  amount DECIMAL
) RETURNS void AS $$
BEGIN
  UPDATE campaigns
  SET raised = raised + amount
  WHERE id = campaign_id;
END;
$$ LANGUAGE plpgsql;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_donors_last_name ON donors(last_name);
CREATE INDEX IF NOT EXISTS idx_donors_state ON donors(state);
CREATE INDEX IF NOT EXISTS idx_donors_year ON donors(year);
CREATE INDEX IF NOT EXISTS idx_donors_appeal_code ON donors(appeal_code);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_campaign_id ON donations(campaign_id);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_donors_updated_at ON donors;
CREATE TRIGGER update_donors_updated_at
    BEFORE UPDATE ON donors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns;
CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_donations_updated_at ON donations;
CREATE TRIGGER update_donations_updated_at
    BEFORE UPDATE ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample campaigns
INSERT INTO campaigns (name, description, goal, start_date, end_date, status)
VALUES 
  ('Summer Camp Fund', 'Help send Scouts to summer camp', 10000, '2024-05-01', '2024-08-31', 'active'),
  ('Equipment Drive', 'New camping and outdoor equipment', 5000, '2024-04-01', '2024-06-30', 'active'),
  ('Leadership Training', 'Support Scout leadership development', 7500, '2024-06-01', '2024-09-30', 'active')
ON CONFLICT DO NOTHING;
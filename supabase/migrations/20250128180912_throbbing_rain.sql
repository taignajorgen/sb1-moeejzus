/*
  # Business Registry Database Schema

  1. New Tables
    - `businesses`
      - Core business information
      - Includes name, industry, description, etc.
    - `quarterly_revenues`
      - Historical revenue data
      - Links to businesses via foreign key
    - `key_metrics`
      - Performance metrics for each business
      - Links to businesses via foreign key
    - `news_items`
      - Recent news about businesses
      - Links to businesses via foreign key

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Restrict write operations to authorized personnel

  3. Notes
    - All tables include audit timestamps
    - Foreign key constraints ensure data integrity
    - Indexes added for common query patterns
*/

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text NOT NULL,
  description text,
  founded text,
  employees text,
  headquarters text,
  revenue text,
  ceo text,
  website text,
  linkedin_handle text,
  twitter_handle text,
  compliance_score integer CHECK (compliance_score >= 0 AND compliance_score <= 100),
  risk_level text CHECK (risk_level IN ('Low', 'Medium', 'High')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quarterly_revenues table
CREATE TABLE IF NOT EXISTS quarterly_revenues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  quarter text NOT NULL,
  revenue numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create key_metrics table
CREATE TABLE IF NOT EXISTS key_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  label text NOT NULL,
  value text NOT NULL,
  change numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news_items table
CREATE TABLE IF NOT EXISTS news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  date text NOT NULL,
  title text NOT NULL,
  source text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS businesses_name_idx ON businesses(name);
CREATE INDEX IF NOT EXISTS businesses_industry_idx ON businesses(industry);
CREATE INDEX IF NOT EXISTS quarterly_revenues_business_id_idx ON quarterly_revenues(business_id);
CREATE INDEX IF NOT EXISTS key_metrics_business_id_idx ON key_metrics(business_id);
CREATE INDEX IF NOT EXISTS news_items_business_id_idx ON news_items(business_id);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quarterly_revenues ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;

-- Create policies for read access
CREATE POLICY "Allow public read access to businesses"
  ON businesses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to quarterly_revenues"
  ON quarterly_revenues FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to key_metrics"
  ON key_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to news_items"
  ON news_items FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quarterly_revenues_updated_at
  BEFORE UPDATE ON quarterly_revenues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_key_metrics_updated_at
  BEFORE UPDATE ON key_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_items_updated_at
  BEFORE UPDATE ON news_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
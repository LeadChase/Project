-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create pending_waitlist table for unconfirmed entries
CREATE TABLE IF NOT EXISTS pending_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  confirmation_token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

-- Create waitlist table (for confirmed entries only)
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for pending_waitlist
CREATE INDEX IF NOT EXISTS idx_pending_waitlist_email ON pending_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_pending_waitlist_confirmation_token ON pending_waitlist(confirmation_token);
CREATE INDEX IF NOT EXISTS idx_pending_waitlist_expires_at ON pending_waitlist(expires_at);

-- Create indexes for waitlist
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Enable Row Level Security
ALTER TABLE pending_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for pending_waitlist
CREATE POLICY "Enable read access for pending_waitlist" 
  ON pending_waitlist FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert access for pending_waitlist" 
  ON pending_waitlist FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable delete access for pending_waitlist" 
  ON pending_waitlist FOR DELETE
  USING (true);

-- Create policies for waitlist
CREATE POLICY "Enable read access for waitlist" 
  ON waitlist FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert access for waitlist" 
  ON waitlist FOR INSERT 
  WITH CHECK (true); 
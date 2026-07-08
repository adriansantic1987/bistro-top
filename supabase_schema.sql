-- SQL Schema for Bistro Top Supabase Database
-- Run this script in the Supabase SQL Editor.

-- Drop tables if they already exist (caution: this deletes existing data!)
DROP TABLE IF EXISTS page_views CASCADE;
DROP TABLE IF EXISTS opening_hours CASCADE;
DROP TABLE IF EXISTS site_content CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;

-- 1. menu_items: id, category, name, description, price, display_order, active
CREATE TABLE menu_items (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('pizze', 'rostilj', 'peka', 'riba', 'predjela_deserti')),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. site_content: key, value, language (hr/en/de/it)
CREATE TABLE site_content (
    key TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('hr', 'en', 'de', 'it')),
    value TEXT NOT NULL,
    PRIMARY KEY (key, language),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. opening_hours: id, day_group, open_time, close_time, season_label
CREATE TABLE opening_hours (
    id SERIAL PRIMARY KEY,
    day_group TEXT NOT NULL,
    open_time TEXT NOT NULL,
    close_time TEXT NOT NULL,
    season_label TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. page_views: id, section, viewed_at
CREATE TABLE page_views (
    id BIGSERIAL PRIMARY KEY,
    section TEXT NOT NULL,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies: allow public read (SELECT) access
CREATE POLICY "Allow public read access on menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access on site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on opening_hours" ON opening_hours FOR SELECT USING (true);
CREATE POLICY "Allow public read access on page_views" ON page_views FOR SELECT USING (true);
-- Write access is restricted to service role / authenticated admin client requests (which bypasses RLS).

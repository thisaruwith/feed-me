-- Plain SQL schema (no ORM/migration tool). Run with:
--   psql "$DATABASE_URL" -f db/schema.sql
-- Safe to re-run: tables are created only if missing.

CREATE TABLE IF NOT EXISTS restaurants (
  id       SERIAL PRIMARY KEY,
  name     TEXT NOT NULL,
  address  TEXT NOT NULL,
  lat      DOUBLE PRECISION,
  lng      DOUBLE PRECISION,
  cuisine  TEXT,
  rating   DOUBLE PRECISION,
  delivery_time_minutes  INTEGER,
  image_url  TEXT,
  is_open  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS menu_items (
  id            SERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  price_cents   INTEGER NOT NULL,
  description.  TEXT
);

CREATE INDEX IF NOT EXISTS menu_items_restaurant_id_idx ON menu_items(restaurant_id);

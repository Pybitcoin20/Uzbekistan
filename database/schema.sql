-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Locations Table
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) CHECK (category IN ('monument', 'restaurant', 'hotel', 'museum', 'bazaar')),
    city VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    geom GEOGRAPHY(Point, 4326), -- PostGIS Geography type
    plov_score DECIMAL(3, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for spatial queries
CREATE INDEX locations_geom_idx ON locations USING GIST (geom);

-- Example Radius Query (1km)
-- SELECT name, rating, ST_Distance(geom, ST_MakePoint($1, $2)::geography) as distance
-- FROM locations
-- WHERE ST_DWithin(geom, ST_MakePoint($1, $2)::geography, 1000)
-- ORDER BY rating DESC;

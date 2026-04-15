import Redis from 'ioredis';

// In a real production environment, use process.env.REDIS_URL
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  // Specialized key generators
  keys: {
    aiItinerary: (days: number, interests: string) => `ai:itinerary:${days}:${interests}`,
    nearbyLocations: (lat: number, lng: number, radius: number) => `geo:nearby:${lat}:${lng}:${radius}`,
    plovRanking: (city: string) => `plov:ranking:${city}`
  }
};

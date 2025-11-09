import Redis from 'ioredis';

class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  }

  async set(key: string, value: any, expiresIn?: number): Promise<void> {
    if (expiresIn) {
      await this.redis.setex(key, expiresIn, JSON.stringify(value));
    } else {
      await this.redis.set(key, JSON.stringify(value));
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}

export const cacheService = new CacheService();
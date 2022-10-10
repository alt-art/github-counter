import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
} from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: RedisClientType<RedisDefaultModules, RedisFunctions>;
  constructor() {
    this.redis = createClient({
      url: process.env.REDIS_TLS_URL,
      socket: { tls: process.env.TLS !== 'false', rejectUnauthorized: false },
    });
  }

  async onModuleInit() {
    this.redis.on('error', (error: any) => {
      console.error(error);
    });
    await this.redis.connect();
  }

  async onModuleDestroy() {
    await this.redis.disconnect();
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async set(key: string, value: string) {
    return await this.redis.setEx(key, 60 * 60 * 48, value);
  }

  async del(key: string) {
    return await this.redis.del(key);
  }
}

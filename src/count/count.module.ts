import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RedisService } from '../redis/redis.service';
import { CountController } from './count.controller';
import { CountService } from './count.service';

@Module({
  controllers: [CountController],
  providers: [CountService, RedisService, PrismaService],
})
export class CountModule {}

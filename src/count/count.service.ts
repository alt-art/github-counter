import { Injectable, StreamableFile } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RedisService } from '../redis/redis.service';
import { getTemplateSvg } from '../utils/files';
import formatNumber from '../utils/format';

@Injectable()
export class CountService {
  constructor(
    private redisService: RedisService,
    private prismaService: PrismaService,
  ) {}

  async getCount(ip: string, username: string): Promise<StreamableFile> {
    const ipCheck = await this.redisService.get(`ip:${username}:${ip}`);
    const profile = await this.prismaService.profile.findUnique({
      where: { name: username },
    });
    let count = profile ? profile.count : 1;
    if (!ipCheck) {
      if (profile) {
        count += 1;
        await this.prismaService.profile.update({
          where: { name: username },
          data: { count },
        });
      } else {
        await this.prismaService.profile.create({
          data: { name: username, count },
        });
      }
      await this.redisService.set(`ip:${username}:${ip}`, '1');
    }
    const svg = await getTemplateSvg();
    const formattedSvg = svg
      .replace('{count}', formatNumber(count))
      .replace('{user}', `${username}'s`);
    return new StreamableFile(Buffer.from(formattedSvg), {
      type: 'image/svg+xml',
    });
  }
}

import { Module } from '@nestjs/common';
import { CountModule } from './count/count.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [CountModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

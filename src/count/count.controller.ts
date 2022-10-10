import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CountService } from './count.service';
import { RealIP } from 'nestjs-real-ip';

@Controller('count')
export class CountController {
  constructor(private countService: CountService) {}

  @Get(':username')
  getCount(@RealIP() ip: string, @Param('username') username: string) {
    if (process.env.PRIVATE_USERNAME) {
      if (username !== process.env.PRIVATE_USERNAME) {
        throw new HttpException(
          'You are not authorized',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    return this.countService.getCount(ip, username);
  }
}

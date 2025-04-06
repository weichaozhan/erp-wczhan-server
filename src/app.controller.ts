import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('system_modules')
  async getSystemModules(@Req() req: Request) {
    const user = req.user;
    return await this.appService.getSystemModules(user);
  }
}

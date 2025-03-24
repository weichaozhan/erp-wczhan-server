import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { IgnoreTrans, Public } from '../global/decorator/public.decorator';
import { CaptchaService } from './captcha.service';
import { Request } from 'express';

@Controller('captcha')
export class CaptchaController {
  constructor(readonly capthaServive: CaptchaService) {}

  @Public()
  @IgnoreTrans()
  @Get('')
  getCaptcha(
    @Req()
    req: Request,
  ) {
    return this.capthaServive.getCaptcha(req.session.id);
  }

  @Public()
  @Post('/email')
  async getMailCaptcha(
    @Body()
    body,
  ) {
    return await this.capthaServive.getMailCaptcha(body.email);
  }
}

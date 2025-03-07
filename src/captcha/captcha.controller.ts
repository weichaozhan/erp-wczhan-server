import { Controller, Get, Req } from '@nestjs/common';
import { IgnoreTrans, Public } from 'src/global/decorator/public.decorator';
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
}

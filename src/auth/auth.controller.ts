import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Public } from '../global/decorator/public.decorator';
import { CaptchaGuard } from '../global/guard/captcha.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(CaptchaGuard, AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    return await this.authService.login({ ...req.user });
  }
}

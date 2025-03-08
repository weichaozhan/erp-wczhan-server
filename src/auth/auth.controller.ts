import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Public } from 'src/global/decorator/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CaptchaGuard } from 'src/global/guard/captcha.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(CaptchaGuard, AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Body() body: LoginAuthDto) {
    console.log('body', body, 'req.user', req.user);
    return await this.authService.login({ ...req.user, ...body });
  }
}

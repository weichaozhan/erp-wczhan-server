import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getCaptchaKey } from 'src/global/tools';
import { Redis } from 'src/global/tools/RedisTool';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: Partial<User> & LoginAuthDto, sessionId: string) {
    const { code } = user;
    const captchaKey = getCaptchaKey(sessionId);

    console.log('redisKey: ', captchaKey, 'code: ', code);
    if (!code) {
      throw new HttpException('请输入验证码', 400);
    }

    const codeInSession = await new Redis().get(captchaKey);
    console.log('codeInSession:', codeInSession);

    if (codeInSession !== code) {
      throw new HttpException('验证码验证失败，请刷新验证码重试', 400);
    }

    const payload: Partial<User> = {
      username: user.username,
      userId: user.userId,
      id: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      type: 'Bearer',
      accessToken,
    };
  }
}

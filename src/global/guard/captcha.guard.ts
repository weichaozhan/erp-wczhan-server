import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { getCaptchaKey } from '../tools';
import { Redis } from '../tools/RedisTool';

@Injectable()
export class CaptchaGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const { sessionID, body } = request;
    const { code } = body;
    console.log('session', sessionID, code);

    const captchaKey = getCaptchaKey(sessionID);

    console.log('redisKey: ', captchaKey, 'code: ', code);

    if (!code) {
      throw new BadRequestException('请输入验证码');
    }

    const redis = new Redis();
    const codeInSession = await redis.get(captchaKey);
    console.log('codeInSession:', codeInSession);

    // delete code from redis after used.
    await redis.del(captchaKey);

    if (codeInSession !== code) {
      throw new BadRequestException('验证码验证失败，请刷新验证码重试');
    }

    return true;
  }
}

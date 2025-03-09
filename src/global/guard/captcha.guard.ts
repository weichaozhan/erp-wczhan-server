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

    const { sessionID, body, path, method } = request;
    const { code, email } = body;
    console.log('session', sessionID, code);

    const isCreateUser = path === '/user' && method.toLowerCase() === 'post';

    if (isCreateUser && !email) {
      throw new BadRequestException('请输入邮箱');
    }

    const captchaKey = getCaptchaKey(isCreateUser ? `${email}` : sessionID);

    console.log('redisKey: ', captchaKey, 'code: ', code, 'path', path);

    if (!code) {
      throw new BadRequestException('请输入验证码');
    }

    const redis = new Redis();
    const codeInSession = await redis.get(captchaKey);
    console.log('codeInSession:', codeInSession, 'left');

    // delete code from redis after used.
    await redis.del(captchaKey);

    if (codeInSession !== code) {
      if (isCreateUser) {
        throw new BadRequestException(`验证码验证失败！`);
      } else {
        await redis.del(captchaKey);
        throw new BadRequestException(`验证码验证失败，请刷新验证码重试`);
      }
    }

    await redis.del(captchaKey);
    return true;
  }
}

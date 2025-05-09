import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REDIS_EXP_TIME_MAP } from '../global/constants';
import { getCaptchaKey, isFiledExit } from '../global/tools';
import { EmailTool } from '../global/tools/EmailTool';
import { Redis } from '../global/tools/RedisTool';
import { User } from '../user/entities/user.entity';
import * as svgCaptcha from 'svg-captcha';
import { Repository } from 'typeorm';

@Injectable()
export class CaptchaService {
  private redis: Redis;

  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {
    this.redis = new Redis();
  }

  private setCaptcha(
    uniqueId: string,
    expires: number = 300,
    size: number = 4,
  ) {
    const captcha = svgCaptcha.create({
      noise: 6,
      color: true,
      ignoreChars: 'oIOl',
      size,
    });

    const redisKey = getCaptchaKey(uniqueId);
    this.redis.setEX(redisKey, captcha.text, expires);

    console.log('redisKey', redisKey, captcha.text);

    return captcha;
  }

  getCaptcha(sessionId: string) {
    return this.setCaptcha(sessionId).data;
  }

  async getMailCaptcha(email: string) {
    console.log('email', email);
    if (!email) {
      throw new BadRequestException(`请输入邮箱！`);
    }

    const isEmailEixt = await isFiledExit(this.user, 'email', email);
    console.log('isEmailEixt', isEmailEixt);
    if (isEmailEixt) {
      throw new HttpException('邮箱已占用', 400);
    }

    const { NO_SUCH_KEY, FOREVER_EXIST } = REDIS_EXP_TIME_MAP;

    const timeLeft = await this.redis.getTimeLeftToExpire(getCaptchaKey(email));

    if (timeLeft !== NO_SUCH_KEY && timeLeft !== FOREVER_EXIST) {
      throw new BadRequestException(`验证吗请求频繁，请${timeLeft}秒后重试！`);
    }

    const emailCaptcha = this.setCaptcha(email, 60, 8);

    const emialTool = new EmailTool();

    try {
      return await emialTool.send({
        email,
        text: `您的验证码为：${emailCaptcha.text}`,
        html: `
          <html style="text-align: center;">
            <h1>欢迎您的注册</h1>
            <p style="font-size: 20px">
              验证码：<span><b><i>${emailCaptcha.text}</i></b></span>
            </p>
          </html>
        `,
        subject: '欢迎注册',
      });
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }
}

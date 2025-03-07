import { Injectable } from '@nestjs/common';
import { getCaptchaKey } from 'src/global/tools';
import { Redis } from 'src/global/tools/RedisTool';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  getCaptcha(sessionId: string) {
    const captcha = svgCaptcha.create({
      noise: 6,
      color: true,
      ignoreChars: 'oIOl',
    });

    const redis = new Redis();
    const redisKey = getCaptchaKey(sessionId);
    redis.setEX(redisKey, captcha.text, 300);

    console.log('redisKey', redisKey, captcha.text);

    return captcha.data;
  }
}

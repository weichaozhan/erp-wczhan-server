import Ioredis from 'ioredis';
import { REDIS_EXP_TIME_MAP } from '../constants';

export class Redis {
  private redisCache: Ioredis;

  constructor() {
    const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB } = process.env;
    this.redisCache = new Ioredis({
      port: +REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
      db: +REDIS_DB,
    });
  }

  // 过期时间以秒为单位
  async setEX(
    // 键名
    key: string,
    // 值
    value,
    // 过期时间
    ttl = 60 * 5,
  ) {
    return await this.redisCache.set(key, value, 'EX', ttl);
  }

  async get(key: string) {
    return await this.redisCache.get(key);
  }

  async del(key: string) {
    return await this.redisCache.del(key);
  }

  async getTimeLeftToExpire(key: string) {
    const time = await this.redisCache.expiretime(key);

    const now = Math.floor(Date.now() / 1000);

    if (
      time !== REDIS_EXP_TIME_MAP.FOREVER_EXIST &&
      time !== REDIS_EXP_TIME_MAP.NO_SUCH_KEY
    ) {
      return time - now;
    }

    return time;
  }
}

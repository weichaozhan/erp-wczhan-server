import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    // 必须实现一个 validate 方法
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username }) // 先验证用户名
      .orWhere('user.email=:username', { email: username }) // 用户名验证失败，看输入的是不是邮箱
      .getOne();

    if (!user) throw new BadRequestException('用户不存在');

    if (!compareSync(password, user.password))
      throw new BadRequestException('密码错误');

    return user;
  }
}

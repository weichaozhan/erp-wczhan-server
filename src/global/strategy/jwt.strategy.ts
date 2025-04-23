import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { User } from '../../user/entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const existUser: User | null = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
      relations: ['roles', 'roles.sysModules', 'roles.sysModules.permissions'],
    });

    const { roles } = existUser ?? {};
    const user: Omit<User, 'roles' | 'hashSync'> & {
      roles: number[];
      sysModules?: number[];
      permissions?: number[];
    } = { ...existUser, roles: [] };
    if (roles) {
      user.sysModules = [];
      user.permissions = [];
      roles.forEach((role) => {
        user.roles.push(role.id);
        const { sysModules } = role;

        sysModules.forEach((sysModule) => {
          user.sysModules.push(sysModule.id);
          const { permissions } = sysModule;
          permissions.forEach((permission) => {
            user.permissions.push(permission.id);
          });
        });
      });
    }

    if (!existUser) throw new UnauthorizedException('token验证失败');

    return user;
  }
}

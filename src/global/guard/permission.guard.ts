import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';

import { User } from '../../user/entities/user.entity';
import { IS_PUBLIC_KEY, PERMISSION_KEY } from '../decorator/public.decorator';
import { ROLE_ADMIN_ID } from '../constants/entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const permissionKey = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic || !permissionKey) return true;

    const { user } = request;

    const { roles } = await this.user.findOne({
      where: { id: (user as User).id },
      relations: ['roles', 'roles.permissions'],
    });

    if (roles.some((role) => role.id === ROLE_ADMIN_ID)) {
      return true;
    }

    let permissionHas = false;
    roles.some((role) => {
      if (role.permissions) {
        return role.permissions.some((permission) => {
          const isPerm = permission.name === permissionKey;
          permissionHas = isPerm;
          return isPerm;
        });
      }
      return false;
    });

    if (permissionHas) return true;
    throw new HttpException(`没有权限【${request.path}】`, 403);
  }
}

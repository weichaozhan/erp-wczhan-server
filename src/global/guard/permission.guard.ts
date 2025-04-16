import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';

import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { IS_PUBLIC_KEY, PERMISSION_KEY } from '../decorator/public.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
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

    const permissionKeys: Role['name'][] = [];

    roles.forEach((role) => {
      if (role.permissions) {
        role.permissions.forEach((permission) => {
          permissionKeys.push(permission.name);
        });
      }
    });

    return permissionKeys.includes(permissionKey);
  }
}

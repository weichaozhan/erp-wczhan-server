import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SysModule } from '../sysmodule/entities/sysmodule.entity';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { User } from '../user/entities/user.entity';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(SysModule)
    private readonly sysModule: Repository<SysModule>,
    @InjectRepository(Permission)
    private readonly permission: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto, user: Partial<User>) {
    const sysModule = await this.sysModule.findOne({
      where: { id: createPermissionDto.parentID },
    });
    const isExitPermission = await this.permission.findOne({
      where: { name: createPermissionDto.name },
    });

    if (isExitPermission) {
      throw new HttpException('存在同名权限', 400);
    }

    if (sysModule) {
      return this.permission.save(
        new Permission({
          ...createPermissionDto,
          creatorId: user.id,
          createBy: user.email,
          sysModule: sysModule,
        }),
      );
    } else {
      throw new HttpException('权限所属模块不存在', 400);
    }
  }

  async remove(id: number) {
    return this.permission.delete(id);
  }
}

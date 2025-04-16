import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { User } from '../user/entities/user.entity';
import { ROLE_ADMIN_ID } from '../global/constants/entity';
import { PaginationDto } from '../global/global.dto';
import { isUserAdmin } from '../global/tools';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permission: Repository<Permission>,
  ) {}

  private async hasPermToOperateRole(userId: number, roleId: number) {
    const isAdmin = await isUserAdmin(userId, this.user);
    if (isAdmin) {
      return true;
    }
    const role = await this.role.findOne({
      where: { id: roleId, creatorId: userId },
    });

    return !!role;
  }

  async findAll(query: PaginationDto, user: Partial<User>) {
    const { page, size, searchKey, searchValue } = query;

    const keyLike =
      searchKey && searchValue
        ? {
            [searchKey]: Like(`%${searchValue}%`),
          }
        : undefined;
    const isAdmin = await isUserAdmin(user.id, this.user);

    const filter = isAdmin ? {} : { creatorId: user.id };

    const [roles, total] = await this.role.findAndCount({
      skip: (page - 1) * size,
      take: size,
      relations: ['permissions', 'sysModules'],
      where: {
        ...filter,
        ...keyLike,
      },
    });

    return {
      roles,
      total,
      page: +page,
      size: +size,
    };
  }

  async create(createRoleDto: CreateRoleDto, user: Partial<User>) {
    return await this.role.save(
      new Role({
        ...createRoleDto,
        createBy: user.email,
        creatorId: user.id,
      }),
    );
  }

  async update(id: number, updateRoleDto: CreateRoleDto, user: Partial<User>) {
    const isCanDo = await this.hasPermToOperateRole(user.id, id);

    if (id === ROLE_ADMIN_ID) {
      throw new HttpException('超级管理员不可修改！', 400);
    }

    if (!isCanDo) {
      throw new HttpException('非用户创建角色不可修改！', 400);
    }

    return await this.role.save({
      ...updateRoleDto,
      id,
    });
  }

  async remove(id: number, user: Partial<User>) {
    const isCanDo = await this.hasPermToOperateRole(user.id, id);

    if (id === ROLE_ADMIN_ID) {
      throw new HttpException('超级管理员不可删除！', 400);
    }

    if (!isCanDo) {
      throw new HttpException('非用户创建角色不可删除！', 400);
    }

    return this.role.delete(id);
  }
}

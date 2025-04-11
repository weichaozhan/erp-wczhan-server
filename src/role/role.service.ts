import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { User } from '../user/entities/user.entity';
import { ROLE_ADMIN_ID } from '../global/constants/entity';
import { PaginationDto } from '../global/global.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permission: Repository<Permission>,
  ) {}

  async findAll(query: PaginationDto) {
    const { page, size } = query;

    const [roles, total] = await this.role.findAndCount({
      skip: (page - 1) * size,
      take: size,
      relations: ['permissions', 'sysModules'],
    });

    return {
      roles,
      total,
      page: +page,
      size: +size,
    };
  }

  async create(createRoleDto: CreateRoleDto, user: Partial<User>) {
    console.log('createRoleDto', createRoleDto);
    return await this.role.save(
      new Role({
        ...createRoleDto,
        createBy: user.email,
        creatorId: user.id,
      }),
    );
  }

  async update(id: number, updateRoleDto: CreateRoleDto) {
    return await this.role.save({
      ...updateRoleDto,
      id,
    });
  }

  async remove(id: number) {
    if (id === ROLE_ADMIN_ID) {
      throw new HttpException('超级管理员不可删除', 400);
    }
    return this.role.delete(id);
  }
}

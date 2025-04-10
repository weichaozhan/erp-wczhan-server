import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { User } from '../user/entities/user.entity';
import { ROLE_ADMIN_ID } from '../global/constants/entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permission: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto, user: Partial<User>) {
    return await this.role.save(
      new Role({
        ...createRoleDto,
        createBy: user.email,
        creatorId: user.id,
      }),
    );
  }

  async update(id: number, updateRoleDto: CreateRoleDto) {
    return await this.role.update(id, updateRoleDto);
  }

  async remove(id: number) {
    if (id === ROLE_ADMIN_ID) {
      throw new HttpException('超级管理员不可删除', 400);
    }
    return this.role.delete(id);
  }
}

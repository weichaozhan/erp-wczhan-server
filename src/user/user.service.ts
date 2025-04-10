import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { isFiledExit } from '../global/tools';
import { Role } from '../role/entities/role.entity';
import { ROLE_ADMIN_ID, USER_FIRST_ID } from '../global/constants/entity';
import { SYS_CREATER } from '../global/constants';
import { PaginationDto } from '../global/global.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
  ) {
    this.createFirstUsr();
  }

  private async createAdminRole() {
    try {
      const res = await this.role.findBy?.({ id: ROLE_ADMIN_ID });

      if (res?.length) {
        return;
      }

      const admin = new Role();

      admin.name = 'admin';
      admin.description = '超级管理员';
      admin.nameToShow = '超级管理员';
      admin.createBy = SYS_CREATER;

      await this.role?.save?.(admin);
    } catch (err) {
      console.log('SysModule err', err);
    }
  }

  private async createFirstUsr() {
    try {
      await this.createAdminRole();

      const role = await this.role?.findBy?.({ id: ROLE_ADMIN_ID });

      const res = await this.user.findBy?.({ id: USER_FIRST_ID });

      if (res?.length) {
        return;
      }

      const firstUser = new User();

      const { ADMIN_USER, ADMIN_PASSWORD, ADMIN_EMAIL } = process.env;

      firstUser.username = ADMIN_USER || 'admin';
      firstUser.password = ADMIN_PASSWORD || '123456';
      firstUser.email = ADMIN_EMAIL || 'admin_email';
      firstUser.userId = uuidV4();
      firstUser.roles = role;

      this.user?.save?.(firstUser);
    } catch (err) {
      console.log('UserService err', err);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    user.userId = uuidV4();
    const isUserEixt = await isFiledExit(this.user, 'username', user.username);

    if (isUserEixt) {
      throw new HttpException('用户名已占用', 400);
    } else {
      const isEmailEixt = await isFiledExit(this.user, 'email', user.email);
      console.log('isEmailEixt', isEmailEixt);
      if (isEmailEixt) {
        throw new HttpException('邮箱已占用', 400);
      }
      return await this.user.save(user);
    }
  }

  async findAll(query: PaginationDto) {
    const { page, size } = query;

    const [users, total] = await this.user.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });

    return {
      users,
      total,
      page,
      size,
    };
  }

  async findOne(id: number) {
    return await this.user.find({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.user.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.user.delete(id);
  }
}

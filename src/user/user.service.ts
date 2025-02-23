import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-users.dto';
import { isFiledExit } from 'src/global/tools';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    user.userId = uuidV4();
    const isUserEixt = await isFiledExit(this.user, 'username', user.username);

    if (isUserEixt) {
      throw new HttpException('用户名已占用', 400);
    }
    return await this.user.save(user);
  }

  async findAll(query: GetUserDto) {
    const { page, size } = query;

    const [users, total] = await this.user.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });

    return {
      users,
      total,
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

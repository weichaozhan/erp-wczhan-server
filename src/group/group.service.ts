import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { PaginationDto } from '../global/global.dto';
import { USER_FIRST_ID } from '../global/constants/entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Group)
    private readonly group: Repository<Group>,
  ) {}

  async findAll(query: PaginationDto) {
    const { page, size } = query;

    const [groups, total] = await this.group.findAndCount({
      skip: (page - 1) * size,
      take: size,
      relations: ['users'],
    });

    return {
      groups,
      total,
      page: +page,
      size: +size,
    };
  }

  async findOne(id: number) {
    return await this.group.find({
      where: {
        id,
      },
    });
  }

  async create(body: CreateGroupDto, user: Partial<User>) {
    const { name, userIds } = body;

    const group: Partial<Group> = {
      name,
      creatorId: user.id,
      createBy: user.username,
    };

    if (userIds) {
      const users: User[] = [];

      userIds.forEach((id) => {
        if (id !== USER_FIRST_ID) {
          users.push({ id } as User);
        }
      });

      group.users = users;
    }

    return await this.group.save(group);
  }
}

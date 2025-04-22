import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { PaginationDto } from '../global/global.dto';
import { createGroupUsers } from './tools';
import { UpdateGroupDto } from './dto/update-group.dto';

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
      relations: ['users'],
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
      group.users = createGroupUsers(userIds);
    }

    return await this.group.save(group);
  }

  async update(id: number, body: UpdateGroupDto) {
    const { name, userIds } = body;

    const group: Partial<Group> = {
      id,
      name,
    };

    if (userIds) {
      group.users = createGroupUsers(userIds);
    }

    return await this.group.save(group);
  }
}

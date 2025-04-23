import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { PaginationDto } from '../global/global.dto';
import {
  createCreatorIdFilter,
  createGroupUsers,
  judgeHanleAuth,
} from './tools';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Group)
    private readonly group: Repository<Group>,
  ) {}

  async findAll(query: PaginationDto, user: Partial<User>) {
    const { id: creatorId } = user;
    const { page, size, searchKey, searchValue } = query;

    const keyLike =
      searchKey && searchValue
        ? {
            [searchKey]: Like(`%${searchValue}%`),
          }
        : undefined;

    const [groups, total] = await this.group.findAndCount({
      skip: (page - 1) * size,
      take: size,
      relations: ['users'],
      where: {
        ...createCreatorIdFilter(creatorId),
        ...keyLike,
      },
    });

    return {
      groups,
      total,
      page: +page,
      size: +size,
    };
  }

  async findOne(id: number, user: Partial<User>) {
    const { id: creatorId } = user;
    const filter = {
      where: {
        id,
        ...createCreatorIdFilter(creatorId),
      },
    };
    return await this.group.findOne({
      ...filter,
      relations: ['users'],
      loadRelationIds: true,
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

  async update(id: number, body: UpdateGroupDto, user: Partial<User>) {
    await judgeHanleAuth(this.group, id, user.id, '非用户创建群组不可编辑！');

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

  async remove(id: number, user: Partial<User>) {
    await judgeHanleAuth(this.group, id, user.id, '非用户创建群组不可删除！');
    return await this.group.delete(id);
  }
}

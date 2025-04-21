import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Group } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Group)
    private readonly group: Repository<Group>,
  ) {}

  async findOne(id: number) {
    return await this.group.find({
      where: {
        id,
      },
    });
  }
}

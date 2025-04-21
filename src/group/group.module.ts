import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { User } from '../user/entities/user.entity';
import { Group } from './entity/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}

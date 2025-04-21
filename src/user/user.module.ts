import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../global/strategy/jwt.strategy';

import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { SysModule } from '../sysmodule/entities/sysmodule.entity';
import { Group } from '../group/entity/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, User, Role, SysModule, Permission]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}

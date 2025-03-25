import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from 'src/global/strategy/jwt.strategy';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { SysModule } from './entities/sysmodule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, SysModule, Permission])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { SysModule } from '../sysmodule/entities/sysmodule.entity';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysModule, Permission])],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}

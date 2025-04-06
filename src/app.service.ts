import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SysModule } from './sysmodule/entities/sysmodule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { ROOT_MODULE_ID } from './global/constants/entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(SysModule)
    private readonly sysModule: Repository<SysModule>,
    @InjectRepository(Permission)
    private readonly permission: Repository<Permission>,
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
  ) {}

  async getSystemModules(user) {
    let modules: SysModule[] = [];
    // admin role user return all modules
    if (user?.roles?.includes?.(ROOT_MODULE_ID)) {
      modules = await this.sysModule.find({
        relations: ['permissions'],
      });
    }

    return modules;
  }
}

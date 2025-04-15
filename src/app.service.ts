import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SysModule } from './sysmodule/entities/sysmodule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { ROOT_MODULE_ID } from './global/constants/entity';
import { MenuListNode } from './types/static';
import { User } from './user/entities/user.entity';
import { getUserModuls } from './global/tools';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
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
    } else {
      modules = await getUserModuls({
        userEntity: this.user,
        moduleEntity: this.sysModule,
        userId: user.id,
      });
    }

    return modules;
  }

  converToTree(menuList: MenuListNode[]) {
    const map = new Map<number, MenuListNode>();
    const tree: MenuListNode[] = [];

    menuList.forEach((item) => {
      map.set(item.id, item);
      item.children = [];
    });
    menuList.forEach((item) => {
      if (!item.parentId) {
        tree.push(item);
      } else {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children.push(item);
        }
      }
    });
    map.clear();
    return tree;
  }

  async getUserMenus(user) {
    let menus: SysModule[] = [];

    if (user?.roles?.includes?.(ROOT_MODULE_ID)) {
      menus = await this.sysModule.find({
        where: { isMenu: true },
        relations: ['permissions'],
      });
    } else {
      menus = await getUserModuls({
        isMenu: true,
        userEntity: this.user,
        moduleEntity: this.sysModule,
        userId: user.id,
      });
    }

    return this.converToTree(menus);
  }
}

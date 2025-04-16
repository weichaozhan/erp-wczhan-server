import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SysModule } from './entities/sysmodule.entity';
import { User } from '../user/entities/user.entity';
import { CreateSysModuleDto } from './dto/create-sysmodule.dto';
import {
  AUTH_MODULE,
  AUTH_MODULE_ID,
  ROOT_MODULE,
  ROOT_MODULE_ID,
} from '../global/constants/entity';
import { hasPermToOperateRow } from '../global/tools';

@Injectable()
export class SysmoduleService {
  constructor(
    @InjectRepository(SysModule)
    private readonly sysModule: Repository<SysModule>,
    @InjectRepository(SysModule)
    private readonly user: Repository<User>,
  ) {
    this.createSysModule();
  }

  private async hasPermToOperateModule(user, id) {
    return await hasPermToOperateRow({
      userId: user.id,
      rowId: id,
      entity: this.sysModule,
      userEntity: this.user,
    });
  }

  private async createSysModule() {
    this.sysModule
      .findBy?.({
        id: In([ROOT_MODULE_ID, AUTH_MODULE_ID]),
      })
      .then((res) => {
        const ids = res.map((item) => item.id);

        if (ids.length >= 2) {
          return;
        }

        const modules: SysModule[] = [];

        if (!ids.includes(ROOT_MODULE_ID)) {
          modules.push(new SysModule(ROOT_MODULE));
        }
        if (!ids.includes(AUTH_MODULE_ID)) {
          modules.push(new SysModule(AUTH_MODULE));
        }

        this.sysModule.save(modules);
      })
      .catch((err) => {
        console.log('SysModule err', err);
      });
  }

  async create(createSysModuleDto: CreateSysModuleDto, user: Partial<User>) {
    return await this.sysModule.save(
      new SysModule({
        ...createSysModuleDto,
        createBy: user.email,
        creatorId: user.id,
      }),
    );
  }

  async update(
    id: number,
    createSysModuleDto: CreateSysModuleDto,
    user: Partial<User>,
  ) {
    const isHasAuth = await this.hasPermToOperateModule(user, id);

    if (ROOT_MODULE_ID === id || AUTH_MODULE_ID === id) {
      throw new HttpException('系统创建模块不可修改', 400);
    }

    if (!isHasAuth) {
      throw new HttpException('非用户创建模块不可修改', 400);
    }

    return await this.sysModule.update(id, createSysModuleDto);
  }

  async remove(id: number, user: Partial<User>) {
    const isHasAuth = await this.hasPermToOperateModule(user, id);

    if (ROOT_MODULE_ID === id || AUTH_MODULE_ID === id) {
      throw new HttpException('系统创建模块不可删除', 400);
    }

    if (!isHasAuth) {
      throw new HttpException('非用户创建模块不可删除', 400);
    }

    return await this.sysModule.delete(id);
  }
}

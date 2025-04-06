import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SysModule } from './entities/sysmodule.entity';
import { CreateSysModuleDto } from './dto/create-sysmodule.dto';
import {
  MENU_MODULE,
  MENU_MODULE_ID,
  ROOT_MODULE,
  ROOT_MODULE_ID,
} from '../global/constants/entity';

@Injectable()
export class SysmoduleService {
  constructor(
    @InjectRepository(SysModule)
    private readonly sysModule: Repository<SysModule>,
  ) {
    this.createSysModule();
  }

  private async createSysModule() {
    this.sysModule
      .findBy?.({
        id: In([ROOT_MODULE_ID, MENU_MODULE_ID]),
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
        if (!ids.includes(MENU_MODULE_ID)) {
          modules.push(new SysModule(MENU_MODULE));
        }

        this.sysModule.save(modules);
      })
      .catch((err) => {
        console.log('SysModule err', err);
      });
  }

  create(createSysModuleDto: CreateSysModuleDto) {
    console.log('createSysModuleDto', createSysModuleDto);
    return 'This action adds a new sysmodule';
  }
}

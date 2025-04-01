import { Injectable } from '@nestjs/common';
import { CreateSysModuleDto } from './dto/create-sysmodule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SysModule } from './entities/sysmodule.entity';
import { Repository } from 'typeorm';

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
        id: 1,
      })
      .then((res) => {
        console.log('SysModule res', res);

        if (res.length) {
          return;
        }

        const firstModule = new SysModule();

        firstModule.name = 'rootModule';
        firstModule.nameToShow = '根模块';
        firstModule.description =
          '根模块，不属于任何菜单的权限均可放在该模块下';
        firstModule.createBy = 'system';

        this.sysModule.save(firstModule);
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

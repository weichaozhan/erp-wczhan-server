import { Test, TestingModule } from '@nestjs/testing';
import { SysmoduleController } from './sysmodule.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SysModule } from './entities/sysmodule.entity';
import { SysmoduleService } from './sysmodule.service';

describe('SysmoduleController', () => {
  let controller: SysmoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysmoduleController],
      providers: [
        SysmoduleService,
        {
          provide: getRepositoryToken(SysModule),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SysmoduleController>(SysmoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SysmoduleService } from './sysmodule.service';
import { SysModule } from './entities/sysmodule.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SysmoduleService', () => {
  let service: SysmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SysmoduleService,
        {
          provide: getRepositoryToken(SysModule),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SysmoduleService>(SysmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

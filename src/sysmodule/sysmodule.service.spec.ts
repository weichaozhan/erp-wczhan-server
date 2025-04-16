import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SysmoduleService } from './sysmodule.service';
import { SysModule } from './entities/sysmodule.entity';
import { User } from '../user/entities/user.entity';

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
        {
          provide: getRepositoryToken(User),
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

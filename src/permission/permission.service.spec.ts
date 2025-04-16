import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PermissionService } from './permission.service';
import { SysModule } from '../sysmodule/entities/sysmodule.entity';
import { Permission } from './entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(SysModule),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

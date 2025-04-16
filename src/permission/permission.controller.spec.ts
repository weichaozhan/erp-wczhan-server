import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { SysModule } from '../sysmodule/entities/sysmodule.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity';

describe('PermissionController', () => {
  let controller: PermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
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

    controller = module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

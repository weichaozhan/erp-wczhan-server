import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysModule } from './sysmodule/entities/sysmodule.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(SysModule),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: {},
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Array', () => {
      const mockRequest = { user: {} } as any; // Mock the Request object
      expect(appController.getSystemModules(mockRequest)).toBeInstanceOf(
        Promise<SysModule[]>,
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SysmoduleController } from './sysmodule.controller';

describe('SysmoduleController', () => {
  let controller: SysmoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysmoduleController],
    }).compile();

    controller = module.get<SysmoduleController>(SysmoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

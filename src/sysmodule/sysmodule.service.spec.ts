import { Test, TestingModule } from '@nestjs/testing';
import { SysmoduleService } from './sysmodule.service';

describe('SysmoduleService', () => {
  let service: SysmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysmoduleService],
    }).compile();

    service = module.get<SysmoduleService>(SysmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

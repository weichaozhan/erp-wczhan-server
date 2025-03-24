import { Test, TestingModule } from '@nestjs/testing';
import { CaptchaService } from './captcha.service';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CaptchaService', () => {
  let service: CaptchaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaptchaService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CaptchaService>(CaptchaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

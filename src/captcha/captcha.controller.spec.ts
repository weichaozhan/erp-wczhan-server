import { Test, TestingModule } from '@nestjs/testing';
import { CaptchaController } from './captcha.controller';
import { CaptchaService } from './captcha.service';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CaptchaController', () => {
  let controller: CaptchaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaptchaController],
      providers: [
        CaptchaService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CaptchaController>(CaptchaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { GroupService } from './group.service';
import { Group } from './entity/group.entity';
import { User } from '../user/entities/user.entity';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Group),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        GroupService,
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

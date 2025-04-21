import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { GroupController } from './group.controller';
import { Group } from './entity/group.entity';
import { GroupService } from './group.service';
import { User } from '../user/entities/user.entity';

describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
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

    controller = module.get<GroupController>(GroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

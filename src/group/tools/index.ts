import { Repository } from 'typeorm';
import { USER_FIRST_ID } from '../../global/constants/entity';
import { User } from '../../user/entities/user.entity';
import { Group } from '../entity/group.entity';
import { HttpException } from '@nestjs/common';

export const createGroupUsers = (userIds: number[]): User[] => {
  const users: User[] = [];

  userIds.forEach((id) => {
    if (id !== USER_FIRST_ID) {
      users.push({ id } as User);
    }
  });

  return users;
};

interface CreateCreatorIdFilter {
  creatorId?: number;
}
export const createCreatorIdFilter = (
  creatorId?: number,
): CreateCreatorIdFilter => {
  if (creatorId) {
    if (creatorId === USER_FIRST_ID) {
      return {};
    } else {
      return {
        creatorId,
      };
    }
  }

  return {};
};

export const judgeHanleAuth = async (
  group: Repository<Group>,
  groupId: number,
  userId: number,
  errMsg: string,
) => {
  const oldGroup = await group.findOne({
    where: { id: groupId },
  });

  if (userId !== USER_FIRST_ID && oldGroup.creatorId !== userId) {
    throw new HttpException(errMsg, 403);
  }
};

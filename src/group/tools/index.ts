import { USER_FIRST_ID } from '../../global/constants/entity';
import { User } from '../../user/entities/user.entity';

export const createGroupUsers = (userIds: number[]): User[] => {
  const users: User[] = [];

  userIds.forEach((id) => {
    if (id !== USER_FIRST_ID) {
      users.push({ id } as User);
    }
  });

  return users;
};
